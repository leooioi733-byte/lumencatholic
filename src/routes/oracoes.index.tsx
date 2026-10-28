import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { usePrayers } from "@/components/PrayerProvider";
import { FavoriteButton } from "@/components/PrayerReader";
import { PRAYERS } from "@/lib/prayers";
import { getMysterySet, mysteriesForDay } from "@/lib/rosary";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/oracoes/")({
  head: () => ({
    meta: [
      { title: "Orações — Lumen" },
      { name: "description", content: "Orações católicas tradicionais e o Terço guiado, sem cadastro." },
      { property: "og:title", content: "Orações — Lumen" },
      { property: "og:description", content: "Orações católicas tradicionais e o Terço guiado, sem cadastro." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Oracoes,
});

function Oracoes() {
  const { state } = usePrayers();
  const [onlyFav, setOnlyFav] = useState(false);
  const today = getMysterySet(mysteriesForDay(new Date().getDay()));
  const list = onlyFav ? PRAYERS.filter((p) => state.favorites.includes(p.id)) : PRAYERS;
  return (
    <AppShell>
      <h1 className="text-2xl font-bold text-primary">Orações</h1>
      <p className="mt-1 text-muted-foreground">Reze no seu ritmo, sem pressa e sem pontos.</p>

      <Link to="/oracoes/terco" className="btn-3d mt-6 block rounded-2xl bg-primary p-5 text-primary-foreground [--btn-depth:var(--primary-deep)]">
        <p className="text-xs font-bold uppercase tracking-wide text-gold">Terço guiado</p>
        <p className="mt-1 font-display text-xl font-semibold">{state.rosary && !state.rosary.completed ? "Continuar o terço" : "Rezar o terço"}</p>
        <p className="mt-1 text-sm opacity-90">Hoje: {today.title.toLowerCase()}</p>
      </Link>

      <div className="mt-8 flex items-center justify-between gap-2">
        <h2 className="text-xl font-semibold text-primary">Orações tradicionais</h2>
        <div className="flex rounded-full border-2 border-border bg-card p-1 text-sm font-bold">
          {[["Todas", false], ["Favoritas", true]].map(([label, fav]) => (
            <Button variant="ghost" key={String(label)} aria-pressed={onlyFav === fav} data-sound="select" onClick={() => setOnlyFav(fav as boolean)}
              className={cn("h-auto rounded-full px-3 py-1 transition", onlyFav === fav ? "bg-primary text-primary-foreground" : "text-muted-foreground")}>{label}</Button>
          ))}
        </div>
      </div>
      <ul className="mt-3 space-y-3">
        {list.map((p) => (
          <li key={p.id} className="flex items-center gap-2 rounded-2xl border-2 border-border bg-card p-2 pl-4">
            <Link to="/oracoes/$id" params={{ id: p.id }} className="flex min-h-11 flex-1 items-center justify-between font-display text-lg font-semibold text-primary">
              {p.title}<ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
            <FavoriteButton prayer={p} />
          </li>
        ))}
        {list.length === 0 && <li className="rounded-2xl border-2 border-dashed border-border p-5 text-center text-muted-foreground">Toque na estrela de uma oração para guardá-la aqui.</li>}
      </ul>
      <p className="mt-4 text-xs text-muted-foreground">Os favoritos ficam guardados enquanto esta aba estiver aberta.</p>
    </AppShell>
  );
}
