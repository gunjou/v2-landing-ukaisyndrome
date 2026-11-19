import { legalPages } from "../data/legal";

export const legalSlugs = Object.keys(legalPages);

export async function getLegalPage(slug) {
  return legalPages[slug] ?? null;
}
