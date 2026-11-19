import { Badge, Heading, Highlight, Reveal, Section, SectionHeader, Text } from "../components/ui";

// Mockup buku fisik 3D dengan CSS (tanpa library): cover = gambar CDN, sisi kanan = tumpukan halaman,
// tebal buku mengikuti jumlah halaman. Masuk berputar (mod-enter), bergoyang pelan (mod-sway),
// hover/fokus = cover terbuka mengintip isi (mod-cover). Animasi di index.css.
function Book({ m, i }) {
  // 200 hlm ≈ 14px, 600 hlm ≈ 34px
  const thickness = `${Math.round(4 + m.pages / 20)}px`;
  return (
    <div className="mod-stage" style={{ "--t": thickness, "--i": i }}>
      <div className="mod-enter">
        <div className="mod-sway">
          <div className="mod-book relative aspect-[4/5] w-full">
            {/* Belakang & tumpukan halaman */}
            <div className="mod-back absolute inset-0 rounded-r-md bg-brand-dark" />
            <div className="mod-pages absolute top-[1.5%] h-[97%]" />
            {/* Halaman pertama, terlihat saat cover terbuka */}
            <div className="mod-page1 absolute inset-[1.5%] rounded-r-sm bg-bg p-[10%]">
              <p className="text-[10px] font-bold tracking-widest text-accent-dark">MODUL {m.name.toUpperCase()}</p>
              {[100, 90, 95, 70, 88, 60].map((w, k) => (
                <span key={k} className="mt-2 block h-1.5 rounded-full bg-line" style={{ width: `${w}%` }} />
              ))}
            </div>
            {/* Cover */}
            <div className="mod-cover absolute inset-0 overflow-hidden rounded-r-md bg-brand shadow-[inset_6px_0_8px_-4px_rgb(0_0_0/0.35)]">
              {m.cover ? (
                <img src={m.cover.url} width={m.cover.width} height={m.cover.height} alt={`Cover modul ${m.name}`} loading="lazy" className="size-full object-cover" />
              ) : (
                <div className="tone-brand grid size-full place-items-center p-4 text-center text-xl font-extrabold text-accent">{m.name}</div>
              )}
              {/* Lipatan punggung buku */}
              <span aria-hidden className="absolute inset-y-0 left-[4%] w-px bg-black/20" />
            </div>
          </div>
        </div>
      </div>
      {/* Bayangan di rak */}
      <span aria-hidden className="mx-auto mt-3 block h-3 w-3/4 rounded-[50%] bg-ink/15 blur-md" />
    </div>
  );
}

export default function Modules({ modules }) {
  return (
    <Section id="modul">
      <SectionHeader
        eyebrow="Modul terupdate"
        title={<>Literatur jelas, sesuai <Highlight>blueprint terbaru</Highlight></>}
        description="Disusun dari referensi resmi dan diperbarui mengikuti pola soal UKAI terkini."
      />
      <Reveal className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m, i) => (
          <article key={m.name} tabIndex={0} className="group rounded-xl outline-offset-4">
            {/* Rak: panel abu dengan papan merah di bawah buku */}
            <div className="rounded-xl bg-surface px-10 pt-10 pb-4 sm:px-12">
              <div className="mx-auto max-w-52"><Book m={m} i={i} /></div>
              <span aria-hidden className="mt-1 block h-2 rounded-full bg-brand" />
            </div>
            <div className="mt-5 flex items-center justify-between gap-3">
              <Heading as="h3" size="sm">{m.name}</Heading>
              <Badge variant="accent">± {m.pages} halaman</Badge>
            </div>
            <Text size="sm" className="mt-2">{m.description}</Text>
          </article>
        ))}
      </Reveal>
    </Section>
  );
}
