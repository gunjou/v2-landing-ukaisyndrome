import { ArrowRight, Check, Download, Info } from "lucide-react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  Container,
  Divider,
  Eyebrow,
  Footer,
  Heading,
  Highlight,
  Logo,
  Navbar,
  Reveal,
  SectionHeader,
  Tabs,
  Text,
  Tooltip,
} from "../components/ui";

// Halaman galeri komponen (khusus development). Setiap komponen umum baru wajib ditambahkan di sini.

export function meta() {
  return [{ title: "UI Kit — Syndrome UKAI" }, { name: "robots", content: "noindex" }];
}

const sample = {
  links: [
    { label: "Capaian", href: "#capaian" },
    { label: "Mentor", href: "#mentor" },
    { label: "Modul", href: "#modul" },
    { label: "Program", href: "#program" },
  ],
  faq: [
    { question: "Apa itu Garansi Lulus?", answer: "Jaminan bimbingan ulang tanpa biaya bila belum lulus, dengan syarat tidak bolos lebih dari 3x dan mengerjakan seluruh pretest, posttest, dan tryout." },
    { question: "Apakah kelas bisa diikuti online?", answer: "Bisa. Seluruh program memiliki sesi online, rekaman kelas dapat diakses sampai hari UKAI." },
  ],
};

const sections = [
  ["logo", "Logo"],
  ["warna", "Warna"],
  ["tipografi", "Tipografi"],
  ["button", "Button"],
  ["badge", "Badge"],
  ["card", "Card"],
  ["section", "Section"],
  ["divider", "Divider"],
  ["accordion", "Accordion"],
  ["tabs", "Tabs"],
  ["tooltip", "Tooltip"],
  ["reveal", "Reveal"],
  ["navbar", "Navbar"],
  ["footer", "Footer"],
];

const colors = [
  "brand", "brand-dark", "brand-100", "brand-50",
  "accent", "accent-hover", "accent-dark", "accent-50",
  "success", "success-50", "ink", "highlight",
  "bg", "surface", "line", "fg", "fg-muted", "fg-subtle",
];

function Demo({ id, title, file, children }) {
  return (
    <section id={id} className="scroll-mt-8 border-b border-line py-14">
      <div className="mb-8 flex items-baseline justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-fg">{title}</h2>
        {file && <code className="text-xs text-fg-subtle">{file}</code>}
      </div>
      {children}
    </section>
  );
}

export default function UiKit() {
  return (
    <Container className="grid gap-12 py-12 lg:grid-cols-[180px_1fr]">
      <aside className="hidden lg:block">
        <nav aria-label="Komponen" className="sticky top-12 space-y-1">
          <p className="mb-4 text-lg font-bold text-fg">UI Kit</p>
          {sections.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="block py-1 text-sm text-fg-muted hover:text-brand-soft">
              {label}
            </a>
          ))}
        </nav>
      </aside>

      <main>
        <Eyebrow>Khusus development</Eyebrow>
        <Heading as="h1" size="lg" className="mt-4">Komponen Syndrome UKAI</Heading>
        <Text className="mt-4 max-w-xl">Semua komponen umum dari <code>src/components/ui</code>. Dokumentasi: <code>docs/components.md</code>.</Text>

        <Demo id="logo" title="Logo" file="Logo.jsx">
          <div className="flex flex-wrap items-center gap-6">
            <Logo className="size-16" />
            <div className="tone-brand rounded-xl p-4"><Logo className="size-16" /></div>
            <div className="rounded-xl bg-ink p-4"><Logo className="size-16 text-white" /></div>
            <Logo className="size-16 text-brand" />
            <Logo className="size-8" />
          </div>
        </Demo>

        <Demo id="warna" title="Warna" file="src/index.css">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {colors.map((c) => (
              <div key={c}>
                <div className="h-16 rounded-xl border border-line" style={{ background: `var(--color-${c})` }} />
                <p className="mt-2 text-xs text-fg-muted">{c}</p>
              </div>
            ))}
          </div>
        </Demo>

        <Demo id="tipografi" title="Tipografi" file="Typography.jsx">
          <div className="space-y-6">
            <Eyebrow>Eyebrow</Eyebrow>
            <Heading as="p" size="xl">Apoteker <Highlight>masa depan</Highlight></Heading>
            <Heading as="p" size="lg">Heading lg</Heading>
            <Heading as="p" size="md">Heading md</Heading>
            <Heading as="p" size="sm">Heading sm</Heading>
            <Text size="lg">Text lg — bimbingan berkualitas dengan jaringan mentor terluas se-Indonesia.</Text>
            <Text>Text md — modul latihan soal klinis sesuai PERMENKES, DiPiro, dan WHO.</Text>
            <Text size="sm">Text sm — syarat dan ketentuan berlaku.</Text>
          </div>
        </Demo>

        <Demo id="button" title="Button" file="Button.jsx">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <Button>Daftar Sekarang <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" /></Button>
              <Button variant="brand">Lihat Program</Button>
              <Button variant="secondary">Konsultasi via WA</Button>
              <Button variant="ghost">Lihat modul</Button>
              <Button disabled>Disabled</Button>
            </div>
            <div className="tone-brand flex flex-wrap items-center gap-4 rounded-xl p-6">
              <Button>Di atas merah</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg"><Download className="size-5" /> Large</Button>
            </div>
          </div>
        </Demo>

        <Demo id="badge" title="Badge" file="Badge.jsx">
          <div className="flex flex-wrap gap-3">
            <Badge variant="brand">Program Favorit</Badge>
            <Badge variant="accent">Terbatas</Badge>
            <Badge variant="success"><Check className="size-3" /> Garansi Lulus</Badge>
            <Badge>70x pertemuan</Badge>
          </div>
        </Demo>

        <Demo id="card" title="Card" file="Card.jsx">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <Heading as="p" size="sm">Default</Heading>
              <Text size="sm" className="mt-2">Kartu standar untuk konten.</Text>
            </Card>
            <Card interactive>
              <Heading as="p" size="sm">Interactive</Heading>
              <Text size="sm" className="mt-2">Hover untuk melihat efek.</Text>
            </Card>
            <Card highlight>
              <Badge variant="brand">Program Favorit</Badge>
              <Heading as="p" size="sm" className="mt-4">Highlight</Heading>
              <Text size="sm" className="mt-2">Untuk paket yang ditonjolkan.</Text>
            </Card>
          </div>
          <div className="tone-brand mt-6 grid gap-6 rounded-xl p-6 md:grid-cols-2">
            <Card><Heading as="p" size="sm">Card di area merah</Heading><Text size="sm" className="mt-2">Otomatis kembali ke warna terang.</Text></Card>
            <Card highlight><Badge variant="accent">Favorit</Badge><Text size="sm" className="mt-3">Highlight di area merah.</Text></Card>
          </div>
        </Demo>

        <Demo id="section" title="Section (tone) & SectionHeader" file="Section.jsx">
          <div className="space-y-6">
            {[
              ["default", "", "Putih, untuk konten umum."],
              ["muted", "bg-surface", "Abu hangat, untuk selang-seling."],
              ["brand", "tone-brand", "Merah dominan: hero, CTA, section unggulan."],
              ["brand-dark", "tone-brand-dark", "Maroon: footer, penutup."],
            ].map(([tone, cls, desc]) => (
              <div key={tone} className={`${cls} rounded-xl border border-line p-8 md:p-12`}>
                <SectionHeader eyebrow={`tone="${tone}"`} title={<>Literatur jelas, sesuai <Highlight>blueprint terbaru</Highlight></>} description={desc} />
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button>Daftar Sekarang</Button>
                  <Button variant="secondary">Konsultasi</Button>
                </div>
              </div>
            ))}
            <SectionHeader align="center" eyebrow="align=&quot;center&quot;" title="Pilih jalur belajarmu" description="SectionHeader rata tengah." />
          </div>
        </Demo>

        <Demo id="divider" title="Divider" file="Divider.jsx">
          <div className="space-y-8">
            <Divider />
            <Divider label="atau" />
          </div>
        </Demo>

        <Demo id="accordion" title="Accordion" file="Accordion.jsx">
          <Accordion items={sample.faq} />
        </Demo>

        <Demo id="tabs" title="Tabs" file="Tabs.jsx">
          <Tabs
            items={[
              { label: "Klinis", content: <Text>600 halaman, sesuai PERMENKES, DiPiro, WHO, Koda-Kimble.</Text> },
              { label: "Industri + SBA", content: <Text>450 halaman, sesuai Farmakope edisi VI dan Ansel.</Text> },
              { label: "OSCE", content: <Text>±200 halaman, dilengkapi gambar alat dan prosedur kerja.</Text> },
            ]}
          />
        </Demo>

        <Demo id="tooltip" title="Tooltip" file="Tooltip.jsx">
          <Tooltip content="Tidak bolos lebih dari 3x dan mengerjakan semua tryout.">
            <button type="button" className="inline-flex items-center gap-2 text-sm text-fg-muted">
              <Info className="size-4 text-brand" /> Syarat garansi
            </button>
          </Tooltip>
        </Demo>

        <Demo id="reveal" title="Reveal" file="Reveal.jsx">
          <div className="grid gap-4 md:grid-cols-3">
            {[0, 120, 240].map((d) => (
              <Reveal key={d} delay={d}>
                <Card><Text size="sm">delay {d}ms</Text></Card>
              </Reveal>
            ))}
          </div>
        </Demo>

        <Demo id="navbar" title="Navbar" file="Navbar.jsx">
          <div className="overflow-hidden rounded-2xl border border-line">
            <Navbar links={sample.links} cta={{ label: "Masuk", href: "#" }} />
          </div>
        </Demo>

        <Demo id="footer" title="Footer" file="Footer.jsx">
          <div className="overflow-hidden rounded-2xl border border-line">
            <Footer
              description="Platform pendidikan farmasi berbasis teknologi."
              columns={[
                { title: "Layanan", links: sample.links },
                { title: "Bantuan", links: [{ label: "Kebijakan Privasi", href: "#" }, { label: "Hapus Akun", href: "#" }] },
                { title: "Kontak", links: [{ label: "+62 889 5946 963", href: "#" }] },
              ]}
              copyright="© 2026 Outlook-Project. All rights reserved."
            />
          </div>
        </Demo>
      </main>
    </Container>
  );
}
