import { useEffect, useRef, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useMascot } from "@/components/MascotProvider";
import { MascotPortrait } from "@/components/MascotPortrait";
import { useLocalProfile } from "@/hooks/use-local-profile";
import { LumenButton } from "@/components/ui/lumen-button";
import { Button } from "@/components/ui/button";
import { findMascotSlot, rectsOverlap, type MascotRect } from "@/lib/mascot";
import { cn } from "@/lib/utils";

/** Read only painted content, not empty layout boxes. No page spacing is changed. */
function pageObstacles(width: number, height: number): MascotRect[] {
  const rects: MascotRect[] = [];
  const add = (rect: DOMRect | DOMRectReadOnly) => {
    if (rect.width > 0 && rect.height > 0 && rect.top < height && rect.bottom > 0 && rect.right > 0 && rect.left < width) rects.push({ x: rect.left, y: rect.top, width: rect.width, height: rect.height });
  };
  document.querySelectorAll("main a, main button, main input, main select, main textarea, main summary, main img, main svg, main [role='progressbar'], nav, header button, [role='dialog']").forEach((element) => {
    if (element.closest("[data-global-mascot]") || getComputedStyle(element).visibility === "hidden") return;
    add(element.getBoundingClientRect());
  });
  document.querySelectorAll("main h1, main h2, main h3, main p, main label, main legend, main output, main span").forEach((element) => {
    if (element.closest("[data-global-mascot]") || getComputedStyle(element).visibility === "hidden") return;
    for (const node of element.childNodes) {
      if (node.nodeType !== Node.TEXT_NODE || !node.textContent?.trim()) continue;
      const range = document.createRange(); range.selectNodeContents(node);
      for (const rect of range.getClientRects()) add(rect);
    }
  });
  return rects;
}

export function GlobalMascot() {
  const { event, special, open, message, serial, talk, dismiss } = useMascot();
  const { profile } = useLocalProfile();
  const pathname = useLocation({ select: (location) => location.pathname });
  const root = useRef<HTMLElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number; large: boolean; bubble: "above" | "below" | "hidden"; hidden: boolean } | null>(null);

  useEffect(() => {
    let frame = 0;
    const place = () => {
      const width = document.documentElement.clientWidth;
      const height = window.visualViewport?.height ?? window.innerHeight;
      const modal = document.querySelector("[role='dialog'][data-state='open']");
      const obstacles = pageObstacles(width, height);
      const nav = document.querySelector(".lumen-navigation")?.getBoundingClientRect();
      const bottom = nav ? height - nav.top + 12 : 16;
      const small = { width: 56, height: 68 };
      const big = { width: 104, height: 124 };
      let large = special;
      let slot = findMascotSlot(width, height, bottom, large ? big : small, obstacles);
      if (!slot && large) { large = false; slot = findMascotSlot(width, height, bottom, small, obstacles); }
      // On exceptionally dense screens keep a compact, safe-area companion below navigation.
      // It is tucked out of the way until a free slot appears, rather than covering content.
      if (!slot) { setPosition((prev) => prev ? { ...prev, hidden: true } : null); return; }
      let bubble: "above" | "below" | "hidden" = "hidden";
      if (open && root.current) {
        const bubbleHeight = root.current.querySelector("[data-mascot-bubble]")?.getBoundingClientRect().height || 144;
        const bubbleWidth = Math.min(244, width - 24);
        const x = width - 12 - bubbleWidth;
        const above = { x, y: slot.y - bubbleHeight - 12, width: bubbleWidth, height: bubbleHeight };
        const below = { x, y: slot.y + slot.height + 12, width: bubbleWidth, height: bubbleHeight };
        if (above.y >= 64 && !obstacles.some((rect) => rectsOverlap(above, rect))) bubble = "above";
        else if (below.y + bubbleHeight <= height - bottom && !obstacles.some((rect) => rectsOverlap(below, rect))) bubble = "below";
        else {
          // A non-modal, manually opened balloon may sit over passive copy, never controls.
          const controls = Array.from(document.querySelectorAll("main a, main button, main input, main select, main summary, nav")).map((el) => el.getBoundingClientRect());
          const candidates = [above, below];
          const safe = candidates.find((candidate) => candidate.y >= 64 && candidate.y + candidate.height <= height - bottom && !controls.some((rect) => rectsOverlap(candidate, { x: rect.x, y: rect.y, width: rect.width, height: rect.height })));
          if (safe) bubble = safe === above ? "above" : "below";
        }
      }
      const next = { x: slot.x, y: slot.y, large, bubble, hidden: Boolean(modal) };
      setPosition((prev) => prev && Object.keys(next).every((key) => prev[key as keyof typeof next] === next[key as keyof typeof next]) ? prev : next);
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(place); };
    const observer = new MutationObserver((mutations) => {
      if (mutations.some((mutation) => !(mutation.target instanceof Element ? mutation.target : mutation.target.parentElement)?.closest("[data-global-mascot]"))) schedule();
    });
    observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ["data-state", "class"] });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.visualViewport?.addEventListener("resize", schedule);
    const resize = new ResizeObserver(schedule); resize.observe(document.body);
    schedule();
    // Finish measuring after page entrance transitions settle.
    const settled = window.setTimeout(schedule, 750);
    return () => { cancelAnimationFrame(frame); clearTimeout(settled); observer.disconnect(); resize.disconnect(); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); window.visualViewport?.removeEventListener("resize", schedule); };
  }, [pathname, open, special, serial]);

  useEffect(() => {
    if (!open) return;
    const escape = (e: KeyboardEvent) => { if (e.key === "Escape") dismiss(); };
    const outside = (e: PointerEvent) => { if (e.target instanceof Node && !root.current?.contains(e.target)) dismiss(); };
    document.addEventListener("keydown", escape); document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", escape); document.removeEventListener("pointerdown", outside); };
  }, [open, dismiss]);

  return <aside ref={root} data-global-mascot data-moment={event.moment} data-outfit={profile.mascotOutfit} data-special={special}
    aria-label="Companheiro Lumen" className={cn("global-mascot", position?.large && "global-mascot-large", (!position || position.hidden) && "global-mascot-hidden")}
    style={position ? { left: position.x, top: position.y } : undefined}>
    {open && <div id="mascot-message" data-mascot-bubble data-position={position?.bubble ?? "hidden"} className="mascot-bubble border-2 border-border bg-popover text-popover-foreground">
      <div className="flex items-center justify-between gap-2"><span className="font-display text-sm font-semibold text-primary">Lumen</span>
        <Button variant="ghost" size="icon" onClick={dismiss} aria-label="Fechar mensagem do cordeirinho" title="Fechar mensagem" className="h-8 w-8 shrink-0"><X className="h-4 w-4" /></Button>
      </div>
      <p className="mt-1 break-words text-sm leading-relaxed">{message}</p>
    </div>}
    <LumenButton variant="outline" className="mascot-trigger" onClick={talk} aria-label="Conversar com o cordeirinho" title="Conversar com o cordeirinho" aria-expanded={open} aria-controls={open ? "mascot-message" : undefined}>
      <span key={serial} className={cn("mascot-motion", special ? "mascot-celebrate" : event.moment === "incorrect" ? "mascot-encourage" : "mascot-breathe")}>
        <MascotPortrait outfit={profile.mascotOutfit} />
      </span>
    </LumenButton>
  </aside>;
}