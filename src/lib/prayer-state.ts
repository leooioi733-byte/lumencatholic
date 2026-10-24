import type { MysteryId, RosarySession } from "./prayer-types";

export const PRAYER_SESSION_KEY = "lumen-prayer-session";
export const MYSTERY_IDS: MysteryId[] = ["gozosos", "luminosos", "dolorosos", "gloriosos"];
export type PrayerState = { favorites: string[]; textSize: number; rosary: RosarySession | null };
export const EMPTY_PRAYER_STATE: PrayerState = { favorites: [], textSize: 1, rosary: null };

export function toggleFavorite(favorites: string[], id: string) {
  return favorites.includes(id) ? favorites.filter((item) => item !== id) : [...favorites, id];
}

export function moveRosary(session: RosarySession, direction: -1 | 1, total: number): RosarySession {
  if (session.paused || total <= 0) return session;
  return {
    ...session,
    index: Math.max(0, Math.min(total - 1, session.index + direction)),
    completed: false,
  };
}

export function readPrayerState(raw: string | null): PrayerState {
  if (!raw) return EMPTY_PRAYER_STATE;
  try {
    const saved = JSON.parse(raw);
    const r = saved?.rosary;
    return {
      favorites: Array.isArray(saved?.favorites) ? [...new Set<string>(saved.favorites.filter((id: unknown) => typeof id === "string"))] : [],
      textSize: Number.isInteger(saved?.textSize) ? Math.max(0, Math.min(4, saved.textSize)) : 1,
      rosary: r && MYSTERY_IDS.includes(r.mysteryId) && typeof r.includeFatima === "boolean" && Number.isInteger(r.index) && r.index >= 0
        ? { mysteryId: r.mysteryId, includeFatima: r.includeFatima, index: r.index, paused: r.paused === true, completed: r.completed === true }
        : null,
    };
  } catch {
    return EMPTY_PRAYER_STATE;
  }
}