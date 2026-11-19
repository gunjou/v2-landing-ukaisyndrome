import { ArrowRight, MessageCircle } from "lucide-react";
import { Button, Container, Eyebrow, Heading, Highlight, Reveal, Text } from "../components/ui";

export default function Hero({ site, stats, waLink }) {
  return (
    <section className="tone-brand relative overflow-hidden">
      {/* Pola titik halus agar latar merah tidak datar */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(rgb(255_255_255)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
      <Container className="relative pt-16 pb-20 md:pt-24 md:pb-28">
        <Reveal className="max-w-3xl">
          <Eyebrow>Bimbingan persiapan UKAI CBT & OSCE</Eyebrow>
          <Heading as="h1" size="xl" className="mt-4">
            Bimbingan berkualitas untuk <Highlight>apoteker masa depan</Highlight>
          </Heading>
          <Text size="lg" className="mt-6 max-w-2xl">
            {site.tagline}. Belajar bersama jaringan mentor terluas se-Indonesia, lengkap dengan modul, tryout, dan garansi lulus.
          </Text>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#program" size="lg">
              Lihat Program <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button href={waLink} variant="secondary" size="lg" target="_blank" rel="noopener">
              <MessageCircle aria-hidden className="size-4" /> Konsultasi Gratis
            </Button>
          </div>
        </Reveal>

        <Reveal delay={150} as="dl" className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse bg-brand px-5 py-6">
              <dt className="mt-1 text-sm text-fg-muted">{s.label}</dt>
              <dd className="text-3xl font-bold tracking-tight text-highlight md:text-4xl">{s.value}</dd>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
