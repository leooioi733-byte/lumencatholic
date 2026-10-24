import { describe, expect, it } from "vitest";
import { EMPTY_PRAYER_STATE, moveRosary, readPrayerState, toggleFavorite } from "@/lib/prayer-state";
import type { RosarySession } from "@/lib/prayer-types";

const session: RosarySession = { mysteryId: "gozosos", includeFatima: true, index: 7, paused: false, completed: false };

describe("Prayer session", () => {
  it("marks and unmarks a favorite", () => {
    expect(toggleFavorite([], "pai-nosso")).toEqual(["pai-nosso"]);
    expect(toggleFavorite(["pai-nosso", "ave-maria"], "pai-nosso")).toEqual(["ave-maria"]);
  });
  it("allows advancing then returning to the same prayer", () => {
    const next = moveRosary(session, 1, 80);
    expect(next.index).toBe(8);
    expect(moveRosary(next, -1, 80).index).toBe(7);
  });
  it("does not advance while paused", () => {
    expect(moveRosary({ ...session, paused: true }, 1, 80).index).toBe(7);
  });
  it("keeps the position within the prayer sequence", () => {
    expect(moveRosary({ ...session, index: 0 }, -1, 80).index).toBe(0);
    expect(moveRosary({ ...session, index: 79 }, 1, 80).index).toBe(79);
  });
  it("restores prayer progress and favorites without learning data", () => {
    const saved = { favorites: ["pai-nosso"], textSize: 2, rosary: session };
    expect(readPrayerState(JSON.stringify(saved))).toEqual(saved);
    expect(Object.keys(readPrayerState(JSON.stringify(saved)))).toEqual(["favorites", "textSize", "rosary"]);
  });
  it("falls back safely for damaged session data", () => {
    expect(readPrayerState("not json")).toEqual(EMPTY_PRAYER_STATE);
    expect(readPrayerState(JSON.stringify({ rosary: { ...session, mysteryId: "invalid" } })).rosary).toBeNull();
  });
});