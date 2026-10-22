import { useCallback, useEffect, useState } from "react";

export type Progress = { xp: number; completed: string[] };
const KEY = "lumen-progress";

export function applyCompletion(p: Progress, id: string, xp: number): Progress {
  return {
    xp: p.xp + xp,
    completed: p.completed.includes(id) ? p.completed : [...p.completed, id],
  };
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>({ xp: 0, completed: [] });
  const [profile, setProfile] = useState<{ nickname?: string } | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setProgress(JSON.parse(raw));
      const pr = localStorage.getItem("lumen-profile");
      if (pr) setProfile(JSON.parse(pr));
    } catch {}
  }, []);
  const complete = useCallback((id: string, xp: number) => {
    setProgress((p) => {
      const n = applyCompletion(p, id, xp);
      localStorage.setItem(KEY, JSON.stringify(n));
      return n;
    });
  }, []);
  return { progress, profile, complete };
}
