import { createFileRoute, Link } from "@tanstack/react-router";
import { Landmark } from "lucide-react";
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
      <Link to="/museu" className="mt-4 flex items-center gap-3 rounded-2xl border-2 border-gold bg-card p-4 transition active:scale-[0.98]">
        <Landmark className="h-8 w-8 text-primary" aria-hidden="true" />
        <span><span className="block font-display text-lg font-semibold text-primary">Museu Católico</span>
        <span className="text-sm text-muted-foreground">Fotos históricas com explicações e fontes</span></span>
      </Link>
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
