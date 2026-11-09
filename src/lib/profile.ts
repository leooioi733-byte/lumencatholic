import { emptyOnboarding, type Onboarding } from "@/lib/onboarding";
import { MASCOT_OUTFITS, type MascotOutfit } from "@/lib/mascot";

export const PROFILE_STORAGE_KEY = "lumen-profile";
export const PROFILE_SYMBOLS = ["cross", "book", "heart", "church", "sun", "flower"] as const;
export type ProfileSymbol = typeof PROFILE_SYMBOLS[number];
export type Profile = Onboarding & { symbol: ProfileSymbol; mascotOutfit: MascotOutfit };
export const PROFILE_CHANGED_EVENT = "lumen-profile-changed";
export const PROFILE_LEVELS = [
  { id: "zero", label: "Estou começando agora" },
  { id: "pouco", label: "Conheço um pouco" },
  { id: "bem", label: "Conheço bem" },
  { id: "muito", label: "Quero me aprofundar" },
] as const;
export const PROFILE_TOPICS = ["Bíblia", "Jesus", "Sacramentos", "Orações", "Igreja", "Começar do zero"] as const;

export function parseProfile(raw: string | null): Profile {
  const fallback = { ...emptyOnboarding, sacraments: [], symbol: "cross" as const, mascotOutfit: "original" as const };
  try {
    const value: unknown = JSON.parse(raw ?? "null");
    if (!value || typeof value !== "object" || Array.isArray(value)) return fallback;
    const data = value as Record<string, unknown>;
    return {
      nickname: typeof data['nickname'] === "string" ? data['nickname'] : "",
      source: typeof data['source'] === "string" ? data['source'] : null,
      level: PROFILE_LEVELS.some((level) => level.id === data['level']) ? data['level'] as string : null,
      topic: PROFILE_TOPICS.some((topic) => topic === data['topic']) ? data['topic'] as string : null,
      sacraments: Array.isArray(data['sacraments']) ? data['sacraments'].filter((value): value is string => typeof value === "string") : [],
      symbol: PROFILE_SYMBOLS.some((symbol) => symbol === data['symbol']) ? data['symbol'] as ProfileSymbol : "cross",
      mascotOutfit: MASCOT_OUTFITS.some((outfit) => outfit === data['mascotOutfit']) ? data['mascotOutfit'] as MascotOutfit : "original",
    };
  } catch { return fallback; }
}

export type ProfileEdit = Pick<Profile, "nickname" | "symbol" | "level" | "topic"> & Partial<Pick<Profile, "mascotOutfit">>;
export function updatePersonalProfile(profile: Profile, patch: ProfileEdit): Profile {
  return parseProfile(JSON.stringify({ ...profile, ...patch, nickname: patch.nickname.trim() }));
}