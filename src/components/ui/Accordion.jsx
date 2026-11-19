import { Plus } from "lucide-react";
import { cn } from "./cn";

// Pakai <details> bawaan browser: aksesibel, tanpa JS, isinya tetap terbaca mesin pencari.
// items: [{ question, answer }]
export default function Accordion({ items, className }) {
  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item) => (
        <details key={item.question} name="accordion" className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-semibold text-fg transition-colors hover:text-highlight md:text-lg [&::-webkit-details-marker]:hidden">
            {item.question}
            <Plus aria-hidden className="size-5 shrink-0 text-fg-subtle transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <div className="max-w-3xl pb-5 leading-relaxed text-fg-muted">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
