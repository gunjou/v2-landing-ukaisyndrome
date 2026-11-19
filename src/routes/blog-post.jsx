import { ArrowLeft, ArrowRight, Link2, Share2 } from "lucide-react";
import { useState } from "react";
import { Link, useLoaderData } from "react-router";
import { Button, Card, Container, Heading, MascotFace } from "../components/ui";
import { SITE_NAME, SITE_URL, seo } from "../seo";
import { getPost, readMinutes } from "../services/blog";
import { formatDate } from "../services/landing";

export async function loader({ params }) {
  const post = await getPost(params.slug);
  if (!post) throw new Response("Not Found", { status: 404 });
  return post;
}

export function meta({ data: p }) {
  return seo({
    title: p.title,
    description: p.excerpt,
    path: `/blog/${p.slug}`,
    jsonLd: [{
      "@context": "https://schema.org",
      "@type": "Article",
      headline: p.title,
      description: p.excerpt,
      datePublished: p.date,
      articleSection: p.category,
      author: { "@type": "Organization", name: SITE_NAME },
      publisher: { "@id": `${SITE_URL}/#organization` },
      mainEntityOfPage: `${SITE_URL}/blog/${p.slug}`,
    }],
  });
}

// Bagikan: WhatsApp (kanal utama pengguna) + salin tautan.
function Share({ url, title }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard ditolak browser: tidak apa-apa, tombol WA tetap tersedia
    }
  };
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="sm" variant="secondary" href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`} target="_blank" rel="noopener">
        <Share2 aria-hidden className="size-4" /> Bagikan ke WA
      </Button>
      <Button size="sm" variant="ghost" onClick={copy} aria-live="polite">
        <Link2 aria-hidden className="size-4" /> {copied ? "Tautan disalin" : "Salin tautan"}
      </Button>
    </div>
  );
}

export default function BlogPost() {
  const p = useLoaderData();
  const url = `${SITE_URL}/blog/${p.slug}`;
  const [lead, ...body] = p.body;

  return (
    <main>
      <article>
        <header className="tone-brand">
          <Container className="py-12 md:py-16">
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-fg-muted hover:text-highlight">
              <ArrowLeft aria-hidden className="size-4" /> Blog & materi
            </Link>
            <p className="mt-6">
              <span className="rounded-md bg-accent px-2 py-0.5 text-xs font-bold text-ink">{p.category}</span>
            </p>
            <Heading as="h1" size="lg" className="mt-4 max-w-3xl">{p.title}</Heading>
            <p className="mt-4 text-sm text-fg-muted">
              <time dateTime={p.date}>{formatDate(p.date)}</time> · {readMinutes(p.body)} menit baca · Tim mentor {SITE_NAME}
            </p>
          </Container>
        </header>

        {/* Isi artikel + artikel terkait di samping (lg); di bawah lg, terkait menyusul setelah artikel */}
        <Container className="grid gap-12 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <div className="max-w-3xl">
          {p.cover && (
            <img src={p.cover.url} width={p.cover.width} height={p.cover.height} alt="" className="mb-10 w-full rounded-2xl object-cover" />
          )}
          {/* Paragraf pembuka lebih besar, sisanya ukuran baca nyaman */}
          {lead && <p className="text-xl leading-relaxed font-medium text-fg">{lead}</p>}
          {body.map((para, i) => <p key={i} className="mt-6 text-lg leading-relaxed text-fg-muted">{para}</p>)}

          <div className="mt-10 border-t border-line pt-6">
            <Share url={url} title={p.title} />
          </div>

          {/* Ajakan di akhir artikel */}
          <div className="tone-brand mt-10 flex flex-col items-start gap-5 rounded-2xl bg-brand p-6 sm:flex-row sm:items-center md:p-8">
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-brand-dark ring-2 ring-accent">
              <MascotFace className="size-10" />
            </span>
            <div className="flex-1">
              <p className="text-lg font-bold text-fg">Siap belajar lebih terarah?</p>
              <p className="mt-1 text-sm text-fg-muted">Pilih program bimbingan UKAI bersama mentor Syndrome.</p>
            </div>
            <Button to="/#program">Lihat program</Button>
          </div>
          </div>

          {p.related.length > 0 && (
            <aside aria-labelledby="terkait" className="lg:sticky lg:top-24 lg:self-start">
              <p id="terkait" className="text-xs font-bold tracking-widest text-highlight uppercase">Artikel terkait</p>
              <ul className="mt-4 space-y-3">
                {p.related.map((r) => (
                  <li key={r.slug}>
                    <Card interactive className="group relative p-4!">
                      <span className="rounded-md bg-accent-50 px-2 py-0.5 text-xs font-bold text-accent-dark">{r.category}</span>
                      <Link to={`/blog/${r.slug}`} className="mt-2 block leading-snug font-bold text-fg after:absolute after:inset-0 group-hover:text-highlight">{r.title}</Link>
                      <p className="mt-2 text-xs text-fg-subtle">
                        <time dateTime={r.date}>{formatDate(r.date)}</time> · {readMinutes(r.body)} menit baca
                      </p>
                    </Card>
                  </li>
                ))}
              </ul>
              <Link to="/blog" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
                Semua artikel <ArrowRight aria-hidden className="size-4" />
              </Link>
            </aside>
          )}
        </Container>
      </article>
    </main>
  );
}
