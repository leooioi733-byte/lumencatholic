import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { UNITS, nextLesson } from "@/lib/lessons";
import { cn } from "@/lib/utils";
import { ThemeGlyph } from "@/components/ThemeSymbols";

const OFFSETS = ["translate-x-0", "translate-x-12", "translate-x-16", "translate-x-8", "-translate-x-8", "-translate-x-14"];

export function LessonPath({ completed, unitId }: { completed: string[]; unitId?: string }) {
  const next = nextLesson(completed);
  return (
    <div className="space-y-8">
      {UNITS.filter((unit) => !unitId || unit.id === unitId).map((unit) => (
        <section key={unit.id} aria-labelledby={`unit-${unit.id}`}>
          <header className="border-y-2 border-border py-4">
            <div className="flex items-center justify-between gap-3 text-sm font-bold text-secondary">
              <span>Unidade {UNITS.indexOf(unit) + 1}</span>
              <span className="shrink-0">{unit.lessons.filter((l) => completed.includes(l.id)).length}/{unit.lessons.length}</span>
            </div>
            <h2 id={`unit-${unit.id}`} className="mt-1 text-xl font-semibold text-primary"><ThemeGlyph index={UNITS.indexOf(unit)}>{unit.emoji}</ThemeGlyph> {unit.title}</h2>
          </header>
          <ol className="flex flex-col items-center gap-6 py-6">
      {unit.lessons.map((l, i) => {
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
              {done ? <Check className="h-9 w-9" strokeWidth={3} /> : <ThemeGlyph index={i} className="text-3xl">{l.emoji}</ThemeGlyph>}
            </Link>
            <span className="mt-3 max-w-36 text-center text-sm font-bold text-primary">{l.title}</span>
          </li>
        );
      })}
          </ol>
        </section>
      ))}
    </div>
  );
}
