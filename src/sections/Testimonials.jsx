import { Card, Reveal, Section, SectionHeader, Text } from "../components/ui";

export default function Testimonials({ testimonials }) {
  return (
    <Section id="testimoni">
      <SectionHeader eyebrow="Testimoni" title="Cerita mereka yang sudah lulus" />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={i} delay={i * 100}>
            <Card as="figure" className="flex h-full flex-col">
              <span aria-hidden className="text-5xl leading-none font-bold text-accent">“</span>
              <blockquote className="mt-2 flex-1 text-fg">{t.quote}</blockquote>
              <figcaption className="mt-6 border-t border-line pt-4">
                <p className="font-semibold text-fg">{t.name}</p>
                <Text size="sm">{t.campus}</Text>
              </figcaption>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
