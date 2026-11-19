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

// Kepala halaman (bukan beranda): latar merah, h1, deskripsi, slot `children` (mis. tombol), `aside` (ilustrasi di kanan, mulai md).
export function PageHeader({ eyebrow, title, description, children, aside }) {
  return (
    <header className="tone-brand">
      <Container className={cn("py-14 md:py-20", aside && "grid items-center gap-8 md:grid-cols-[1.5fr_1fr]")}>
        <div>
          {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
          <Heading as="h1" className="max-w-3xl">{title}</Heading>
          {description && <Text size="lg" className="mt-4 max-w-2xl">{description}</Text>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
        {aside}
      </Container>
    </header>
  );
}
