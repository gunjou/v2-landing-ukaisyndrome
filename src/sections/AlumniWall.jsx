import { ArrowRight, Quote } from "lucide-react";
import { Badge, Button, Card, Highlight, Marquee, MascotFace, Section, SectionHeader } from "../components/ui";

// Kartu alumni sebagai "lembar hasil UKAI": strip merah di atas, sobekan putus-putus, stempel LULUS + skor akhir
// (bahasa visual yang sama dengan Bukti Kelulusan). Stempel dicap saat masuk layar bila dibungkus Reveal (.al-stamp).
export function AlumniCard({ a }) {
  return (
    <Card as="figure" className="flex h-full flex-col overflow-hidden p-0!">
      <div className="tone-brand flex items-center justify-between gap-3 bg-brand px-5 py-2.5 text-xs font-bold tracking-widest text-fg">
        <span>HASIL UKAI</span>
        <span className="text-highlight">{a.period.toUpperCase()}</span>
      </div>

      <div className="relative flex flex-1 flex-col border-t-2 border-dashed border-line p-5">
        <div aria-hidden className="al-stamp absolute top-4 right-4 -rotate-6 rounded-md border-2 border-brand px-2 py-0.5 text-center text-brand">
          <span className="block text-[10px] font-extrabold tracking-widest">LULUS</span>
          {a.score != null && <span className="block text-lg leading-tight font-bold">{a.score}</span>}
        </div>

        <div className="flex items-center gap-3 pr-20">
          {a.photo ? (
            <img src={a.photo.url} width={a.photo.width} height={a.photo.height} alt={`Foto ${a.name}`} loading="lazy" className="size-14 shrink-0 rounded-full object-cover ring-2 ring-accent" />
          ) : (
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-accent-50 ring-2 ring-accent">
              <MascotFace className="size-10 text-accent" />
            </span>
          )}
          <div className="min-w-0">
            <p className="font-bold text-fg">{a.name}</p>
            <p className="text-sm text-fg-muted">{a.campus}</p>
          </div>
        </div>

        <blockquote className="relative mt-5 flex-1 pl-7 text-fg">
          <Quote aria-hidden className="absolute top-0.5 left-0 size-5 text-accent" />
          {a.story}
        </blockquote>

        <figcaption className="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-4 text-sm text-fg-muted">
          <Badge variant="brand"><span className="capitalize">Paket {a.program}</span></Badge>
          {a.score != null && <span className="ml-auto">Skor akhir <b className="text-fg">{a.score}</b></span>}
        </figcaption>
      </div>
    </Card>
  );
}

// Carousel otomatis tanpa ujung (Marquee). Jumlah alumni ditentukan services/backend.
export default function AlumniWall({ alumni }) {
  return (
    <Section id="alumni" className="overflow-x-clip">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeader
          eyebrow="Wall of Alumni"
          title={<>Mereka sudah jadi <Highlight>apoteker</Highlight></>}
          description="Bukan sekadar angka. Ini wajah di balik stempel LULUS."
        />
        <Button to="/alumni" variant="secondary">Lihat semua alumni <ArrowRight aria-hidden className="size-4" /></Button>
      </div>
      <Marquee
        items={alumni}
        label="Kisah alumni"
        getKey={(a) => a.id}
        render={(a) => <AlumniCard a={a} />}
        itemClassName="w-72 sm:w-80"
        className="mx-[calc(50%-50vw)] px-4 mt-8 md:mt-12"
      />
    </Section>
  );
}
