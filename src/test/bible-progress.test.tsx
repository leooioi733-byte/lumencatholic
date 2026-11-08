import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { BIBLE_BOOKS, getBook } from "@/lib/bible-books";
import { BIBLE_PROGRESS_STORAGE_KEY, completionPercent, getReadingStats, parseBibleProgress, setChapterRead } from "@/lib/bible-progress";
import { BibleProgressProvider, useBibleProgress } from "@/components/BibleProgressProvider";
import { LumenButton } from "@/components/ui/lumen-button";

describe("porcentagens da Bíblia", () => {
  it("mede os capítulos dos 73 livros, incluindo os deuterocanônicos", () => {
    expect(BIBLE_BOOKS).toHaveLength(73);
    expect(getReadingStats({ readChapters: [] })).toMatchObject({ read: 0, total: 1334, percent: 0 });
    expect(getBook("tobias")?.chapters).toBe(14);
  });
  it("abrir o leitor não marca capítulos automaticamente", () => {
    localStorage.clear();
    render(<BibleProgressProvider><Tracker /></BibleProgressProvider>);
    expect(screen.getByTestId("read").textContent).toBe("0");
    expect(localStorage.getItem(BIBLE_PROGRESS_STORAGE_KEY)).toBeNull();
    cleanup();
  });
  it("marcar e desmarcar muda apenas um capítulo, sem duplicação", () => {
    const read = setChapterRead({ readChapters: [] }, "joao", 3, true);
    expect(read.readChapters).toEqual(["joao:3"]);
    expect(setChapterRead(read, "joao", 3, true)).toEqual(read);
    expect(setChapterRead(read, "joao", 3, false).readChapters).toEqual([]);
  });
  it("descarta capítulos inexistentes e duplicados na leitura salva", () => {
    const progress = parseBibleProgress(JSON.stringify({ readChapters: ["joao:3", "joao:3", "joao:22", "joao:0", "joao:03", "joao:1.5", "inventado:1", "joao:3:4", null] }));
    expect(progress.readChapters).toEqual(["joao:3"]);
    expect(setChapterRead(progress, "joao", 22, true)).toEqual(progress);
    expect(parseBibleProgress("quebrado")).toEqual({ readChapters: [] });
  });
  it("calcula por livro e por testamento sem misturar capítulos", () => {
    const book = getBook("joao");
    if (!book) throw new Error("João ausente");
    const progress = { readChapters: ["joao:3", "genesis:1"] };
    expect(getReadingStats(progress, [book])).toMatchObject({ read: 1, total: 21, percent: 4.7 });
    expect(getReadingStats(progress, BIBLE_BOOKS.filter((b) => b.testament === "NT"))).toMatchObject({ read: 1, total: 260, percent: 0.3 });
  });
  it("100% exige todos os capítulos distintos marcados", () => {
    const all = BIBLE_BOOKS.flatMap((book) => Array.from({ length: book.chapters }, (_, i) => `${book.slug}:${i + 1}`));
    expect(getReadingStats({ readChapters: all })).toMatchObject({ percent: 100, completedBooks: 73 });
    expect(getReadingStats({ readChapters: all.slice(0, -1) }).percent).toBe(99.9);
    expect(completionPercent(0, 0)).toBe(0);
  });
});

function Tracker() {
  const { progress, markRead } = useBibleProgress();
  return <><output data-testid="read">{progress.readChapters.length}</output><LumenButton onClick={() => markRead("joao", 3, true)}>Lido</LumenButton></>;
}

describe("leitura guardada no aparelho", () => {
  beforeEach(() => { localStorage.clear(); sessionStorage.clear(); });
  afterEach(cleanup);
  it("restaura a leitura sem alterar XP, perfil, preferências ou orações", () => {
    const preserved = { "lumen-progress": '{"xp":25,"completed":["biblia"]}', "lumen-profile": '{"nickname":"Ana"}', "lumen-device-settings": '{"appearance":"burgundy"}' };
    Object.entries(preserved).forEach(([key, value]) => localStorage.setItem(key, value));
    sessionStorage.setItem("lumen-prayer-session", "preservado");
    const view = render(<BibleProgressProvider><Tracker /></BibleProgressProvider>);
    fireEvent.click(screen.getByRole("button", { name: "Lido" }));
    expect(parseBibleProgress(localStorage.getItem(BIBLE_PROGRESS_STORAGE_KEY)).readChapters).toEqual(["joao:3"]);
    view.unmount();
    render(<BibleProgressProvider><Tracker /></BibleProgressProvider>);
    expect(screen.getByTestId("read").textContent).toBe("1");
    Object.entries(preserved).forEach(([key, value]) => expect(localStorage.getItem(key)).toBe(value));
    expect(sessionStorage.getItem("lumen-prayer-session")).toBe("preservado");
  });
});