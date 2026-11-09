import officialMascot from "@/assets/lumen-companheiro-oficial.png.asset.json";
import type { MascotOutfit } from "@/lib/mascot";
import { cn } from "@/lib/utils";

export function MascotPortrait({ outfit, className }: { outfit: MascotOutfit; className?: string }) {
  return <span className={cn("mascot-portrait", className)}>
    <img src={officialMascot.url} alt="" draggable={false} width={720} height={850} />
    {outfit !== "original" && <svg className={cn("mascot-outfit", `mascot-outfit-${outfit}`)} viewBox="0 0 720 850" aria-hidden="true">
      <path className="mascot-fabric" d="M179 490 Q358 563 542 490 L526 541 Q358 599 195 541Z" />
      <path className="mascot-fabric" d="M442 535 L502 533 L511 666 Q482 681 451 666Z" />
      <path className="mascot-trim" d="M450 643 L509 643 L511 666 Q482 681 451 666Z" />
      {outfit === "christmas" && <path className="mascot-trim" d="M479 567 L486 584 L504 585 L490 598 L494 615 L479 606 L464 615 L468 598 L454 585 L472 584Z" />}
    </svg>}
  </span>;
}