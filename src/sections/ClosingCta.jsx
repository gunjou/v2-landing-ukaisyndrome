import { ArrowRight } from "lucide-react";
import { Button, Container, Heading, Highlight, Reveal, Text } from "../components/ui";

export default function ClosingCta({ waLink }) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <Reveal className="tone-brand rounded-2xl px-6 py-14 text-center md:px-16">
          <Heading size="md" className="mx-auto max-w-2xl">
            Saatnya serius menyiapkan UKAI. <Highlight>Mulai hari ini.</Highlight>
          </Heading>
          <Text className="mx-auto mt-4 max-w-xl">Konsultasikan jadwal ujian dan kebutuhan belajarmu, admin kami bantu pilihkan program yang tepat.</Text>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="#program" size="lg">Lihat Program <ArrowRight aria-hidden className="size-4" /></Button>
            <Button href={waLink} variant="secondary" size="lg" target="_blank" rel="noopener">Hubungi Admin</Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
