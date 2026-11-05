import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { MuseumImage } from "@/components/MuseumImage";
import { MUSEUM_CATEGORIES, MUSEUM_EXHIBITS } from "@/lib/museum";
import { filterMuseumExhibits } from "@/lib/museum-search";
import type { MuseumCategory } from "@/lib/museum-types";

export const Route = createFileRoute("/museu/")({
  head: () => ({
    meta: [
      { title: "Museu Católico — Lumen" },
      { name: "description", content: "Fotografias reais da história católica, com explicações e fontes." },
      { property: "og:title", content: "Museu Católico — Lumen" },
      { property: "og:description", content: "Fotografias reais da história católica, com explicações e fontes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Museu,
});

function Museu() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<MuseumCategory | "todos">("todos");
  const items = filterMuseumExhibits(MUSEUM_EXHIBITS, query, category);
  return (
    <AppShell wide>
      <Link to="/biblioteca" className="text-sm font-bold text-muted-foreground">← Biblioteca</Link>
      <h1 className="mt-2 text-2xl font-bold text-primary">Museu Católico</h1>
      <p className="mt-1 text-muted-foreground">Imagens marcantes da história da Igreja, com suas histórias e fontes.</p>
      <label className="mt-5 flex items-center gap-2 rounded-2xl border-2 border-border bg-card px-4 py-3">
        <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nome, lugar ou ano"
          aria-label="Buscar no museu" className="w-full bg-transparent outline-none" />
      </label>
      <div className="mt-3 flex flex-wrap gap-2">
        {MUSEUM_CATEGORIES.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" data-sound="select" onClick={() => setCategory(id)} aria-pressed={category === id}
            className={`inline-flex items-center gap-1 rounded-full border-2 px-3 py-1.5 text-sm font-bold transition active:scale-95 ${category === id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-primary"}`}>
            <Icon className="h-4 w-4" aria-hidden="true" />{label}
          </button>
        ))}
      </div>
      {items.length === 0 ? (
        <p className="mt-8 text-center text-muted-foreground">Nenhuma peça encontrada.</p>
      ) : (
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {items.map((ex) => (
            <li key={ex.id}>
              <Link to="/museu/$id" params={{ id: ex.id }} className="block overflow-hidden rounded-2xl border-2 border-border bg-card transition active:scale-[0.98]">
                <MuseumImage exhibit={ex} />
                <div className="p-4">
                  <p className="text-xs font-bold text-muted-foreground">{ex.date} · {ex.location}</p>
                  <h2 className="font-display text-lg font-semibold text-primary">{ex.title}</h2>
                  <p className="text-sm text-foreground">{ex.summary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  );
}
