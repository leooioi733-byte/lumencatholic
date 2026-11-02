import { describe, expect, it } from "vitest";
import { filterMuseumExhibits } from "@/lib/museum-search";
import type { MuseumExhibit } from "@/lib/museum-types";

const photo = { url: "/foto.jpg", alt: "Foto", caption: "Foto", author: "Autor", license: "CC0", sourceUrl: "https://commons.wikimedia.org", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/" };
const exhibits: MuseumExhibit[] = [
  { id: "fatima", title: "Nossa Senhora de Fátima", category: "devocoes", date: "1917", year: 1917, location: "Fátima, Portugal", summary: "O santuário e a memória das aparições.", paragraphs: [], context: "", image: photo, sources: [] },
  { id: "pedro", title: "Basílica de São Pedro", category: "lugares", date: "1626", year: 1626, location: "Vaticano", summary: "Lugar de peregrinação.", paragraphs: [], context: "", image: photo, sources: [] },
];

describe("Museum search", () => {
  it("finds accent-insensitive terms in names and locations", () => {
    expect(filterMuseumExhibits(exhibits, "FATIMA portugal", "todos").map((item) => item.id)).toEqual(["fatima"]);
  });
  it("combines category with the search and returns no unrelated exhibits", () => {
    expect(filterMuseumExhibits(exhibits, "", "lugares").map((item) => item.id)).toEqual(["pedro"]);
    expect(filterMuseumExhibits(exhibits, "Fátima", "lugares")).toEqual([]);
  });
  it("returns the complete collection in its original order for an empty query", () => {
    expect(filterMuseumExhibits(exhibits, "   ", "todos").map((item) => item.id)).toEqual(["fatima", "pedro"]);
  });
});