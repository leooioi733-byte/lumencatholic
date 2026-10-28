import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_AUDIO_PREFERENCES, LumenAudio, parseAudioPreferences } from "@/lib/audio";

class FakeAudioContext {
  static instances: FakeAudioContext[] = [];
  state = "suspended";
  currentTime = 0;
  destination = {};
  oscillators: { frequency: { value: number }; stop: ReturnType<typeof vi.fn> }[] = [];
  resume = vi.fn(async () => { this.state = "running"; });
  suspend = vi.fn(async () => { this.state = "suspended"; });
  close = vi.fn(async () => { this.state = "closed"; });
  constructor() { FakeAudioContext.instances.push(this); }
  createGain() {
    return {
      gain: { value: 0, setValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
      connect: vi.fn(), disconnect: vi.fn(),
    };
  }
  createOscillator() {
    const oscillator = { type: "sine", frequency: { value: 0 }, connect: vi.fn(), disconnect: vi.fn(), start: vi.fn(), stop: vi.fn(), onended: null };
    this.oscillators.push(oscillator);
    return oscillator;
  }
}

describe("sons do Lumen", () => {
  let audio: LumenAudio;
  beforeEach(() => {
    vi.useFakeTimers();
    FakeAudioContext.instances = [];
    vi.stubGlobal("AudioContext", FakeAudioContext);
    audio = new LumenAudio(DEFAULT_AUDIO_PREFERENCES);
  });
  afterEach(() => { audio.dispose(); vi.useRealTimers(); vi.unstubAllGlobals(); });

  it("não cria áudio antes da primeira interação", () => {
    expect(FakeAudioContext.instances).toHaveLength(0);
  });
  it("inicia a música calma após desbloquear o áudio", async () => {
    await audio.unlock();
    expect(FakeAudioContext.instances[0]?.oscillators).toHaveLength(4);
    expect(FakeAudioContext.instances[0]?.state).toBe("running");
  });
  it.each([
    ["select", [880]],
    ["correct", [523.251, 659.255, 783.991]],
    ["incorrect", [329.628, 293.665]],
  ] as const)("toca um efeito distinto para %s", async (effect, expected) => {
    audio.setPreferences({ music: false, effects: true });
    await audio.play(effect);
    const notes = FakeAudioContext.instances[0]?.oscillators ?? [];
    expect(notes).toHaveLength(expected.length);
    notes.forEach((note, index) => expect(note.frequency.value).toBeCloseTo(expected[index] ?? 0, 2));
  });
  it("não toca os efeitos quando estão desligados", async () => {
    await audio.unlock();
    const context = FakeAudioContext.instances[0];
    const before = context?.oscillators.length;
    audio.setPreferences({ music: true, effects: false });
    await audio.play("correct");
    expect(context?.oscillators.length).toBe(before);
  });
  it("interrompe música e efeitos ao silenciar tudo", async () => {
    await audio.unlock();
    const context = FakeAudioContext.instances[0];
    audio.setPreferences({ music: false, effects: false });
    expect(context?.state).toBe("suspended");
    expect(context?.oscillators.every((note) => note.stop.mock.calls.length === 2)).toBe(true);
    const count = context?.oscillators.length;
    vi.advanceTimersByTime(4000);
    await audio.play("select");
    expect(context?.oscillators.length).toBe(count);
  });
  it("pausa quando a aba fica oculta e retoma quando volta", async () => {
    await audio.unlock();
    const context = FakeAudioContext.instances[0];
    audio.setHidden(true);
    expect(context?.state).toBe("suspended");
    const count = context?.oscillators.length ?? 0;
    vi.advanceTimersByTime(4000);
    expect(context?.oscillators.length).toBe(count);
    audio.setHidden(false);
    await Promise.resolve();
    expect(context?.state).toBe("running");
    expect(context?.oscillators.length).toBeGreaterThan(count);
  });
  it("libera o áudio ao sair e não reinicia uma sessão descartada", async () => {
    await audio.unlock();
    const context = FakeAudioContext.instances[0];
    audio.dispose();
    expect(context?.close).toHaveBeenCalledOnce();
    expect(await audio.unlock()).toBe(false);
  });
  it("recupera separadamente as preferências de música e efeitos", () => {
    expect(parseAudioPreferences('{"music":false,"effects":true}')).toEqual({ music: false, effects: true });
    expect(parseAudioPreferences('{"music":true,"effects":false}')).toEqual({ music: true, effects: false });
  });
  it("ignora preferências inválidas sem interromper o Lumen", () => {
    expect(parseAudioPreferences("invalid")).toEqual({ music: true, effects: true });
    expect(parseAudioPreferences('{"music":"false"}')).toEqual({ music: true, effects: true });
  });
});