import { describe, expect, it } from "vitest";
import { LESSONS, UNITS, getLesson, getLessonUnit, lessonXp, nextLesson } from "@/lib/lessons";
import { applyCompletion } from "@/lib/progress";

describe("lições", () => {
  it("primeira lição é O que é a Bíblia?", () => {
    expect(nextLesson([])?.title).toBe("O que é a Bíblia?");
  });
  it("preserva as seis lições de fundamentos e inclui quatro novas unidades", () => {
    expect(UNITS).toHaveLength(5);
    expect(UNITS[0]?.lessons).toHaveLength(6);
    expect(UNITS.slice(1).map((unit) => unit.lessons.length)).toEqual([3, 3, 3, 3]);
    expect(LESSONS).toHaveLength(18);
  });
  it("continua na história da salvação depois dos fundamentos", () => {
    const foundation = UNITS[0];
    if (!foundation) throw new Error("Unidade inicial ausente");
    expect(nextLesson(foundation.lessons.map((l) => l.id))?.id).toBe("criacao");
    expect(getLessonUnit("criacao")?.id).toBe("historia");
  });
  it("permite abrir qualquer lição sem concluir as anteriores", () => {
    for (const lesson of LESSONS) {
      expect(getLesson(lesson.id)).toEqual(lesson);
    }
    expect(getLesson("maria-santos")?.id).toBe("maria-santos");
  });
  it("encerra a trilha apenas quando todas as lições foram concluídas", () => {
    expect(nextLesson(LESSONS.map((l) => l.id))).toBeNull();
    expect(nextLesson(LESSONS.slice(0, -1).map((l) => l.id))?.id).toBe("maria-santos");
  });
  it("usa IDs únicos e respostas válidas em todas as perguntas", () => {
    expect(new Set(LESSONS.map((l) => l.id)).size).toBe(18);
    for (const lesson of LESSONS) {
      expect(lesson.teachings.length).toBeGreaterThan(0);
      expect(lesson.questions.length).toBeGreaterThan(0);
      for (const question of lesson.questions) {
        expect(Number.isInteger(question.answer)).toBe(true);
        expect(question.answer).toBeGreaterThanOrEqual(0);
        expect(question.answer).toBeLessThan(question.options.length);
      }
    }
  });
  it("bônus de 5 XP sem erros", () => {
    const lesson = getLesson("biblia");
    if (!lesson) throw new Error("Lição inicial ausente");
    expect(lessonXp(lesson, 0)).toBe(25);
    expect(lessonXp(lesson, 1)).toBe(20);
  });
  it("concluir soma XP sem duplicar a lição", () => {
    const p = applyCompletion(applyCompletion({ xp: 0, completed: [] }, "biblia", 20), "biblia", 20);
    expect(p).toEqual({ xp: 40, completed: ["biblia"] });
  });
});
