import type { LucideIcon } from "lucide-react";

export type MuseumCategory = "devocoes" | "lugares" | "arte";

export interface MuseumExhibit {
  id: string;
  title: string;
  category: MuseumCategory;
  date: string;
  year: number;
  location: string;
  summary: string;
  paragraphs: string[];
  context: string;
  image: {
    url: string;
    alt: string;
    caption: string;
    author: string;
    license: string;
    sourceUrl: string;
    licenseUrl: string;
  };
  sources: { title: string; url: string }[];
}

export interface MuseumCategoryOption {
  id: MuseumCategory | "todos";
  label: string;
  icon: LucideIcon;
}