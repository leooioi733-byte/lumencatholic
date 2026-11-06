import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { BIBLE_BOOKS } from "@/lib/bible-books";

export const Route = createFileRoute("/biblia/")({
  head: () => ({
    meta: [
      { title: "Bíblia Sagrada — Lumen" },
      { name: "description", content: "A Bíblia católica completa, 73 livros, na tradução do Pe. Matos Soares." },
      { property: "og:title", content: "Bíblia Sagrada — Lumen" },
      { property: "og:description", content: "A Bíblia católica completa, 73 livros, na tradução do Pe. Matos Soares." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Biblia,
});

function Biblia() {
  const [tab, setTab] = useState<"AT" | "NT">("AT");
  const [q, setQ] = useState("");
  const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const books = q
    ? BIBLE_BOOKS.filter((b) => norm(b.name).includes(norm(q)) || norm(b.abbrev).includes(norm(q)))
    : BIBLE_BOOKS.filter((b) => b.testament === tab);
  return (
    <AppShell wide>
      <Link to="/biblioteca" className="text-sm font-bold text-muted-foreground">← Biblioteca</Link>
      <h1 className="mt-2 text-2xl font-bold text-primary">Bíblia Sagrada</h1>
      <p className="mt-1 text-muted-foreground">Os 73 livros do cânon católico, do Gênesis ao Apocalipse.</p>
      <label className="mt-5 flex items-center gap-2 rounded-2xl border-2 border-border bg-card px-4 py-3">
        <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar livro" aria-label="Buscar livro"
          className="w-full bg-transparent outline-none" />
      </label>
      {!q && (
        <div className="mt-3 grid grid-cols-2 gap-2">
          {(["AT", "NT"] as const).map((t) => (
            <button key={t} type="button" data-sound="select" onClick={() => setTab(t)} aria-pressed={tab === t}
              className={`rounded-2xl border-2 px-3 py-2 font-bold transition active:translate-y-0.5 ${tab === t ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-primary"}`}>
              {t === "AT" ? "Antigo Testamento (46)" : "Novo Testamento (27)"}
            </button>
          ))}
        </div>
      )}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {books.map((b) => (
          <Link key={b.slug} to="/biblia/$livro" params={{ livro: b.slug }}
            className="rounded-2xl border-2 border-border bg-card p-3 transition active:scale-[0.98]">
            <span className="block font-display font-semibold text-primary">{b.name}</span>
            <span className="text-xs text-muted-foreground">{b.abbrev} · {b.chapters} cap.</span>
          </Link>
        ))}
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        Tradução do Pe. Manuel de Matos Soares, a partir da Vulgata (Imprimatur, Lisboa, 1932). Texto em domínio público,
        digitalizado pelo projeto <a className="underline" href="https://github.com/bibliacatolica/biblia" target="_blank" rel="noreferrer">bibliacatolica/biblia</a>. Salmos na numeração da Vulgata.
      </p>
    </AppShell>
  );
}
