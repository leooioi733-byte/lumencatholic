export type Onboarding = {
  source: string | null;
  level: string | null;
  sacraments: string[];
  topic: string | null;
  nickname: string;
};

export const emptyOnboarding: Onboarding = {
  source: null,
  level: null,
  sacraments: [],
  topic: null,
  nickname: "",
};

export const MIN_PASSWORD = 8;

export function isPasswordValid(pw: string) {
  return pw.length >= MIN_PASSWORD;
}

export function toggleItem(list: string[], item: string) {
  return list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
}
