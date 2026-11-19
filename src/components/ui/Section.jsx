import Container from "./Container";
import { cn } from "./cn";
import { Eyebrow, Heading, Text } from "./Typography";

const tones = {
  default: "",
  muted: "bg-surface",
  brand: "tone-brand",
  "brand-dark": "tone-brand-dark",
};

// tone: default (putih) | muted (abu) | brand (merah, dominan) | brand-dark (maroon)
export function Section({ id, tone = "default", className, children }) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-16 md:py-24", tones[tone], className)}>
      <Container>{children}</Container>
    </section>
  );
}

// Pembuka section: eyebrow + judul + deskripsi.
export function SectionHeader({ eyebrow, title, description, align = "left", className }) {
  const center = align === "center";
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
      <Heading>{title}</Heading>
      {description && <Text size="lg" className="mt-4">{description}</Text>}
    </div>
  );
}
