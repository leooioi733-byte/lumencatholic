import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { EMPTY_PRAYER_STATE, PRAYER_SESSION_KEY, readPrayerState, type PrayerState } from "@/lib/prayer-state";

const PrayerContext = createContext<{
  state: PrayerState;
  setState: Dispatch<SetStateAction<PrayerState>>;
  ready: boolean;
  storageUnavailable: boolean;
} | null>(null);

export function PrayerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PrayerState>(EMPTY_PRAYER_STATE);
  const [ready, setReady] = useState(false);
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  useEffect(() => {
    try { setState(readPrayerState(sessionStorage.getItem(PRAYER_SESSION_KEY))); }
    catch { setStorageUnavailable(true); }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { sessionStorage.setItem(PRAYER_SESSION_KEY, JSON.stringify(state)); }
    catch { setStorageUnavailable(true); }
  }, [state, ready]);
  return <PrayerContext.Provider value={{ state, setState, ready, storageUnavailable }}>{children}</PrayerContext.Provider>;
}

export function usePrayers() {
  const value = useContext(PrayerContext);
  if (!value) throw new Error("PrayerProvider is required");
  return value;
}