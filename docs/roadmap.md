# Roadmap

Style: clean modern (referensi dicoding.com, notion.com) dengan Merah & Kuning Syndrome dominan.
Detail aturan visual: design-tokens.md.

## 0. Fondasi
- [x] Arsitektur SEO: React Router v7 + prerender (lihat architecture.md)
- [x] Router + struktur folder
- [x] Design tokens di `src/index.css` (lihat design-tokens.md)
- [x] Font self-host: Plus Jakarta Sans

## 1. Komponen UI umum + halaman `/ui` (khusus development)
- [x] Halaman `/ui` yang menampilkan semua komponen beserta variannya (tidak ikut build produksi)
- [x] Button (primary emas, secondary, ghost, ukuran, ikon, link)
- [x] Container & Section (spasi vertikal standar, eyebrow + judul + deskripsi)
- [x] Heading / Text (skala tipografi)
- [x] Card, Badge, Divider
- [x] Accordion (FAQ), Tabs, Tooltip
- [x] Navbar (sticky, menu mobile), Footer
- [x] Ikon (satu set konsisten)
- [x] Animasi reveal saat scroll (hormati `prefers-reduced-motion`)

## 2. Lapisan data (siap diganti backend/admin)
- [x] `services/` berisi `getLandingContent()` yang sekarang mengembalikan data dummy (`src/data/landing.js`)
- [x] Data dummy: paket (Premium 70x, Gold 73x, Silver 24x, Diamond 27x pertemuan + harga dummy), modul, FAQ, testimoni, mentor, statistik
- [x] ~~State loading/error~~ tidak diperlukan: data diambil saat build, bukan di browser

## 3. Landing page
- [x] Hero + CTA (Daftar, Konsultasi WA)
- [x] Statistik (5000+ siswa, dll)
- [x] Jaringan mentor / Capaian (peta)
- [x] Profil mentor
- [x] Modul (Klinis, Industri + SBA, OSCE)
- [x] Alur belajar
- [x] Program: kartu paket (perbandingan per baris fitur) + harga + syarat Garansi Lulus
- [x] Testimoni
- [x] Download app (Play Store / App Store)
- [x] FAQ
- [x] CTA penutup
- [x] Tombol WhatsApp melayang

## 4. Halaman lain
- [x] Kebijakan Privasi (`/privacy-policy-id` + versi EN `/privacy-policy`, URL lama dipertahankan)
- [x] Hapus Akun (`/data-deletion-request-id` + versi EN `/data-deletion-request`)
- [x] Halaman 404
- [ ] Widget AI Tutor (menunggu info API)

## 5. SEO
- [x] Title, meta description, canonical per halaman
- [x] Open Graph + Twitter card + gambar OG
- [x] Structured data JSON-LD (EducationalOrganization, Course/Offer untuk paket, FAQPage)
- [x] `sitemap.xml`, `robots.txt`
- [x] Heading semantik (satu h1), alt gambar, `lang="id"`
- [x] Ukuran gambar tetap + lazy load
- [ ] Performa lanjutan: konversi gambar ke WebP/AVIF, preload font, uji Lighthouse ≥ 90 (setelah deploy)

## 6. Penutup
- [ ] Panduan deploy (`docs/deploy.md`)
- [ ] Cek responsif (mobile → desktop) & aksesibilitas (kontras, fokus keyboard)
- [ ] Ganti placeholder dengan data asli

## Menunggu dari pemilik
- Harga asli, testimoni + foto, nama + foto mentor, link sosmed asli, nomor WA, logo (SVG), API AI Tutor, endpoint backend

## Riwayat keputusan
- 2026-11-19: Style diganti dari "gelap premium" ke "clean modern" (latar terang, merah & kuning Syndrome dominan). Font serif dihapus.
- 2026-11-19: Peran warna diperjelas — merah = latar dominan (navbar, hero, section unggulan, footer maroon), kuning = aksen (tombol utama, sorotan judul, tab aktif). Ditambah sistem tone dan komponen `Highlight`.
- 2026-11-19: Landing page versi pertama selesai (semua section + data dummy via `services/` + `loader` prerender). Harga, mentor, testimoni, sebagian statistik & FAQ masih DUMMY.
- 2026-11-19: Logo dikonversi ke SVG (komponen `Logo`). Kuning aksen diganti mengikuti logo `#d38c0e`, ditambah `accent-light` untuk teks kuning di atas merah.
- 2026-11-19: Kuning aksen dikembalikan ke `#eab308` (keputusan sebelumnya dibatalkan). Logo SVG mengikuti kuning ini, bukan warna asli PNG.
- 2026-11-19: Tahap 4: 4 halaman legal (ID + EN, URL lama) dengan satu template, layout bersama (Navbar/Footer/WA) untuk semua halaman publik, halaman 404. AI Tutor ditunda menunggu info API.
- 2026-11-19: Tahap 5 SEO: helper `seo()`, Open Graph + gambar OG, JSON-LD (organisasi, website, kursus, FAQ), favicon SVG/apple-touch/manifest, robots.txt, sitemap.xml otomatis dari `pages`.
