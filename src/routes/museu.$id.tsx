import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { MuseumImage } from "@/components/MuseumImage";
import { getExhibit } from "@/lib/museum";

export const Route = createFileRoute("/museu/$id")({
  loader: ({ params }) => {
    const exhibit = getExhibit(params.id);
    if (!exhibit) throw notFound();
    return exhibit;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Museu Católico` },
          { name: "description", content: loaderData.summary },
          { property: "og:title", content: `${loaderData.title} — Museu Católico` },
          { property: "og:description", content: loaderData.summary },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary" },
        ]
      : [{ title: "Peça não encontrada — Museu Católico" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <AppShell><p className="text-muted-foreground">Peça não encontrada.</p><Link to="/museu" className="font-bold text-primary">Voltar ao museu</Link></AppShell>
  ),
  component: Exhibit,
});

function Exhibit() {
  const ex = Route.useLoaderData();
  return (
    <AppShell wide>
      <Link to="/museu" className="text-sm font-bold text-muted-foreground">← Museu Católico</Link>
      <article className="mt-3 overflow-hidden rounded-2xl border-2 border-border bg-card">
        <figure>
          <MuseumImage exhibit={ex} eager />
          <figcaption className="px-4 pt-2 text-xs text-muted-foreground">
            {ex.image.caption} Foto: {ex.image.author} ·{" "}
            <a href={ex.image.licenseUrl} target="_blank" rel="noreferrer" className="underline">{ex.image.license}</a> ·{" "}
            <a href={ex.image.sourceUrl} target="_blank" rel="noreferrer" className="underline">original</a>
          </figcaption>
        </figure>
        <div className="space-y-3 p-4">
          <p className="text-xs font-bold text-muted-foreground">{ex.date} · {ex.location}</p>
          <h1 className="text-2xl font-bold text-primary">{ex.title}</h1>
          {ex.paragraphs.map((p) => <p key={p} className="leading-relaxed text-foreground">{p}</p>)}
          <p className="rounded-xl bg-muted p-3 text-sm text-foreground"><strong>Para entender bem:</strong> {ex.context}</p>
          <div>
            <h2 className="font-bold text-primary">Fontes</h2>
            <ul className="list-disc pl-5 text-sm">
              {ex.sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer" className="underline">{s.title}</a></li>)}
            </ul>
          </div>
        </div>
      </article>
    </AppShell>
  );
}
