import { cn } from "./cn";

// `highlight` untuk kartu yang ditonjolkan (mis. paket favorit).
export default function Card({ as: Tag = "div", highlight = false, interactive = false, className, children, ...props }) {
  return (
    <Tag
      className={cn(
        "tone-light relative rounded-xl border bg-bg p-6",
        highlight ? "border-brand ring-1 ring-brand" : "border-line",
        interactive && "transition-shadow duration-200 hover:shadow-[0_8px_24px_-12px_rgb(31_26_26/0.18)]",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
