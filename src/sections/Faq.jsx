import { Accordion, Button, Reveal, Section, SectionHeader } from "../components/ui";

export default function Faq({ faqs, waLink }) {
  return (
    <Section id="faq" tone="muted">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <SectionHeader eyebrow="FAQ" title="Pertanyaan yang sering diajukan" description="Belum menemukan jawabannya? Tanyakan langsung ke admin kami." />
          <Button href={waLink} variant="brand" className="mt-8" target="_blank" rel="noopener">Tanya Admin</Button>
        </div>
        <Reveal>
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </Section>
  );
}
