import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { LessonPath } from "@/components/LessonPath";
import { UNIT_TITLE } from "@/lib/lessons";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/trilha")({
  head: () => ({
    meta: [
      { title: "Trilha — Lumen" },
      { name: "description", content: "Todas as lições da trilha Fundamentos da fé católica." },
      { property: "og:title", content: "Trilha — Lumen" },
      { property: "og:description", content: "Todas as lições da trilha Fundamentos da fé católica." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Trilha,
});

function Trilha() {
  const { progress } = useProgress();
  return (
    <AppShell>
      <div className="rounded-3xl bg-secondary p-5 text-secondary-foreground">
        <p className="text-sm font-bold opacity-80">Unidade 1</p>
        <h1 className="text-2xl font-semibold">{UNIT_TITLE}</h1>
      </div>
      <LessonPath completed={progress.completed} />
    </AppShell>
  );
}
