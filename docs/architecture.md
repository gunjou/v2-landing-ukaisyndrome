# Arsitektur

## Stack
- **React 19** + **React Router v7 (mode framework)** di atas **Vite**
- **Tailwind CSS v4** (konfigurasi lewat `@theme` di `src/index.css`, tanpa `tailwind.config.js`)
- Font self-host via `@fontsource`

## Kenapa prerender
SPA biasa mengirim HTML kosong, sehingga Google sulit membaca konten. Dengan `prerender`, setiap path
dirender jadi HTML statis saat `npm run build`, lalu React mengambil alih di browser (hydration).
Tidak perlu server Node; `build/client` cukup di-hosting sebagai file statis.

Konfigurasi: `react-router.config.js`
- `ssr: false` — tanpa server
- `prerender: pages` — **setiap halaman publik baru wajib ditambahkan ke `pages`**, kalau tidak halaman itu tidak punya HTML statis dan tidak masuk sitemap
- `buildEnd` — menulis `build/client/sitemap.xml` dari `pages`
- `appDirectory: "src"`

## Struktur folder
```
src/
  root.jsx          Layout HTML (<html>, <head>, font, meta global)
  routes.js         Daftar route
  routes/           Satu file per halaman (export default komponen + export meta)
  components/ui/    Komponen umum (Button, Card, ...) — semua tampil di /ui (lihat components.md)
  sections/         Bagian landing (Hero, Program, FAQ, ...) — merangkai komponen ui (tabel di bawah)
  assets/           Gambar yang di-import kode (logo: `logo-syndrome.svg` = sumber `Logo.jsx`; `logo-syndrome.png` = file asli; `og-image.source.svg` = sumber gambar OG)
  services/         Fungsi async pengambil data (landing.js, legal.js) — nanti diganti API backend
  data/             Isi konten sementara: landing.js (REAL + DUMMY), legal.js (REAL)
  seo.js            Helper `seo()` untuk meta tiap halaman (lihat seo.md)
  seo-jsonld.js     Data terstruktur schema.org beranda
  index.css         Tailwind + token desain
public/             File statis apa adanya: favicon, ikon, og-image.png, robots.txt, manifest (lihat seo.md)
docs/               Dokumentasi ini
react-router.config.js  Daftar halaman publik (`pages`), prerender, pembuat sitemap
```

## Menambah halaman
1. Buat `src/routes/<nama>.jsx` dengan `export default` komponen dan `export function meta()`.
2. Daftarkan di `src/routes.js`.
3. Tambahkan path ke `pages` di `react-router.config.js` (otomatis masuk prerender + sitemap).
4. Perbarui tabel di bawah.

| Path | File | Prerender | Keterangan |
|---|---|---|---|
| `/` | `routes/home.jsx` | ya | Landing |
| `/privacy-policy-id` | `routes/legal.jsx` | ya | Kebijakan Privasi (ID) |
| `/privacy-policy` | `routes/legal.jsx` | ya | Privacy Policy (EN) |
| `/data-deletion-request-id` | `routes/legal.jsx` | ya | Hapus Akun (ID) |
| `/data-deletion-request` | `routes/legal.jsx` | ya | Account Deletion (EN) |
| `*` | `routes/not-found.jsx` | tidak | 404, dirender dari `__spa-fallback.html` |
| `/ui` | `routes/ui.jsx` | tidak | Galeri komponen, **hanya development** (didaftarkan dengan `import.meta.env.DEV` di `routes.js`) |

### Susunan route (`src/routes.js`)
```
root.jsx                    <html lang>, head, font
├─ site-layout.jsx          Navbar + Footer + tombol WA (loader: getSiteInfo)
│  ├─ home.jsx              loader: getLandingContent
│  └─ legal.jsx  ×4         loader: getLegalPage(slug dari path), satu file untuk 4 path (id route unik)
├─ not-found.jsx  (*)       di LUAR layout — route yang tidak di-prerender tidak boleh punya/bergantung pada loader
└─ ui.jsx                   dev only
```

Aturan penting:
- **Path legal tidak boleh diubah**: sama dengan situs lama dan tertaut di Play Store / App Store.
- `lang` halaman: loader yang mengembalikan `lang` (mis. halaman EN) otomatis mengubah `<html lang>` (lihat `root.jsx`).
- Dengan `ssr: false`, route yang **tidak** ada di `prerender` tidak boleh mengekspor `loader` (build gagal). Pakai `clientLoader` bila perlu.
- Hosting wajib menyajikan `build/client/__spa-fallback.html` untuk path yang tidak dikenal agar halaman 404 tampil (dibahas di deploy.md).

## Catatan dev
- Karena `ssr: false`, saat development halaman dirender di browser (HTML awal kosong). Prerender berisi konten hanya terjadi di `npm run build`.
- `root.jsx` memasang kelas `js` di `<html>` sebelum render; dipakai `Reveal` agar konten tetap terlihat bila JS mati.

## Alur data
```
src/data/*.js  →  src/services/*.js (getLandingContent, getSiteInfo, getLegalPage)  →  loader() di routes/home.jsx  →  useLoaderData()  →  props ke sections
```
- `loader` berjalan **saat build** (prerender), jadi seluruh konten tertanam di HTML → terbaca Google.
- Komponen dan section tidak pernah mengimpor `data/` langsung.
- Di `data/landing.js` setiap item ditandai `REAL` (dari situs lama) atau `DUMMY` (wajib diganti).
- Saat backend admin siap: ubah `getLandingContent()` menjadi `fetch` ke API, bentuk data tetap sama. Karena data dibaca saat build, situs perlu **di-build ulang setiap admin menyimpan** (lihat deploy.md nanti).

## Section landing (`src/sections/`)
Urutan di `routes/home.jsx`. Navbar, Footer, dan tombol WA ada di `routes/site-layout.jsx` (dipakai semua halaman publik). Link navbar memakai `/#anchor` agar berfungsi dari halaman mana pun. Ritme latar: merah di awal, tengah, dan akhir; terang di antaranya.

| Section | File | Tone | Anchor | Data |
|---|---|---|---|---|
| Navbar | `components/ui/Navbar` via `site-layout.jsx` | brand | — | `site` |
| Hero + statistik | `Hero.jsx` | brand | — | `site`, `stats` |
| Capaian (peta) | `Network.jsx` | default | `#capaian` | `network` |
| Mentor | `Mentors.jsx` | muted | `#mentor` | `mentors` |
| Modul | `Modules.jsx` | default | `#modul` | `modules` |
| Alur belajar | `Steps.jsx` | muted | — | `steps` |
| Program + harga + garansi | `Programs.jsx` | brand | `#program` | `programs`, `sharedFeatures`, `guaranteeTerms` |
| Testimoni | `Testimonials.jsx` | default | `#testimoni` | `testimonials` |
| Download app | `DownloadApp.jsx` | brand-dark | `#download` | `site` |
| FAQ | `Faq.jsx` | muted | `#faq` | `faqs` |
| CTA penutup | `ClosingCta.jsx` | kotak brand | — | — |
| Footer | `components/ui/Footer` via `site-layout.jsx` | brand-dark | — | `site` |
| Tombol WA melayang | `WhatsAppButton.jsx` via `site-layout.jsx` | — | — | `site.whatsapp` |

Semua tombol daftar mengarah ke WhatsApp admin (`wa.me`), tombol paket menyertakan pesan otomatis berisi nama paket.

## Halaman legal
Isi di `src/data/legal.js` (REAL, disalin dari situs lama), satu objek per slug: `title`, `description`, `lang`, `alternate` (link ke versi bahasa lain), `intro`, `sections: [{ heading, body?, items?, footnote? }]`, `mailto?` (tombol kirim email untuk halaman hapus akun).
Untuk menambah halaman legal: tambah objek di `legal.js`, slug di `legalPaths` (`routes.js`), dan path di `pages` (`react-router.config.js`).
