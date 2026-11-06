import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
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
  return (
    <AppShell>
      <Link to="/biblia" className="text-sm font-bold text-muted-foreground">← Bíblia</Link>
      <h1 className="mt-2 text-2xl font-bold text-primary">{book.name}</h1>
      <p className="mt-1 text-muted-foreground">Escolha o capítulo.</p>
      <div className="mt-5 grid grid-cols-5 gap-2 sm:grid-cols-8">
        {Array.from({ length: book.chapters }, (_, i) => i + 1).map((c) => (
          <Link key={c} to="/biblia/$livro/$cap" params={{ livro: book.slug, cap: String(c) }}
            className="flex aspect-square items-center justify-center rounded-xl border-2 border-border bg-card font-bold text-primary shadow-[0_3px_0_var(--color-border)] transition active:translate-y-0.5 active:shadow-none">
            {c}
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
