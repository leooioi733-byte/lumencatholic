import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen, ChevronDown, Map, Sparkles } from "lucide-react";
import { AppShell, ProgressBar, XpBadge } from "@/components/AppShell";
import { ProfileEmblem, ProfilePersonalization } from "@/components/ProfilePersonalization";
import { useBibleProgress } from "@/components/BibleProgressProvider";
import { useLocalProfile } from "@/hooks/use-local-profile";
import { BIBLE_BOOKS } from "@/lib/bible-books";
import { formatPercent, getReadingStats } from "@/lib/bible-progress";
import { getLearningStats } from "@/lib/statistics";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Conta e estatísticas — Lumen" },
      { name: "description", content: "Personalize seu perfil e acompanhe seu avanço nas lições e na leitura da Bíblia no Lumen." },
      { property: "og:title", content: "Conta e estatísticas — Lumen" },
      { property: "og:description", content: "Suas preferências pessoais e o progresso na trilha e na Bíblia católica." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Perfil,
});

function Perfil() {
  const { progress } = useProgress();
  const { profile, ready, saveProfile } = useLocalProfile();
  const { progress: bible, storageError } = useBibleProgress();
  const learning = getLearningStats(progress.completed);
  const reading = getReadingStats(bible);
  const testaments = (["AT", "NT"] as const).map((testament) => ({ testament, stats: getReadingStats(bible, BIBLE_BOOKS.filter((book) => book.testament === testament)) }));
  return (
    <AppShell>
      <p className="mb-5 text-sm font-bold text-muted-foreground">Sua conta</p>
      <div className="flex items-center gap-4">
        <ProfileEmblem symbol={profile.symbol} />
        <div className="min-w-0">
          <h1 className="break-words text-2xl font-bold text-primary">{profile.nickname || "Visitante"}</h1>
          <div className="mt-2"><XpBadge xp={progress.xp} /></div>
        </div>
      </div>

      <section className="mt-8" aria-labelledby="stats-title">
        <h2 id="stats-title" className="flex items-center gap-2 text-xl font-semibold text-primary"><Sparkles className="h-5 w-5" aria-hidden="true" />Suas estatísticas</h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[{ title: "Trilha", stats: learning, count: learning.completed, noun: "lições", to: "/trilha" as const, icon: Map },
            { title: "Bíblia", stats: reading, count: reading.read, noun: "capítulos", to: "/biblia" as const, icon: BookOpen }].map(({ title, stats, count, noun, to, icon: Icon }) => (
            <Link key={title} to={to} className="min-w-0 rounded-2xl border-2 border-border bg-card p-4 transition active:translate-y-0.5">
              <div className="flex items-center justify-between text-primary"><Icon className="h-5 w-5" aria-hidden="true" /><ArrowUpRight className="h-4 w-4" aria-hidden="true" /></div>
              <p className="mt-3 text-sm font-bold text-muted-foreground">{title}</p>
              <p className="mt-1 font-display text-3xl font-semibold text-primary">{formatPercent(stats.percent)}</p>
              <div className="mt-3"><ProgressBar value={stats.percent} label={`Progresso na ${title}`} /></div>
              <p className="mt-3 text-xs text-muted-foreground">{count} de {stats.total} {noun}</p>
            </Link>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap justify-between gap-2 text-sm text-muted-foreground">
          <span>{learning.completedUnits} de {learning.perUnit.length} unidades concluídas</span>
          <span>{reading.completedBooks} de 73 livros lidos</span>
        </div>
        <details className="group mt-5 border-t border-border pt-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 font-bold text-primary">Por unidade da trilha<ChevronDown className="h-5 w-5 shrink-0 transition group-open:rotate-180" aria-hidden="true" /></summary>
          <div className="mt-4 space-y-4">{learning.perUnit.map(({ unit, completed, total, percent }) => <div key={unit.id}>
            <div className="mb-2 flex items-start justify-between gap-3 text-sm"><span>{unit.title}</span><span className="shrink-0 font-bold">{formatPercent(percent)}</span></div>
            <ProgressBar value={percent} label={unit.title} />
            <p className="mt-1 text-xs text-muted-foreground">{completed} de {total} lições</p>
          </div>)}</div>
        </details>
        <div className="mt-5 space-y-4 border-t border-border pt-4">
          {testaments.map(({ testament, stats }) => <div key={testament}>
            <div className="mb-2 flex items-start justify-between gap-2 text-sm"><span>{testament === "AT" ? "Antigo Testamento" : "Novo Testamento"}</span><span className="shrink-0 font-bold">{formatPercent(stats.percent)}</span></div>
            <ProgressBar value={stats.percent} label={testament === "AT" ? "Antigo Testamento" : "Novo Testamento"} />
            <p className="mt-1 text-xs text-muted-foreground">{stats.read} de {stats.total} capítulos lidos</p>
          </div>)}
        </div>
        {storageError && <p role="status" className="mt-3 text-sm text-destructive">A leitura está salva apenas nesta visita; o aparelho não permitiu guardar o progresso.</p>}
      </section>

      <section className="mt-8 border-t-2 border-border pt-6" aria-labelledby="personal-title">
        <h2 id="personal-title" className="text-xl font-semibold text-primary">Do seu jeito</h2>
        {ready ? <ProfilePersonalization profile={profile} saveProfile={saveProfile} /> : <p className="mt-4 text-muted-foreground">Carregando preferências…</p>}
        <p className="text-xs text-muted-foreground">Perfil e progresso guardados neste aparelho.</p>
      </section>
    </AppShell>
  );
}
