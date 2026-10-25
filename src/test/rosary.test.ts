import { describe, expect, it } from "vitest";
import { PRAYER_TEXTS } from "@/lib/prayers";
import { buildRosary, mysteriesForDay } from "@/lib/rosary";

describe("Rosary sequence", () => {
  it("has 5 decades of 10 Hail Marys plus 3 opening ones", () => {
    const steps = buildRosary("gozosos", true, PRAYER_TEXTS);
    expect(steps.filter((s) => s.title.startsWith("Ave-Maria")).length).toBe(53);
    expect(steps.filter((s) => s.id.endsWith("fatima")).length).toBe(5);
    expect(steps.every((s) => s.text.length > 0)).toBe(true);
  });
  it("omits Fatima prayer when not chosen", () => {
    expect(buildRosary("gozosos", false, PRAYER_TEXTS).some((s) => s.id.endsWith("fatima"))).toBe(false);
  });
  it("starts with the Sign of the Cross and ends with it", () => {
    const steps = buildRosary("dolorosos", true, PRAYER_TEXTS);
    expect(steps[0]!.title).toBe("Sinal da Cruz");
    expect(steps.at(-1)!.title).toBe("Sinal da Cruz");
  });
  it("uses traditional weekday mysteries", () => {
    expect(mysteriesForDay(0)).toBe("gloriosos");
    expect(mysteriesForDay(4)).toBe("luminosos");
    expect(mysteriesForDay(5)).toBe("dolorosos");
  });
});
