import { describe, expect, it } from "vitest";
import { LESSONS, lessonXp, nextLesson } from "@/lib/lessons";
import { applyCompletion } from "@/lib/progress";

describe("lições", () => {
  it("primeira lição é O que é a Bíblia?", () => {
    expect(nextLesson([])?.title).toBe("O que é a Bíblia?");
  });
  it("seis lições na unidade", () => expect(LESSONS).toHaveLength(6));
  it("bônus de 5 XP sem erros", () => {
    expect(lessonXp(LESSONS[0], 0)).toBe(25);
    expect(lessonXp(LESSONS[0], 1)).toBe(20);
  });
  it("concluir soma XP sem duplicar a lição", () => {
    const p = applyCompletion(applyCompletion({ xp: 0, completed: [] }, "biblia", 20), "biblia", 20);
    expect(p).toEqual({ xp: 40, completed: ["biblia"] });
  });
});
