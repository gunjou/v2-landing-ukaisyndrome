import { writeFile } from "node:fs/promises";
import { join } from "node:path";

const SITE_URL = "https://ukaisyndrome.id";

// Halaman publik. Dipakai untuk prerender DAN sitemap.xml, jadi cukup ditambah di sini.
const pages = ["/", "/privacy-policy-id", "/privacy-policy", "/data-deletion-request-id", "/data-deletion-request"];

// Tanpa server: tiap path di `prerender` dibuat jadi HTML statis saat build.
export default {
  appDirectory: "src",
  ssr: false,
  prerender: pages,
  async buildEnd({ reactRouterConfig }) {
    const today = new Date().toISOString().slice(0, 10);
    const urls = pages
      .map((p) => `  <url><loc>${SITE_URL}${p}</loc><lastmod>${today}</lastmod><priority>${p === "/" ? "1.0" : "0.3"}</priority></url>`)
      .join("\n");
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
    await writeFile(join(reactRouterConfig.buildDirectory, "client", "sitemap.xml"), xml);
  },
};
