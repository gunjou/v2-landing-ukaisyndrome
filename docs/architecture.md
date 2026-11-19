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
- `buildEnd` — menulis `build/client/sitemap.xml` dari `pages` dan menyalin `__spa-fallback.html` → `404.html`
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
  services/         Fungsi async pengambil data (landing.js, legal.js, blog.js) — nanti diganti API backend
  data/             Isi konten sementara: landing.js (REAL + DUMMY), legal.js (REAL), blog.js (DUMMY)
  seo.js            Helper `seo()` untuk meta tiap halaman (lihat seo.md)
  seo-jsonld.js     Data terstruktur schema.org beranda
  index.css         Tailwind + token desain + animasi (lihat motion.md)
public/             File statis apa adanya: favicon, ikon, og-image.png, robots.txt, manifest (lihat seo.md)
docs/               Dokumentasi ini
react-router.config.js  Daftar halaman publik (`pages`), prerender, pembuat sitemap
```

## Menambah halaman
1. Buat `src/routes/<nama>.jsx` dengan `export default` komponen dan `export function meta()`.
2. Daftarkan di `src/routes.js`.
3. Tambahkan path ke `pages` di `react-router.config.js` (otomatis masuk prerender + sitemap). Route dinamis (`:slug`) membaca daftar slug dari `src/data/` di file config; slug yang tidak ada di daftar tidak punya HTML dan berakhir 404.
4. Perbarui tabel di bawah.

| Path | File | Prerender | Keterangan |
|---|---|---|---|
| `/` | `routes/home.jsx` | ya | Landing |
| `/privacy-policy-id` | `routes/legal.jsx` | ya | Kebijakan Privasi (ID) |
| `/privacy-policy` | `routes/legal.jsx` | ya | Privacy Policy (EN) |
| `/data-deletion-request-id` | `routes/legal.jsx` | ya | Hapus Akun (ID) |
| `/data-deletion-request` | `routes/legal.jsx` | ya | Account Deletion (EN) |
| `/program/:slug` | `routes/program.jsx` | ya (slug dari `programs[].id`) | Detail paket: header merah dengan pengalih paket (chip), judul + jadwal, "etiket paket" (jumlah pertemuan, fitur, stempel GARANSI LULUS); "Cocok untuk" + silabus bernomor; fitur bersama + syarat garansi; `ClosingCta` |
| `/alumni` | `routes/alumni.jsx` | ya | Wall of Alumni: header maskot wisuda + angka ringkas (jumlah kisah, periode, rata-rata skor; dihitung dari data), filter periode berupa chip berjumlah, grid `AlumniCard` (stempel dicap tiap filter berganti), `ClosingCta` di akhir |
| `/blog` | `routes/blog.jsx` | ya | Daftar artikel: filter kategori berupa chip berjumlah; tanpa filter, artikel terbaru jadi kartu unggulan lebar (`PostCard featured`), sisanya grid |
| `/blog/:slug` | `routes/blog-post.jsx` | ya (slug dari `posts[].slug`) | Artikel: kembali ke blog, kategori, tanggal + waktu baca (`readMinutes`), sampul bila ada, paragraf pembuka besar, bagikan WA / salin tautan, ajakan ke program, "Artikel terkait" di kolom samping yang menempel (lg; di bawah lg menyusul setelah artikel) (`related` dari `getPost()`: kategori sama dulu) + JSON-LD `Article` |
| `*` | `routes/not-found.jsx` | tidak | 404, dirender dari `__spa-fallback.html`. Halaman merah penuh (tanpa Navbar/Footer): "4[kepala maskot cemas]4", tombol beranda & program, tautan cepat |
| `/ui` | `routes/ui.jsx` | tidak | Galeri komponen, **hanya development** (didaftarkan dengan `import.meta.env.DEV` di `routes.js`) |

### Susunan route (`src/routes.js`)
```
root.jsx                    <html lang>, head, font
├─ site-layout.jsx          Skip link "Lewati ke konten", Navbar, konten (#konten), Footer, tombol WA dalam <aside> (loader: getSiteInfo)
│  ├─ home.jsx              loader: getLandingContent
│  ├─ legal.jsx  ×4         loader: getLegalPage(slug dari path), satu file untuk 4 path (id route unik)
│  ├─ program.jsx           loader: getProgram(params.slug)
│  ├─ alumni.jsx            loader: getAlumni
│  ├─ blog.jsx              loader: getPosts
│  └─ blog-post.jsx         loader: getPost(params.slug)
├─ not-found.jsx  (*)       di LUAR layout — route yang tidak di-prerender tidak boleh punya/bergantung pada loader
└─ ui.jsx                   dev only
```

Aturan penting:
- **Path legal tidak boleh diubah**: sama dengan situs lama dan tertaut di Play Store / App Store.
- `lang` halaman: loader yang mengembalikan `lang` (mis. halaman EN) otomatis mengubah `<html lang>` (lihat `root.jsx`).
- Dengan `ssr: false`, route yang **tidak** ada di `prerender` tidak boleh mengekspor `loader` (build gagal). Pakai `clientLoader` bila perlu.
- Hosting harus menyajikan `404.html` (salinan `__spa-fallback.html`) untuk path yang tidak dikenal agar halaman 404 tampil. Lihat deploy.md.

## Responsif
Lebar yang diuji (emulasi Chrome): 320, 360, 390, 768, 1024, 1280, 1920px. Tidak boleh ada geser horizontal di halaman mana pun.
| Breakpoint | Perilaku utama |
|---|---|
| < `sm` (640) | Satu kolom. Program & blog jadi carousel geser (snap), alumni & mentor `Marquee`, footer bertumpuk (Layanan 2 kolom tautan), stempel kelulusan 2×2, maskot kelulusan di atas |
| `md` (768) | Program 2×2, modul 2 kolom, blog 3 kolom, bukti kelulusan berdampingan dengan maskot, navbar masih hamburger, hero masih satu kolom |
| `lg` (1024) | Navbar desktop, hero dua kolom (teks + maskot), program 4 kolom, peringkat kota di samping peta |
| `2xl` (1536) | `Container` melebar ke 7xl |

## Env (`.env`)
`vite.config.js` memakai `envPrefix: ["VITE_", "NEXT_PUBLIC_"]` agar nama lama tetap dipakai. Semua nilainya publik (ikut ke browser), jangan simpan rahasia. Dibaca saat build: isi juga di env hosting (deploy.md).
| Variabel | Dipakai |
|---|---|
| `NEXT_PUBLIC_CDN_ASSET_URL` | Cover modul (`services/landing.js`). Kosong → cover polos |
| `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_TUTORAI_API_URL` | Belum dipakai (backend & AI Tutor) |

## Catatan dev
- Karena `ssr: false`, saat development halaman dirender di browser (HTML awal kosong). Prerender berisi konten hanya terjadi di `npm run build`.
- `root.jsx` memasang kelas `js` di `<html>` sebelum render; dipakai `Reveal` agar konten tetap terlihat bila JS mati.

## Alur data
```
src/data/*.js  →  src/services/*.js  →  loader() di routes/*.jsx  →  useLoaderData()  →  props ke sections/komponen
```
| Service | Dipakai oleh |
|---|---|
| `landing.js`: `getLandingContent`, `getSiteInfo`, `getProgram`, `getAlumni`, `roundedPlus`, `formatDate` | beranda, layout, `/program/:slug`, `/alumni` |
| `blog.js`: `getPosts`, `getPost` (+ `related`), `readMinutes` | beranda (3 terbaru), `/blog`, `/blog/:slug` |
| `legal.js`: `getLegalPage` (+ `related`), `legalSlugs` | 4 halaman legal |

- `loader` berjalan **saat build** (prerender), jadi seluruh konten tertanam di HTML → terbaca Google.
- Komponen dan section tidak pernah mengimpor `data/` langsung.
- Bentuk item `alumni` = kontrak API backend (dicatat di komentar `data/landing.js`): `id`, `name`, `campus`, `photo` (`{url,width,height}` | `null`), `period`, `program`, `score` (skor akhir | `null`), `story`.
- Bentuk item `mentors` = kontrak API backend: `id`, `name` (dengan gelar), `photo` (`{url,width,height}` | `null`, potret), `mode` (`online`/`offline`), `campus`, `gpa` (skala 4.00 | `null`), `achievements` (1–3 poin).
- Bentuk `network` = kontrak API backend: `mentors` (jumlah mentor unik, juga mengisi statistik "Mentor apoteker" di hero lewat `getLandingContent()` + `roundedPlus()`), `cities: [{ city, groups, lng, lat }]`. Total kelompok & jumlah kota dihitung di komponen. Kota baru cukup diberi `lng`/`lat`.
- Bentuk item `programs` = kontrak API backend: `id` (slug), `name`, `sessions`, `favorite?`, `features: [{ label, value }]` (`value` = teks tampil, `null` = tidak termasuk → dicoret). Harga tidak ditampilkan di mana pun (berbeda per admin/promo); semua tombol paket = tanya harga via WA.
- Bentuk artikel (`data/blog.js`) = kontrak API backend: `slug`, `title`, `category`, `date` (ISO), `excerpt`, `cover` (`{url,width,height}` | `null`), `body` (array paragraf).
- Di `data/landing.js` setiap item ditandai `REAL` (dari situs lama) atau `DUMMY` (wajib diganti).
- Saat backend admin siap: ubah fungsi di `services/` menjadi `fetch` ke API sesuai **api.md**, bentuk data tetap sama. Data yang masih DUMMY: **data-real.md**. Karena data dibaca saat build, situs perlu **di-build ulang setiap admin menyimpan** (lihat deploy.md).

## Section landing (`src/sections/`)
Urutan di `routes/home.jsx`. Navbar, Footer, dan tombol WA ada di `routes/site-layout.jsx` (dipakai semua halaman publik). Link navbar memakai `/#anchor` agar berfungsi dari halaman mana pun. Ritme latar: merah di awal, tengah, dan akhir; terang di antaranya.
Alur cerita: janji (Hero) → bukti angka & manusia (kelulusan, alumni) → siapa & apa (mentor, modul, sebaran kelas) → cara mulai (alur belajar, langkah 1 = pilih program) → penawaran (program) → jawab keberatan (FAQ) → bacaan (blog) → ajakan → aplikasi. Tone latar selang-seling terang/abu di antara blok merah.

| Section | File | Tone | Anchor | Data |
|---|---|---|---|---|
| Navbar | `components/ui/Navbar` via `site-layout.jsx` | brand | — | `site` |
| Hero + maskot + statistik | `Hero.jsx` (maskot: `components/ui/Mascot`) | brand | — | `site`, `stats` |
| Bukti kelulusan ("x dari 10" kepala maskot nasional vs Syndrome, tidak lulus = wajah sedih, tab CBT/OSCE, stempel per periode + jumlah siswa, maskot di dalam panel tab sehingga animasinya diulang saat ganti CBT/OSCE, maskot membuka pengumuman) | `PassRate.jsx` | muted | `#kelulusan` | `passRates` |
| Wall of Alumni (bukti manusia, semua alumni dari services; kartu "lembar hasil UKAI" = strip merah + sobekan + stempel LULUS & skor akhir, foto kosong → `MascotFace`; `Marquee` ke kiri) | `AlumniWall.jsx` (`AlumniCard` juga di `/alumni`) | default | `#alumni` | `alumni` |
| Mentor (kartu ala poster: foto/`MascotFace` di area merah, pita nama kuning, IPK + bar 4.00, poin prestasi; `Marquee` bergerak ke kanan) | `Mentors.jsx` | muted | `#mentor` | `mentors` |
| Modul (mockup buku 3D CSS: cover dari CDN, tebal sesuai jumlah halaman, di atas rak; hover/fokus = cover terbuka) | `Modules.jsx` | default | `#modul` | `modules` (`image` → `cover` di services) |
| Sebaran kelas & mentor (heatmap: peta Indonesia dot-matrix di panel maroon, glow kota sebesar jumlah kelompok, 5 teratas berdenyut; statistik mentor/kelompok/kota; peringkat 6 kota + chip kota lain) | `Network.jsx` (+ `indonesia-dots.js`: titik peta & `project(lng, lat)`) | muted | `#sebaran` | `network` |
| Alur belajar (jalur progres: garis merah terisi, titik menyala berurutan, kartu langkah ringkas (ikon sebaris judul), padding section lebih kecil (`py-12 md:py-16`), langkah terakhir dicap LULUS; vertikal di mobile, horizontal mulai `md`) | `Steps.jsx` | default | — | `steps` |
| Program + garansi, **tanpa harga** (kartu ala etiket: kepala bergaris putus + jumlah pertemuan, bar pertemuan, tombol "Tanya harga" ke WA, fitur yang tidak ada dicoret; favorit = bingkai emas + pita PALING DIPILIH + dinaikkan; stempel GARANSI LULUS) | `Programs.jsx` | brand | `#program` | `programs`, `sharedFeatures`, `guaranteeTerms` |
| FAQ (jawab keberatan; `Accordion variant="card"`, kolom kiri menempel dengan gelembung chat + maskot ke admin WA) | `Faq.jsx` | muted | `#faq` | `faqs` |
| Blog & materi (3 artikel terbaru, `PostCard` dipakai juga di `/blog`: sampul foto atau "etiket" merah berikon kategori; mobile carousel geser) | `BlogPreview.jsx` | default | `#blog` | `posts` (dari `getPosts()` di loader beranda) |
| CTA penutup ("Giliranmu jadi apoteker": kotak merah dua kolom + `MascotGraduate` sebagai penutup cerita maskot, tombol Konsultasi gratis (WA) + Lihat program, bukti sosial jumlah siswa) | `ClosingCta.jsx` | kotak brand | — | `stats[0]` |
| Download app (dua kolom: poin fitur `site.appFeatures` + tombol toko ala badge; mockup ponsel HTML berisi progres, skor tryout aplikasi + stempel LULUS, modul) | `DownloadApp.jsx` | brand (merah, beda dari footer maroon) | `#download` | `site` |
| Footer (logo, sosmed, Layanan 2 kolom, Bantuan, Hubungi Kami, wordmark heatmap) | `components/ui/Footer` via `site-layout.jsx` | brand-dark | — | `site`, `site.socials` |
| Tombol WA melayang | `WhatsAppButton.jsx` via `site-layout.jsx` | — | — | `site.whatsapp` |

Tanggal artikel diformat dengan `formatDate()` (timeZone UTC) agar hasil build dan browser sama.

Semua tombol daftar mengarah ke WhatsApp admin (`wa.me`), tombol paket menyertakan pesan otomatis berisi nama paket.

## Halaman legal
Isi di `src/data/legal.js` (REAL, disalin dari situs lama), satu objek per slug: `title`, `description`, `lang`, `alternate` (link ke versi bahasa lain), `intro`, `sections: [{ heading, body?, items?, footnote? }]`, `mailto?` (tombol kirim email untuk halaman hapus akun).
Tampilan (`routes/legal.jsx`): `PageHeader` merah + pengalih bahasa ID | EN, daftar isi bernomor yang menempel di desktop (anchor `#bagian-n`), bagian bernomor ala FAQ, `footnote` sebagai sorotan kuning, kartu email untuk `mailto`, dan "Lihat juga" ke halaman legal lain berbahasa sama (`related`, dihitung di `getLegalPage()`). Teks antarmuka (Daftar isi/Contents, dll.) ada di konstanta `UI` per bahasa.
Untuk menambah halaman legal: tambah objek di `legal.js`, slug di `legalPaths` (`routes.js`), dan path di `pages` (`react-router.config.js`).
