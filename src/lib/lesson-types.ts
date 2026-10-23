export type Teaching = { title: string; text: string; source: string };
export type Question = { prompt: string; options: string[]; answer: number; explanation: string };
export type Lesson = { id: string; title: string; emoji: string; xp: number; teachings: Teaching[]; questions: Question[] };
export type LessonUnit = { id: string; title: string; emoji: string; lessons: Lesson[] };