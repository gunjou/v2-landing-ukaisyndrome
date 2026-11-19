import { ClipboardList, GraduationCap, PenLine, Users } from "lucide-react";
import { Card, Highlight, Reveal, Section, SectionHeader, Text } from "../components/ui";

// Alur belajar sebagai jalur progres: garis merah terisi (st-fill-*), titik langkah menyala kuning berurutan (st-dot),
// langkah terakhir dicap LULUS (pr-stamp). Mobile: jalur vertikal di kiri; md: horizontal. Animasi di index.css.
// shortcut: ikon dipetakan per urutan, pindahkan ke data bila jumlah/urutan langkah diatur admin.
const ICONS = [ClipboardList, Users, PenLine, GraduationCap];

export default function Steps({ steps }) {
  const last = steps.length - 1;
  return (
    <Section className="py-12 md:py-16">
      <SectionHeader eyebrow="Alur belajar" title={<>Empat langkah menuju <Highlight>lulus UKAI</Highlight></>} align="center" className="max-w-3xl" />
      <Reveal className="relative mt-8 md:mt-10">
        {/* Jalur: abu sebagai rel, merah terisi saat masuk layar */}
        <span aria-hidden className="absolute top-6 bottom-6 left-6 w-1 -translate-x-1/2 rounded-full bg-line md:hidden">
          <span className="st-fill-y block size-full rounded-full bg-brand" />
        </span>
        <span aria-hidden className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-1 -translate-y-1/2 rounded-full bg-line md:block">
          <span className="st-fill-x block size-full rounded-full bg-brand" />
        </span>

        <ol className="relative grid gap-3 md:grid-cols-4 md:gap-4">
          {steps.map((s, i) => {
            const Icon = ICONS[i % ICONS.length];
            const final = i === last;
            return (
              <li key={s.title} className="flex items-start gap-3 md:flex-col md:items-center md:gap-0">
                <span
                  className={`st-dot grid size-12 shrink-0 place-items-center rounded-full text-lg font-extrabold ring-4 ring-bg ${final ? "bg-brand text-accent" : "bg-accent text-ink"}`}
                  style={{ "--i": i }}
                >
                  {final ? <GraduationCap aria-hidden className="size-6" /> : i + 1}
                </span>
                <Card highlight={final} className="relative flex-1 p-4! md:mt-4 md:w-full">
                  {final && (
                    <span aria-hidden className="pr-stamp absolute -top-3 right-4 -rotate-6 rounded-md border-2 border-brand bg-bg px-2 text-xs font-extrabold tracking-widest text-brand" style={{ "--i": 0 }}>
                      LULUS
                    </span>
                  )}
                  {/* Ikon sebaris dengan judul agar kartu pendek */}
                  <h3 className="flex items-center gap-2 pr-12 font-bold text-fg">
                    <Icon aria-hidden className="size-4 shrink-0 text-accent-dark" />
                    {s.title}
                  </h3>
                  <Text size="sm" className="mt-1">{s.description}</Text>
                </Card>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </Section>
  );
}
