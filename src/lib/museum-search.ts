import type { MuseumCategory, MuseumExhibit } from "./museum-types";

function normalize(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
}

export function filterMuseumExhibits(
  exhibits: readonly MuseumExhibit[],
  query: string,
  category: MuseumCategory | "todos",
): MuseumExhibit[] {
  const words = normalize(query.trim()).split(/\s+/).filter(Boolean);
  return exhibits.filter((exhibit) => {
    if (category !== "todos" && exhibit.category !== category) return false;
    const searchable = normalize(`${exhibit.title} ${exhibit.date} ${exhibit.location} ${exhibit.summary}`);
    return words.every((word) => searchable.includes(word));
  });
}