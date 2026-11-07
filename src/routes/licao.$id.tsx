import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X } from "lucide-react";
import { ProgressBar } from "@/components/AppShell";
import { LumenButton, lumenButton } from "@/components/ui/lumen-button";
import { getLesson, lessonXp, type Lesson } from "@/lib/lessons";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";
import { useAudio } from "@/components/AudioProvider";

export const Route = createFileRoute("/licao/$id")({
  loader: ({ params }) => {
    const lesson = getLesson(params.id);
    if (!lesson) throw notFound();
    return { title: lesson.title, lesson };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Lição"} — Lumen` },
      { name: "description", content: loaderData ? `Aprenda sobre ${loaderData.title} com ensinamentos da Bíblia e do Catecismo e perguntas interativas.` : "Lições da fé católica no Lumen." },
      { property: "og:title", content: `${loaderData?.title ?? "Lição"} — Lumen` },
      { property: "og:description", content: loaderData ? `Aprenda sobre ${loaderData.title} com ensinamentos da Bíblia e do Catecismo e perguntas interativas.` : "Lições da fé católica no Lumen." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Licao,
});

function Licao() {
  const { lesson } = Route.useLoaderData();
  return <LessonSession key={lesson.id} lesson={lesson} />;
}

function LessonSession({ lesson }: { lesson: Lesson }) {
  const { complete } = useProgress();
  const { play } = useAudio();
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
        <h1 className="animate-rise text-3xl font-bold text-primary">Lição concluída!</h1>
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
  const teaching = lesson.teachings[step];
  const q = !isTeaching ? lesson.questions[step - nT] ?? null : null;
  const correct = q !== null && picked === q.answer;

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
    if (picked === null || checked || !q) return;
    setChecked(true);
    play(correct ? "correct" : "incorrect");
    if (!correct) setMistakes((m) => m + 1);
  };

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-5 pb-6 pt-5">
      <div className="flex items-center gap-3">
        <Link to="/inicio" aria-label="Sair da lição" className="text-muted-foreground">
          <X className="h-7 w-7" />
        </Link>
        <ProgressBar value={((step + (checked ? 1 : 0)) / total) * 100} />
      </div>

      <div key={step} className="animate-rise flex flex-1 flex-col pt-8">
        {isTeaching && teaching ? (
          <>
            <p className="text-sm font-bold uppercase text-secondary">Ensinamento {step + 1} de {nT}</p>
            <div className="mt-4 border-y-2 border-border py-6">
              <h1 className="text-2xl font-semibold text-primary">{teaching.title}</h1>
              <p className="mt-3 text-lg leading-relaxed text-foreground">{teaching.text}</p>
              <p className="mt-4 text-sm font-bold text-muted-foreground">{teaching.source}</p>
            </div>
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
                    <LumenButton
                      key={o}
                      disabled={checked}
                      onClick={() => setPicked(i)}
                      aria-pressed={picked === i}
                      data-sound="select"
                      variant={state === "right" ? "rightAnswer" : state === "wrong" ? "wrongAnswer" : state === "sel" ? "selectedAnswer" : "answer"}
                      className="justify-start gap-3 px-4 text-left font-sans text-base font-bold normal-case disabled:opacity-100"
                    >
                      <span className="min-w-0 flex-1">{o}</span>
                      {state === "right" && <Check aria-hidden="true" className="h-5 w-5 shrink-0" />}
                      {state === "wrong" && <X aria-hidden="true" className="h-5 w-5 shrink-0" />}
                    </LumenButton>
                  );
                })}
              </div>
            </>
          )
        )}
      </div>

      {checked && q && (
        <div role="status" className={cn("animate-rise my-5 flex items-center gap-3 rounded-2xl p-3", correct ? "bg-success/15" : "bg-destructive/10")}>
          <div className="min-w-0 flex-1">
            <p className={cn("font-display text-lg font-bold", correct ? "text-success" : "text-destructive")}>
              {correct ? "Muito bem!" : "Opa! Vamos aprender:"}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-foreground">{q.explanation}</p>
          </div>
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
