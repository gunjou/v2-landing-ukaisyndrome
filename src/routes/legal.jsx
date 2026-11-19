import { ArrowRight, FileText, Mail } from "lucide-react";
import { Link, useLoaderData } from "react-router";
import { Button, Card, Container, PageHeader, Text, cn } from "../components/ui";
import { seo } from "../seo";
import { getLegalPage } from "../services/legal";

// Satu template untuk 4 halaman legal (id/en). Slug diambil dari path.
export async function loader({ request }) {
  const slug = new URL(request.url).pathname.replace(/^\/|\/$/g, "");
  const page = await getLegalPage(slug);
  if (!page) throw new Response("Not Found", { status: 404 });
  return { ...page, path: `/${slug}` };
}

export function meta({ data }) {
  return seo({
    title: data.title,
    description: data.description,
    path: data.path,
    lang: data.lang,
    alternates: [
      { lang: data.lang, path: data.path },
      { lang: data.lang === "id" ? "en" : "id", path: data.alternate },
    ],
  });
}

// Teks antarmuka per bahasa (isi dokumen ada di data/legal.js).
const UI = {
  id: { eyebrow: "Dokumen legal", toc: "Daftar isi", related: "Lihat juga", email: "Email" },
  en: { eyebrow: "Legal document", toc: "Contents", related: "See also", email: "Email" },
};

const anchor = (i) => `bagian-${i + 1}`;
const num = (i) => String(i + 1).padStart(2, "0");

function Item({ item }) {
  if (typeof item === "string") return item;
  return (
    <>
      <strong className="font-semibold text-fg">{item.label}:</strong> {item.text}
    </>
  );
}

// Pengalih bahasa ID | EN; bahasa aktif = kuning.
function LangSwitch({ lang, alternate }) {
  return (
    <div className="inline-flex rounded-lg border border-line p-1 text-sm font-bold">
      {["id", "en"].map((l) =>
        l === lang ? (
          <span key={l} aria-current="true" className="rounded-md bg-accent px-3 py-1 text-ink uppercase">{l}</span>
        ) : (
          <Link key={l} to={alternate} hrefLang={l} className="rounded-md px-3 py-1 text-fg-muted uppercase hover:text-fg">{l}</Link>
        ),
      )}
    </div>
  );
}

export default function Legal() {
  const page = useLoaderData();
  const t = UI[page.lang];

  return (
    <main lang={page.lang}>
      <PageHeader eyebrow={t.eyebrow} title={page.title} description={page.effective}>
        <LangSwitch lang={page.lang} alternate={page.alternate} />
      </PageHeader>

      <Container className="grid gap-10 py-12 md:py-16 lg:grid-cols-[14rem_1fr] lg:gap-16">
        {/* Daftar isi menempel di desktop */}
        <nav aria-label={t.toc} className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-bold tracking-widest text-highlight uppercase">{t.toc}</p>
          <ol className="mt-4 space-y-1 border-l-2 border-line">
            {page.sections.map((s, i) => (
              <li key={s.heading}>
                <a href={`#${anchor(i)}`} className="-ml-0.5 flex gap-2 border-l-2 border-transparent py-1.5 pl-3 text-sm text-fg-muted hover:border-brand hover:text-fg">
                  <span className="font-bold text-fg-subtle tabular-nums">{num(i)}</span>
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="max-w-3xl">
          <Text size="lg" muted={false} className="leading-relaxed">{page.intro}</Text>

          {page.mailto && (
            <Card className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand">
                <Mail aria-hidden className="size-6" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-fg-muted">{t.email}</p>
                <p className="font-bold [overflow-wrap:anywhere] text-fg">{page.mailto.email}</p>
              </div>
              <Button href={`mailto:${page.mailto.email}?subject=${encodeURIComponent(page.mailto.subject)}`}>
                {page.mailto.label}
              </Button>
            </Card>
          )}

          {page.sections.map((s, i) => (
            <section key={s.heading} id={anchor(i)} className="mt-12 scroll-mt-24 border-t border-line pt-10 first-of-type:border-t-0">
              <h2 className="flex items-center gap-3 text-xl font-bold text-fg md:text-2xl">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent-50 text-sm font-extrabold text-accent-dark tabular-nums">{num(i)}</span>
                {s.heading}
              </h2>
              {s.body && <Text className="mt-4 leading-relaxed">{s.body}</Text>}
              {s.items && (
                <ul className="mt-4 space-y-3">
                  {s.items.map((item, k) => (
                    <li key={k} className="flex gap-3 leading-relaxed text-fg-muted">
                      <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" />
                      <span><Item item={item} /></span>
                    </li>
                  ))}
                </ul>
              )}
              {s.footnote && (
                <p className="mt-5 rounded-r-lg border-l-4 border-accent bg-accent-50 px-4 py-3 font-semibold text-fg">{s.footnote}</p>
              )}
            </section>
          ))}

          {page.related.length > 0 && (
            <div className="mt-16 border-t border-line pt-10">
              <p className="text-xs font-bold tracking-widest text-highlight uppercase">{t.related}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {page.related.map((r) => (
                  <Card key={r.path} interactive className={cn("group relative flex items-start gap-4 p-5!")}>
                    <FileText aria-hidden className="mt-0.5 size-5 shrink-0 text-brand" />
                    <div className="flex-1">
                      <Link to={r.path} className="font-bold text-fg after:absolute after:inset-0 group-hover:text-highlight">{r.title}</Link>
                      <p className="mt-1 text-sm text-fg-muted">{r.description}</p>
                    </div>
                    <ArrowRight aria-hidden className="size-4 shrink-0 text-fg-subtle transition-transform group-hover:translate-x-1" />
                  </Card>
                ))}
              </div>
            </div>
          )}
        </article>
      </Container>
    </main>
  );
}
