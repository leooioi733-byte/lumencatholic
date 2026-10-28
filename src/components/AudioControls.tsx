import { Music2, Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/components/AudioProvider";
import { LumenButton } from "@/components/ui/lumen-button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function AudioControls() {
  const { preferences, toggleMusic, toggleEffects } = useAudio();
  const musicLabel = preferences.music ? "Desligar música" : "Ligar música";
  const effectsLabel = preferences.effects ? "Desligar efeitos sonoros" : "Ligar efeitos sonoros";
  return (
    <TooltipProvider delayDuration={300}>
      <div role="group" aria-label="Sons do Lumen" className="mx-auto flex h-16 max-w-md items-center justify-end gap-3 px-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <LumenButton type="button" variant={preferences.music ? "gold" : "outline"}
              aria-label={musicLabel} aria-pressed={preferences.music} onClick={toggleMusic}
              className="h-10 w-11 shrink-0 p-0">
              <Music2 aria-hidden="true" className="h-5 w-5" />
            </LumenButton>
          </TooltipTrigger>
          <TooltipContent>{musicLabel}</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <LumenButton type="button" variant={preferences.effects ? "gold" : "outline"}
              aria-label={effectsLabel} aria-pressed={preferences.effects} onClick={toggleEffects}
              className="h-10 w-11 shrink-0 p-0">
              {preferences.effects ? <Volume2 aria-hidden="true" className="h-5 w-5" /> : <VolumeX aria-hidden="true" className="h-5 w-5" />}
            </LumenButton>
          </TooltipTrigger>
          <TooltipContent>{effectsLabel}</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}