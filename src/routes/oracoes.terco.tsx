import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Pause, Play } from "lucide-react";
import { useMemo } from "react";
import { AppShell, ProgressBar } from "@/components/AppShell";
import { MascotReaction } from "@/components/MascotReaction";
import { usePrayers } from "@/components/PrayerProvider";
import { PrayerText, TextSizeControls } from "@/components/PrayerReader";
import { LumenButton } from "@/components/ui/lumen-button";
import { moveRosary } from "@/lib/prayer-state";
import type { MysteryId } from "@/lib/prayer-types";
import { PRAYER_TEXTS } from "@/lib/prayers";
import { MYSTERY_SETS, MYSTERY_SOURCE, ROSARY_SOURCE, buildRosary, mysteriesForDay } from "@/lib/rosary";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/oracoes/terco")({
  head: () => ({
    meta: [
      { title: "Terço guiado — Lumen" },
      { name: "description", content: "Reze o Terço passo a passo, com os mistérios do dia e meditações bíblicas." },
      { property: "og:title", content: "Terço guiado — Lumen" },
      { property: "og:description", content: "Reze o Terço passo a passo, com os mistérios do dia e meditações bíblicas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Terco,
});

function Terco() {
  const { state, setState, ready } = usePrayers();
  const session = state.rosary;
  const steps = useMemo(() => session ? buildRosary(session.mysteryId, session.includeFatima, PRAYER_TEXTS) : [], [session?.mysteryId, session?.includeFatima]);
  const back = <Link to="/oracoes" className="inline-flex min-h-11 items-center gap-2 font-bold text-muted-foreground"><ArrowLeft className="h-5 w-5" /> Orações</Link>;

  if (!ready) return <AppShell>{back}</AppShell>;
  if (!session) return <AppShell>{back}<Setup onStart={(mysteryId, includeFatima) => setState((s) => ({ ...s, rosary: { mysteryId, includeFatima, index: 0, paused: false, completed: false } }))} /></AppShell>;

  const exit = () => setState((s) => ({ ...s, rosary: null }));
  if (session.completed) return (
    <AppShell>{back}
      <div className="mt-6 flex flex-col items-center text-center">
        <MascotReaction mood="celebrate" className="w-36" />
        <h1 className="mt-4 text-2xl font-bold text-primary">Terço concluído</h1>
        <p className="mt-2 text-muted-foreground">Que Nossa Senhora interceda por você.</p>
        <LumenButton className="mt-6" onClick={exit}>Rezar outro terço</LumenButton>
      </div>
    </AppShell>
  );

  const index = Math.min(session.index, steps.length - 1);
  const step = steps[index]!;
  const last = index === steps.length - 1;
  const move = (d: -1 | 1) => setState((s) => s.rosary ? { ...s, rosary: moveRosary(s.rosary, d, steps.length) } : s);

  return (
    <AppShell>
      <div className="flex items-center justify-between">{back}<button onClick={exit} className="min-h-11 text-sm font-bold text-muted-foreground underline">Recomeçar</button></div>
      <div className="mt-2 flex items-center gap-3"><ProgressBar value={((index + 1) / steps.length) * 100} /><span className="shrink-0 text-xs font-bold text-muted-foreground">{index + 1}/{steps.length}</span></div>
      <p className="mt-5 text-xs font-bold uppercase tracking-wide text-secondary">{step.section}</p>
      <h1 className="mt-1 text-2xl font-bold text-primary">{step.title}</h1>
      {step.bead && (
        <div aria-label={`Conta ${step.bead} de 10`} className="mt-3 flex gap-1.5">
          {Array.from({ length: 10 }, (_, i) => <span key={i} className={cn("h-3 w-3 rounded-full transition", i < step.bead! ? "bg-gold" : "bg-muted")} />)}
        </div>
      )}
      <div className="mt-4 flex items-center justify-between gap-2"><TextSizeControls />
        <LumenButton variant={session.paused ? "gold" : "outline"} aria-pressed={session.paused} className="h-11 w-auto px-4 text-sm"
          onClick={() => setState((s) => s.rosary ? { ...s, rosary: { ...s.rosary, paused: !s.rosary.paused } } : s)}>
          {session.paused ? <><Play className="mr-1 h-4 w-4" />Retomar</> : <><Pause className="mr-1 h-4 w-4" />Pausar</>}
        </LumenButton>
      </div>
      <article key={step.id} className="animate-rise mt-4 rounded-3xl border-2 border-border bg-card p-5">
        <PrayerText text={step.text} />
        {step.mystery && step.id.endsWith("misterio") && <p className="mt-4 text-sm font-bold text-muted-foreground">{step.mystery.scripture}</p>}
      </article>
      {session.paused && <p className="mt-3 text-center text-sm font-bold text-secondary">Terço pausado. Toque em Retomar quando quiser continuar.</p>}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <LumenButton variant="outline" disabled={session.paused || index === 0} onClick={() => move(-1)}>Voltar</LumenButton>
        {last
          ? <LumenButton variant="gold" disabled={session.paused} onClick={() => setState((s) => s.rosary ? { ...s, rosary: { ...s.rosary, completed: true } } : s)}>Concluir</LumenButton>
          : <LumenButton disabled={session.paused} onClick={() => move(1)}>Avançar</LumenButton>}
      </div>
    </AppShell>
  );
}

function Setup({ onStart }: { onStart: (id: MysteryId, fatima: boolean) => void }) {
  const todayId = mysteriesForDay(new Date().getDay());
  return <SetupForm todayId={todayId} onStart={onStart} />;
}

function SetupForm({ todayId, onStart }: { todayId: MysteryId; onStart: (id: MysteryId, fatima: boolean) => void }) {
  const { state } = usePrayers();
  void state;
  return (
    <form className="mt-2" onSubmit={(e) => { e.preventDefault(); const f = new FormData(e.currentTarget); onStart(f.get("misterio") as MysteryId, f.get("fatima") === "on"); }}>
      <h1 className="text-2xl font-bold text-primary">Terço guiado</h1>
      <p className="mt-1 text-muted-foreground">Escolha os mistérios. Os do dia já vêm marcados.</p>
      <fieldset className="mt-5 space-y-3">
        <legend className="sr-only">Mistérios</legend>
        {MYSTERY_SETS.map((set) => (
          <label key={set.id} className="flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-border bg-card p-4 has-[:checked]:border-gold has-[:checked]:bg-accent">
            <input type="radio" name="misterio" value={set.id} defaultChecked={set.id === todayId} className="h-5 w-5 accent-[var(--primary)]" />
            <span><span className="block font-display text-lg font-semibold text-primary">{set.title}{set.id === todayId && <span className="ml-2 rounded-full bg-gold px-2 py-0.5 text-xs text-gold-foreground">hoje</span>}</span>
              <span className="text-sm text-muted-foreground">{set.days}</span></span>
          </label>
        ))}
      </fieldset>
      <label className="mt-4 flex items-center gap-3 rounded-2xl border-2 border-border bg-card p-4">
        <input type="checkbox" name="fatima" defaultChecked className="h-5 w-5 accent-[var(--primary)]" />
        <span className="font-bold text-foreground">Incluir a Oração de Fátima após cada dezena</span>
      </label>
      <LumenButton type="submit" className="mt-6">Começar o terço</LumenButton>
      <p className="mt-4 text-xs text-muted-foreground">Fontes: <a className="underline" href={ROSARY_SOURCE.url} target="_blank" rel="noreferrer">{ROSARY_SOURCE.label}</a>; <a className="underline" href={MYSTERY_SOURCE.url} target="_blank" rel="noreferrer">{MYSTERY_SOURCE.label}</a>.</p>
    </form>
  );
}
