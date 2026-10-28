export type SoundEffect = "select" | "correct" | "incorrect";
export type AudioPreferences = { music: boolean; effects: boolean };

export const AUDIO_STORAGE_KEY = "lumen-audio";
export const DEFAULT_AUDIO_PREFERENCES: AudioPreferences = { music: true, effects: true };

export function parseAudioPreferences(raw: string | null): AudioPreferences {
  try {
    const saved: unknown = raw ? JSON.parse(raw) : null;
    if (saved && typeof saved === "object" && "music" in saved && "effects" in saved &&
      typeof saved.music === "boolean" && typeof saved.effects === "boolean") {
      return { music: saved.music, effects: saved.effects };
    }
  } catch { /* Keep sound controls usable when saved preferences are invalid. */ }
  return { ...DEFAULT_AUDIO_PREFERENCES };
}

const EFFECT_NOTES: Record<SoundEffect, { midi: number; offset: number; duration: number }[]> = {
  select: [{ midi: 81, offset: 0, duration: 0.09 }],
  correct: [
    { midi: 72, offset: 0, duration: 0.22 },
    { midi: 76, offset: 0.1, duration: 0.22 },
    { midi: 79, offset: 0.2, duration: 0.35 },
  ],
  incorrect: [
    { midi: 64, offset: 0, duration: 0.22 },
    { midi: 62, offset: 0.16, duration: 0.3 },
  ],
};

// An original, unhurried instrumental loop: soft chords and a simple melody.
const BARS = [
  { chord: [48, 55, 64], melody: [72, 76, 79, 76] },
  { chord: [45, 52, 60], melody: [72, null, 69, 72] },
  { chord: [53, 60, 69], melody: [77, 76, 72, null] },
  { chord: [55, 62, 67], melody: [74, 72, 67, null] },
  { chord: [48, 55, 64], melody: [72, 76, 79, 81] },
  { chord: [45, 52, 60], melody: [79, 76, 72, null] },
  { chord: [53, 60, 69], melody: [77, 76, 74, 72] },
  { chord: [55, 62, 67], melody: [74, null, 72, null] },
];
const BEAT_SECONDS = 60 / 64;
const frequency = (midi: number) => 440 * 2 ** ((midi - 69) / 12);

/** Browser audio is created only by unlock(), called from a user interaction. */
export class LumenAudio {
  private context: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private effectsGain: GainNode | null = null;
  private timer: ReturnType<typeof setInterval> | null = null;
  private voices = new Map<OscillatorNode, "music" | "effects">();
  private nextBeatTime = 0;
  private beat = 0;
  private unlocked = false;
  private hidden = false;
  private disposed = false;
  private preferences: AudioPreferences;

  constructor(preferences: AudioPreferences) {
    this.preferences = { ...preferences };
  }

  async unlock(): Promise<boolean> {
    if (this.disposed || this.hidden || (!this.preferences.music && !this.preferences.effects)) return false;
    try {
      if (!this.context) {
        const AudioContextConstructor = window.AudioContext ??
          (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AudioContextConstructor) return false;
        this.context = new AudioContextConstructor();
        this.musicGain = this.context.createGain();
        this.effectsGain = this.context.createGain();
        this.musicGain.gain.value = 0.055;
        this.effectsGain.gain.value = 0.12;
        this.musicGain.connect(this.context.destination);
        this.effectsGain.connect(this.context.destination);
      }
      if (this.context.state === "suspended") await this.context.resume();
      if (this.disposed || this.hidden || this.context.state !== "running") return false;
      this.unlocked = true;
      this.startMusic();
      return true;
    } catch {
      // Unsupported audio or browser restrictions must never interrupt a lesson.
      return false;
    }
  }

  setPreferences(preferences: AudioPreferences) {
    this.preferences = { ...preferences };
    if (!preferences.music) this.stopMusic();
    else this.startMusic();
    if (!preferences.effects) this.stopVoices("effects");
    if (!preferences.music && !preferences.effects) this.suspend();
  }

  async play(effect: SoundEffect) {
    if (!this.preferences.effects || !(await this.unlock())) return;
    const context = this.context;
    const output = this.effectsGain;
    if (!context || !output || !this.preferences.effects || this.hidden || this.disposed) return;
    const start = context.currentTime + 0.01;
    for (const note of EFFECT_NOTES[effect]) {
      this.note(note.midi, start + note.offset, note.duration, output, "effects", 0.8);
    }
  }

  setHidden(hidden: boolean) {
    this.hidden = hidden;
    if (hidden) {
      this.stopMusic();
      this.stopVoices("effects");
      this.suspend();
    } else if (this.unlocked) {
      void this.unlock();
    }
  }

  dispose() {
    this.disposed = true;
    this.stopMusic();
    this.stopVoices("effects");
    if (this.context) void this.context.close().catch(() => {});
    this.context = null;
  }

  private suspend() {
    if (this.context?.state === "running") void this.context.suspend().catch(() => {});
  }

  private note(midi: number, at: number, duration: number, output: GainNode, channel: "music" | "effects", volume: number) {
    const context = this.context;
    if (!context) return;
    const envelope = context.createGain();
    envelope.gain.setValueAtTime(0, at);
    envelope.gain.linearRampToValueAtTime(volume, at + Math.min(0.04, duration / 4));
    envelope.gain.exponentialRampToValueAtTime(0.001, at + duration);
    envelope.connect(output);
    const oscillator = context.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency(midi);
    oscillator.connect(envelope);
    this.voices.set(oscillator, channel);
    oscillator.onended = () => {
      this.voices.delete(oscillator);
      oscillator.disconnect();
      envelope.disconnect();
    };
    oscillator.start(at);
    oscillator.stop(at + duration + 0.02);
  }

  private startMusic() {
    const context = this.context;
    if (!context || context.state !== "running" || !this.unlocked || this.hidden ||
      this.disposed || !this.preferences.music || this.timer) return;
    this.nextBeatTime = context.currentTime + 0.08;
    this.beat = 0;
    this.scheduleMusic();
    this.timer = setInterval(() => this.scheduleMusic(), 200);
  }

  private scheduleMusic() {
    const context = this.context;
    const output = this.musicGain;
    if (!context || !output || !this.preferences.music || this.hidden || this.disposed) return;
    // Skip elapsed beats rather than piling up notes after a delayed timer.
    if (this.nextBeatTime < context.currentTime) this.nextBeatTime = context.currentTime + 0.05;
    while (this.nextBeatTime < context.currentTime + 0.5) {
      const bar = BARS[Math.floor(this.beat / 4) % BARS.length];
      const beatInBar = this.beat % 4;
      if (bar) {
        if (beatInBar === 0) {
          for (const midi of bar.chord) this.note(midi, this.nextBeatTime, BEAT_SECONDS * 3.8, output, "music", 0.2);
        }
        const midi = bar.melody[beatInBar];
        if (midi != null) this.note(midi, this.nextBeatTime, BEAT_SECONDS * 1.7, output, "music", 0.5);
      }
      this.beat += 1;
      this.nextBeatTime += BEAT_SECONDS;
    }
  }

  private stopVoices(channel: "music" | "effects") {
    for (const [voice, kind] of this.voices) {
      if (kind === channel) {
        try { voice.stop(); } catch { /* Already stopped. */ }
        this.voices.delete(voice);
      }
    }
  }

  private stopMusic() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    this.stopVoices("music");
  }
}