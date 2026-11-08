import { Link } from "@tanstack/react-router";
import { BookOpen, Flame, Home, Map, User } from "lucide-react";
import type { ReactNode } from "react";

const TABS = [
  { to: "/inicio", label: "Início", icon: Home },
  { to: "/trilha", label: "Trilha", icon: Map },
  { to: "/oracoes", label: "Orações", icon: Flame },
  { to: "/biblioteca", label: "Biblioteca", icon: BookOpen },
  { to: "/perfil", label: "Conta", icon: User },
] as const;

export function AppShell({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <div className={`mx-auto min-h-dvh pb-24 ${wide ? "max-w-4xl" : "max-w-md"}`}>
      <main className="animate-rise px-5 pt-6">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t-2 border-border bg-card">
        <ul className="mx-auto grid max-w-md grid-cols-5">
          {TABS.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <Link
                to={to}
                className="flex flex-col items-center gap-1 py-3 text-xs font-bold text-muted-foreground transition active:scale-90 data-[status=active]:text-primary"
              >
                <Icon className="h-6 w-6" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export function XpBadge({ xp }: { xp: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 font-display text-sm font-semibold text-gold-foreground">
      ✦ {xp} XP
    </span>
  );
}

export function ProgressBar({ value, label = "Progresso" }: { value: number; label?: string }) {
  return (
    <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.max(0, Math.min(100, value))} className="h-4 w-full overflow-hidden rounded-full bg-muted">
      <div
        className="h-full rounded-full bg-gold transition-[width] duration-700 ease-out"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
