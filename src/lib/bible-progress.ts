import { BIBLE_BOOKS, getBook, type BibleBook } from "@/lib/bible-books";

export type BibleProgress = { readChapters: string[] };
export const BIBLE_PROGRESS_STORAGE_KEY = "lumen-bible-progress";

function validKey(key: unknown): key is string {
  if (typeof key !== "string") return false;
  const [slug, number, extra] = key.split(":");
  const book = getBook(slug ?? "");
  const chapter = Number(number);
  return !!book && extra === undefined && String(chapter) === number
    && Number.isInteger(chapter) && chapter >= 1 && chapter <= book.chapters;
}

export function parseBibleProgress(raw: string | null): BibleProgress {
  try {
    const value: unknown = JSON.parse(raw ?? "null");
    if (!value || typeof value !== "object" || !("readChapters" in value) || !Array.isArray(value.readChapters)) return { readChapters: [] };
    return { readChapters: [...new Set(value.readChapters.filter(validKey))] };
  } catch { return { readChapters: [] }; }
}

export function setChapterRead(progress: BibleProgress, slug: string, chapter: number, read: boolean): BibleProgress {
  const key = `${slug}:${chapter}`;
  if (!validKey(key)) return progress;
  const clean = parseBibleProgress(JSON.stringify(progress));
  return { readChapters: read ? [...new Set([...clean.readChapters, key])] : clean.readChapters.filter((value) => value !== key) };
}

export function completionPercent(completed: number, total: number) {
  if (total <= 0) return 0;
  // Display the first chapter's progress, reserving 100% for true completion.
  const percent = Math.round(Math.max(0, Math.min(completed, total)) / total * 1000) / 10;
  return completed < total ? Math.min(99.9, percent) : percent;
}

export function getReadingStats(progress: BibleProgress, books: BibleBook[] = BIBLE_BOOKS) {
  const keys = new Set(progress.readChapters.filter(validKey));
  const perBook = books.map((book) => {
    let read = 0;
    for (let chapter = 1; chapter <= book.chapters; chapter++) if (keys.has(`${book.slug}:${chapter}`)) read++;
    return { book, read, total: book.chapters, percent: completionPercent(read, book.chapters) };
  });
  const read = perBook.reduce((sum, item) => sum + item.read, 0);
  const total = books.reduce((sum, book) => sum + book.chapters, 0);
  return { read, total, percent: completionPercent(read, total), completedBooks: perBook.filter((item) => item.read === item.total).length, perBook };
}

export function formatPercent(value: number) {
  return `${value.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`;
}