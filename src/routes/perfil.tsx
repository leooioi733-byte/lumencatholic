import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { LESSONS } from "@/lib/lessons";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Perfil — Lumen" },
      { name: "description", content: "Seu XP e lições concluídas no Lumen." },
      { property: "og:title", content: "Perfil — Lumen" },
      { property: "og:description", content: "Seu XP e lições concluídas no Lumen." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Perfil,
});

function Perfil() {
  const { progress, profile } = useProgress();
  return (
    <AppShell>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold text-primary">{profile?.nickname || "Visitante"}</h1>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border-2 border-border bg-card p-4 text-center">
          <p className="font-display text-3xl font-bold text-primary">{progress.xp}</p>
          <p className="text-sm text-muted-foreground">XP total</p>
        </div>
        <div className="rounded-2xl border-2 border-border bg-card p-4 text-center">
          <p className="font-display text-3xl font-bold text-primary">
            {progress.completed.length}/{LESSONS.length}
          </p>
          <p className="text-sm text-muted-foreground">Lições</p>
        </div>
      </div>
    </AppShell>
  );
}
