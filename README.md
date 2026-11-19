# Syndrome UKAI v2 — Landing Page

Situs resmi **Syndrome UKAI** ([ukaisyndrome.id](https://ukaisyndrome.id)), platform bimbingan persiapan UKAI CBT & OSCE
untuk calon apoteker. Versi 2 adalah pembaruan total situs lama: tampilan lebih modern, konten lebih lengkap, dan SEO yang
kuat, dengan konten yang nantinya dikelola dari halaman admin.

## Sekilas

| | |
|---|---|
| **Jenis** | Situs statis hasil prerender (tanpa server Node di produksi) |
| **Stack** | React 19 · React Router v7 (framework mode, `ssr: false` + `prerender`) · Vite · Tailwind CSS v4 |
| **Style** | Clean modern — Merah Syndrome `#a11d1d` sebagai latar dominan, Kuning Syndrome `#eab308` sebagai aksen |
| **Font** | Plus Jakarta Sans (self-host) |
| **Ikon** | lucide-react |
| **Bahasa** | Indonesia (halaman legal juga tersedia dalam bahasa Inggris) |

## Halaman

| Path | Isi |
|---|---|
| `/` | Landing: hero, statistik, capaian, mentor, modul, alur belajar, program & harga, testimoni, download app, FAQ |
| `/privacy-policy-id` · `/privacy-policy` | Kebijakan Privasi (ID · EN) |
| `/data-deletion-request-id` · `/data-deletion-request` | Permintaan hapus akun (ID · EN) |
| `/ui` | Galeri semua komponen UI — **hanya saat development** |

URL halaman legal sama dengan situs lama karena tertaut di Play Store / App Store.

## Fitur utama

- **SEO**: setiap halaman di-prerender jadi HTML berisi konten lengkap, meta + Open Graph per halaman, JSON-LD
  (organisasi, kursus/paket, FAQ), `sitemap.xml` otomatis, `robots.txt`, hreflang ID/EN.
- **Design system**: token warna di `src/index.css`, sistem *tone* (komponen otomatis menyesuaikan di latar merah),
  komponen umum di `src/components/ui` yang semuanya bisa dilihat di `/ui`.
- **Siap backend**: konten tidak ditulis di komponen, melainkan lewat `src/services/` yang kini membaca data dummy dan
  nantinya diganti API admin.
- **Konversi**: semua tombol daftar/konsultasi mengarah ke WhatsApp admin, plus tombol WA melayang.
- **Aksesibel**: HTML semantik, navigasi keyboard, fokus terlihat, menghormati `prefers-reduced-motion`.

## Memulai

Butuh **Node.js 22** atau lebih baru.

```bash
npm install
npm run dev        # http://localhost:5173, galeri komponen di /ui
```

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Server development |
| `npm run build` | Build + prerender ke `build/client` (siap di-hosting statis) |
| `npm run preview` | Sajikan hasil build secara lokal |
| `npm run lint` | ESLint |

> Peringatan editor `Unknown at rule @theme` aman diabaikan: itu sintaks Tailwind v4 yang belum dikenal editor.
> Pasang ekstensi *Tailwind CSS IntelliSense* untuk menghilangkannya.

## Struktur singkat

```
src/
  routes/          Halaman (home, legal, 404, ui)
  sections/        Bagian landing page
  components/ui/   Komponen umum
  services/        Pintu data (nanti API backend)
  data/            Konten sementara (ditandai REAL / DUMMY)
  seo.js           Helper meta SEO
public/            Favicon, ikon, gambar OG, robots.txt
docs/              Dokumentasi pengembangan
```

## Dokumentasi

Acuan lengkap ada di **[docs/](docs/README.md)**: arsitektur, design tokens, komponen, SEO, konvensi, dan roadmap.
Setiap perubahan kode wajib ikut memperbarui dokumen terkait.

## Status

Landing, halaman legal, 404, dan SEO sudah jadi. Sebagian konten (harga, mentor, testimoni, sebagian statistik)
masih **dummy**. Rincian dan langkah berikutnya: [docs/roadmap.md](docs/roadmap.md).

---

© Outlook-Project
