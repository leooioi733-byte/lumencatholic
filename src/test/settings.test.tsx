import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { SettingsProvider, useSettings } from "@/components/SettingsProvider";
import { DEFAULT_APP_SETTINGS, SETTINGS_STORAGE_KEY, parseAppSettings } from "@/lib/settings";
import { LumenButton } from "@/components/ui/lumen-button";

function Preferences() {
  const { settings, updateSettings } = useSettings();
  return <>
    <output data-testid="settings">{JSON.stringify(settings)}</output>
    <LumenButton onClick={() => updateSettings({ appearance: "burgundy" })}>Grená</LumenButton>
    <LumenButton onClick={() => updateSettings({ appearance: "cream" })}>Creme</LumenButton>
    <LumenButton onClick={() => updateSettings({ textSize: 3 })}>Letra</LumenButton>
    <LumenButton onClick={() => updateSettings({ reduceMotion: true })}>Movimento</LumenButton>
  </>;
}
const App = () => <SettingsProvider><Preferences /></SettingsProvider>;

describe("preferências do aparelho", () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => {
    cleanup();
    delete document.documentElement.dataset.lumenTheme;
    delete document.documentElement.dataset.reduceMotion;
  });

  it("começa predominantemente creme", () => {
    expect(parseAppSettings(null).appearance).toBe("cream");
    render(<App />);
    expect(document.documentElement.dataset.lumenTheme).toBe("cream");
  });

  it("alterna entre creme e grená e lembra a escolha ao reabrir", () => {
    const view = render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Grená" }));
    expect(document.documentElement.dataset.lumenTheme).toBe("burgundy");
    expect(parseAppSettings(localStorage.getItem(SETTINGS_STORAGE_KEY)).appearance).toBe("burgundy");
    view.unmount();
    render(<App />);
    expect(document.documentElement.dataset.lumenTheme).toBe("burgundy");
    fireEvent.click(screen.getByRole("button", { name: "Creme" }));
    expect(document.documentElement.dataset.lumenTheme).toBe("cream");
  });

  it("não aceita uma terceira aparência ou preferências inválidas", () => {
    expect(parseAppSettings('{"appearance":"blue","textSize":"large","reduceMotion":"true"}')).toEqual(DEFAULT_APP_SETTINGS);
    expect(parseAppSettings("corrompido")).toEqual(DEFAULT_APP_SETTINGS);
    expect(parseAppSettings("[]")).toEqual(DEFAULT_APP_SETTINGS);
  });

  it("mantém o tamanho da letra entre os cinco tamanhos disponíveis", () => {
    expect(parseAppSettings('{"textSize":-1}').textSize).toBe(0);
    expect(parseAppSettings('{"textSize":20}').textSize).toBe(4);
    expect(parseAppSettings('{"textSize":1.5}').textSize).toBe(0);
  });

  it("lembra leitura e movimento sem alterar XP, perfil, som ou sessão de oração", () => {
    const preserved = { "lumen-progress": '{"xp":25}', "lumen-profile": '{"nickname":"Teste"}', "lumen-audio-preferences": '{"music":false,"effects":true}' };
    Object.entries(preserved).forEach(([key, value]) => localStorage.setItem(key, value));
    sessionStorage.setItem("lumen-prayer-session", '{"favorites":["pai-nosso"]}');
    const view = render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Letra" }));
    fireEvent.click(screen.getByRole("button", { name: "Movimento" }));
    expect(document.documentElement.dataset.reduceMotion).toBe("true");
    view.unmount();
    render(<App />);
    expect(JSON.parse(screen.getByTestId("settings").textContent ?? "{}")).toEqual({ appearance: "cream", textSize: 3, reduceMotion: true });
    Object.entries(preserved).forEach(([key, value]) => expect(localStorage.getItem(key)).toBe(value));
    expect(sessionStorage.getItem("lumen-prayer-session")).toBe('{"favorites":["pai-nosso"]}');
  });
});