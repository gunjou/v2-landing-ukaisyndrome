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
- [x] Jaringan mentor / peta (kini "Sebaran kelas & mentor")
- [x] Profil mentor
- [x] Modul (Klinis, Industri + SBA, OSCE)
- [x] Alur belajar
- [x] Program: kartu paket (perbandingan per baris fitur) + syarat Garansi Lulus (harga kemudian dihapus)
- [x] ~~Testimoni~~ diganti Wall of Alumni
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
- [x] Structured data JSON-LD (EducationalOrganization, Course untuk paket tanpa Offer, FAQPage, Article)
- [x] `sitemap.xml`, `robots.txt`
- [x] Heading semantik (satu h1), alt gambar, `lang="id"`
- [x] Ukuran gambar tetap + lazy load
- [ ] Performa lanjutan: konversi gambar ke WebP/AVIF, preload font, uji Lighthouse ≥ 90 (setelah deploy)

## 6. Penutup
- [x] Panduan deploy (`docs/deploy.md`): env, hosting statis / Nginx, 404, build ulang saat konten berubah
- [x] Cek responsif (320 → 1920px, emulasi Chrome; HP sungguhan menyusul setelah deploy), lihat architecture.md bagian Responsif
- [x] Cek aksesibilitas (kontras, fokus keyboard): axe-core 0 pelanggaran, uji Tab semua halaman; detail di design-tokens.md
- [ ] Ganti placeholder dengan data asli

## 7. Ekspansi konten (kerangka dulu, data DUMMY)
Prinsip: bangun **kerangka** (route, data, section, alur) dengan data DUMMY mengikuti alur `data/` → `services/` → `loader`.
Tampilan dipoles di 7B **setelah kerangka disetujui**. Data asli menyusul di 7C. Setiap halaman baru: `seo()`, masuk `pages`, catat di architecture.md.

### 7A. Kerangka (DUMMY)
- [x] **Bukti kelulusan** — section di landing: pass rate per periode UKAI (CBT & OSCE terpisah) vs nasional
- [x] **Wall of Alumni** — section ringkas di landing + halaman `/alumni` (nama, kampus, periode, foto, kisah singkat)
- [x] ~~**Try out gratis** — halaman `/tryout`~~ dihapus (lihat riwayat keputusan)
- [x] ~~**Kalender UKAI** — section di landing~~ dihapus (lihat riwayat keputusan)
- [x] **Halaman per paket** — `/program/:slug` (Premium, Gold, Silver, Diamond): silabus, jadwal, cocok untuk siapa, syarat garansi, CTA WA; kartu paket di landing menaut ke sini
- [x] **Blog / bank materi** — `/blog` (daftar + filter kategori) dan `/blog/:slug` (artikel); JSON-LD `Article`; semua slug masuk `pages`
- [x] ~~**Kerja sama kampus** — halaman `/kerja-sama`~~ dihapus (lihat riwayat keputusan)
- [x] Navbar & Footer: tambah link ke halaman baru
- [x] Review kerangka bersama pemilik → **kunci struktur sebelum lanjut 7B**

### 7B. Penyesuaian tampilan (setelah kerangka fix)
- [x] Arah visual khas farmasi (stempel, etiket, kapsul, resep) diterapkan konsisten, dicatat di design-tokens.md
- [x] Hero dinamis: maskot Syndrome (dari logo) yang sedang membaca buku, animasi SVG + CSS tanpa dependensi
- [x] Animasi scroll diulang tiap masuk layar (`Reveal`) + statistik hero menghitung naik (`CountUp`)
- [x] Bukti kelulusan: grafik diganti cerita "x dari 10" (kepala maskot menyala) + stempel LULUS per periode + maskot membuka pengumuman (cemas → senyum saat stempel). Dibuat ringkas agar muat satu layar
- [x] Dokumentasi animasi & maskot (`docs/motion.md`)
- [x] Wall of Alumni: kartu "lembar hasil UKAI" (strip merah, sobekan, stempel LULUS + skor akhir, foto alumni atau avatar maskot bila tanpa foto), carousel otomatis tanpa ujung (marquee, tanpa navigasi); data alumni distandarkan untuk backend
- [x] Halaman `/alumni`: hanya daftar alumni (section bukti kelulusan dihapus), header dengan maskot wisuda (`MascotGraduate`)
- [x] Alur belajar: jalur progres beranimasi + kartu langkah berikon, langkah terakhir dicap LULUS
- [x] Modul: mockup buku fisik 3D (cover dari CDN `NEXT_PUBLIC_CDN_ASSET_URL`) di atas rak, animasi masuk + goyang + cover terbuka saat hover
- [x] Mentor: kartu ala poster (foto, pita nama, IPK, prestasi) dengan data standar backend, carousel tanpa ujung (`Marquee`, dipakai juga Alumni)
- [x] Sebaran kelas & mentor (dulu "Capaian"): heatmap sebaran kelompok belajar (34 kota, 271 kelompok, 224 mentor — data Nov 2026) di peta dot-matrix
- [x] Program: kartu ala etiket, harga dihapus (tanya harga via WA), data `features` standar backend, perbandingan fitur (yang tidak ada dicoret), paket favorit menonjol, stempel GARANSI LULUS
- [x] FAQ: kartu bernomor (`Accordion` varian `card`), gelembung chat "Tanya Admin" dengan maskot
- [x] Kalender UKAI dihapus; diganti section Blog & materi (3 artikel terbaru, kartu `PostCard` bersama halaman `/blog`)
- [x] CTA penutup: dua kolom dengan maskot wisuda, Konsultasi gratis via WA, bukti sosial jumlah siswa
- [x] Download app: mockup ponsel (HTML + token) bergerak pelan, poin fitur, tombol toko ala badge
- [x] Footer: logo, tombol media sosial (Instagram & TikTok @syndrome_ukai), judul kolom kuning, wordmark logo + SYNDROME dengan cahaya heatmap mengikuti kursor (adaptasi Dicoding)
- [x] Urutan beranda disusun ulang: Mentor → Modul → Sebaran kelas → Alur belajar (tepat sebelum Program); tone selang-seling disesuaikan
- [x] Halaman legal (4 halaman): header merah + pengalih ID | EN, daftar isi menempel, bagian bernomor, sorotan footnote, kartu email, "Lihat juga"
- [x] Halaman `/alumni`: angka ringkas di header, filter chip periode, kartu beranimasi, CTA penutup
- [x] Blog: kartu unggulan artikel terbaru, filter chip berjumlah, waktu baca; halaman artikel dengan bagikan WA/salin tautan, ajakan ke program, artikel terkait di samping
- [x] Halaman 404: merah penuh, angka 0 diganti kepala maskot cemas, tautan cepat
- [x] Halaman detail paket `/program/:slug`: pengalih paket, etiket paket, silabus bernomor, syarat garansi berstempel, CTA penutup
- [ ] Hero dengan dua jalur: "UKAI pertama" vs "Mengulang UKAI" (perlu ditinjau: riwayat mengulang tidak lagi ditampilkan di alumni)
- [x] Komponen baru masuk `/ui` + components.md (`Marquee`, `BrandIcons`, `MascotGraduate`, varian `Accordion card`)
- [x] Cek responsif halaman baru
- [x] Cek aksesibilitas halaman baru

### 7C. Data asli
Daftar lengkap & prioritas: data-real.md. Kontrak backend: api.md.
- [ ] Pass rate per periode + sumber angka nasional
- [ ] Data & izin foto alumni
- [ ] Silabus & jadwal per paket
- [ ] Artikel blog awal (min. 5)
- [ ] Jumlah kelompok per kota & mentor dari backend (sekarang salinan manual Nov 2026)

## Menunggu dari pemilik
- Testimoni + foto, nama + foto mentor, nomor WA, logo (SVG), API AI Tutor, endpoint backend

## Riwayat keputusan
- 2026-11-19: Style diganti dari "gelap premium" ke "clean modern" (latar terang, merah & kuning Syndrome dominan). Font serif dihapus.
- 2026-11-19: Peran warna diperjelas — merah = latar dominan (navbar, hero, section unggulan, footer maroon), kuning = aksen (tombol utama, sorotan judul, tab aktif). Ditambah sistem tone dan komponen `Highlight`.
- 2026-11-19: Landing page versi pertama selesai (semua section + data dummy via `services/` + `loader` prerender). Harga, mentor, testimoni, sebagian statistik & FAQ masih DUMMY.
- 2026-11-19: Logo dikonversi ke SVG (komponen `Logo`). Kuning aksen diganti mengikuti logo `#d38c0e`, ditambah `accent-light` untuk teks kuning di atas merah.
- 2026-11-19: Kuning aksen dikembalikan ke `#eab308` (keputusan sebelumnya dibatalkan). Logo SVG mengikuti kuning ini, bukan warna asli PNG.
- 2026-11-19: Tahap 4: 4 halaman legal (ID + EN, URL lama) dengan satu template, layout bersama (Navbar/Footer/WA) untuk semua halaman publik, halaman 404. AI Tutor ditunda menunggu info API.
- 2026-11-19: Tahap 5 SEO: helper `seo()`, Open Graph + gambar OG, JSON-LD (organisasi, website, kursus, FAQ), favicon SVG/apple-touch/manifest, robots.txt, sitemap.xml otomatis dari `pages`.
- 2026-11-19: Ekspansi disetujui (tahap 7): bukti kelulusan, alumni, try out, kalender UKAI, halaman per paket, blog, kerja sama kampus. Urutan: kerangka dengan data DUMMY → kunci struktur → poles tampilan → data asli.
- 2026-11-19: Tahap 7A kerangka selesai (DUMMY). Navbar: Capaian, Mentor, Modul, Program, Alumni, Try Out, Blog (FAQ pindah ke Footer). Section Testimoni dipertahankan berdampingan dengan Wall of Alumni sampai review kerangka.
- 2026-11-19: Review kerangka: section Testimoni dihapus (digantikan Wall of Alumni yang lebih spesifik). Urutan beranda disusun ulang mengikuti alur cerita janji → bukti → cara → penawaran → keberatan → urgensi → ajakan. Struktur 7A dikunci.
- 2026-11-19: Hero memakai maskot bergerak ala Duolingo, dibuat dari bentuk logo (kepala, buku, tangan kapsul) tanpa atribut apoteker tambahan agar tidak ramai. Tahap awal SVG + CSS; bisa dibuat ulang di Rive oleh animator bila perlu.
- 2026-11-19: Bukti kelulusan tidak memakai grafik (sulit dibaca orang awam). Diganti "x dari 10" dengan kepala maskot + stempel per periode; persentase asli tetap ditulis karena pembulatan ke 10. Alur cerita maskot: hero belajar → kelulusan membuka pengumuman.
- 2026-11-19: Wall of Alumni memakai bahasa visual Bukti Kelulusan (stempel LULUS) dalam kartu "lembar hasil UKAI". Backend hanya memberi skor akhir (bukan skor sebelum/sesudah), jadi kartu menampilkan satu skor. Riwayat perjalanan (sempat gagal / mengulang) tidak ditampilkan: hanya status lulus; badge & filter "Sempat gagal" dihapus.
- 2026-11-19: Harga paket tidak ditampilkan lagi (landing, halaman paket, JSON-LD `Offer`) karena harga & promo berbeda per admin. Tombol paket diganti "Tanya harga" ke WhatsApp. Fitur paket jadi daftar `features [{ label, value }]` agar mengikuti data backend.
- 2026-11-19: Section Kalender UKAI (hitung mundur & kuota batch) dihapus dari beranda, link "Jadwal UKAI" di footer diganti "Blog & Materi". Posisinya diisi section Blog & materi.
- 2026-11-19: Fitur try out gratis (`/tryout`, data & service-nya, link navbar) dihapus dari situs. CTA di artikel blog diganti "Lihat program". Section "Capaian" diganti nama "Sebaran kelas & mentor" (`#sebaran`) karena isinya peta kelas & mentor, bukan capaian. Urutan beranda: Hero → Bukti kelulusan → Alumni → Mentor → Modul → Sebaran kelas → Alur belajar → Program → FAQ → Blog → CTA → Download.
- 2026-11-19: Halaman kerja sama kampus (`/kerja-sama`) beserta data & service-nya dihapus, kolom "Institusi" di footer dihapus. Kolom "Layanan" jadi selebar 2 kolom (tautan 2 kolom) dan berisi juga "Download Aplikasi".
- 2026-11-19: Maskot mentor (`MascotMentor`) dihapus dari section Mentor beserta komponen & animasinya.
- 2026-11-19: Panduan deploy dibuat (`docs/deploy.md`). Build kini juga menulis `404.html` (salinan `__spa-fallback.html`) agar hosting statis langsung menampilkan halaman 404; `engines.node >= 20`. Semua dokumen diselaraskan dengan kode.
- 2026-11-19: Cek aksesibilitas. Token `fg-subtle` digelapkan (`#736b68`), `highlight` di area merah jadi `#facc15`, `fg-subtle` di area merah `#e8c4c4` (semua ≥ 4.5:1). Ditambah tautan "Lewati ke konten", carousel bisa difokus, tombol WA di dalam landmark, label 404 diperbaiki.
