import { describe, expect, it } from "vitest";
import { celebrationsFor, easter, seasonOf } from "@/lib/liturgical-calendar";

describe("calendário litúrgico", () => {
  it("calcula a Páscoa", () => {
    expect(easter(2026).toISOString().slice(0, 10)).toBe("2026-04-05");
    expect(easter(2025).toISOString().slice(0, 10)).toBe("2025-04-20");
  });
  it("12 de outubro é Nossa Senhora Aparecida", () => {
    expect(celebrationsFor(2026, 9, 12)[0]?.name).toMatch(/Aparecida/);
  });
  it("Todos os Santos vai para o domingo no Brasil", () => {
    expect(celebrationsFor(2026, 10, 1)[0]?.name).toBe("Todos os Santos");
    expect(celebrationsFor(2027, 10, 7)[0]?.name).toBe("Todos os Santos");
    expect(celebrationsFor(2027, 10, 1)).toHaveLength(0);
  });
  it("Cinzas 2026 abre a Quaresma", () => {
    expect(celebrationsFor(2026, 1, 18)[0]?.name).toBe("Quarta-feira de Cinzas");
    expect(seasonOf(new Date(Date.UTC(2026, 2, 1)))).toBe("Quaresma");
    expect(seasonOf(new Date(Date.UTC(2026, 11, 1)))).toBe("Advento");
  });
});
