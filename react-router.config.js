import { copyFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { posts } from "./src/data/blog.js";
import { programs } from "./src/data/landing.js";

const SITE_URL = "https://ukaisyndrome.id";

// Halaman publik. Dipakai untuk prerender DAN sitemap.xml, jadi cukup ditambah di sini.
// Path dinamis (paket, artikel) dibaca dari data; saat backend siap, ganti dengan fetch daftar slug.
const pages = [
  "/", "/privacy-policy-id", "/privacy-policy", "/data-deletion-request-id", "/data-deletion-request",
  "/alumni", "/blog",
  ...programs.map((p) => `/program/${p.id}`),
  ...posts.map((p) => `/blog/${p.slug}`),
];

// Tanpa server: tiap path di `prerender` dibuat jadi HTML statis saat build.
export default {
  appDirectory: "src",
  ssr: false,
  prerender: pages,
  async buildEnd({ reactRouterConfig }) {
    const today = new Date().toISOString().slice(0, 10);
    const urls = pages
      .map((p) => `  <url><loc>${SITE_URL}${p}</loc><lastmod>${today}</lastmod><priority>${p === "/" ? "1.0" : /^\/(privacy|data-deletion)/.test(p) ? "0.3" : "0.7"}</priority></url>`)
      .join("\n");
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
    const client = join(reactRouterConfig.buildDirectory, "client");
    await writeFile(join(client, "sitemap.xml"), xml);
    // Hosting statis (Netlify, Cloudflare Pages, Vercel, `serve`) otomatis menyajikan 404.html untuk path tak dikenal.
    await copyFile(join(client, "__spa-fallback.html"), join(client, "404.html"));
  },
};
