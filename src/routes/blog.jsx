import { useState } from "react";
import { useLoaderData } from "react-router";
import { Button, Highlight, MascotFace, PageHeader, Reveal, Section, cn } from "../components/ui";
import { seo } from "../seo";
import { getPosts } from "../services/blog";
import { PostCard } from "../sections/BlogPreview";

export async function loader() {
  return getPosts();
}

export function meta() {
  return seo({
    title: "Blog & Materi UKAI",
    description: "Tips lulus UKAI, pembahasan soal CBT, panduan OSCE, dan update regulasi dari mentor Syndrome UKAI.",
    path: "/blog",
  });
}

export default function Blog() {
  const { categories, posts } = useLoaderData();
  const [cat, setCat] = useState(null);
  const shown = cat ? posts.filter((p) => p.category === cat) : posts;
  // Tanpa filter: artikel terbaru jadi kartu unggulan lebar, sisanya grid.
  const [featured, ...rest] = cat ? [null, ...shown] : shown;

  return (
    <main>
      <PageHeader eyebrow="Blog & materi" title={<>Belajar UKAI, <Highlight>sedikit demi sedikit</Highlight></>} description="Tips, pembahasan soal, dan panduan OSCE dari mentor Syndrome UKAI." />
      <Section>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter kategori">
          {[null, ...categories].map((c) => (
            <button
              key={c ?? "all"}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={cn(
                "flex h-9 items-center gap-2 rounded-lg border px-3.5 text-sm font-semibold transition-colors",
                cat === c ? "border-accent bg-accent text-ink" : "border-line text-fg-muted hover:text-fg",
              )}
            >
              {c ?? "Semua"}
              <span className={cn("rounded px-1.5 text-xs tabular-nums", cat === c ? "bg-ink/10" : "bg-surface")}>
                {c ? posts.filter((p) => p.category === c).length : posts.length}
              </span>
            </button>
          ))}
        </div>

        {featured && (
          <Reveal className="mt-10">
            <PostCard post={featured} as="h2" featured />
          </Reveal>
        )}
        {rest.length > 0 && (
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={`${cat}-${p.slug}`} delay={(i % 3) * 100}>
                <PostCard post={p} as="h2" />
              </Reveal>
            ))}
          </div>
        )}
        {!shown.length && (
          <div className="mt-12 flex flex-col items-center text-center">
            <MascotFace mood="sad" className="size-16 text-line" />
            <p className="mt-4 font-semibold text-fg">Belum ada artikel di kategori ini.</p>
            <Button variant="secondary" className="mt-4" onClick={() => setCat(null)}>Lihat semua artikel</Button>
          </div>
        )}
      </Section>
    </main>
  );
}
