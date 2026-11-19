# Kontrak API Backend untuk Landing Page

Daftar endpoint yang dibutuhkan landing page, beserta bentuk datanya.
Bentuk data **sama persis** dengan `src/data/*.js` sekarang, jadi saat backend siap cukup isi fungsi di `src/services/` dengan `fetch`, tanpa mengubah tampilan.
Daftar isi yang harus diisi admin: [data-real.md](data-real.md).

## Prinsip
- **Hanya baca (GET), publik, tanpa login.** Landing tidak menulis data apa pun; pendaftaran lewat WhatsApp.
- **Dipanggil saat build, bukan oleh pengunjung.** Semua `loader` jalan saat `npm run build` (prerender). Jadi beban API hanya sekali per build, dan API boleh lambat sedikit. Konsekuensinya: **setiap admin menyimpan, situs harus di-build ulang** (lihat bagian Deploy hook).
- Base URL: `VITE_API_URL` (mis. `https://api.ukaisyndrome.id/v1`).
- Format: JSON, UTF-8. Dibungkus format respons standar backend, mis. `{ "data": ... }`. Contoh di bawah hanya menulis isi `data`.
- Tanggal: ISO `YYYY-MM-DD`. Gambar: objek `{ url, width, height }` (URL absolut, ukuran piksel asli) atau `null`.
- Teks polos (tanpa HTML), agar aman ditampilkan.
- `id`/`slug`: huruf kecil, stabil (dipakai di URL & sebagai key), tidak berubah setelah terbit.
- Field opsional boleh `null`; tampilan sudah menangani (mis. foto `null` → avatar maskot, `score`/`gpa` `null` → disembunyikan).

## Ringkasan endpoint
| # | Endpoint | Dipakai di | Ganti fungsi |
|---|---|---|---|
| 1 | `GET /site` | Semua halaman (navbar, footer, WA, download) | `getSiteInfo()` |
| 2 | `GET /stats` | Hero, CTA penutup | bagian `getLandingContent()` |
| 3 | `GET /pass-rates` | Bukti kelulusan | bagian `getLandingContent()` |
| 4 | `GET /alumni` | Wall of Alumni (beranda), `/alumni` | `getAlumni()` + `getLandingContent()` |
| 5 | `GET /mentors` | Mentor | bagian `getLandingContent()` |
| 6 | `GET /modules` | Modul | bagian `getLandingContent()` |
| 7 | `GET /network` | Sebaran kelas, statistik mentor | bagian `getLandingContent()` |
| 8 | `GET /steps` | Alur belajar | bagian `getLandingContent()` |
| 9 | `GET /programs` | Program (beranda), pengalih paket, sitemap | bagian `getLandingContent()`, `react-router.config.js` |
| 10 | `GET /programs/{id}` | `/program/:slug` | `getProgram()` |
| 11 | `GET /faqs` | FAQ (+ JSON-LD FAQPage) | bagian `getLandingContent()` |
| 12 | `GET /posts` | Blog (beranda), `/blog`, sitemap | `getPosts()`, `react-router.config.js` |
| 13 | `GET /posts/{slug}` | `/blog/:slug` | `getPost()` |
| — | Halaman legal | Tetap statis di `src/data/legal.js` (jarang berubah, URL terikat Play Store / App Store). Endpoint opsional | — |

Alternatif: satu endpoint gabungan `GET /landing` yang mengembalikan #1–#9 + #11 sekaligus (isi `getLandingContent()` saat ini) agar build cukup satu panggilan untuk beranda.

---

## 1. `GET /site`
```json
{
  "name": "Syndrome UKAI",
  "tagline": "Platform penyedia layanan pendidikan farmasi ...",
  "whatsapp": "628895946963",
  "phoneLabel": "+62 889 5946 963",
  "email": "admin@ukaisyndrome.id",
  "loginUrl": "https://app.ukaisyndrome.id/login",
  "playStore": "https://play.google.com/store/apps/details?id=com.ukaisyndrome.app",
  "appStore": "https://apps.apple.com/app/syndrome-ukai/id6776521389",
  "socials": [{ "name": "Instagram", "handle": "@syndrome_ukai", "url": "https://www.instagram.com/syndrome_ukai/" }],
  "appFeatures": ["Modul & rekaman kelas di genggaman", "..."]
}
```
- `whatsapp`: angka saja dengan kode negara (untuk `wa.me`).
- `socials[].name`: `Instagram` | `TikTok` (menentukan ikon; nama lain tampil tanpa ikon khusus).

## 2. `GET /stats`
```json
[
  { "value": "5000+", "label": "Siswa terdaftar" },
  { "value": "93%", "label": "Tingkat kelulusan" },
  { "key": "mentors", "label": "Mentor apoteker" },
  { "value": "1.250", "label": "Halaman modul" }
]
```
- `value` berupa teks tampil (boleh awalan/akhiran, titik ribuan); dianimasikan menghitung naik.
- Item `key: "mentors"` tanpa `value`: frontend mengisi dari `network.mentors`.
- Item pertama dipakai juga di CTA penutup ("Bergabung dengan 5000+ siswa terdaftar").
- Saran: "Tingkat kelulusan" dihitung backend dari pass rate periode terakhir agar konsisten.

## 3. `GET /pass-rates`
Urut dari periode **terlama ke terbaru** (item terakhir = periode terbaru yang ditonjolkan).
```json
[
  { "period": "Agustus 2026", "cbt": 93, "osce": 94, "national": { "cbt": 63, "osce": 73 }, "participants": 498 }
]
```
- `cbt`, `osce`, `national.*`: persen bulat 0–100. `participants`: jumlah siswa Syndrome yang ikut periode itu.
- Sertakan sumber angka nasional di admin (untuk dicantumkan bila diminta).

## 4. `GET /alumni`
Urut sesuai keinginan admin (beranda menampilkan semuanya dalam carousel; halaman `/alumni` memfilter per `period`).
```json
[
  {
    "id": "a1",
    "name": "Nama Alumni",
    "campus": "Universitas A",
    "photo": { "url": "https://cdn.../alumni/a1.jpg", "width": 400, "height": 400 },
    "period": "Agustus 2026",
    "program": "gold",
    "score": 78,
    "story": "Kisah singkat ±140 karakter."
  }
]
```
- `program` = `id` dari `/programs`. `score` = skor akhir (boleh `null`). `photo` boleh `null`.
- Hanya alumni yang **lulus & sudah memberi izin tampil**. Riwayat gagal/mengulang tidak ditampilkan.
- Opsional: `?limit=` untuk membatasi carousel beranda (mis. 12).

## 5. `GET /mentors`
```json
[
  {
    "id": "m1",
    "name": "apt. Nama Mentor, S.Farm.",
    "photo": { "url": "https://cdn.../mentor/m1.jpg", "width": 800, "height": 1000 },
    "mode": "online",
    "campus": "Universitas A",
    "gpa": 3.89,
    "achievements": ["Lulusan terbaik, cumlaude S1 & Apoteker", "Asisten dosen praktikum"]
  }
]
```
- `mode`: `online` | `offline`. `gpa`: angka skala 4.00 atau `null`. `achievements`: 1–3 poin singkat.
- Foto potret (4:5), wajah di bagian atas.

## 6. `GET /modules`
```json
[{ "name": "Klinis", "pages": 600, "image": "modul_klinis.png", "description": "..." }]
```
- `image`: nama file di CDN (`VITE_CDN_ASSET_URL`), atau ganti dengan objek `cover: { url, width, height }` (lalu hapus perakitan URL di `services/landing.js`). Cover sekarang 576×720 (4:5).
- `pages` menentukan tebal buku 3D.

## 7. `GET /network`
```json
{
  "description": "Dengan jaringan mentor terluas, ...",
  "mentors": 224,
  "cities": [{ "city": "Bandung", "groups": 35, "lng": 107.6, "lat": -6.9 }]
}
```
- `mentors`: jumlah mentor **unik & aktif** (tanpa akun uji).
- `cities[].groups`: jumlah kelompok belajar aktif per kota, dihitung backend dari tabel kelompok (kelompok uji coba dibuang, kelompok kampus digabung ke kotanya).
- `lng`/`lat`: koordinat kota (simpan di tabel kota). Total kelompok & jumlah kota dihitung frontend.

## 8. `GET /steps`
```json
[{ "title": "Pilih program", "description": "Tentukan paket sesuai kebutuhan dan jadwal ujianmu." }]
```
- Disarankan tetap 4 langkah; langkah terakhir mendapat stempel LULUS. Ikon dipasang frontend berdasarkan urutan.

## 9. `GET /programs`
```json
{
  "programs": [
    {
      "id": "gold",
      "name": "Gold",
      "sessions": 73,
      "favorite": true,
      "features": [
        { "label": "Kelas online", "value": "60x" },
        { "label": "Kelas OSCE", "value": null },
        { "label": "Latihan soal via Zoom", "value": "800 soal" }
      ]
    }
  ],
  "sharedFeatures": ["Akses rekaman kelas sampai UKAI", "..."],
  "guaranteeTerms": ["Tidak boleh bolos les lebih dari 3x.", "..."]
}
```
- **Tanpa harga** (harga & promo lewat admin WhatsApp).
- `features[].value`: teks tampil; `null` = tidak termasuk (dicoret). Urutan & jumlah fitur sebaiknya sama di semua paket agar mudah dibandingkan.
- `favorite`: maksimal satu paket.
- Daftar `id` dipakai untuk membuat halaman `/program/{id}` & sitemap saat build.

## 10. `GET /programs/{id}`
Isi `/programs` untuk satu paket + detail:
```json
{
  "id": "gold", "name": "Gold", "sessions": 73, "favorite": true, "features": [ ... ],
  "audience": ["Butuh pendampingan rutin hampir setiap hari"],
  "syllabus": ["Seluruh materi klinis & industri", "60 sesi online pembahasan soal"],
  "schedule": "Online 5x seminggu, intensif tiap Sabtu. Durasi ±4 bulan."
}
```
- 404 bila `id` tidak ada. Frontend menggabungkan dengan `sharedFeatures`, `guaranteeTerms`, daftar paket, dan `site`.

## 11. `GET /faqs`
```json
[{ "question": "Apa syarat klaim Garansi Lulus?", "answer": "..." }]
```
- Teks polos. Semua FAQ masuk JSON-LD `FAQPage` (terbaca Google).

## 12. `GET /posts`
```json
{
  "categories": ["Tips UKAI", "Pembahasan Soal", "OSCE", "Regulasi"],
  "posts": [
    {
      "slug": "strategi-lulus-ukai-cbt",
      "title": "Strategi Lulus UKAI CBT dalam 3 Bulan",
      "category": "Tips UKAI",
      "date": "2026-11-01",
      "excerpt": "Ringkasan 1–2 kalimat.",
      "cover": { "url": "https://cdn.../blog/strategi.jpg", "width": 1600, "height": 900 },
      "readMinutes": 5
    }
  ]
}
```
- Urut **terbaru dulu**. Hanya artikel berstatus terbit.
- `readMinutes`: dihitung backend (±200 kata/menit) agar daftar tidak perlu memuat `body`. Bila tidak dikirim, frontend menghitung dari `body`.
- `cover` boleh `null` (tampil sampul merah berikon kategori). Kategori yang tidak dikenal tetap tampil dengan ikon buku.
- Daftar `slug` dipakai untuk membuat halaman `/blog/{slug}` & sitemap saat build.

## 13. `GET /posts/{slug}`
Satu artikel lengkap + `body`:
```json
{ "slug": "...", "title": "...", "category": "...", "date": "2026-11-01", "excerpt": "...", "cover": null, "readMinutes": 5,
  "body": ["Paragraf 1.", "Paragraf 2."] }
```
- `body`: array paragraf teks polos. (Bila nanti butuh subjudul/gambar/daftar di artikel, sepakati format blok terstruktur, mis. `[{ "type": "heading", "text": "..." }]`; jangan HTML mentah.)
- "Artikel terkait" (3 artikel, kategori sama dulu) dihitung frontend dari `/posts`; atau backend boleh mengirim `related: [post ringkas]`.
- 404 bila tidak ada / belum terbit.

---

## Deploy hook (backend → hosting)
Karena konten tertanam saat build, backend perlu **memicu build ulang** setiap admin menyimpan/menerbitkan data di atas:
- Hosting (Netlify / Cloudflare Pages / Vercel) menyediakan URL build hook. Backend cukup `POST` ke URL itu setelah simpan.
- Beri jeda/gabungkan (debounce, mis. 1–2 menit) agar beberapa perubahan beruntun hanya memicu satu build.
- Simpan URL hook sebagai rahasia di backend (bukan di frontend).
Lihat juga [deploy.md](deploy.md).

## Perubahan di frontend saat API siap
1. `src/services/landing.js` & `src/services/blog.js`: ganti `return data...` dengan `fetch(`${import.meta.env.VITE_API_URL}/...`)`; bentuk hasil tetap. Gagal fetch → build gagal (lebih aman daripada situs kosong).
2. `react-router.config.js`: daftar `pages` untuk `/program/{id}` & `/blog/{slug}` diambil dari `GET /programs` & `GET /posts` (bukan dari `src/data/`).
3. `src/data/` dihapus (kecuali `legal.js` & `indonesia-dots.js`) setelah semua endpoint dipakai.
4. Perbarui architecture.md (alur data) & centang roadmap.
