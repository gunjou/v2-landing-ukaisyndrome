import { Check, Info, Minus } from "lucide-react";
import { Button, Card, Heading, Highlight, Reveal, Section, SectionHeader, Text, Tooltip, cn } from "../components/ui";

export default function Programs({ programs, sharedFeatures, guaranteeTerms, waLink }) {
  const maxSessions = Math.max(...programs.map((p) => p.sessions));
  return (
    <Section id="program" tone="brand">
      <SectionHeader
        eyebrow="Pilihan program"
        title={<>Pilih paket sesuai <Highlight>kebutuhanmu</Highlight></>}
        description="Semua paket sudah termasuk modul fisik, tryout CBT, dan garansi lulus."
        align="center"
      />

      {/* Mobile: carousel geser (snap), tablet 2 kolom, desktop 4 kolom. Paket favorit dinaikkan (lg) + pita */}
      <Text size="sm" className="mt-8 text-center md:hidden">Geser untuk melihat paket lain →</Text>
      <div className="-mx-5 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pt-4 pb-2 md:mx-0 md:mt-12 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4 lg:items-center">
        {programs.map((p, i) => (
          <Reveal key={p.id} delay={i * 80} className="w-[82%] max-w-80 shrink-0 snap-center md:w-auto md:max-w-none">
            <Card highlight={p.favorite} className={cn("flex h-full flex-col overflow-visible", p.favorite && "ring-4! ring-accent! lg:-my-4 lg:py-10 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.5)]")}>
              {p.favorite && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-md bg-accent px-3 py-1 text-xs font-extrabold tracking-widest whitespace-nowrap text-ink shadow-sm">
                  PALING DIPILIH
                </span>
              )}
              {/* Kepala ala etiket: nama paket + jumlah pertemuan */}
              <div className="flex items-baseline justify-between gap-3 border-b-2 border-dashed border-line pb-4">
                <Heading as="h3" size="sm">{p.name}</Heading>
                <span className="text-sm text-fg-muted"><strong className="text-lg text-brand">{p.sessions}x</strong> pertemuan</span>
              </div>

              {/* Bar pertemuan relatif ke paket terbanyak */}
              <span aria-hidden className="mt-4 block h-1.5 rounded-full bg-surface">
                <span className="block h-full rounded-full bg-accent" style={{ width: `${(p.sessions / maxSessions) * 100}%` }} />
              </span>

              <ul className="mt-5 flex-1 space-y-2.5 text-sm">
                {p.features.map((f) => {
                  const none = f.value == null;
                  return (
                    <li key={f.label} className={cn("flex gap-2.5", none ? "text-fg-subtle" : "text-fg-muted")}>
                      {none ? <Minus aria-hidden className="mt-0.5 size-4 shrink-0" /> : <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-success" />}
                      <span className={none ? "line-through" : undefined}>
                        {f.label}
                        {!none && <>: <span className="font-semibold text-fg">{f.value}</span></>}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <Button href={`${waLink}?text=${encodeURIComponent(`Halo, saya ingin tahu harga & promo program ${p.name}`)}`} variant={p.favorite ? "primary" : "brand"} className="mt-8 w-full" target="_blank" rel="noopener">
                Tanya harga {p.name}
              </Button>
              <Button to={`/program/${p.id}`} variant="ghost" size="sm" className="mt-2 w-full">Lihat detail</Button>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-6 grid gap-8 rounded-xl border border-line p-6 md:grid-cols-[2fr_1fr] md:p-8">
        <div>
          <p className="font-semibold">Semua paket termasuk</p>
          <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {sharedFeatures.map((f) => (
              <li key={f} className="flex gap-2.5 text-sm text-fg-muted">
                <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-highlight" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative md:border-l md:border-line md:pl-8">
          {/* Stempel garansi, bahasa visual sama dengan stempel LULUS */}
          <span aria-hidden className="pr-stamp absolute -top-2 right-0 -rotate-12 rounded-md border-2 border-highlight px-2 py-0.5 text-center text-highlight" style={{ "--i": 0 }}>
            <span className="block text-[10px] font-extrabold tracking-widest">GARANSI</span>
            <span className="block text-sm leading-tight font-extrabold">LULUS</span>
          </span>
          <p className="flex items-center gap-2 pr-20 font-semibold">
            *Syarat garansi lulus
            <Tooltip content="Garansi berlaku bila semua syarat terpenuhi.">
              <button type="button" aria-label="Info garansi" className="text-fg-subtle"><Info className="size-4" /></button>
            </Tooltip>
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-4 text-sm text-fg-muted">
            {guaranteeTerms.map((t) => <li key={t}>{t}</li>)}
          </ol>
        </div>
      </Reveal>

      <Text size="sm" className="mt-6 text-center">Harga & promo terbaru langsung dari admin via WhatsApp.</Text>
    </Section>
  );
}
