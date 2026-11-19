import { Reveal, Section, SectionHeader, Text } from "../components/ui";

export default function Steps({ steps }) {
  return (
    <Section tone="muted">
      <SectionHeader eyebrow="Alur belajar" title="Empat langkah menuju lulus UKAI" align="center" />
      <ol className="mt-12 grid gap-8 md:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 100} className="relative">
            <span className="grid size-10 place-items-center rounded-lg bg-accent text-sm font-bold text-ink">{i + 1}</span>
            {/* Garis penghubung antar langkah (desktop) */}
            {i < steps.length - 1 && <span aria-hidden className="absolute top-5 left-14 hidden h-px w-[calc(100%-3rem)] bg-line md:block" />}
            <h3 className="mt-5 font-semibold text-fg">{s.title}</h3>
            <Text size="sm" className="mt-2">{s.description}</Text>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
