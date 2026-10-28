import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AudioProvider, useAudio } from "@/components/AudioProvider";
import { AudioControls } from "@/components/AudioControls";
import { LumenButton } from "@/components/ui/lumen-button";
import { AUDIO_STORAGE_KEY } from "@/lib/audio";

const engine = vi.hoisted(() => ({
  unlock: vi.fn(async () => true), setPreferences: vi.fn(), setHidden: vi.fn(),
  dispose: vi.fn(), play: vi.fn(async () => {}),
}));
vi.mock("@/lib/audio", async (importOriginal) => ({
  ...await importOriginal<typeof import("@/lib/audio")>(),
  LumenAudio: class {
    unlock = engine.unlock; setPreferences = engine.setPreferences;
    setHidden = engine.setHidden; dispose = engine.dispose; play = engine.play;
  },
}));

function Feedback() {
  const { play } = useAudio();
  return <>
    <LumenButton data-sound="select">Opção</LumenButton>
    <LumenButton data-sound="select" disabled>Indisponível</LumenButton>
    <LumenButton onClick={() => play("correct")}>Acerto</LumenButton>
    <LumenButton onClick={() => play("incorrect")}>Erro</LumenButton>
  </>;
}
const App = () => <AudioProvider><AudioControls /><Feedback /></AudioProvider>;

describe("controles e eventos de áudio", () => {
  beforeEach(() => { localStorage.clear(); vi.clearAllMocks(); });
  afterEach(cleanup);

  it("lembra separadamente as opções de música e efeitos depois de reabrir", () => {
    const view = render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Desligar música" }));
    expect(JSON.parse(localStorage.getItem(AUDIO_STORAGE_KEY) ?? "{}")).toEqual({ music: false, effects: true });
    view.unmount();
    render(<App />);
    expect(screen.getByRole("button", { name: "Ligar música" })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("button", { name: "Desligar efeitos sonoros" })).toHaveAttribute("aria-pressed", "true");
  });
  it("permite desligar apenas os efeitos mantendo a música", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Desligar efeitos sonoros" }));
    expect(engine.setPreferences).toHaveBeenLastCalledWith({ music: true, effects: false });
  });
  it("toca uma única seleção e não toca botões desabilitados", () => {
    const view = render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Opção" }));
    expect(engine.play).toHaveBeenCalledExactlyOnceWith("select");
    view.rerender(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Indisponível" }));
    expect(engine.play).toHaveBeenCalledTimes(1);
  });
  it("encaminha acerto e erro como efeitos diferentes", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Acerto" }));
    fireEvent.click(screen.getByRole("button", { name: "Erro" }));
    expect(engine.play.mock.calls).toEqual([["correct"], ["incorrect"]]);
  });
  it("não altera XP ou perfil ao mudar o som", () => {
    localStorage.setItem("lumen-progress", '{"xp":25,"completed":["biblia"]}');
    localStorage.setItem("lumen-profile", '{"nickname":"Teste"}');
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Desligar música" }));
    expect(localStorage.getItem("lumen-progress")).toBe('{"xp":25,"completed":["biblia"]}');
    expect(localStorage.getItem("lumen-profile")).toBe('{"nickname":"Teste"}');
  });
  it("remove os eventos e encerra o som ao desmontar", () => {
    const view = render(<App />);
    view.unmount();
    act(() => { document.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
    expect(engine.dispose).toHaveBeenCalledOnce();
    expect(engine.play).not.toHaveBeenCalled();
  });
});