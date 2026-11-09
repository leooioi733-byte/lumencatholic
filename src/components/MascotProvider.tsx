import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { useLocation } from "@tanstack/react-router";
import { MASCOT_MESSAGES, routeMascotMoment, type MascotEvent, type MascotMoment } from "@/lib/mascot";

type MascotState = { event: MascotEvent; special: boolean; message: string; open: boolean; serial: number };
type MascotValue = MascotState & { notify: (event: MascotEvent) => void; talk: () => void; dismiss: () => void };
const INITIAL: MascotState = { event: { moment: "home" }, special: false, message: "", open: false, serial: 0 };
const MascotContext = createContext<MascotValue>({ ...INITIAL, notify: () => {}, talk: () => {}, dismiss: () => {} });

export function MascotProvider({ children }: { children: ReactNode }) {
  const pathname = useLocation({ select: (location) => location.pathname });
  const [state, setState] = useState(INITIAL);
  const current = useRef(INITIAL);
  const counters = useRef<Partial<Record<MascotMoment, number>>>({});
  const seen = useRef(new Set<string>());
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSpecial = useRef(0);
  const update = useCallback((next: MascotState) => { current.current = next; setState(next); }, []);
  const clearTimer = useCallback(() => { if (timer.current) clearTimeout(timer.current); timer.current = null; }, []);
  const messageFor = useCallback((event: MascotEvent) => {
    const messages = MASCOT_MESSAGES[event.moment];
    const count = counters.current[event.moment] ?? 0;
    counters.current[event.moment] = count + 1;
    const text = messages[count % messages.length] ?? messages[0] ?? "";
    return event.label ? `${text} ${event.label}` : text;
  }, []);
  const dismiss = useCallback(() => { clearTimer(); update({ ...current.current, open: false, special: false }); }, [clearTimer, update]);
  const notify = useCallback((event: MascotEvent) => {
    if (event.key && seen.current.has(event.key)) return;
    if (event.key) seen.current.add(event.key);
    clearTimer();
    const important = event.moment === "lessonComplete" || event.moment === "pathComplete" || event.moment === "achievement";
    const special = Boolean(event.special) && (important || Date.now() - lastSpecial.current > 20000);
    if (special) lastSpecial.current = Date.now();
    const next = { event, special, message: messageFor(event), open: current.current.open || special, serial: current.current.serial + 1 };
    update(next);
    if (special) timer.current = setTimeout(() => update({ ...current.current, special: false, open: false }), 6500);
  }, [clearTimer, messageFor, update]);
  const talk = useCallback(() => {
    clearTimer();
    if (current.current.open) { dismiss(); return; }
    update({ ...current.current, open: true, special: false, message: messageFor(current.current.event) });
  }, [clearTimer, dismiss, messageFor, update]);

  useLayoutEffect(() => {
    clearTimer();
    const event = { moment: routeMascotMoment(pathname) };
    update({ ...current.current, event, special: false, open: false, message: "" });
  }, [pathname, clearTimer, update]);

  useEffect(() => {
    try {
      if (localStorage.getItem("lumen-mascot-welcomed") !== "true") {
        localStorage.setItem("lumen-mascot-welcomed", "true");
        // Welcome in learning areas only; prayer/reading always stays quiet.
        if (["/", "/inicio", "/index"].includes(window.location.pathname)) notify({ moment: "welcome", special: true, key: "welcome" });
      }
    } catch { /* Storage is optional; do not repeat automatic greetings. */ }
    return clearTimer;
  }, [clearTimer, notify]);

  useEffect(() => {
    const visibility = () => { if (document.hidden) dismiss(); };
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, [dismiss]);

  return <MascotContext.Provider value={{ ...state, notify, talk, dismiss }}>{children}</MascotContext.Provider>;
}
export function useMascot() { return useContext(MascotContext); }