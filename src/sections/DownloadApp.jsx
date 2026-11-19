import { Apple, Play } from "lucide-react";
import { Button, Heading, Highlight, Reveal, Section, Text } from "../components/ui";

export default function DownloadApp({ site }) {
  return (
    <Section id="download" tone="brand-dark">
      <Reveal className="mx-auto max-w-2xl text-center">
        <Heading>
          Belajar lebih mudah, <Highlight>kapanpun & dimanapun</Highlight>
        </Heading>
        <Text size="lg" className="mt-4">
          Akses modul terbaru, mentor profesional, dan latihan soal interaktif langsung dari smartphone.
        </Text>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={site.playStore} size="lg" target="_blank" rel="noopener">
            <Play aria-hidden className="size-4" /> Google Play
          </Button>
          <Button href={site.appStore} variant="secondary" size="lg" target="_blank" rel="noopener">
            <Apple aria-hidden className="size-4" /> App Store
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
