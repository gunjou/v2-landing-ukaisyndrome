# Dokumentasi Syndrome UKAI v2

Acuan pengembangan landing page v2. **Setiap perubahan kode yang menyentuh hal di bawah wajib ikut memperbarui dokumen terkait di commit yang sama.**

| Dokumen | Isi |
|---|---|
| [architecture.md](architecture.md) | Stack, struktur folder, routing & prerender, alur data |
| [design-tokens.md](design-tokens.md) | Warna, font, sistem tone, arah visual farmasi |
| [motion.md](motion.md) | Animasi (Reveal, CountUp, Marquee, bukti kelulusan, modul 3D, heatmap, footer) & maskot (anatomi, ekspresi, varian) |
| [components.md](components.md) | Daftar komponen UI, props, aturan menambah komponen |
| [seo.md](seo.md) | Meta, Open Graph, JSON-LD, sitemap, aset ikon, checklist SEO |
| [conventions.md](conventions.md) | Aturan menulis komponen, konten, SEO |
| [deploy.md](deploy.md) | Build, env, hosting (Netlify/Cloudflare/Vercel/Nginx), build ulang saat konten berubah |
| [data-real.md](data-real.md) | Daftar data yang perlu dikonfirmasi & diganti (DUMMY → asli), dengan prioritas |
| [api.md](api.md) | Kontrak endpoint backend (GET, saat build) + deploy hook |
| [roadmap.md](roadmap.md) | Todo list & status pengerjaan |

## Perintah

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Server development (http://localhost:5173) |
| `npm run build` | Build + prerender ke `build/client` (HTML statis, `sitemap.xml`, `404.html`) |
| `npm run preview` | Sajikan hasil build secara lokal (http://localhost:3000) |
| `npm run lint` | ESLint |

## Halaman
Beranda `/`, `/alumni`, `/blog`, `/blog/:slug`, `/program/:slug`, 4 halaman legal, 404, dan `/ui` (hanya development). Rincian: architecture.md.
