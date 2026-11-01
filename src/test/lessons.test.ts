import { describe, expect, it } from "vitest";
import { LESSONS, UNITS, getLesson, getLessonUnit, lessonXp, nextLesson } from "@/lib/lessons";
import { applyCompletion } from "@/lib/progress";

describe("lições", () => {
  it("primeira lição é O que é a Bíblia?", () => {
    expect(nextLesson([])?.title).toBe("O que é a Bíblia?");
  });
  it("preserva as unidades anteriores e acrescenta quatro unidades de três lições", () => {
    expect(UNITS).toHaveLength(9);
    expect(UNITS[0]?.lessons).toHaveLength(6);
    expect(UNITS.slice(1).map((unit) => unit.lessons.length)).toEqual([3, 3, 3, 3, 3, 3, 3, 3]);
    expect(LESSONS).toHaveLength(30);
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
    expect(getLesson("vida-eterna")?.id).toBe("vida-eterna");
  });
  it("preserva os IDs e a ordem das 18 lições já existentes", () => {
    expect(LESSONS.slice(0, 18).map((lesson) => lesson.id)).toEqual([
      "biblia", "jesus", "credo", "igreja", "oracao", "sacramentos",
      "criacao", "exodo", "evangelhos", "batismo", "eucaristia", "reconciliacao",
      "mandamentos", "bem-aventurancas", "caridade", "missa", "ano-liturgico", "maria-santos",
    ]);
  });
  it("continua nas novas unidades com o progresso anterior intacto", () => {
    const completed = LESSONS.slice(0, 18).map((lesson) => lesson.id);
    expect(nextLesson(completed)?.id).toBe("trindade");
    expect(getLessonUnit("trindade")?.id).toBe("vida-no-espirito");
    expect(completed).toHaveLength(18);
  });
  it("oferece ensinamentos antes das perguntas nas 12 novas lições, com fontes bíblicas e do Catecismo", () => {
    const added = LESSONS.slice(18);
    expect(added).toHaveLength(12);
    for (const lesson of added) {
      expect(lesson.teachings).toHaveLength(3);
      expect(lesson.questions).toHaveLength(3);
      for (const teaching of lesson.teachings) {
        expect(teaching.source).toMatch(/CIC \d+/);
        expect(teaching.source).toMatch(/^[1-3]?[A-Z][a-z]+ \d+,\d+/);
      }
      for (const question of lesson.questions) {
        expect(question.options).toHaveLength(4);
        expect(new Set(question.options).size).toBe(4);
        expect(question.explanation).toMatch(/CIC \d+/);
      }
    }
  });
  it("encerra a trilha apenas quando todas as lições foram concluídas", () => {
    expect(nextLesson(LESSONS.map((l) => l.id))).toBeNull();
    expect(nextLesson(LESSONS.slice(0, -1).map((l) => l.id))?.id).toBe("vida-eterna");
  });
  it("usa IDs únicos e respostas válidas em todas as perguntas", () => {
    expect(new Set(LESSONS.map((l) => l.id)).size).toBe(30);
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
  it("mantém 20 XP e o bônus de 5 XP nas novas lições", () => {
    for (const lesson of LESSONS.slice(18)) {
      expect(lessonXp(lesson, 0)).toBe(25);
      expect(lessonXp(lesson, 1)).toBe(20);
    }
  });
  it("concluir soma XP sem duplicar a lição", () => {
    const p = applyCompletion(applyCompletion({ xp: 0, completed: [] }, "biblia", 20), "biblia", 20);
    expect(p).toEqual({ xp: 40, completed: ["biblia"] });
  });
});
