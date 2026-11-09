import { getLessonUnit, LESSONS } from "@/lib/lessons";

export const MASCOT_OUTFITS = ["original", "pilgrim", "christmas"] as const;
export type MascotOutfit = typeof MASCOT_OUTFITS[number];
export const OUTFIT_LABELS: Record<MascotOutfit, string> = { original: "Original", pilgrim: "Peregrino", christmas: "Natal" };
export type MascotMoment = "home" | "welcome" | "lessonStart" | "correct" | "incorrect" | "lessonComplete" | "pathComplete" | "achievement" | "newUnit" | "prayers" | "bible" | "museum" | "account" | "path" | "library";
export type MascotEvent = { moment: MascotMoment; label?: string; special?: boolean; key?: string };
export const MASCOT_MESSAGES: Record<MascotMoment, readonly string[]> = {
  home: ["Que bom ter você aqui! Vamos dar mais um passo na fé?", "Cada pequeno passo conta. Estou com você!", "Hoje é um bom dia para aprender algo novo."],
  welcome: ["Bem-vindo ao Lumen! Que alegria caminhar com você."],
  lessonStart: ["Vamos ouvir o ensinamento com calma antes das perguntas.", "Um novo aprendizado começa. Vamos juntos!"],
  correct: ["Muito bem! Você compreendeu esse ensinamento.", "Isso mesmo! Mais um passo no aprendizado."],
  incorrect: ["Errar faz parte. Vamos ler a explicação com calma?", "Não desanime. Podemos aprender com esta resposta."],
  lessonComplete: ["Lição concluída! Que bom aprender com você.", "Mais uma lição na sua caminhada. Parabéns!"],
  pathComplete: ["Você concluiu todas as lições da trilha! Que esse aprendizado acompanhe sua vida."],
  achievement: ["Que alegria celebrar este passo na sua caminhada!", "Parabéns por essa conquista!"],
  newUnit: ["Uma nova unidade começa! Estou curioso para aprender com você."],
  prayers: ["Vamos rezar com calma, no seu ritmo.", "Este é um momento de encontro com Deus. Estou aqui em silêncio."],
  bible: ["Vamos acolher a Palavra de Deus com atenção.", "Uma leitura de cada vez, com calma e coração aberto."],
  museum: ["A história da Igreja tem muito a nos ensinar.", "Vamos conhecer as histórias por trás destas imagens?"],
  account: ["Sua caminhada é única. Que bom acompanhar seu progresso!", "Vamos deixar nosso cantinho do seu jeito?"],
  path: ["Cada unidade é mais um passo. Você pode seguir no seu ritmo.", "Vamos continuar aprendendo sobre a fé?"],
  library: ["Aqui podemos revisitar o que aprendemos e descobrir mais.", "Que assunto vamos conhecer hoje?"],
};

export function routeMascotMoment(pathname: string): MascotMoment {
  if (pathname.startsWith("/oracoes") || pathname.startsWith("/calendario")) return "prayers";
  if (pathname.startsWith("/licao/")) return "lessonStart";
  if (pathname.startsWith("/biblia")) return "bible";
  if (pathname.startsWith("/museu")) return "museum";
  if (pathname === "/perfil") return "account";
  if (pathname === "/trilha") return "path";
  if (pathname === "/biblioteca") return "library";
  return "home";
}

/** Presentation events only: never awards XP or writes learning progress. */
export function completionMascotEvent(completed: readonly string[], lessonId: string): MascotEvent {
  const known = new Set(completed);
  const first = !known.has(lessonId);
  known.add(lessonId);
  if (first && LESSONS.every((lesson) => known.has(lesson.id))) return { moment: "pathComplete", special: true };
  const unit = getLessonUnit(lessonId);
  if (first && unit?.lessons.every((lesson) => known.has(lesson.id))) return { moment: "achievement", label: unit.title, special: true };
  return { moment: "lessonComplete", special: true };
}

export type MascotRect = { x: number; y: number; width: number; height: number };
export function rectsOverlap(a: MascotRect, b: MascotRect, gap = 4) {
  return a.x < b.x + b.width + gap && a.x + a.width + gap > b.x && a.y < b.y + b.height + gap && a.y + a.height + gap > b.y;
}

/** Keep the right edge stable, moving only when actual page content needs the space. */
export function findMascotSlot(width: number, height: number, bottom: number, size: { width: number; height: number }, obstacles: MascotRect[]): MascotRect | null {
  const x = width - size.width - 12;
  for (let y = height - bottom - size.height; y >= 64; y -= 4) {
    const candidate = { x, y, ...size };
    if (x >= 0 && !obstacles.some((rect) => rectsOverlap(candidate, rect))) return candidate;
  }
  return null;
}