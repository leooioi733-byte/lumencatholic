import reading from "@/assets/lumen-lendo.png";
import victory from "@/assets/lumen-vitoria.png";
import oops from "@/assets/lumen-ops.png";
import { cn } from "@/lib/utils";

type Mood = "reading" | "victory" | "oops" | "celebrate";
const POSES = {
  reading: { image: reading, label: "Cordeirinho lendo", motion: "mascot-reading" },
  victory: { image: victory, label: "Cordeirinho comemorando o acerto", motion: "mascot-victory" },
  oops: { image: oops, label: "Cordeirinho reagindo ao erro e incentivando um recomeço", motion: "mascot-oops" },
  celebrate: { image: victory, label: "Cordeirinho celebrando a lição concluída", motion: "mascot-celebrate" },
} as const;

export function MascotReaction({ mood, className }: { mood: Mood; className?: string }) {
  const pose = POSES[mood];
  const happy = mood === "victory" || mood === "celebrate";
  return (
    <div className={cn("mascot-stage relative isolate aspect-square w-28 shrink-0", className)}>
      <span aria-hidden="true" className={cn("mascot-shadow absolute bottom-1 left-1/4 h-2 w-1/2 rounded-full bg-primary/10", happy && "mascot-shadow-hop")} />
      {happy && (
        <div aria-hidden="true" className="mascot-sparks pointer-events-none absolute inset-0 text-gold">
          <span className="spark spark-one">✦</span>
          <span className="spark spark-two">✦</span>
          <span className="spark spark-three">✦</span>
          <span className="spark spark-four">✦</span>
          <i className="confetti confetti-one bg-gold" />
          <i className="confetti confetti-two bg-secondary" />
          <i className="confetti confetti-three bg-success" />
          <i className="confetti confetti-four bg-gold" />
        </div>
      )}
      {mood === "oops" && (
        <span aria-hidden="true" className="mascot-surprise absolute right-0 top-1 font-display text-2xl font-bold text-secondary">!</span>
      )}
      <img
        key={mood}
        src={pose.image}
        alt={pose.label}
        width={384}
        height={512}
        decoding="async"
        className={cn("relative z-10 h-full w-full object-contain", pose.motion)}
      />
    </div>
  );
}