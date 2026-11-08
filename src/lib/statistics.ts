import { LESSONS, UNITS } from "@/lib/lessons";
import { completionPercent } from "@/lib/bible-progress";

export function getLearningStats(completed: string[]) {
  const known = new Set(LESSONS.map((lesson) => lesson.id));
  const done = new Set(completed.filter((id) => known.has(id)));
  const perUnit = UNITS.map((unit) => {
    const read = unit.lessons.filter((lesson) => done.has(lesson.id)).length;
    return { unit, completed: read, total: unit.lessons.length, percent: completionPercent(read, unit.lessons.length) };
  });
  return { completed: done.size, total: LESSONS.length, percent: completionPercent(done.size, LESSONS.length), completedUnits: perUnit.filter((item) => item.completed === item.total).length, perUnit };
}