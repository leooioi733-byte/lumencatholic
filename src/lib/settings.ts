export type Appearance = "cream" | "burgundy" | "black-yellow" | "christmas";
export const APPEARANCE_OPTIONS = [
  { value: "cream", label: "Creme" },
  { value: "burgundy", label: "Grená" },
  { value: "black-yellow", label: "Preto e amarelo" },
  { value: "christmas", label: "Tema Natalino" },
] as const;

export type AppSettings = {
  appearance: Appearance;
  textSize: number;
  reduceMotion: boolean;
};

export const SETTINGS_STORAGE_KEY = "lumen-device-settings";
export const DEFAULT_APP_SETTINGS: AppSettings = {
  appearance: "cream",
  textSize: 0,
  reduceMotion: false,
};
export const READING_SIZE_CLASSES = ["text-lg", "text-xl", "text-2xl", "text-[28px]", "text-[32px]"] as const;
export const READING_SIZE_LABELS = ["18", "20", "24", "28", "32"] as const;

export function parseAppSettings(raw: string | null): AppSettings {
  if (!raw) return { ...DEFAULT_APP_SETTINGS };
  try {
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== "object" || Array.isArray(data)) return { ...DEFAULT_APP_SETTINGS };
    const value = data as Record<string, unknown>;
    return {
      appearance: value['appearance'] === "burgundy" || value['appearance'] === "black-yellow" || value['appearance'] === "christmas" ? value['appearance'] : "cream",
      textSize: typeof value['textSize'] === "number" && Number.isInteger(value['textSize'])
        ? Math.max(0, Math.min(4, value['textSize'])) : 0,
      reduceMotion: value['reduceMotion'] === true,
    };
  } catch {
    return { ...DEFAULT_APP_SETTINGS };
  }
}