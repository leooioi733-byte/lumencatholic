import { Check, Minus, Music2, Plus, Settings, Sparkles, Type, Volume2 } from "lucide-react";
import { useAudio } from "@/components/AudioProvider";
import { useSettings } from "@/components/SettingsProvider";
import { LumenButton } from "@/components/ui/lumen-button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { READING_SIZE_CLASSES, READING_SIZE_LABELS } from "@/lib/settings";
import { cn } from "@/lib/utils";

export function AppSettings() {
  const { settings, ready, updateSettings } = useSettings();
  const { preferences, toggleMusic, toggleEffects } = useAudio();

  return (
    <Dialog>
      <header className="mx-auto flex h-16 max-w-4xl items-center justify-end px-5" aria-label="Preferências do Lumen">
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <LumenButton variant="outline" aria-label="Abrir configurações" className="h-10 w-11 shrink-0 p-0">
                  <Settings className="h-5 w-5" aria-hidden="true" />
                </LumenButton>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>Configurações</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </header>
      <DialogContent className="settings-dialog max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md gap-0 overflow-y-auto rounded-3xl border-2 border-border bg-background p-5 sm:p-6">
        <DialogHeader className="pr-7 text-left">
          <DialogTitle className="font-display text-2xl font-semibold text-primary">Configurações</DialogTitle>
          <DialogDescription className="sr-only">Preferências de aparência, som e leitura do Lumen.</DialogDescription>
        </DialogHeader>

        <section className="mt-5" aria-labelledby="appearance-title">
          <h2 id="appearance-title" className="mb-3 text-sm font-semibold text-muted-foreground">Aparência</h2>
          <div role="group" aria-label="Aparência" className="grid grid-cols-2 gap-3">
            {([{ value: "cream", label: "Creme" }, { value: "burgundy", label: "Grená" }, { value: "black-yellow", label: "Preto e amarelo" }] as const).map(({ value, label }) => (
              <LumenButton key={value} variant="outline" data-sound="select" aria-pressed={settings.appearance === value}
                disabled={!ready} onClick={() => updateSettings({ appearance: value })}
                className={cn("h-auto flex-col gap-3 px-3 py-3 text-base normal-case", value === "black-yellow" && "col-span-2", settings.appearance === value && "border-gold")}>
                <span aria-hidden="true" className={cn("theme-preview", `theme-preview-${value}`)}>
                  <span className="theme-preview-heading" />
                  <span className="theme-preview-card"><span /><span /></span>
                  <span className="theme-preview-button" />
                </span>
                <span className="flex w-full items-center justify-between">{label}<Check aria-hidden="true" className={cn("h-4 w-4 text-gold", settings.appearance !== value && "invisible")} /></span>
              </LumenButton>
            ))}
          </div>
        </section>

        <section className="mt-6 border-t border-border pt-4" aria-labelledby="sound-title">
          <h2 id="sound-title" className="mb-1 text-sm font-semibold text-muted-foreground">Som</h2>
          <label htmlFor="settings-music" className="flex min-h-12 cursor-pointer items-center justify-between gap-3">
            <span className="flex items-center gap-3 font-bold"><Music2 aria-hidden="true" className="h-5 w-5 text-primary" />Música de fundo</span>
            <Switch id="settings-music" checked={preferences.music} onCheckedChange={toggleMusic} />
          </label>
          <label htmlFor="settings-effects" className="flex min-h-12 cursor-pointer items-center justify-between gap-3">
            <span className="flex items-center gap-3 font-bold"><Volume2 aria-hidden="true" className="h-5 w-5 text-primary" />Efeitos sonoros</span>
            <Switch id="settings-effects" checked={preferences.effects} onCheckedChange={toggleEffects} />
          </label>
        </section>

        <section className="mt-3 border-t border-border pt-4" aria-labelledby="reading-title">
          <h2 id="reading-title" className="mb-3 text-sm font-semibold text-muted-foreground">Leitura e movimento</h2>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="flex items-center gap-3 font-bold"><Type aria-hidden="true" className="h-5 w-5 text-primary" />Tamanho da letra</span>
            <div role="group" aria-label="Tamanho da letra" className="ml-auto flex shrink-0 items-center gap-2">
              <LumenButton variant="outline" aria-label="Diminuir letra" title="Diminuir letra" disabled={!ready || settings.textSize === 0}
                onClick={() => updateSettings({ textSize: settings.textSize - 1 })} className="h-10 w-10 p-0"><Minus className="h-4 w-4" /></LumenButton>
              <output className="w-6 text-center text-sm font-bold" aria-live="polite">{READING_SIZE_LABELS[settings.textSize]}</output>
              <LumenButton variant="outline" aria-label="Aumentar letra" title="Aumentar letra" disabled={!ready || settings.textSize === 4}
                onClick={() => updateSettings({ textSize: settings.textSize + 1 })} className="h-10 w-10 p-0"><Plus className="h-4 w-4" /></LumenButton>
            </div>
          </div>
          <p className={cn("mt-4 break-words rounded-2xl bg-card p-3 leading-relaxed text-card-foreground", READING_SIZE_CLASSES[settings.textSize])}>O Senhor é meu pastor.</p>
          <label htmlFor="settings-motion" className="mt-2 flex min-h-12 cursor-pointer items-center justify-between gap-3">
            <span className="flex items-center gap-3 font-bold"><Sparkles aria-hidden="true" className="h-5 w-5 shrink-0 text-primary" />Reduzir animações</span>
            <Switch id="settings-motion" disabled={!ready} checked={settings.reduceMotion} onCheckedChange={(reduceMotion) => updateSettings({ reduceMotion })} />
          </label>
        </section>
      </DialogContent>
    </Dialog>
  );
}