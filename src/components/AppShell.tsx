import { Link } from "@tanstack/react-router";
import { Bell, BookOpen, Flame, Gift, Home, Map, Route, Star, TreePine, User } from "lucide-react";
import type { ReactNode } from "react";
import { ThemeGlyph, ThemeIcon } from "@/components/ThemeSymbols";

const TABS = [
  { to: "/inicio", label: "Início", icon: Home, christmas: TreePine },
  { to: "/trilha", label: "Trilha", icon: Map, christmas: Route },
  { to: "/oracoes", label: "Orações", icon: Flame, christmas: Bell },
  { to: "/biblioteca", label: "Biblioteca", icon: BookOpen, christmas: Gift },
  { to: "/perfil", label: "Conta", icon: User, christmas: Star },
] as const;

export function AppShell({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <div className={`mx-auto min-h-dvh pb-24 ${wide ? "max-w-4xl" : "max-w-md"}`}>
      <main className="animate-rise px-5 pt-6">{children}</main>
      <nav className="lumen-navigation fixed inset-x-0 bottom-0 z-20 border-t-2 border-border bg-card">
        <ul className="mx-auto grid max-w-md grid-cols-5">
          {TABS.map(({ to, label, icon, christmas }) => (
            <li key={to}>
              <Link
                to={to}
                className="flex flex-col items-center gap-1 py-3 text-xs font-bold text-muted-foreground transition active:scale-90 data-[status=active]:text-primary"
              >
                <ThemeIcon icon={icon} christmas={christmas} className="h-6 w-6" />
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
      <ThemeGlyph>✦</ThemeGlyph> {xp} XP
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
