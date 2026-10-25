import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { FavoriteButton, PrayerText, TextSizeControls } from "@/components/PrayerReader";
import { getPrayer } from "@/lib/prayers";

export const Route = createFileRoute("/oracoes/$id")({
  loader: ({ params }) => {
    const prayer = getPrayer(params.id);
    if (!prayer) throw notFound();
    return { prayer };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.prayer.title} — Orações · Lumen` : "Oração não encontrada — Lumen";
    const description = loaderData ? `Reze a oração ${loaderData.prayer.title} com texto ampliável.` : "Esta oração não está disponível.";
    return { meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary" },
      ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
    ] };
  },
  notFoundComponent: () => (
    <AppShell><p className="text-muted-foreground">Oração não encontrada.</p>
      <Link to="/oracoes" className="mt-4 inline-block font-bold text-primary">Voltar às orações</Link></AppShell>
  ),
  component: PrayerPage,
});

function PrayerPage() {
  const { prayer } = Route.useLoaderData();
  return (
    <AppShell>
      <Link to="/oracoes" className="inline-flex min-h-11 items-center gap-2 font-bold text-muted-foreground"><ArrowLeft className="h-5 w-5" /> Orações</Link>
      <div className="mt-2 flex items-start justify-between gap-3">
        <h1 className="text-2xl font-bold text-primary">{prayer.title}</h1>
        <FavoriteButton prayer={prayer} />
      </div>
      <div className="mt-4"><TextSizeControls /></div>
      <article className="mt-5 rounded-3xl border-2 border-border bg-card p-5"><PrayerText text={prayer.text} /></article>
      <a href={prayer.source.url} target="_blank" rel="noreferrer" className="mt-4 block text-xs font-bold text-muted-foreground underline">Fonte: {prayer.source.label}</a>
    </AppShell>
  );
}
