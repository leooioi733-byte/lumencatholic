import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { LESSONS, nextLesson } from "@/lib/lessons";
import { cn } from "@/lib/utils";

const OFFSETS = ["translate-x-0", "translate-x-12", "translate-x-16", "translate-x-8", "-translate-x-8", "-translate-x-14"];

export function LessonPath({ completed }: { completed: string[] }) {
  const next = nextLesson(completed);
  return (
    <ol className="flex flex-col items-center gap-6 py-4">
      {LESSONS.map((l, i) => {
        const done = completed.includes(l.id);
        const current = next?.id === l.id;
        return (
          <li key={l.id} className={cn("flex flex-col items-center", OFFSETS[i % OFFSETS.length])}>
            <Link
              to="/licao/$id"
              params={{ id: l.id }}
              aria-label={l.title}
              className={cn(
                "btn-3d grid h-20 w-20 place-items-center rounded-full text-3xl",
                done && "bg-gold text-gold-foreground [--btn-depth:var(--gold-deep)]",
                current && "bg-primary text-primary-foreground ring-4 ring-gold ring-offset-4 ring-offset-background [--btn-depth:var(--primary-deep)]",
                !done && !current && "bg-card [--btn-depth:var(--border)] border-2 border-border",
              )}
            >
              {done ? <Check className="h-9 w-9" strokeWidth={3} /> : l.emoji}
            </Link>
            <span className="mt-3 max-w-36 text-center text-sm font-bold text-primary">{l.title}</span>
          </li>
        );
      })}
    </ol>
  );
}
