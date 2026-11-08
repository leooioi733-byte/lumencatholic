import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { BIBLE_PROGRESS_STORAGE_KEY, parseBibleProgress, setChapterRead, type BibleProgress } from "@/lib/bible-progress";

type BibleProgressValue = {
  progress: BibleProgress;
  ready: boolean;
  storageError: boolean;
  markRead: (slug: string, chapter: number, read: boolean) => void;
};
const EMPTY: BibleProgress = { readChapters: [] };
const Context = createContext<BibleProgressValue>({ progress: EMPTY, ready: false, storageError: false, markRead: () => {} });

export function BibleProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(EMPTY);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const current = useRef(EMPTY);
  useEffect(() => {
    try { current.current = parseBibleProgress(localStorage.getItem(BIBLE_PROGRESS_STORAGE_KEY)); }
    catch { setStorageError(true); }
    setProgress(current.current);
    setReady(true);
    const sync = (event: StorageEvent) => {
      if (event.key !== BIBLE_PROGRESS_STORAGE_KEY && event.key !== null) return;
      current.current = parseBibleProgress(event.newValue);
      setProgress(current.current);
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  const markRead = useCallback((slug: string, chapter: number, read: boolean) => {
    if (!ready) return;
    const next = setChapterRead(current.current, slug, chapter, read);
    current.current = next;
    setProgress(next);
    try { localStorage.setItem(BIBLE_PROGRESS_STORAGE_KEY, JSON.stringify(next)); setStorageError(false); }
    catch { setStorageError(true); }
  }, [ready]);
  return <Context.Provider value={{ progress, ready, storageError, markRead }}>{children}</Context.Provider>;
}

export function useBibleProgress() { return useContext(Context); }