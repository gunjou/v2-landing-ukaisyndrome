import { Mail } from "lucide-react";
import { Link, useLoaderData } from "react-router";
import { Button, Container, Heading, Text } from "../components/ui";
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

function Item({ item }) {
  if (typeof item === "string") return item;
  return (
    <>
      <strong className="font-semibold text-fg">{item.label}:</strong> {item.text}
    </>
  );
}

export default function Legal() {
  const page = useLoaderData();

  return (
    <main lang={page.lang}>
      <header className="tone-brand">
        <Container className="max-w-3xl py-14 md:py-20">
          <Link to={page.alternate} hrefLang={page.lang === "id" ? "en" : "id"} className="text-sm font-semibold text-highlight hover:underline">
            {page.alternateLabel}
          </Link>
          <Heading as="h1" size="lg" className="mt-4">{page.title}</Heading>
          <Text className="mt-3">{page.effective}</Text>
        </Container>
      </header>

      <Container className="max-w-3xl py-12 md:py-16">
        <Text size="lg" muted={false}>{page.intro}</Text>

        {page.mailto && (
          <div className="mt-8 rounded-xl border border-line bg-surface p-6">
            <p className="text-sm text-fg-muted">Email</p>
            <p className="mt-1 font-semibold text-fg">{page.mailto.email}</p>
            <Button
              variant="brand"
              className="mt-5"
              href={`mailto:${page.mailto.email}?subject=${encodeURIComponent(page.mailto.subject)}`}
            >
              <Mail aria-hidden className="size-4" /> {page.mailto.label}
            </Button>
          </div>
        )}

        {page.sections.map((s) => (
          <section key={s.heading} className="mt-12">
            <Heading as="h2" size="sm">{s.heading}</Heading>
            {s.body && <Text className="mt-3">{s.body}</Text>}
            {s.items && (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-fg-muted marker:text-brand">
                {s.items.map((item, i) => (
                  <li key={i} className="leading-relaxed"><Item item={item} /></li>
                ))}
              </ul>
            )}
            {s.footnote && <Text muted={false} className="mt-4 font-semibold">{s.footnote}</Text>}
          </section>
        ))}
      </Container>
    </main>
  );
}
