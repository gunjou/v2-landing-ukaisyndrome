import { cn } from "./cn";

export default function Divider({ label, className }) {
  if (!label) return <hr className={cn("border-line", className)} />;
  return (
    <div role="separator" className={cn("flex items-center gap-4 text-xs text-fg-subtle", className)}>
      <span className="h-px flex-1 bg-line" />
      {label}
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
