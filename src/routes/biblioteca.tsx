import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { UNITS } from "@/lib/lessons";

export const Route = createFileRoute("/biblioteca")({
  head: () => ({
    meta: [
      { title: "Biblioteca — Lumen" },
      { name: "description", content: "Revise os ensinamentos com referências da Bíblia e do Catecismo." },
      { property: "og:title", content: "Biblioteca — Lumen" },
      { property: "og:description", content: "Revise os ensinamentos com referências da Bíblia e do Catecismo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Biblioteca,
});

function Biblioteca() {
  return (
    <AppShell>
      <h1 className="text-2xl font-bold text-primary">Biblioteca</h1>
      <p className="mt-1 text-muted-foreground">Os ensinamentos, com suas fontes.</p>
      <div className="mt-6 space-y-8">
        {UNITS.map((unit) => (
          <section key={unit.id}>
            <h2 className="mb-3 text-xl font-semibold text-primary">{unit.emoji} {unit.title}</h2>
            <div className="space-y-3">
        {unit.lessons.map((l) => (
          <details key={l.id} className="rounded-2xl border-2 border-border bg-card p-4">
            <summary className="cursor-pointer font-display text-lg font-semibold text-primary">
              {l.emoji} {l.title}
            </summary>
            <div className="mt-3 space-y-3">
              {l.teachings.map((t) => (
                <div key={t.title}>
                  <h3 className="font-bold text-primary">{t.title}</h3>
                  <p className="text-sm text-foreground">{t.text}</p>
                  <p className="text-xs font-bold text-muted-foreground">{t.source}</p>
                </div>
              ))}
            </div>
          </details>
        ))}
            </div>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
