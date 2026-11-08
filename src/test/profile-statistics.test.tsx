import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { LESSONS } from "@/lib/lessons";
import { getLearningStats } from "@/lib/statistics";
import { parseProfile, PROFILE_STORAGE_KEY, updatePersonalProfile } from "@/lib/profile";
import { useLocalProfile } from "@/hooks/use-local-profile";
import { LumenButton } from "@/components/ui/lumen-button";

describe("estatísticas da trilha", () => {
  it("usa lições distintas concluídas, nunca o XP", () => {
    expect(getLearningStats(["biblia", "biblia", "jesus", "credo", "id-inexistente"])).toMatchObject({ completed: 3, total: 30, percent: 10 });
    expect(getLearningStats([]).percent).toBe(0);
    expect(getLearningStats(LESSONS.map((lesson) => lesson.id)).percent).toBe(100);
  });
  it("a conclusão da unidade usa apenas as lições daquela unidade", () => {
    const stats = getLearningStats(["biblia", "jesus", "credo", "igreja", "oracao", "sacramentos"]);
    expect(stats.completedUnits).toBe(1);
    expect(stats.perUnit[0]?.percent).toBe(100);
    expect(stats.perUnit[1]?.percent).toBe(0);
  });
});

function Editor() {
  const { profile, saveProfile } = useLocalProfile();
  return <><output data-testid="profile">{JSON.stringify(profile)}</output><LumenButton onClick={() => saveProfile({ nickname: "  Maria  ", symbol: "church", topic: "Orações", level: "muito" })}>Salvar</LumenButton></>;
}
describe("personalização local da Conta", () => {
  beforeEach(() => localStorage.clear());
  afterEach(cleanup);
  it("restaura perfis antigos com símbolo padrão", () => {
    expect(parseProfile('{"nickname":"Ana","topic":"Bíblia"}')).toMatchObject({ nickname: "Ana", topic: "Bíblia", symbol: "cross" });
  });
  it("editar preferências preserva respostas anteriores sem bloquear assuntos", () => {
    const profile = parseProfile('{"nickname":"Ana","source":"Paróquia","sacraments":["Batismo"]}');
    const updated = updatePersonalProfile(profile, { nickname: "Maria", symbol: "heart", level: "zero", topic: "Jesus" });
    expect(updated).toMatchObject({ nickname: "Maria", source: "Paróquia", sacraments: ["Batismo"], symbol: "heart", topic: "Jesus" });
    expect(LESSONS).toHaveLength(30);
  });
  it("guarda apelido e símbolo sem alterar XP nem leitura", () => {
    localStorage.setItem(PROFILE_STORAGE_KEY, '{"nickname":"Ana","source":"Paróquia","sacraments":["Batismo"]}');
    localStorage.setItem("lumen-progress", '{"xp":25,"completed":["biblia"]}');
    localStorage.setItem("lumen-bible-progress", '{"readChapters":["joao:3"]}');
    const view = render(<Editor />);
    fireEvent.click(screen.getByRole("button", { name: "Salvar" }));
    view.unmount(); render(<Editor />);
    expect(JSON.parse(screen.getByTestId("profile").textContent ?? "{}")).toMatchObject({ nickname: "Maria", symbol: "church", topic: "Orações", source: "Paróquia", sacraments: ["Batismo"] });
    expect(localStorage.getItem("lumen-progress")).toBe('{"xp":25,"completed":["biblia"]}');
    expect(localStorage.getItem("lumen-bible-progress")).toBe('{"readChapters":["joao:3"]}');
  });
});