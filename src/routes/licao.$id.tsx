import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import mascote from "@/assets/lumen-mascote.png";
import { ProgressBar } from "@/components/AppShell";
import { LumenButton, lumenButton } from "@/components/ui/lumen-button";
import { getLesson, lessonXp } from "@/lib/lessons";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/licao/$id")({
  loader: ({ params }) => {
    const lesson = getLesson(params.id);
    if (!lesson) throw notFound();
    return { title: lesson.title };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Lição"} — Lumen` },
      { name: "description", content: "Lição curta com ensinamento e perguntas." },
      { property: "og:title", content: `${loaderData?.title ?? "Lição"} — Lumen` },
      { property: "og:description", content: "Lição curta com ensinamento e perguntas." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Licao,
});

function Licao() {
  const { id } = Route.useParams();
  const lesson = getLesson(id)!;
  const { complete } = useProgress();
  const nT = lesson.teachings.length;
  const nQ = lesson.questions.length;
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [earned, setEarned] = useState<number | null>(null);

  const total = nT + nQ;
  if (earned !== null) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-6 text-center">
        <div className="relative">
          {["-left-6 top-0", "-right-4 top-6", "left-2 -bottom-2", "right-0 bottom-4"].map((p, i) => (
            <span key={i} className={cn("animate-halo absolute text-3xl text-gold", p)}>✦</span>
          ))}
          <img src={mascote} alt="Cordeirinho comemorando" className="animate-float-soft w-40" />
        </div>
        <h1 className="animate-rise mt-6 text-3xl font-bold text-primary">Lição concluída!</h1>
        <p className="animate-rise mt-2 text-muted-foreground">{lesson.title}</p>
        <div className="animate-rise mt-6 rounded-2xl bg-gold px-6 py-3 font-display text-2xl font-bold text-gold-foreground">
          +{earned} XP
        </div>
        {mistakes === 0 && <p className="mt-3 text-sm font-bold text-secondary">Perfeito! Bônus por acertar tudo.</p>}
        <Link to="/inicio" className={cn(lumenButton(), "mt-10")}>Continuar</Link>
      </main>
    );
  }

  const isTeaching = step < nT;
  const q = !isTeaching ? lesson.questions[step - nT] : null;
  const correct = q && picked === q.answer;

  const advance = () => {
    if (step + 1 >= total) {
      const xp = lessonXp(lesson, mistakes);
      complete(lesson.id, xp);
      setEarned(xp);
      return;
    }
    setStep(step + 1);
    setPicked(null);
    setChecked(false);
  };
  const check = () => {
    setChecked(true);
    if (!correct) setMistakes((m) => m + 1);
  };

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-5 pb-6 pt-5">
      <div className="flex items-center gap-3">
        <Link to="/inicio" aria-label="Sair da lição" className="text-muted-foreground">
          <X className="h-7 w-7" />
        </Link>
        <ProgressBar value={(step / total) * 100} />
      </div>

      <div key={step} className="animate-rise flex flex-1 flex-col pt-8">
        {isTeaching ? (
          <>
            <p className="text-sm font-bold uppercase text-secondary">Ensinamento {step + 1} de {nT}</p>
            <div className="mt-4 rounded-3xl border-2 border-border bg-card p-6">
              <h1 className="text-2xl font-semibold text-primary">{lesson.teachings[step].title}</h1>
              <p className="mt-3 text-lg leading-relaxed text-foreground">{lesson.teachings[step].text}</p>
              <p className="mt-4 text-sm font-bold text-muted-foreground">{lesson.teachings[step].source}</p>
            </div>
            <img src={mascote} alt="" className="mx-auto mt-6 w-24" />
          </>
        ) : (
          q && (
            <>
              <p className="text-sm font-bold uppercase text-secondary">Pergunta {step - nT + 1} de {nQ}</p>
              <h1 className="mt-3 text-2xl font-semibold text-primary">{q.prompt}</h1>
              <div className="mt-6 space-y-3">
                {q.options.map((o, i) => {
                  const state = checked
                    ? i === q.answer ? "right" : i === picked ? "wrong" : "idle"
                    : picked === i ? "sel" : "idle";
                  return (
                    <button
                      key={o}
                      disabled={checked}
                      onClick={() => setPicked(i)}
                      className={cn(
                        "btn-3d w-full border-2 px-4 py-4 text-left font-sans text-base font-bold",
                        state === "idle" && "border-border bg-card text-foreground [--btn-depth:var(--border)]",
                        state === "sel" && "border-gold bg-accent text-primary [--btn-depth:var(--gold-deep)]",
                        state === "right" && "border-success bg-card text-success [--btn-depth:var(--success-deep)]",
                        state === "wrong" && "border-destructive bg-card text-destructive [--btn-depth:var(--destructive-deep)]",
                      )}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>
            </>
          )
        )}
      </div>

      {checked && q && (
        <div className={cn("animate-rise mb-4 rounded-2xl p-4", correct ? "bg-success/15" : "bg-destructive/10")}>
          <p className={cn("font-display text-lg font-bold", correct ? "text-success" : "text-destructive")}>
            {correct ? "Muito bem!" : "Quase! Resposta correta:"}
          </p>
          <p className="text-sm text-foreground">{q.explanation}</p>
        </div>
      )}

      {isTeaching ? (
        <LumenButton onClick={advance}>Entendi</LumenButton>
      ) : !checked ? (
        <LumenButton variant="gold" disabled={picked === null} onClick={check}>Verificar</LumenButton>
      ) : (
        <LumenButton variant={correct ? "success" : "danger"} onClick={advance}>Continuar</LumenButton>
      )}
    </main>
  );
}
