import { ArrowLeft, Check, Minus, UserCheck } from "lucide-react";
import { Link, useLoaderData } from "react-router";
import { Button, Card, Container, Heading, Highlight, Reveal, Section, SectionHeader, Text, cn } from "../components/ui";
import { SITE_URL, seo } from "../seo";
import ClosingCta from "../sections/ClosingCta";
import { getProgram } from "../services/landing";

export async function loader({ params }) {
  const data = await getProgram(params.slug);
  if (!data) throw new Response("Not Found", { status: 404 });
  return data;
}

export function meta({ data }) {
  const { program: p } = data;
  return seo({
    title: `Paket ${p.name} — Bimbingan UKAI ${p.sessions}x Pertemuan`,
    description: `Paket ${p.name} Syndrome UKAI: ${p.sessions}x pertemuan, ${p.features.filter((f) => f.value).map((f) => `${f.label.toLowerCase()} ${f.value}`).join(", ")}, modul fisik, tryout CBT, dan garansi lulus. Lihat silabus dan jadwal.`,
    path: `/program/${p.id}`,
    jsonLd: [{
      "@context": "https://schema.org",
      "@type": "Course",
      name: `Program ${p.name} — Bimbingan UKAI`,
      description: data.detail.schedule,
      provider: { "@id": `${SITE_URL}/#organization` },
    }],
  });
}

// Pengalih antar paket (chip), paket aktif kuning.
function ProgramSwitch({ programs, current }) {
  return (
    <nav aria-label="Paket lain" className="flex flex-wrap gap-2">
      {programs.map((o) => (
        <Link
          key={o.id}
          to={`/program/${o.id}`}
          aria-current={o.id === current ? "page" : undefined}
          className={cn(
            "rounded-lg border px-3 py-1.5 text-sm font-semibold transition-colors",
            o.id === current ? "border-accent bg-accent text-ink" : "border-line text-fg-muted hover:text-fg",
          )}
        >
          {o.name}
        </Link>
      ))}
    </nav>
  );
}

// Ringkasan paket ala etiket obat: kepala bergaris putus, jumlah pertemuan besar, fitur (yang tidak ada dicoret), stempel garansi.
function Etiket({ p }) {
  return (
    <Card className="relative p-6! shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] md:p-8!">
      <span aria-hidden className="pr-stamp absolute -top-4 -right-3 -rotate-12 rounded-md border-2 border-brand bg-bg px-2 py-0.5 text-center text-brand" style={{ "--i": 0 }}>
        <span className="block text-[10px] font-extrabold tracking-widest">GARANSI</span>
        <span className="block text-sm leading-tight font-extrabold">LULUS</span>
      </span>
      <div className="flex items-baseline justify-between gap-3 border-b-2 border-dashed border-line pb-4">
        <p className="text-xs font-bold tracking-widest text-fg-subtle">ETIKET PAKET</p>
        <p className="text-lg font-bold text-fg">{p.name}</p>
      </div>
      <p className="mt-5 flex items-baseline gap-2">
        <span className="text-5xl font-extrabold tracking-tight text-brand tabular-nums">{p.sessions}x</span>
        <span className="text-fg-muted">pertemuan</span>
      </p>
      <ul className="mt-5 space-y-2.5 text-sm">
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
    </Card>
  );
}

export default function Program() {
  const { program: p, detail, programs, sharedFeatures, guaranteeTerms, site, students } = useLoaderData();
  const waLink = `https://wa.me/${site.whatsapp}`;
  const wa = `${waLink}?text=${encodeURIComponent(`Halo, saya ingin tahu harga & promo program ${p.name}`)}`;

  return (
    <main>
      <header className="tone-brand bg-brand">
        <Container>
        <Reveal className="grid items-center gap-10 py-12 md:grid-cols-[1.3fr_1fr] md:py-16">
          <div>
            <Link to="/#program" className="inline-flex items-center gap-1.5 text-sm font-semibold text-fg-muted hover:text-highlight">
              <ArrowLeft aria-hidden className="size-4" /> Semua paket
            </Link>
            <div className="mt-5"><ProgramSwitch programs={programs} current={p.id} /></div>
            <p className="mt-8 flex flex-wrap items-center gap-3 text-sm font-semibold text-highlight">
              Paket {p.name}
              {p.favorite && <span className="rounded-md bg-accent px-2 py-0.5 text-xs font-extrabold tracking-widest text-ink">PALING DIPILIH</span>}
            </p>
            <Heading as="h1" className="mt-3 max-w-xl">
              <Highlight>{p.sessions}x pertemuan</Highlight> menuju lulus UKAI
            </Heading>
            <Text size="lg" className="mt-4 max-w-xl">{detail.schedule}</Text>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={wa} size="lg" target="_blank" rel="noopener">Tanya harga {p.name}</Button>
              <Button to="/#program" variant="secondary" size="lg">Bandingkan paket</Button>
            </div>
          </div>
          <Etiket p={p} />
        </Reveal>
        </Container>
      </header>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <SectionHeader eyebrow="Cocok untuk" title="Paket ini untukmu bila…" />
            <ul className="mt-6 space-y-3">
              {detail.audience.map((t) => (
                <li key={t}>
                  <Card className="flex items-start gap-3 p-4!">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand"><UserCheck aria-hidden className="size-5" /></span>
                    <span className="pt-1.5 text-fg">{t}</span>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader eyebrow="Silabus" title="Yang akan kamu pelajari" />
            {/* Silabus sebagai jalur bernomor, senada dengan Alur belajar */}
            <ol className="relative mt-6 space-y-4 before:absolute before:top-4 before:bottom-4 before:left-[1.125rem] before:w-0.5 before:bg-line">
              {detail.syllabus.map((t, i) => (
                <li key={t} className="relative flex items-center gap-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-sm font-extrabold text-ink ring-4 ring-bg tabular-nums">{i + 1}</span>
                  <span className="font-semibold text-fg">{t}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-8 md:grid-cols-[1.6fr_1fr] md:gap-12">
          <div>
            <SectionHeader eyebrow="Termasuk" title="Semua yang kamu dapat" />
            <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {sharedFeatures.map((f) => (
                <li key={f} className="flex gap-2.5 text-fg-muted">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-success" />{f}
                </li>
              ))}
            </ul>
          </div>
          <Reveal>
            <Card className="relative">
              <span aria-hidden className="pr-stamp absolute -top-3 right-4 -rotate-12 rounded-md border-2 border-brand bg-bg px-2 py-0.5 text-center text-brand" style={{ "--i": 0 }}>
                <span className="block text-[10px] font-extrabold tracking-widest">GARANSI</span>
                <span className="block text-sm leading-tight font-extrabold">LULUS</span>
              </span>
              <p className="pr-20 font-bold text-fg">*Syarat garansi lulus</p>
              <ol className="mt-4 space-y-3">
                {guaranteeTerms.map((t, i) => (
                  <li key={t} className="flex gap-3 text-sm text-fg-muted">
                    <span className="grid size-6 shrink-0 place-items-center rounded-md bg-accent-50 text-xs font-extrabold text-accent-dark">{i + 1}</span>
                    {t}
                  </li>
                ))}
              </ol>
            </Card>
          </Reveal>
        </div>
        <Text size="sm" className="mt-8">Harga & promo terbaru langsung dari admin via WhatsApp.</Text>
      </Section>

      <ClosingCta waLink={waLink} students={students} />
    </main>
  );
}
