import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { DEFAULT_APP_SETTINGS, SETTINGS_STORAGE_KEY, parseAppSettings, type AppSettings } from "@/lib/settings";

type SettingsValue = {
  settings: AppSettings;
  ready: boolean;
  updateSettings: (patch: Partial<AppSettings>) => void;
};

const SettingsContext = createContext<SettingsValue>({
  settings: DEFAULT_APP_SETTINGS,
  ready: false,
  updateSettings: () => {},
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState(DEFAULT_APP_SETTINGS);
  const [ready, setReady] = useState(false);
  const current = useRef(DEFAULT_APP_SETTINGS);

  useEffect(() => {
    let saved = { ...DEFAULT_APP_SETTINGS };
    try { saved = parseAppSettings(localStorage.getItem(SETTINGS_STORAGE_KEY)); } catch { /* Device storage is optional. */ }
    current.current = saved;
    setSettings(saved);
    setReady(true);
    const sync = (event: StorageEvent) => {
      if (event.key !== SETTINGS_STORAGE_KEY) return;
      const next = parseAppSettings(event.newValue);
      current.current = next;
      setSettings(next);
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  useEffect(() => {
    document.documentElement.dataset['lumenTheme'] = settings.appearance;
    document.documentElement.dataset['reduceMotion'] = String(settings.reduceMotion);
  }, [settings.appearance, settings.reduceMotion]);

  const updateSettings = useCallback((patch: Partial<AppSettings>) => {
    const next = parseAppSettings(JSON.stringify({ ...current.current, ...patch }));
    current.current = next;
    setSettings(next);
    try { localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(next)); } catch { /* Controls still work for this visit. */ }
  }, []);

  return <SettingsContext.Provider value={{ settings, ready, updateSettings }}>{children}</SettingsContext.Provider>;
}

export function useSettings() { return useContext(SettingsContext); }