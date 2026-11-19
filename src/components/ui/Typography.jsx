import { cn } from "./cn";

const headingSizes = {
  xl: "text-4xl leading-[1.1] tracking-[-0.03em] md:text-6xl",
  lg: "text-3xl leading-[1.15] tracking-[-0.025em] md:text-5xl",
  md: "text-2xl leading-tight tracking-[-0.02em] md:text-3xl",
  sm: "text-xl leading-snug tracking-[-0.01em]",
};

// `as` menentukan level semantik (h1–h4), `size` menentukan tampilan.
export function Heading({ as: Tag = "h2", size = "lg", className, children }) {
  return <Tag className={cn("font-bold text-balance text-fg", headingSizes[size], className)}>{children}</Tag>;
}

// Label kecil di atas judul.
export function Eyebrow({ className, children }) {
  return <p className={cn("text-sm font-semibold text-highlight", className)}>{children}</p>;
}

const textSizes = {
  lg: "text-lg leading-relaxed",
  md: "text-base leading-relaxed",
  sm: "text-sm leading-relaxed",
};

export function Text({ as: Tag = "p", size = "md", muted = true, className, children }) {
  return <Tag className={cn(textSizes[size], muted ? "text-fg-muted" : "text-fg", "text-pretty", className)}>{children}</Tag>;
}
