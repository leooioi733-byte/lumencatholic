import { createFileRoute, Link } from "@tanstack/react-router";
import mascote from "@/assets/lumen-mascote.png";
import { AppShell, ProgressBar, XpBadge } from "@/components/AppShell";
import { LessonPath } from "@/components/LessonPath";
import { lumenButton } from "@/components/ui/lumen-button";
import { LESSONS, UNITS, getLessonUnit, nextLesson } from "@/lib/lessons";
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
  const unit = next ? getLessonUnit(next.id) : UNITS[UNITS.length - 1];
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
            <p className="text-sm font-bold opacity-80">{next ? "Próxima lição" : "Trilha concluída!"}</p>
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

      <section className="mt-6 border-y-2 border-border py-5">
        <div className="mb-3 flex justify-between gap-3 text-sm font-bold text-primary">
          <span>Seu progresso na trilha</span>
          <span className="shrink-0">{progress.completed.length}/{LESSONS.length}</span>
        </div>
        <ProgressBar value={pct} />
      </section>

      <h2 className="mt-8 text-xl font-semibold text-primary">Trilha de estudos</h2>
      {unit && <div className="mt-4"><LessonPath completed={progress.completed} unitId={unit.id} /></div>}
      <Link to="/trilha" className={`${lumenButton({ variant: "outline" })} mt-4`}>Todas as unidades</Link>
    </AppShell>
  );
}
