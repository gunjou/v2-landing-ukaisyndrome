import { ArrowRight, BookOpen, FileQuestion, Lightbulb, Scale, Stethoscope } from "lucide-react";
import { Link } from "react-router";
import { Button, Card, Highlight, Reveal, Section, SectionHeader, cn } from "../components/ui";
import { readMinutes } from "../services/blog";
import { formatDate } from "../services/landing";

// Ikon sampul per kategori; kategori baru dari backend jatuh ke BookOpen.
const ICONS = { "Tips UKAI": Lightbulb, "Pembahasan Soal": FileQuestion, OSCE: Stethoscope, Regulasi: Scale };

// Kartu artikel, dipakai beranda, /blog, dan "artikel lain" di halaman artikel.
// Tanpa gambar sampul → sampul "etiket" merah: kategori + ikon besar. `featured` = kartu lebar horizontal (md+).
export function PostCard({ post: p, as: Heading = "h3", featured = false }) {
  const Icon = ICONS[p.category] ?? BookOpen;
  return (
    <Card as="article" interactive className={cn("group relative flex h-full flex-col overflow-hidden p-0!", featured && "md:grid md:grid-cols-[1.2fr_1fr]")}>
      <div className={cn("tone-brand relative aspect-[16/9] overflow-hidden bg-brand", featured && "md:aspect-auto md:min-h-72")}>
        {p.cover ? (
          <img src={p.cover.url} width={p.cover.width} height={p.cover.height} alt="" loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <>
            <Icon aria-hidden strokeWidth={1.25} className={cn("absolute -right-4 -bottom-6 size-40 text-accent opacity-90 transition-transform duration-500 group-hover:-rotate-6", featured && "md:size-64")} />
            <span aria-hidden className="absolute inset-x-5 bottom-5 h-px bg-line" />
          </>
        )}
        <span className="absolute top-4 left-4 rounded-md bg-accent px-2 py-0.5 text-xs font-bold text-ink">{p.category}</span>
      </div>
      <div className={cn("flex flex-1 flex-col p-5", featured && "md:justify-center md:p-10")}>
        {featured && <p className="mb-3 text-xs font-bold tracking-widest text-highlight uppercase">Artikel terbaru</p>}
        <p className="text-xs text-fg-subtle">
          <time dateTime={p.date}>{formatDate(p.date)}</time> · {readMinutes(p.body)} menit baca
        </p>
        <Heading className={cn("mt-2 text-lg leading-snug font-bold text-fg", featured && "md:text-3xl md:tracking-tight")}>
          {/* Seluruh kartu bisa diklik */}
          <Link to={`/blog/${p.slug}`} className="after:absolute after:inset-0 group-hover:text-highlight">{p.title}</Link>
        </Heading>
        <p className={cn("mt-2 text-sm text-fg-muted", featured ? "md:text-base" : "flex-1")}>{p.excerpt}</p>
        <span aria-hidden className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
          Baca artikel <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Card>
  );
}

export default function BlogPreview({ posts }) {
  return (
    <Section id="blog">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeader eyebrow="Blog & materi" title={<>Belajar UKAI, <Highlight>sedikit demi sedikit</Highlight></>} description="Tips, pembahasan soal, dan panduan OSCE dari mentor Syndrome UKAI." />
        <Button to="/blog" variant="secondary" className="hidden md:inline-flex">Lihat semua artikel <ArrowRight aria-hidden className="size-4" /></Button>
      </div>
      {/* Mobile: carousel geser (snap); md: 3 kolom */}
      <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:mt-12 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 100} className="w-[82%] max-w-80 shrink-0 snap-center md:w-auto md:max-w-none">
            <PostCard post={p} />
          </Reveal>
        ))}
      </div>
      <Button to="/blog" variant="secondary" className="mt-6 md:hidden">Lihat semua artikel <ArrowRight aria-hidden className="size-4" /></Button>
    </Section>
  );
}
