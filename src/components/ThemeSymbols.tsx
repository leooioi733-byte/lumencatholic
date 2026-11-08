import { Bell, Gift, Star, TreePine, type LucideIcon, type LucideProps } from "lucide-react";
import { useSettings } from "@/components/SettingsProvider";
import { cn } from "@/lib/utils";

// Seasonal symbols are presentational only; labels, user choices and content remain unchanged.
export function ThemeIcon({ icon: Icon, christmas: ChristmasIcon, ...props }: LucideProps & { icon: LucideIcon; christmas: LucideIcon }) {
  const { settings } = useSettings();
  const Selected = settings.appearance === "christmas" ? ChristmasIcon : Icon;
  return <Selected {...props} aria-hidden="true" />;
}

const SEASONAL_ICONS = [Star, TreePine, Bell, Gift] as const;
export function ThemeGlyph({ children, index = 0, className }: { children: string; index?: number; className?: string }) {
  const { settings } = useSettings();
  const Icon = SEASONAL_ICONS[index % SEASONAL_ICONS.length] ?? Star;
  return settings.appearance === "christmas"
    ? <Icon aria-hidden="true" className={cn("inline-block h-[1em] w-[1em] shrink-0 align-middle", className)} />
    : <span aria-hidden="true" className={className}>{children}</span>;
}

export function ChristmasMark({ className }: { className?: string }) {
  const { settings } = useSettings();
  if (settings.appearance !== "christmas") return null;
  return <span aria-hidden="true" className={cn("inline-flex items-center justify-center gap-3 text-secondary", className)}>
    <Star className="h-4 w-4 text-primary" /><TreePine className="h-10 w-10" strokeWidth={1.7} /><Star className="h-4 w-4 text-primary" />
  </span>;
}