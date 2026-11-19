import { Card, Reveal, Section, SectionHeader, Text } from "../components/ui";

const initials = (name) =>
  name.replace(/^apt\.\s*/i, "").split(",")[0].split(" ").slice(0, 2).map((w) => w[0]).join("");

export default function Mentors({ mentors }) {
  return (
    <Section id="mentor" tone="muted">
      <SectionHeader eyebrow="Mentor" title="Dibimbing langsung oleh apoteker berpengalaman" />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mentors.map((m, i) => (
          <Reveal key={i} delay={i * 80}>
            <Card className="h-full">
              <div aria-hidden className="grid size-14 place-items-center rounded-full bg-brand text-lg font-bold text-white">
                {initials(m.name)}
              </div>
              <p className="mt-5 font-semibold text-fg">{m.name}</p>
              <Text size="sm" className="mt-1">{m.role}</Text>
              <Text size="sm" className="text-fg-subtle">{m.campus}</Text>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
