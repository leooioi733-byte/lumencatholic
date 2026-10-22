import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const lumenButton = cva(
  "btn-3d inline-flex w-full items-center justify-center px-6 py-4 text-lg uppercase disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground [--btn-depth:var(--primary-deep)]",
        gold: "bg-gold text-gold-foreground [--btn-depth:var(--gold-deep)]",
        outline: "border-2 border-border bg-card text-primary [--btn-depth:var(--border)]",
        success: "bg-success text-success-foreground [--btn-depth:var(--success-deep)]",
        danger: "bg-destructive text-destructive-foreground [--btn-depth:var(--destructive-deep)]",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

export function LumenButton({
  className,
  variant,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof lumenButton>) {
  return <button className={cn(lumenButton({ variant }), className)} {...props} />;
}
