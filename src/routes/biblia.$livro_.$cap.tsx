import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useBibleProgress } from "@/components/BibleProgressProvider";
import { LumenButton } from "@/components/ui/lumen-button";
import { formatPercent, getReadingStats } from "@/lib/bible-progress";
import { TextSizeControls } from "@/components/PrayerReader";
import { useSettings } from "@/components/SettingsProvider";
import { READING_SIZE_CLASSES } from "@/lib/settings";
import { cn } from "@/lib/utils";
import { getBook } from "@/lib/bible-books";

type Chapters = Record<string, [number, string][]>;
const cache = new Map<string, Chapters>();

export const Route = createFileRoute("/biblia/$livro_/$cap")({
  loader: ({ params }) => {
    const book = getBook(params.livro);
    const cap = Number(params.cap);
    if (!book || !Number.isInteger(cap) || cap < 1 || cap > book.chapters) throw notFound();
    return { book, cap };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.book.name} ${loaderData.cap} — Bíblia — Lumen` : "Bíblia — Lumen";
    const d = loaderData ? `Leia ${loaderData.book.name}, capítulo ${loaderData.cap}, na Bíblia católica.` : "Bíblia Sagrada no Lumen.";
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t },
      { property: "og:description", content: d }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary" }] };
  },
  notFoundComponent: () => <AppShell><p>Capítulo não encontrado.</p><Link to="/biblia" className="underline">Voltar</Link></AppShell>,
  component: Capitulo,
});

function Capitulo() {
  const { book, cap } = Route.useLoaderData();
  const [data, setData] = useState<Chapters | null>(cache.get(book.slug) ?? null);
  const [error, setError] = useState(false);
  const { settings } = useSettings();
  const { progress, ready, storageError, markRead } = useBibleProgress();
  const read = progress.readChapters.includes(`${book.slug}:${cap}`);
  const stats = getReadingStats(progress, [book]);

  useEffect(() => {
    const cached = cache.get(book.slug);
    if (cached) { setData(cached); return; }
    setData(null); setError(false);
    fetch(`/biblia/${book.slug}.json`).then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((j: Chapters) => { cache.set(book.slug, j); setData(j); })
      .catch(() => setError(true));
  }, [book.slug]);

  useEffect(() => { window.scrollTo(0, 0); }, [book.slug, cap]);

  const verses = data?.[String(cap)] ?? [];
  const nav = "rounded-2xl border-2 border-border bg-card px-4 py-2 font-bold text-primary shadow-[0_3px_0_var(--color-border)] active:translate-y-0.5 active:shadow-none";
  return (
    <AppShell>
      <Link to="/biblia/$livro" params={{ livro: book.slug }} className="text-sm font-bold text-muted-foreground">← {book.name}</Link>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-primary">{book.name} {cap}</h1>
        <TextSizeControls />
      </div>
      <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
        {read && <CheckCircle2 className="h-4 w-4 shrink-0 text-success" aria-hidden="true" />}
        {read ? "Capítulo lido" : "Capítulo não marcado"} · {formatPercent(stats.percent)} de {book.name}
      </p>
      <article className={cn("mt-4 break-words rounded-2xl border-2 border-border bg-card p-5 leading-relaxed text-foreground", READING_SIZE_CLASSES[settings.textSize])}>
        {error ? <p>Não foi possível carregar este capítulo. Verifique a conexão e tente novamente.</p>
          : !data ? <p className="text-muted-foreground">Carregando…</p>
          : verses.map(([v, t]) => (
            <p key={v} className="mb-2"><sup className="mr-1 font-bold text-primary">{v}</sup>{t}</p>
          ))}
      </article>
      <div className="mt-5">
        <LumenButton variant={read ? "outline" : "gold"} className="gap-2 text-base normal-case"
          disabled={!ready || error || verses.length === 0} aria-pressed={read}
          onClick={() => markRead(book.slug, cap, !read)}>
          <Check className="h-5 w-5 shrink-0" aria-hidden="true" />{read ? "Desmarcar como lido" : "Marcar capítulo como lido"}
        </LumenButton>
        {storageError && <p role="status" className="mt-3 text-sm text-destructive">O aparelho não permitiu guardar a leitura; a marcação vale apenas nesta visita.</p>}
      </div>
      <div className="mt-5 flex justify-between gap-2">
        {cap > 1 ? <Link to="/biblia/$livro/$cap" params={{ livro: book.slug, cap: String(cap - 1) }} className={nav}>← Anterior</Link> : <span />}
        {cap < book.chapters && <Link to="/biblia/$livro/$cap" params={{ livro: book.slug, cap: String(cap + 1) }} className={nav}>Próximo →</Link>}
      </div>
    </AppShell>
  );
}
