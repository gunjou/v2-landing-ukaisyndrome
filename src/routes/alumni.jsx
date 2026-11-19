import { useState } from "react";
import { useLoaderData } from "react-router";
import { Button, Highlight, MascotFace, MascotGraduate, PageHeader, Reveal, Section, cn } from "../components/ui";
import { seo } from "../seo";
import ClosingCta from "../sections/ClosingCta";
import { getAlumni } from "../services/landing";
import { AlumniCard } from "../sections/AlumniWall";

export async function loader() {
  return getAlumni();
}

export function meta() {
  return seo({
    title: "Wall of Alumni — Kisah Lulus UKAI",
    description: "Kisah alumni Syndrome UKAI yang lulus UKAI CBT dan OSCE. Lengkap dengan kampus, periode, dan paket.",
    path: "/alumni",
  });
}

export default function Alumni() {
  const { alumni, site, students } = useLoaderData();
  const waLink = `https://wa.me/${site.whatsapp}`;
  const [period, setPeriod] = useState(null);
  const periods = [...new Set(alumni.map((a) => a.period))];
  const shown = period ? alumni.filter((a) => a.period === period) : alumni;
  // Angka ringkas di header, dihitung dari data yang tampil di halaman ini.
  const scores = alumni.map((a) => a.score).filter((s) => s != null);
  const stats = [
    [alumni.length, "kisah alumni"],
    [periods.length, "periode UKAI"],
    ...(scores.length ? [[Math.round(scores.reduce((n, s) => n + s, 0) / scores.length), "rata-rata skor akhir"]] : []),
  ];

  return (
    <main>
      <PageHeader
        eyebrow="Wall of Alumni"
        title={<>Mereka sudah jadi <Highlight>apoteker</Highlight></>}
        description="Kisah nyata alumni Syndrome UKAI yang sudah lulus UKAI."
        aside={<MascotGraduate className="mx-auto max-w-36 md:max-w-72" />}
      >
        <dl className="flex flex-wrap gap-x-6 gap-y-4 sm:gap-x-8">
          {stats.map(([value, label]) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd className="text-2xl font-extrabold sm:text-3xl text-accent tabular-nums">{value}</dd>
              <dd className="text-sm text-fg-muted">{label}</dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <Section>
        {/* Filter periode sebagai chip; jumlah alumni per periode di dalamnya */}
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter periode">
          {[null, ...periods].map((p) => (
            <button
              key={p ?? "all"}
              type="button"
              aria-pressed={period === p}
              onClick={() => setPeriod(p)}
              className={cn(
                "flex h-9 items-center gap-2 rounded-lg border px-3.5 text-sm font-semibold transition-colors",
                period === p ? "border-accent bg-accent text-ink" : "border-line text-fg-muted hover:text-fg",
              )}
            >
              {p ?? "Semua periode"}
              <span className={cn("rounded px-1.5 text-xs tabular-nums", period === p ? "bg-ink/10" : "bg-surface")}>
                {p ? alumni.filter((a) => a.period === p).length : alumni.length}
              </span>
            </button>
          ))}
        </div>

        {shown.length ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((a, i) => (
              // key ikut periode agar stempel dicap ulang saat filter berganti
              <Reveal key={`${period}-${a.id}`} delay={(i % 3) * 100}>
                <AlumniCard a={a} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center text-center">
            <MascotFace mood="sad" className="size-16 text-line" />
            <p className="mt-4 font-semibold text-fg">Belum ada alumni untuk periode ini.</p>
            <Button variant="secondary" className="mt-4" onClick={() => setPeriod(null)}>Lihat semua periode</Button>
          </div>
        )}
      </Section>

      <ClosingCta waLink={waLink} students={students} />
    </main>
  );
}
