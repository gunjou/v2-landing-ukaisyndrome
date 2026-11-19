import { MessageCircle } from "lucide-react";
import { Accordion, Button, Card, Highlight, MascotFace, Reveal, Section, SectionHeader } from "../components/ui";

// Jawab keberatan: daftar FAQ sebagai kartu bernomor; kolom kiri menempel (lg) dengan "gelembung chat" ke admin.
export default function Faq({ faqs, waLink }) {
  return (
    <Section id="faq" tone="muted">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-12">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionHeader eyebrow="FAQ" title={<>Pertanyaan yang <Highlight>sering diajukan</Highlight></>} />
          <Card className="mt-8">
            {/* Ekor gelembung chat */}
            <span aria-hidden className="absolute -top-2 left-8 size-4 rotate-45 border-t border-l border-line bg-bg" />
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent-50 ring-2 ring-accent">
                <MascotFace className="size-9" />
              </span>
              <div>
                <p className="font-bold text-fg">Masih ada yang bikin ragu?</p>
                <p className="mt-1 text-sm text-fg-muted">Tanyakan langsung ke admin kami lewat WhatsApp.</p>
              </div>
            </div>
            <Button href={waLink} className="mt-5 w-full" target="_blank" rel="noopener">
              <MessageCircle aria-hidden className="size-4" /> Tanya Admin
            </Button>
          </Card>
        </div>
        <Reveal>
          <Accordion variant="card" items={faqs} />
        </Reveal>
      </div>
    </Section>
  );
}
