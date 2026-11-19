import { Check, Quote } from "lucide-react";
import { Badge, Card, Highlight, Marquee, MascotFace, Section, SectionHeader } from "../components/ui";

// Kartu mentor meniru poster mentor lama: area foto merah, tanda kutip, nama di pita kuning miring (stabilo),
// IPK sebagai angka besar + bar skala 4.00, lalu poin prestasi. Data = kontrak backend (lihat data/landing.js).
function MentorCard({ m }) {
  return (
    <Card as="article" className="flex h-full flex-col overflow-hidden p-0!">
      <div className="tone-brand relative aspect-[5/4] bg-brand">
        {m.photo ? (
          <img src={m.photo.url} width={m.photo.width} height={m.photo.height} alt={`Foto ${m.name}`} loading="lazy" className="size-full object-cover object-top" />
        ) : (
          <div className="grid size-full place-items-center">
            <MascotFace className="size-28 opacity-90" />
          </div>
        )}
        <Quote aria-hidden className="absolute top-3 left-3 size-7 fill-bg text-bg" />
        <Badge variant="accent" className="absolute top-3 right-3 uppercase">Mentor {m.mode}</Badge>
        {/* Pita nama */}
        <p className="absolute right-3 -bottom-4 left-3 -rotate-2 rounded-sm bg-accent px-3 py-1.5 text-center text-sm font-bold text-ink shadow-sm">
          {m.name}
        </p>
      </div>

      <div className="flex flex-1 flex-col p-5 pt-8">
        <p className="text-sm font-semibold text-fg">{m.campus}</p>
        {m.gpa != null && (
          <div className="mt-3">
            <p className="flex items-baseline gap-1.5">
              <span className="text-xs font-bold tracking-widest text-fg-subtle">IPK</span>
              <span className="text-2xl font-extrabold text-brand tabular-nums">{m.gpa.toFixed(2)}</span>
              <span className="text-sm text-fg-subtle">/ 4.00</span>
            </p>
            <span aria-hidden className="mt-1.5 block h-1.5 rounded-full bg-line">
              <span className="block h-full rounded-full bg-accent" style={{ width: `${(m.gpa / 4) * 100}%` }} />
            </span>
          </div>
        )}
        <ul className="mt-4 space-y-1.5 text-sm text-fg-muted">
          {m.achievements.map((t) => (
            <li key={t} className="flex gap-2">
              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-success" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

// Carousel tanpa ujung bergerak ke kanan (berlawanan dengan Alumni) agar ritme halaman tidak monoton.
export default function Mentors({ mentors }) {
  return (
    <Section id="mentor" tone="muted" className="overflow-x-clip">
      <div className="flex items-end justify-between gap-6">
        <SectionHeader
          eyebrow="Mentor"
          title={<>Dibimbing langsung oleh <Highlight>apoteker terbaik</Highlight></>}
          description="Lulusan cumlaude dan praktisi berpengalaman yang mendampingi sampai hari ujian."
        />
      </div>
      <Marquee
        items={mentors}
        label="Daftar mentor"
        getKey={(m) => m.id}
        render={(m) => <MentorCard m={m} />}
        reverse
        itemClassName="w-64 sm:w-72"
        className="mx-[calc(50%-50vw)] px-4 mt-8 md:mt-10"
      />
    </Section>
  );
}
