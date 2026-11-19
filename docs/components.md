# Komponen UI

Lokasi: `src/components/ui/`. Impor lewat barrel: `import { Button, Card } from "../components/ui"`.
Lihat semua contoh hidup di **http://localhost:5173/ui** (hanya saat `npm run dev`).

Komponen baru wajib: (1) ditambahkan ke `index.js`, (2) didemokan di `src/routes/ui.jsx`, (3) dicatat di tabel ini.

| Komponen | Props utama | Catatan |
|---|---|---|
| `Container` | `className` | Lebar maks 6xl (7xl mulai `2xl` / 1536px), padding samping responsif |
| `Section` | `id`, `tone` (`default`/`muted`/`brand`/`brand-dark`), `className` | Padding vertikal standar + Container. `brand` = latar merah dominan (lihat sistem tone di design-tokens.md) |
| `SectionHeader` | `eyebrow`, `title`, `description`, `align` (`left`/`center`) | Pembuka setiap section |
| `PageHeader` | `eyebrow`, `title` (teks atau elemen, mis. dengan `Highlight`), `description`, `children` (tombol), `aside` (ilustrasi kanan, 2 kolom mulai `md`) | Kepala halaman selain beranda: latar merah, berisi `<h1>` |
| `Heading` | `as` (h1–h4), `size` (`xl`/`lg`/`md`/`sm`) | Bold sans, `text-balance` (baris dibagi seimbang). `as` = semantik, `size` = tampilan. Di `Typography.jsx` bersama `Eyebrow` & `Text` |
| `Eyebrow` | — | Label kecil warna `highlight` (kuning tua di terang, kuning di merah) |
| `Highlight` | — | Kata sorotan di judul: stabilo kuning / teks kuning di area merah |
| `Logo` | `title`, `className` | SVG inline, warna `currentColor` (default `text-accent` = kuning brand `#eab308`; file asli PNG berwarna `#d38c0e`), ukuran default 32px. `title={null}` bila dekoratif di samping teks nama |
| `Mascot` | `className` | Maskot dari bentuk logo (kepala + buku terbuka + tangan kapsul) yang sedang membaca. Selalu `aria-hidden`. Animasi kelas `mascot-*` di `index.css`: bernapas, berkedip, mata membaca, halaman dibalik, kapsul melayang. Diam saat reduced-motion. Warna lewat token (`accent`, `bg`, `ink`, `fg`), aman di area terang & merah |
| `CountUp` | `value` (teks, mis. `"5000+"`, `"92%"`, `"1.250"`), `duration` (ms, default 1500) | Angka menghitung naik dari 0 setiap kali masuk layar; awalan/akhiran dipertahankan, titik dibaca sebagai pemisah ribuan. HTML prerender & reduced-motion = nilai akhir |
| `MascotHead` | `className`, `look` (`down`/`front`), `mood` (`happy`/`sad`/`anxious`/`anxious-happy`) | Kepala maskot (`<g>` SVG, koordinat logo) untuk merakit pose baru. Di `Mascot.jsx` |
| `MascotFace` | `className`, `style`, `mood` (`happy`/`sad`/`anxious`) | Kepala maskot mini (ikon "satu orang"), warna lewat `text-*` (mis. `text-accent` lulus, `text-line` tidak). Diekspor dari `Mascot.jsx` |
| `MascotResult` | `className` | (di `Mascot.jsx`) Maskot membuka pengumuman hasil UKAI: cemas & tegang → stempel LULUS + berubah senyum → melompat + konfeti kapsul yang terus berhamburan. **Bungkus dengan `Reveal`**: urutan diputar saat `.is-visible` (kelas `mres-*`) |
| `MascotGraduate` | `className` | (di `Mascot.jsx`) Maskot wisuda: topi toga (tali berayun `mascot-tassel`), jubah maroon + selempang kuning, memegang gulungan ijazah. Dipakai di kepala halaman `/alumni` dan `ClosingCta` |
| `Marquee` | `items`, `getKey`, `render`, `label` (nama region untuk pembaca layar), `reverse`, `perItem` (detik per item, default 6), `itemClassName` | Carousel otomatis tanpa ujung: daftar dirender 2× (salinan `aria-hidden`), tetap jalan saat hover, berhenti selama ditekan-tahan (`:active`) atau fokus keyboard, tanpa efek pudar. Lebar penuh layar: `className="mx-[calc(50%-50vw)]"` + Section `overflow-x-clip`. Reduced-motion: diam & bisa digeser manual. Dipakai Alumni & Mentor |
| `BrandIcons` | `GooglePlay`, `AppleLogo`, `TikTok`, `Instagram` (props SVG, mis. `className`) | Logo merek yang tidak ada di lucide. Bootstrap Icons (MIT) + Instagram bergaris. `currentColor` |
| `Text` | `as`, `size` (`lg`/`md`/`sm`), `muted` | Paragraf |
| `Button` | `variant` (`primary` kuning / `brand` merah / `secondary` / `ghost`), `size` (`sm`/`md`/`lg`), `to` / `href` | `to` = link internal, `href` = eksternal, tanpa keduanya = `<button>` |
| `Badge` | `variant` (`brand`/`accent`/`success`/`neutral`) | |
| `Card` | `highlight`, `interactive`, `as` | Padding bawaan `p-6`; `cn()` tidak menimpa class, jadi ubah padding dengan `!` (mis. `p-0!`). Selalu terang (`tone-light`), aman dipakai di area merah. `highlight` = border merah untuk paket favorit |
| `Divider` | `label` | Garis, opsional dengan teks di tengah |
| `Accordion` | `items: [{question, answer}]`, `variant` (`line` / `card`) | `card` = kartu bernomor (01, 02, …), terbuka = bingkai merah + nomor kuning. Dipakai FAQ. `<details>` bawaan: tanpa JS, terbaca Google. Satu terbuka sekaligus |
| `Tabs` | `items: [{label, content}]` | Tab aktif kuning. ARIA tabs, navigasi panah kiri/kanan. Label tidak terbelah baris; bila tidak muat, daftar tab bisa digeser |
| `Tooltip` | `content` | Muncul saat hover / fokus keyboard. Disembunyikan dengan `hidden` (bukan opacity) agar tidak membuat halaman bisa digeser ke samping |
| `Reveal` | `as`, `delay` (ms), props lain diteruskan ke elemen | Fade-up saat masuk layar, **diulang** setiap kali masuk lagi (di-reset saat keluar layar penuh). Konten tetap tampil tanpa JS & saat reduced-motion |
| `Navbar` | `links: [{label, href}]`, `cta: {label, href}`, `brand` | Latar merah (`tone-brand`), sticky, bayangan saat scroll, CTA kuning. Menu desktop mulai `lg` (1024px), di bawahnya menu hamburger. Logo SVG di kiri nama |
| `Footer` | `description`, `columns: [{title, wide?, links}]` (`wide` = selebar 2 kolom, tautan 2 kolom; di HP semua kolom selebar penuh), `socials: [{name, handle, url}]`, `copyright` | Latar maroon (`tone-brand-dark`), logo + nama, tombol ikon media sosial (dari `BrandIcons` menurut `name`, ber-`aria-label`; satu teks "Ikuti @handle" bila semua handle sama), judul kolom kuning kapital. Di atas hak cipta: logo + "SYNDROME" besar samar yang disingkap cahaya heatmap (merah → kuning, gaya peta Sebaran kelas), mengikuti kursor; tanpa kursor bergeser sendiri (adaptasi footer Dicoding). Mobile: tautan 2 kolom; `sm`: 4 kolom; `lg`: brand + 4 kolom sejajar |
| `cn()` | `...classes` | Helper gabung class |

Detail animasi, ekspresi, dan cara menambah pose maskot: [motion.md](motion.md).

## Ikon
Pakai `lucide-react` saja agar konsisten (garis tipis). Pengecualian: logo merek yang tidak ada di lucide ada di `BrandIcons.jsx` (Google Play, Apple, TikTok, Instagram). Warna ikon ikut teks atau `text-brand`. Ukuran lewat class, contoh `<Check className="size-4" />`.
Ikon dekoratif beri `aria-hidden`.

## Komponen khusus section
Bukan komponen umum (tidak di `/ui`), tapi dipakai ulang lintas halaman:
| Komponen | File | Dipakai di |
|---|---|---|
| `AlumniCard` | `sections/AlumniWall.jsx` | Beranda, `/alumni` |
| `PostCard` (`featured` = kartu lebar) | `sections/BlogPreview.jsx` | Beranda, `/blog` |
| `ClosingCta` | `sections/ClosingCta.jsx` | Beranda, `/alumni`, `/program/:slug` |
