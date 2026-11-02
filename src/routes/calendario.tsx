import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { CALENDAR_SOURCE, MONTHS, celebrationsFor, seasonOf } from "@/lib/liturgical-calendar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/calendario")({
  head: () => ({
    meta: [
      { title: "Calendário litúrgico — Lumen" },
      { name: "description", content: "Santos, festas e solenidades de cada dia do ano litúrgico católico." },
      { property: "og:title", content: "Calendário litúrgico — Lumen" },
      { property: "og:description", content: "Santos, festas e solenidades de cada dia do ano litúrgico católico." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Calendario,
});

const WEEK = ["D", "S", "T", "Q", "Q", "S", "S"];

function Calendario() {
  const [view, setView] = useState<{ y: number; m: number; d: number } | null>(null);
  useEffect(() => { const n = new Date(); setView({ y: n.getFullYear(), m: n.getMonth(), d: n.getDate() }); }, []);
  if (!view) return <AppShell><h1 className="text-2xl font-bold text-primary">Calendário litúrgico</h1></AppShell>;
  const { y, m, d } = view;
  const first = new Date(Date.UTC(y, m, 1)).getUTCDay();
  const total = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  const move = (delta: number) => { const t = new Date(Date.UTC(y, m + delta, 1)); setView({ y: t.getUTCFullYear(), m: t.getUTCMonth(), d: 1 }); };
  const selected = celebrationsFor(y, m, d);
  const season = seasonOf(new Date(Date.UTC(y, m, d)));
  return (
    <AppShell>
      <h1 className="text-2xl font-bold text-primary">Calendário litúrgico</h1>
      <p className="mt-1 text-muted-foreground">Santos e celebrações da Igreja em cada dia.</p>

      <div className="mt-5 rounded-3xl border-2 border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" aria-label="Mês anterior" data-sound="select" onClick={() => move(-1)}><ChevronLeft /></Button>
          <p className="font-display text-xl font-semibold text-primary">{MONTHS[m]} {y}</p>
          <Button variant="ghost" size="icon" aria-label="Próximo mês" data-sound="select" onClick={() => move(1)}><ChevronRight /></Button>
        </div>
        <div className="mt-2 grid grid-cols-7 gap-1 text-center text-xs font-bold text-muted-foreground">
          {WEEK.map((w, i) => <span key={i}>{w}</span>)}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {Array.from({ length: first }, (_, i) => <span key={`e${i}`} />)}
          {Array.from({ length: total }, (_, i) => {
            const day = i + 1;
            const c = celebrationsFor(y, m, day)[0];
            const big = c && (c.rank === "Solenidade" || c.rank === "Festa" || c.rank === "Celebração");
            return (
              <button key={day} data-sound="select" onClick={() => setView({ y, m, d: day })} aria-pressed={day === d}
                className={cn("relative flex aspect-square items-center justify-center rounded-xl text-sm font-bold transition active:scale-90",
                  day === d ? "bg-primary text-primary-foreground" : big ? "bg-gold/30 text-primary" : "text-foreground hover:bg-muted")}>
                {day}
                {c && <span className={cn("absolute bottom-1 h-1.5 w-1.5 rounded-full", day === d ? "bg-gold" : "bg-primary/60")} />}
              </button>
            );
          })}
        </div>
      </div>

      <section className="mt-5 rounded-3xl bg-primary p-5 text-primary-foreground">
        <p className="text-xs font-bold uppercase tracking-wide text-gold">{d} de {MONTHS[m]!.toLowerCase()} · {season}</p>
        {selected.length ? (
          <ul className="mt-2 space-y-3">
            {selected.map((c) => (
              <li key={c.name}>
                <p className="font-display text-lg font-semibold">{c.name}</p>
                <p className="text-sm opacity-80">{c.rank}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2">Dia de semana do {season.replace("Tempo ", "tempo ")}, sem celebração própria no calendário.</p>
        )}
      </section>
      <p className="mt-4 text-xs text-muted-foreground">
        Fonte: <a className="underline" href={CALENDAR_SOURCE.url} target="_blank" rel="noreferrer">{CALENDAR_SOURCE.label}</a>. Celebrações de domingos e tempos fortes podem prevalecer sobre memórias; confira a liturgia da sua diocese.
      </p>
    </AppShell>
  );
}
