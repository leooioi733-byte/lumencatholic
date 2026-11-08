import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Search } from "lucide-react";
import { useState } from "react";
import { AppShell, ProgressBar } from "@/components/AppShell";
import { useBibleProgress } from "@/components/BibleProgressProvider";
import { LumenButton } from "@/components/ui/lumen-button";
import { formatPercent, getReadingStats } from "@/lib/bible-progress";
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
  const { progress } = useBibleProgress();
  const reading = getReadingStats(progress);
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
      <section className="mt-6 border-y border-border py-4" aria-label="Seu progresso na Bíblia">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="font-semibold text-primary">Sua leitura</h2>
          <span className="font-display text-2xl font-semibold text-primary">{formatPercent(reading.percent)}</span>
        </div>
        <ProgressBar value={reading.percent} label="Bíblia lida" />
        <p className="mt-2 text-sm text-muted-foreground">{reading.read} de {reading.total} capítulos lidos · {reading.completedBooks} de 73 livros</p>
      </section>
      <label className="mt-5 flex items-center gap-2 rounded-2xl border-2 border-border bg-card px-4 py-3">
        <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar livro" aria-label="Buscar livro"
          className="w-full bg-transparent outline-none" />
      </label>
      {!q && (
        <div className="mt-3 grid grid-cols-2 gap-2">
          {(["AT", "NT"] as const).map((t) => (
            <LumenButton key={t} type="button" data-sound="select" onClick={() => setTab(t)} aria-pressed={tab === t}
              variant={tab === t ? "primary" : "outline"} className="px-2 py-3 font-sans text-sm normal-case">
              {t === "AT" ? "Antigo Testamento (46)" : "Novo Testamento (27)"}
            </LumenButton>
          ))}
        </div>
      )}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {books.map((b) => {
          const stats = reading.perBook.find((item) => item.book.slug === b.slug);
          const percent = stats?.percent ?? 0;
          return (
          <Link key={b.slug} to="/biblia/$livro" params={{ livro: b.slug }}
            className="min-w-0 rounded-2xl border-2 border-border bg-card p-3 transition active:scale-[0.98]">
            <span className="flex items-start gap-1 break-words font-display font-semibold text-primary">{b.name}{percent === 100 && <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-label="Livro lido" />}</span>
            <span className="text-xs text-muted-foreground">{b.abbrev} · {b.chapters} cap.</span>
            <div className="mt-3"><ProgressBar value={percent} label={`${b.name} lido`} /></div>
            <span className="mt-1 block text-xs font-bold text-primary">{formatPercent(percent)}</span>
          </Link>
        ); })}
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        Tradução do Pe. Manuel de Matos Soares, a partir da Vulgata (Imprimatur, Lisboa, 1932). Texto em domínio público,
        digitalizado pelo projeto <a className="underline" href="https://github.com/bibliacatolica/biblia" target="_blank" rel="noreferrer">bibliacatolica/biblia</a>. Salmos na numeração da Vulgata.
      </p>
    </AppShell>
  );
}
