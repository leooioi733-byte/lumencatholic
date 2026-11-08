import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { AppShell, ProgressBar } from "@/components/AppShell";
import { useBibleProgress } from "@/components/BibleProgressProvider";
import { formatPercent, getReadingStats } from "@/lib/bible-progress";
import { cn } from "@/lib/utils";
import { getBook } from "@/lib/bible-books";

export const Route = createFileRoute("/biblia/$livro")({
  loader: ({ params }) => {
    const book = getBook(params.livro);
    if (!book) throw notFound();
    return book;
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.name} — Bíblia — Lumen` : "Livro — Bíblia — Lumen";
    const d = loaderData ? `Leia o livro de ${loaderData.name} completo, capítulo por capítulo.` : "Bíblia Sagrada no Lumen.";
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t },
      { property: "og:description", content: d }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary" }] };
  },
  notFoundComponent: () => <AppShell><p>Livro não encontrado.</p><Link to="/biblia" className="underline">Voltar</Link></AppShell>,
  component: Livro,
});

function Livro() {
  const book = Route.useLoaderData();
  const { progress } = useBibleProgress();
  const stats = getReadingStats(progress, [book]);
  return (
    <AppShell>
      <Link to="/biblia" className="text-sm font-bold text-muted-foreground">← Bíblia</Link>
      <h1 className="mt-2 text-2xl font-bold text-primary">{book.name}</h1>
      <p className="mt-1 text-muted-foreground">Escolha o capítulo.</p>
      <div className="mt-5 border-y border-border py-4">
        <div className="mb-3 flex items-center justify-between gap-2 text-sm"><span>{stats.read} de {stats.total} capítulos lidos</span><span className="font-bold">{formatPercent(stats.percent)}</span></div>
        <ProgressBar value={stats.percent} label={`${book.name} lido`} />
      </div>
      <div className="mt-5 grid grid-cols-5 gap-2 sm:grid-cols-8">
        {Array.from({ length: book.chapters }, (_, i) => i + 1).map((c) => (
          <Link key={c} to="/biblia/$livro/$cap" params={{ livro: book.slug, cap: String(c) }}
            aria-label={`Capítulo ${c}${progress.readChapters.includes(`${book.slug}:${c}`) ? ", lido" : ""}`}
            className={cn("relative flex aspect-square items-center justify-center rounded-xl border-2 border-border bg-card font-bold text-primary shadow-[0_3px_0_var(--color-border)] transition active:translate-y-0.5 active:shadow-none", progress.readChapters.includes(`${book.slug}:${c}`) && "border-gold bg-accent")}>
            {c}
            {progress.readChapters.includes(`${book.slug}:${c}`) && <Check className="absolute right-0.5 top-0.5 h-3 w-3 text-primary" aria-hidden="true" />}
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
