// Satu pintu untuk meta SEO. Dipakai oleh `meta()` di setiap route.
export const SITE_URL = "https://ukaisyndrome.id";
export const SITE_NAME = "Syndrome UKAI";
const DEFAULT_IMAGE = "/og-image.png";

/**
 * @param {object} o
 * @param {string} o.title       Judul halaman (tanpa nama situs; nama ditambahkan otomatis)
 * @param {string} o.description 120–160 karakter
 * @param {string} o.path        Path kanonik, mis. "/privacy-policy-id"
 * @param {string} [o.lang]      "id" | "en"
 * @param {string} [o.image]     Path gambar OG 1200×630
 * @param {boolean} [o.noindex]
 * @param {Array<{lang:string,path:string}>} [o.alternates] Versi bahasa lain (hreflang)
 * @param {object[]} [o.jsonLd]  Objek schema.org
 */
export function seo({ title, description, path, lang = "id", image = DEFAULT_IMAGE, noindex = false, alternates = [], jsonLd = [] }) {
  const url = SITE_URL + path;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;
  return [
    { title: fullTitle },
    { name: "description", content: description },
    noindex ? { name: "robots", content: "noindex, follow" } : { tagName: "link", rel: "canonical", href: url },
    ...alternates.map((a) => ({ tagName: "link", rel: "alternate", hrefLang: a.lang, href: SITE_URL + a.path })),
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: lang === "en" ? "en_US" : "id_ID" },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: SITE_URL + image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: SITE_URL + image },
    ...jsonLd.map((data) => ({ "script:ld+json": data })),
  ];
}
