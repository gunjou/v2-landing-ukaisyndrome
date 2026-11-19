import { ArrowRight, MessageCircle } from "lucide-react";
import { Button, Container, Heading, Highlight, MascotFace, MascotGraduate, Reveal, Text } from "../components/ui";

// Ajakan penutup: kotak merah dua kolom, maskot wisuda menutup cerita maskot (belajar → lulus → wisuda: "giliranmu").
// Bukti sosial kecil dari stats[0] (jumlah siswa). Kapsul dekoratif melayang (mascot-float).
export default function ClosingCta({ waLink, students }) {
  return (
    <section className="pb-16 md:pb-24">
      <Container>
        <Reveal className="tone-brand relative grid items-center gap-8 overflow-hidden rounded-2xl bg-brand px-6 py-12 md:grid-cols-[1.5fr_1fr] md:px-14 md:py-14">
          {/* Dekorasi: kapsul samar */}
          <span aria-hidden className="mascot-float absolute right-1/3 bottom-8 h-5 w-12 -rotate-30 rounded-full bg-accent opacity-30" />
          <span aria-hidden className="mascot-float absolute top-10 right-10 size-4 rounded-full bg-fg opacity-20 [animation-delay:-3s]" />

          <div className="relative text-center md:text-left">
            <Heading size="lg" className="max-w-xl">
              Giliranmu jadi <Highlight>apoteker.</Highlight>
            </Heading>
            <Text size="lg" className="mt-4 max-w-lg">Konsultasikan jadwal ujian dan kebutuhan belajarmu, admin kami bantu pilihkan program yang tepat.</Text>
            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <Button href={waLink} size="lg" target="_blank" rel="noopener"><MessageCircle aria-hidden className="size-4" /> Konsultasi gratis</Button>
              <Button href="#program" variant="secondary" size="lg">Lihat program <ArrowRight aria-hidden className="size-4" /></Button>
            </div>
            {students && (
              <div className="mt-8 flex items-center justify-center gap-3 md:justify-start">
                <div aria-hidden className="flex -space-x-2">
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className="grid size-9 place-items-center rounded-full bg-brand-dark ring-2 ring-brand">
                      <MascotFace className="size-7" />
                    </span>
                  ))}
                </div>
                <p className="text-sm text-fg-muted">Bergabung dengan <strong className="text-fg">{students.value} {students.label.toLowerCase()}</strong></p>
              </div>
            )}
          </div>
          <MascotGraduate className="relative mx-auto max-w-52 md:max-w-80" />
        </Reveal>
      </Container>
    </section>
  );
}
