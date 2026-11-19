import { legalPages } from "../data/legal";

export const legalSlugs = Object.keys(legalPages);

// + `related`: halaman legal lain dengan bahasa yang sama (tautan "Lihat juga").
export async function getLegalPage(slug) {
  const page = legalPages[slug];
  if (!page) return null;
  const related = legalSlugs
    .filter((s) => s !== slug && legalPages[s].lang === page.lang)
    .map((s) => ({ title: legalPages[s].title, description: legalPages[s].description, path: `/${s}` }));
  return { ...page, related };
}
