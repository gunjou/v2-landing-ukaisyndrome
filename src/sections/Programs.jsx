import { Check, Info } from "lucide-react";
import { Badge, Button, Card, Heading, Reveal, Section, SectionHeader, Text, Tooltip } from "../components/ui";
import { formatRupiah } from "../services/landing";

const rows = [
  ["Kelas intensif (4–5 jam)", "intensive"],
  ["Kelas online", "online"],
  ["Kelas OSCE", "osce"],
  ["Latihan soal via Zoom", "drill"],
  ["Pretest & posttest", "prePost"],
];

export default function Programs({ programs, sharedFeatures, guaranteeTerms, waLink }) {
  return (
    <Section id="program" tone="brand">
      <SectionHeader
        eyebrow="Pilihan program"
        title="Pilih paket sesuai kebutuhanmu"
        description="Semua paket sudah termasuk modul fisik, tryout CBT, dan garansi lulus."
        align="center"
      />

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {programs.map((p, i) => (
          <Reveal key={p.id} delay={i * 80}>
            <Card highlight={p.favorite} className="flex h-full flex-col">
              <div className="flex h-6 items-center justify-between">
                <Heading as="h3" size="sm">{p.name}</Heading>
                {p.favorite && <Badge variant="accent">Favorit</Badge>}
              </div>
              <p className="mt-4 text-3xl font-bold tracking-tight text-fg">{formatRupiah(p.price)}</p>
              <p className="mt-1 text-sm text-fg-muted">
                <strong className="text-fg">{p.sessions}x</strong> pertemuan
              </p>
              <ul className="mt-6 flex-1 space-y-2.5 border-t border-line pt-6 text-sm">
                {rows.map(([label, key]) =>
                  p[key] === "—" ? null : (
                    <li key={key} className="flex gap-2.5 text-fg-muted">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-success" />
                      <span>
                        {label}: <span className="font-semibold text-fg">{typeof p[key] === "number" ? `${p[key]} soal` : p[key]}</span>
                      </span>
                    </li>
                  ),
                )}
              </ul>
              <Button href={`${waLink}?text=${encodeURIComponent(`Halo, saya tertarik program ${p.name}`)}`} variant={p.favorite ? "primary" : "brand"} className="mt-8 w-full" target="_blank" rel="noopener">
                Pilih {p.name}
              </Button>
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
        <div className="md:border-l md:border-line md:pl-8">
          <p className="flex items-center gap-2 font-semibold">
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

      <Text size="sm" className="mt-6 text-center">Harga dapat berubah sewaktu-waktu. Hubungi admin untuk promo terbaru.</Text>
    </Section>
  );
}
