import { useState } from "react";
import { BookOpen, Church, Cross, Flower2, Heart, Save, Sun, type LucideIcon } from "lucide-react";
import { LumenButton } from "@/components/ui/lumen-button";
import { PROFILE_LEVELS, PROFILE_SYMBOLS, PROFILE_TOPICS, type Profile, type ProfileEdit, type ProfileSymbol } from "@/lib/profile";
import { cn } from "@/lib/utils";

const SYMBOLS: Record<ProfileSymbol, { icon: LucideIcon; label: string }> = {
  cross: { icon: Cross, label: "Cruz" }, book: { icon: BookOpen, label: "Livro" },
  heart: { icon: Heart, label: "Coração" }, church: { icon: Church, label: "Igreja" },
  sun: { icon: Sun, label: "Sol" }, flower: { icon: Flower2, label: "Flor" },
};

export function ProfileEmblem({ symbol }: { symbol: ProfileSymbol }) {
  const Icon = SYMBOLS[symbol].icon;
  return <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full border-2 border-gold bg-gold text-gold-foreground"><Icon className="h-9 w-9" aria-hidden="true" /></span>;
}

export function ProfilePersonalization({ profile, saveProfile }: { profile: Profile; saveProfile: (patch: ProfileEdit) => boolean }) {
  const [draft, setDraft] = useState<ProfileEdit>({ nickname: profile.nickname, symbol: profile.symbol, level: profile.level, topic: profile.topic });
  const [message, setMessage] = useState("");
  const change = (patch: Partial<ProfileEdit>) => { setDraft((previous) => ({ ...previous, ...patch })); setMessage(""); };
  const field = "mt-2 w-full min-w-0 rounded-xl border-2 border-border bg-card px-3 py-3 text-foreground outline-none focus:border-gold focus-visible:ring-2 focus-visible:ring-ring";
  return (
    <form className="mt-5 space-y-6" onSubmit={(event) => {
      event.preventDefault();
      setMessage(saveProfile(draft) ? "Suas preferências foram salvas." : "Não foi possível salvar neste aparelho. Tente novamente.");
    }}>
      <label className="block font-bold">Nome ou apelido
        <input className={field} value={draft.nickname} required maxLength={40} autoComplete="nickname"
          placeholder="Como quer ser chamado?" onChange={(event) => change({ nickname: event.target.value })} />
      </label>
      <fieldset>
        <legend className="mb-3 font-bold">Seu símbolo</legend>
        <div className="grid grid-cols-6 gap-2">
          {PROFILE_SYMBOLS.map((symbol) => {
            const { icon: Icon, label } = SYMBOLS[symbol];
            return <LumenButton key={symbol} variant={draft.symbol === symbol ? "selectedAnswer" : "outline"}
              type="button" data-sound="select" aria-label={label} title={label} aria-pressed={draft.symbol === symbol}
              className={cn("aspect-square h-auto min-w-0 p-0", draft.symbol === symbol && "ring-2 ring-gold")}
              onClick={() => change({ symbol })}><Icon className="h-5 w-5" aria-hidden="true" /></LumenButton>;
          })}
        </div>
      </fieldset>
      <label className="block font-bold">Seu momento na fé
        <select className={field} value={draft.level ?? ""} onChange={(event) => change({ level: event.target.value || null })}>
          <option value="">Prefiro não informar</option>
          {PROFILE_LEVELS.map((level) => <option key={level.id} value={level.id}>{level.label}</option>)}
        </select>
      </label>
      <fieldset>
        <legend className="mb-3 font-bold">Tema de interesse</legend>
        <div className="grid grid-cols-2 gap-3">
          {PROFILE_TOPICS.map((topic) => <LumenButton key={topic} type="button" data-sound="select"
            variant={draft.topic === topic ? "selectedAnswer" : "answer"} aria-pressed={draft.topic === topic}
            onClick={() => change({ topic: draft.topic === topic ? null : topic })}
            className="h-auto min-h-12 min-w-0 px-2 py-3 font-sans text-sm normal-case">{topic}</LumenButton>)}
        </div>
      </fieldset>
      <LumenButton type="submit" variant="gold" disabled={!draft.nickname.trim()} className="gap-2 text-base">
        <Save className="h-5 w-5" aria-hidden="true" />Salvar preferências
      </LumenButton>
      <p role="status" className="min-h-6 text-sm text-muted-foreground">{message}</p>
    </form>
  );
}