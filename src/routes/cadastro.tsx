import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, Check, Eye, EyeOff } from "lucide-react";
import mascote from "@/assets/lumen-mascote.png";
import { LumenButton } from "@/components/ui/lumen-button";
import { cn } from "@/lib/utils";
import {
  emptyOnboarding,
  isPasswordValid,
  MIN_PASSWORD,
  toggleItem,
  type Onboarding,
} from "@/lib/onboarding";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: "Criar perfil — Lumen" },
      { name: "description", content: "Conte um pouco sobre você e comece sua jornada na fé com o Lumen." },
      { property: "og:title", content: "Criar perfil — Lumen" },
      { property: "og:description", content: "Conte um pouco sobre você e comece sua jornada na fé." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Cadastro,
});

const STORAGE = "lumen-onboarding";
const TOTAL = 5;

const SOURCES = ["Amigos ou família", "Paróquia", "Redes sociais", "Pesquisa na internet", "Outro"];
const LEVELS = [
  { id: "zero", label: "Estou começando agora", hint: "Quero aprender o básico" },
  { id: "pouco", label: "Conheço um pouco", hint: "Sei algumas orações e histórias" },
  { id: "bem", label: "Conheço bem", hint: "Participo da vida da Igreja" },
  { id: "muito", label: "Quero me aprofundar", hint: "Busco estudar mais a fundo" },
];
const SACRAMENTS = ["Batismo", "Eucaristia", "Crisma", "Confissão", "Matrimônio", "Ordem", "Unção dos Enfermos", "Nenhum ainda"];
const TOPICS = ["Bíblia", "Jesus", "Sacramentos", "Orações", "Igreja", "Começar do zero"];

function Cadastro() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Onboarding>(emptyOnboarding);
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE);
    if (saved) {
      const p = JSON.parse(saved);
      setData({ ...emptyOnboarding, ...p.data });
      setStep(p.step ?? 0);
    }
  }, []);
  useEffect(() => {
    sessionStorage.setItem(STORAGE, JSON.stringify({ data, step }));
  }, [data, step]);

  const set = (patch: Partial<Onboarding>) => setData((d) => ({ ...d, ...patch }));
  const next = () => setStep((s) => Math.min(s + 1, TOTAL));
  const back = () => (step === 0 ? navigate({ to: "/" }) : setStep((s) => s - 1));

  const canFinish = data.nickname.trim().length > 0 && isPasswordValid(password);

  const finish = () => {
    localStorage.setItem("lumen-profile", JSON.stringify(data));
    sessionStorage.removeItem(STORAGE);
    setDone(true);
  };

  if (done) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-6 text-center">
        <img src={mascote} alt="Cordeirinho do Lumen" className="animate-float-soft w-40" />
        <h1 className="animate-rise mt-6 text-3xl font-bold text-primary">
          Bem-vindo, {data.nickname.trim()}!
        </h1>
        <p className="animate-rise mt-2 text-muted-foreground [animation-delay:120ms]">
          Seu perfil está pronto. Sua primeira lição será “O que é a Bíblia?”.
        </p>
        <Link to="/" className="mt-10 w-full">
          <LumenButton variant="gold">Continuar</LumenButton>
        </Link>
      </main>
    );
  }

  const progress = ((step + 1) / (TOTAL + 1)) * 100;

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-5 pb-6 pt-5">
      <div className="flex items-center gap-3">
        <button
          onClick={back}
          aria-label="Voltar"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-primary transition active:scale-90"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div className="h-4 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gold transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div key={step} className="animate-rise flex flex-1 flex-col">
        {step === 0 && (
          <Step title="Como você conheceu o Lumen?">
            {SOURCES.map((s) => (
              <Option key={s} selected={data.source === s} onClick={() => set({ source: s })}>
                {s}
              </Option>
            ))}
          </Step>
        )}
        {step === 1 && (
          <Step title="Quanto você conhece da fé católica?">
            {LEVELS.map((l) => (
              <Option key={l.id} selected={data.level === l.id} onClick={() => set({ level: l.id })}>
                <span className="block">{l.label}</span>
                <span className="block text-sm font-normal text-muted-foreground">{l.hint}</span>
              </Option>
            ))}
          </Step>
        )}
        {step === 2 && (
          <Step title="Quais sacramentos você já recebeu?" subtitle="Pode marcar mais de um.">
            <div className="grid grid-cols-2 gap-3">
              {SACRAMENTS.map((s) => (
                <Option
                  key={s}
                  multi
                  selected={data.sacraments.includes(s)}
                  onClick={() =>
                    set({
                      sacraments:
                        s === "Nenhum ainda"
                          ? data.sacraments.includes(s) ? [] : [s]
                          : toggleItem(data.sacraments.filter((x) => x !== "Nenhum ainda"), s),
                    })
                  }
                >
                  {s}
                </Option>
              ))}
            </div>
          </Step>
        )}
        {step === 3 && (
          <Step title="O que você quer aprender primeiro?" subtitle="Todos os temas continuam abertos para você.">
            <div className="grid grid-cols-2 gap-3">
              {TOPICS.map((t) => (
                <Option key={t} selected={data.topic === t} onClick={() => set({ topic: t })}>
                  {t}
                </Option>
              ))}
            </div>
          </Step>
        )}
        {step === 4 && (
          <Step title="Crie seu perfil" subtitle="Não pedimos e-mail nem telefone.">
            <label className="block">
              <span className="mb-2 block font-semibold text-primary">Nome ou apelido</span>
              <input
                value={data.nickname}
                onChange={(e) => set({ nickname: e.target.value })}
                maxLength={30}
                placeholder="Como quer ser chamado?"
                className="w-full rounded-2xl border-2 border-border bg-card px-4 py-3.5 text-lg text-foreground outline-none transition focus:border-gold"
              />
            </label>
            <label className="block">
              <span className="mb-2 block font-semibold text-primary">Senha</span>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo de 8 caracteres"
                  className="w-full rounded-2xl border-2 border-border bg-card px-4 py-3.5 pr-12 text-lg text-foreground outline-none transition focus:border-gold"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? "Esconder senha" : "Mostrar senha"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPw ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <span
                className={cn(
                  "mt-2 block text-sm",
                  isPasswordValid(password) ? "text-secondary" : "text-muted-foreground",
                )}
              >
                {password.length}/{MIN_PASSWORD} caracteres
              </span>
            </label>
          </Step>
        )}
      </div>

      <div className="pt-4">
        {step < 4 ? (
          <LumenButton onClick={next}>Continuar</LumenButton>
        ) : (
          <LumenButton variant="gold" disabled={!canFinish} onClick={finish}>
            Criar perfil
          </LumenButton>
        )}
        {step < 4 && (
          <button onClick={next} className="mt-3 w-full py-2 font-semibold text-muted-foreground">
            Pular
          </button>
        )}
      </div>
    </main>
  );
}

function Step({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section className="flex flex-1 flex-col pt-6">
      <div className="mb-6 flex items-end gap-3">
        <img src={mascote} alt="" className="w-16 shrink-0" />
        <div className="relative min-w-0 flex-1 rounded-2xl border-2 border-border bg-card px-4 py-3">
          <h1 className="text-xl font-semibold leading-snug text-primary">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Option({
  selected,
  multi,
  onClick,
  children,
}: {
  selected: boolean;
  multi?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "btn-3d flex w-full items-center gap-3 border-2 px-4 py-3.5 text-left font-sans text-base font-bold",
        selected
          ? "border-gold bg-accent text-primary [--btn-depth:var(--gold-deep)]"
          : "border-border bg-card text-foreground [--btn-depth:var(--border)]",
      )}
    >
      {multi && (
        <span
          className={cn(
            "grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 transition",
            selected ? "border-gold bg-gold text-gold-foreground" : "border-border",
          )}
        >
          {selected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
        </span>
      )}
      <span className="min-w-0 flex-1">{children}</span>
    </button>
  );
}
