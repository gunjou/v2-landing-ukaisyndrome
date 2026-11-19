import { BookOpen } from "lucide-react";
import { Badge, Card, Heading, Reveal, Section, SectionHeader, Text } from "../components/ui";

export default function Modules({ modules }) {
  return (
    <Section id="modul">
      <SectionHeader
        eyebrow="Modul terupdate"
        title="Literatur jelas, sesuai blueprint terbaru"
        description="Disusun dari referensi resmi dan diperbarui mengikuti pola soal UKAI terkini."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {modules.map((m, i) => (
          <Reveal key={m.name} delay={i * 100}>
            <Card interactive className="flex h-full flex-col">
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-lg bg-brand-50 text-brand">
                  <BookOpen aria-hidden className="size-5" />
                </span>
                <Badge variant="accent">± {m.pages} halaman</Badge>
              </div>
              <Heading as="h3" size="sm" className="mt-6">{m.name}</Heading>
              <Text size="sm" className="mt-2">{m.description}</Text>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
