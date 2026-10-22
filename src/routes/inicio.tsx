import { createFileRoute, Link } from "@tanstack/react-router";
import mascote from "@/assets/lumen-mascote.png";
import { AppShell, ProgressBar, XpBadge } from "@/components/AppShell";
import { LessonPath } from "@/components/LessonPath";
import { lumenButton } from "@/components/ui/lumen-button";
import { LESSONS, nextLesson, UNIT_TITLE } from "@/lib/lessons";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/inicio")({
  head: () => ({
    meta: [
      { title: "Início — Lumen" },
      { name: "description", content: "Sua próxima lição, XP e progresso na fé católica." },
      { property: "og:title", content: "Início — Lumen" },
      { property: "og:description", content: "Sua próxima lição, XP e progresso na fé católica." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Inicio,
});

function Inicio() {
  const { progress, profile } = useProgress();
  const next = nextLesson(progress.completed);
  const pct = (progress.completed.length / LESSONS.length) * 100;
  return (
    <AppShell>
      <header className="flex items-center justify-between gap-3">
        <h1 className="truncate text-2xl font-bold text-primary">
          Olá{profile?.nickname ? `, ${profile.nickname}` : ""}!
        </h1>
        <XpBadge xp={progress.xp} />
      </header>

      <section className="mt-6 rounded-3xl bg-primary p-5 text-primary-foreground">
        <div className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold opacity-80">{next ? "Próxima lição" : "Unidade concluída!"}</p>
            <h2 className="mt-1 text-2xl font-semibold">{next ? next.title : "Parabéns!"}</h2>
          </div>
          <img src={mascote} alt="" className="animate-float-soft w-20 shrink-0" />
        </div>
        {next && (
          <Link to="/licao/$id" params={{ id: next.id }} className={`${lumenButton({ variant: "gold" })} mt-4`}>
            Começar lição
          </Link>
        )}
      </section>

      <section className="mt-6 rounded-3xl border-2 border-border bg-card p-5">
        <div className="mb-3 flex justify-between text-sm font-bold text-primary">
          <span>{UNIT_TITLE}</span>
          <span>{progress.completed.length}/{LESSONS.length}</span>
        </div>
        <ProgressBar value={pct} />
      </section>

      <h2 className="mt-8 text-xl font-semibold text-primary">Trilha de estudos</h2>
      <LessonPath completed={progress.completed} />
    </AppShell>
  );
}
