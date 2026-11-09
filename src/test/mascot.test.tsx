import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { LESSONS, UNITS } from "@/lib/lessons";
import { completionMascotEvent, findMascotSlot, MASCOT_MESSAGES, rectsOverlap, routeMascotMoment } from "@/lib/mascot";
import { parseProfile, PROFILE_STORAGE_KEY } from "@/lib/profile";
import { useLocalProfile } from "@/hooks/use-local-profile";
import { LumenButton } from "@/components/ui/lumen-button";

describe("règles du compagnon global", () => {
  it("réserve le contexte de prière sans célébration ni XP", () => {
    expect(routeMascotMoment("/oracoes/terco")).toBe("prayers");
    expect(routeMascotMoment("/licao/biblia")).toBe("lessonStart");
    for (const moment of ["home", "lessonStart", "correct", "incorrect", "lessonComplete", "pathComplete", "achievement", "prayers"] as const) expect(MASCOT_MESSAGES[moment].length).toBeGreaterThan(0);
  });
  it("célèbre une leçon normale sans modifier les entrées", () => {
    const completed = ["jesus"];
    expect(completionMascotEvent(completed, "biblia")).toEqual({ moment: "lessonComplete", special: true });
    expect(completed).toEqual(["jesus"]);
  });
  it("célèbre une unité réellement complète une seule fois", () => {
    const unit = UNITS[0];
    if (!unit) throw new Error("Missing foundational unit");
    const ids = unit.lessons.map((lesson) => lesson.id);
    const last = ids.at(-1);
    if (!last) throw new Error("Missing last lesson");
    expect(completionMascotEvent(ids.slice(0, -1), last).moment).toBe("achievement");
    expect(completionMascotEvent(ids, last).moment).toBe("lessonComplete");
  });
  it("célèbre la fin de la trilha seulement à sa première conclusion", () => {
    const ids = LESSONS.map((lesson) => lesson.id);
    const last = ids.at(-1);
    if (!last) throw new Error("Missing last lesson");
    expect(completionMascotEvent(ids.slice(0, -1), last).moment).toBe("pathComplete");
    expect(completionMascotEvent(ids, last).moment).toBe("lessonComplete");
  });
  it("place le compagnon à droite au-dessus de la navigation sans couvrir un contrôle", () => {
    const obstacle = { x: 200, y: 600, width: 108, height: 60 };
    const slot = findMascotSlot(320, 740, 80, { width: 56, height: 68 }, [obstacle]);
    if (!slot) throw new Error("Expected free slot");
    expect(slot.x).toBe(252);
    expect(slot.y + slot.height).toBeLessThanOrEqual(660);
    expect(rectsOverlap(slot, obstacle)).toBe(false);
  });
  it("refuse de masquer le contenu si aucun espace n'est libre", () => {
    expect(findMascotSlot(320, 640, 80, { width: 56, height: 68 }, [{ x: 0, y: 0, width: 320, height: 640 }])).toBeNull();
  });
});

function OutfitEditor() {
  const { profile, saveProfile } = useLocalProfile();
  return <><output data-testid="editor-outfit">{profile.mascotOutfit}</output><LumenButton onClick={() => saveProfile({ nickname: "Ana", symbol: "heart", level: null, topic: "Orações", mascotOutfit: "christmas" })}>Salvar roupa</LumenButton></>;
}
function CompanionProfile() { const { profile } = useLocalProfile(); return <output data-testid="companion-outfit">{profile.mascotOutfit}</output>; }
describe("roupa persistente na Conta", () => {
  beforeEach(() => localStorage.clear());
  afterEach(cleanup);
  it("mantém o visual oficial nos perfis antigos e recusa roupas desconhecidas", () => {
    expect(parseProfile('{"nickname":"Ana"}').mascotOutfit).toBe("original");
    expect(parseProfile('{"mascotOutfit":"unknown"}').mascotOutfit).toBe("original");
  });
  it("sincroniza a roupa na navegação e ao reabrir, sem mudar lições nem XP", () => {
    localStorage.setItem(PROFILE_STORAGE_KEY, '{"nickname":"Ana","source":"Paróquia","sacraments":["Batismo"]}');
    localStorage.setItem("lumen-progress", '{"xp":25,"completed":["biblia"]}');
    localStorage.setItem("lumen-bible-progress", '{"readChapters":["joao:3"]}');
    const view = render(<><OutfitEditor /><CompanionProfile /></>);
    fireEvent.click(screen.getByRole("button", { name: "Salvar roupa" }));
    expect(screen.getByTestId("companion-outfit")).toHaveTextContent("christmas");
    view.unmount(); render(<CompanionProfile />);
    expect(screen.getByTestId("companion-outfit")).toHaveTextContent("christmas");
    expect(parseProfile(localStorage.getItem(PROFILE_STORAGE_KEY))).toMatchObject({ source: "Paróquia", sacraments: ["Batismo"], mascotOutfit: "christmas" });
    expect(localStorage.getItem("lumen-progress")).toBe('{"xp":25,"completed":["biblia"]}');
    expect(localStorage.getItem("lumen-bible-progress")).toBe('{"readChapters":["joao:3"]}');
  });
});