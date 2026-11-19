import { Plus } from "lucide-react";
import { cn } from "./cn";

// Pakai <details> bawaan browser: aksesibel, tanpa JS, isinya tetap terbaca mesin pencari.
// items: [{ question, answer }]. variant: "line" (garis pemisah) | "card" (kartu bernomor, terbuka = bingkai merah).
export default function Accordion({ items, variant = "line", className }) {
  const card = variant === "card";
  return (
    <div className={cn(card ? "space-y-3" : "divide-y divide-line border-y border-line", className)}>
      {items.map((item, i) => (
        <details
          key={item.question}
          name="accordion"
          className={cn("group", card && "tone-light rounded-xl border border-line bg-bg px-4 transition-colors open:border-brand open:ring-1 open:ring-brand md:px-5")}
        >
          <summary className="flex cursor-pointer list-none items-center gap-4 py-5 text-left text-base font-semibold text-fg transition-colors hover:text-highlight md:text-lg [&::-webkit-details-marker]:hidden">
            {card && (
              <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent-50 text-sm font-extrabold text-accent-dark tabular-nums transition-colors group-open:bg-accent group-open:text-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
            )}
            <span className="flex-1">{item.question}</span>
            <Plus aria-hidden className={cn("size-5 shrink-0 text-fg-subtle transition-transform duration-300 group-open:rotate-45", card && "group-open:text-brand")} />
          </summary>
          <div className={cn("max-w-3xl pb-5 leading-relaxed text-fg-muted", card && "pl-12")}>{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
