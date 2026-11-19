import { cn } from "./cn";

const variants = {
  brand: "bg-brand-50 text-brand",
  accent: "bg-accent-50 text-accent-dark",
  success: "bg-success-50 text-success",
  neutral: "bg-surface text-fg-muted",
};

export default function Badge({ variant = "neutral", className, children }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold", variants[variant], className)}>
      {children}
    </span>
  );
}
