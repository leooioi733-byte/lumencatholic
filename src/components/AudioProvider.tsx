import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { AUDIO_STORAGE_KEY, DEFAULT_AUDIO_PREFERENCES, LumenAudio, parseAudioPreferences, type AudioPreferences, type SoundEffect } from "@/lib/audio";

type AudioValue = {
  preferences: AudioPreferences;
  toggleMusic: () => void;
  toggleEffects: () => void;
  play: (effect: SoundEffect) => void;
};
const AudioContext = createContext<AudioValue>({
  preferences: DEFAULT_AUDIO_PREFERENCES,
  toggleMusic: () => {},
  toggleEffects: () => {},
  play: () => {},
});

export function AudioProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState(DEFAULT_AUDIO_PREFERENCES);
  const current = useRef(DEFAULT_AUDIO_PREFERENCES);
  const engine = useRef<LumenAudio | null>(null);

  useEffect(() => {
    let saved = { ...DEFAULT_AUDIO_PREFERENCES };
    try { saved = parseAudioPreferences(localStorage.getItem(AUDIO_STORAGE_KEY)); } catch { /* Storage may be unavailable. */ }
    current.current = saved;
    setPreferences(saved);
    const audio = new LumenAudio(saved);
    engine.current = audio;
    audio.setHidden(document.hidden);

    const unlock = () => { void audio.unlock(); };
    const visibility = () => audio.setHidden(document.hidden);
    const selection = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const option = event.target.closest('[data-sound="select"]');
      if (!option || option.matches(':disabled, [aria-disabled="true"]')) return;
      void audio.play("select");
    };
    // Unlock from a real gesture; synthesized sound never starts during SSR/render.
    document.addEventListener("pointerdown", unlock, { passive: true });
    document.addEventListener("keydown", unlock);
    document.addEventListener("click", selection);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      document.removeEventListener("pointerdown", unlock);
      document.removeEventListener("keydown", unlock);
      document.removeEventListener("click", selection);
      document.removeEventListener("visibilitychange", visibility);
      audio.dispose();
      engine.current = null;
    };
  }, []);

  const toggle = useCallback((key: keyof AudioPreferences) => {
    const next = { ...current.current, [key]: !current.current[key] };
    current.current = next;
    setPreferences(next);
    engine.current?.setPreferences(next);
    void engine.current?.unlock();
    try { localStorage.setItem(AUDIO_STORAGE_KEY, JSON.stringify(next)); } catch { /* Session controls still work. */ }
  }, []);
  const play = useCallback((effect: SoundEffect) => { void engine.current?.play(effect); }, []);

  return <AudioContext.Provider value={{ preferences, toggleMusic: () => toggle("music"), toggleEffects: () => toggle("effects"), play }}>
    {children}
  </AudioContext.Provider>;
}

export function useAudio() { return useContext(AudioContext); }