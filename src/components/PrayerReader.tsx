import { Minus, Plus, Star } from "lucide-react";
import { LumenButton } from "@/components/ui/lumen-button";
import { usePrayers } from "@/components/PrayerProvider";
import { toggleFavorite } from "@/lib/prayer-state";
import type { Prayer } from "@/lib/prayer-types";
import { cn } from "@/lib/utils";

const TEXT_SIZES = ["text-lg", "text-xl", "text-2xl", "text-[28px]", "text-[32px]"];

export function TextSizeControls() {
  const { state, setState, ready } = usePrayers();
  return (
    <div role="group" aria-label="Tamanho do texto" className="flex items-center gap-2">
      <LumenButton variant="outline" title="Diminuir texto" aria-label="Diminuir texto" disabled={!ready || state.textSize === 0}
        onClick={() => setState((s) => ({ ...s, textSize: Math.max(0, s.textSize - 1) }))}
        className="h-11 w-11 shrink-0 p-0"><Minus className="h-4 w-4" /></LumenButton>
      <span aria-hidden="true" className="font-display text-lg text-primary">Aa</span>
      <LumenButton variant="outline" title="Aumentar texto" aria-label="Aumentar texto" disabled={!ready || state.textSize === 4}
        onClick={() => setState((s) => ({ ...s, textSize: Math.min(4, s.textSize + 1) }))}
        className="h-11 w-11 shrink-0 p-0"><Plus className="h-4 w-4" /></LumenButton>
    </div>
  );
}

export function FavoriteButton({ prayer }: { prayer: Prayer }) {
  const { state, setState, ready } = usePrayers();
  const favorite = state.favorites.includes(prayer.id);
  return <LumenButton variant={favorite ? "gold" : "outline"} title={favorite ? "Remover dos favoritos" : "Marcar como favorita"}
    aria-label={`${favorite ? "Remover dos favoritos" : "Favoritar"}: ${prayer.title}`} aria-pressed={favorite} disabled={!ready}
    onClick={() => setState((s) => ({ ...s, favorites: toggleFavorite(s.favorites, prayer.id) }))}
    className="h-11 w-11 shrink-0 p-0"><Star className={cn("h-5 w-5", favorite && "fill-current")} /></LumenButton>;
}

export function PrayerText({ text }: { text: string }) {
  const { state } = usePrayers();
  return <div className={cn("prayer-text space-y-5 font-sans leading-[1.8] text-foreground", TEXT_SIZES[state.textSize])}>
    {text.split("\n\n").map((paragraph, index) => <p key={index} className="whitespace-pre-line break-words">{paragraph}</p>)}
  </div>;
}