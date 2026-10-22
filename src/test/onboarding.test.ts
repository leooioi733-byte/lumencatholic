import { describe, expect, it } from "vitest";
import { isPasswordValid, toggleItem } from "@/lib/onboarding";

describe("cadastro", () => {
  it("senha precisa de pelo menos 8 caracteres", () => {
    expect(isPasswordValid("1234567")).toBe(false);
    expect(isPasswordValid("12345678")).toBe(true);
  });
  it("sacramentos permitem seleção múltipla", () => {
    expect(toggleItem(toggleItem([], "Batismo"), "Crisma")).toEqual(["Batismo", "Crisma"]);
    expect(toggleItem(["Batismo"], "Batismo")).toEqual([]);
  });
});
