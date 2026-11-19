import { CountUp, Highlight, Reveal, Section, SectionHeader } from "../components/ui";
import { roundedPlus } from "../services/landing";
import { DOTS, VIEWBOX, project } from "./indonesia-dots";

// Sebaran kelas & mentor sebagai heatmap: peta Indonesia dot-matrix di panel maroon, tiap kota bersinar (kuning → merah)
// sebesar jumlah kelompok belajarnya. 5 kota teratas berdenyut. Glow muncul berurutan saat masuk layar (.net-glow).
// Peringkat kota di samping peta = versi teks dari peta (terbaca Google & pembaca layar).
const TOP = 5;

export default function Network({ network }) {
  const cities = [...network.cities].sort((a, b) => b.groups - a.groups);
  const max = cities[0].groups;
  const groups = cities.reduce((n, c) => n + c.groups, 0);
  const stats = [
    [roundedPlus(network.mentors), "mentor apoteker"],
    [`${groups}`, "kelompok belajar"],
    [`${cities.length}`, "kota"],
  ];

  return (
    <Section id="sebaran" tone="muted">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHeader eyebrow="Sebaran kelas & mentor" title={<>Belajar dekat, <Highlight>di {cities.length} kota</Highlight></>} description={network.description} />
        <dl className="flex gap-8">
          {stats.map(([value, label]) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd className="text-3xl font-extrabold text-brand tabular-nums"><CountUp value={value} /></dd>
              <dd className="text-sm text-fg-muted">{label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Reveal className="tone-brand-dark mt-10 grid gap-6 rounded-2xl bg-brand-dark p-4 sm:p-6 grid-cols-1 items-center lg:grid-cols-[1fr_16rem] lg:p-8">
        <figure>
          <svg viewBox={VIEWBOX} role="img" aria-label={`Peta sebaran ${groups} kelompok belajar Syndrome UKAI di ${cities.length} kota`} className="w-full overflow-visible">
            <defs>
              <radialGradient id="net-heat">
                <stop offset="0%" className="[stop-color:var(--color-accent-hover)]" stopOpacity="0.95" />
                <stop offset="45%" className="[stop-color:var(--color-accent)]" stopOpacity="0.55" />
                <stop offset="100%" className="[stop-color:var(--color-brand)]" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path d={DOTS} className="fill-none stroke-fg opacity-30" strokeWidth="3.2" strokeLinecap="round" />
            {/* Kecil dulu agar glow besar tidak menutupi titik kota kecil */}
            {[...cities].reverse().map((c) => {
              const [x, y] = project(c.lng, c.lat);
              const rank = cities.indexOf(c);
              const r = 4 + Math.sqrt(c.groups / max) * 22;
              return (
                <g key={c.city} className="net-glow" style={{ "--i": Math.min(rank, 12), transformOrigin: `${x}px ${y}px` }}>
                  <title>{`${c.city}: ${c.groups} kelompok`}</title>
                  <circle cx={x} cy={y} r={r} fill="url(#net-heat)" className="mix-blend-screen" />
                  {rank < TOP && <circle cx={x} cy={y} r="5" className="net-pulse fill-none stroke-accent" strokeWidth="1" style={{ transformOrigin: `${x}px ${y}px`, "--i": rank }} />}
                  <circle cx={x} cy={y} r="1.6" className="fill-accent" />
                </g>
              );
            })}
          </svg>
          <figcaption className="mt-3 flex items-center gap-3 text-xs text-fg-muted">
            <span>Sedikit</span>
            <span aria-hidden className="h-1.5 w-24 rounded-full bg-gradient-to-r from-brand to-accent-hover" />
            <span>Banyak kelompok belajar</span>
          </figcaption>
        </figure>

        <div>
          <p className="text-xs font-bold tracking-widest text-highlight">KOTA TERAKTIF</p>
          <ol className="mt-3 space-y-3">
            {cities.slice(0, 6).map((c, i) => (
              <li key={c.city}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-semibold text-fg"><span className="mr-2 text-fg-subtle tabular-nums">{i + 1}</span>{c.city}</span>
                  <span className="text-fg-muted tabular-nums">{c.groups} kelompok</span>
                </div>
                <span aria-hidden className="mt-1 block h-1.5 rounded-full bg-surface">
                  <span className="block h-full rounded-full bg-accent" style={{ width: `${(c.groups / max) * 100}%` }} />
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-2">
          <p className="text-xs font-bold tracking-widest text-highlight">+ {cities.length - 6} KOTA LAIN</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {cities.slice(6).map((c) => (
              <li key={c.city} className="rounded-md border border-line px-2 py-0.5 text-xs text-fg-muted">
                {c.city} <span className="text-fg-subtle tabular-nums">{c.groups}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
