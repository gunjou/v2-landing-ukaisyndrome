# Komponen UI

Lokasi: `src/components/ui/`. Impor lewat barrel: `import { Button, Card } from "../components/ui"`.
Lihat semua contoh hidup di **http://localhost:5173/ui** (hanya saat `npm run dev`).

Komponen baru wajib: (1) ditambahkan ke `index.js`, (2) didemokan di `src/routes/ui.jsx`, (3) dicatat di tabel ini.

| Komponen | Props utama | Catatan |
|---|---|---|
| `Container` | `className` | Lebar maks 6xl, padding samping responsif |
| `Section` | `id`, `tone` (`default`/`muted`/`brand`/`brand-dark`), `className` | Padding vertikal standar + Container. `brand` = latar merah dominan (lihat sistem tone di design-tokens.md) |
| `SectionHeader` | `eyebrow`, `title`, `description`, `align` (`left`/`center`) | Pembuka setiap section |
| `Heading` | `as` (h1–h4), `size` (`xl`/`lg`/`md`/`sm`) | Bold sans. `as` = semantik, `size` = tampilan |
| `Eyebrow` | — | Label kecil warna `highlight` (kuning tua di terang, kuning di merah) |
| `Highlight` | — | Kata sorotan di judul: stabilo kuning / teks kuning di area merah |
| `Logo` | `title`, `className` | SVG inline, warna `currentColor` (default `text-accent` = kuning brand `#eab308`; file asli PNG berwarna `#d38c0e`), ukuran default 32px. `title={null}` bila dekoratif di samping teks nama |
| `Text` | `as`, `size` (`lg`/`md`/`sm`), `muted` | Paragraf |
| `Button` | `variant` (`primary` kuning / `brand` merah / `secondary` / `ghost`), `size` (`sm`/`md`/`lg`), `to` / `href` | `to` = link internal, `href` = eksternal, tanpa keduanya = `<button>` |
| `Badge` | `variant` (`brand`/`accent`/`success`/`neutral`) | |
| `Card` | `highlight`, `interactive`, `as` | Selalu terang (`tone-light`), aman dipakai di area merah. `highlight` = border merah untuk paket favorit |
| `Divider` | `label` | Garis, opsional dengan teks di tengah |
| `Accordion` | `items: [{question, answer}]` | `<details>` bawaan: tanpa JS, terbaca Google. Satu terbuka sekaligus |
| `Tabs` | `items: [{label, content}]` | Tab aktif kuning. ARIA tabs, navigasi panah kiri/kanan |
| `Tooltip` | `content` | Muncul saat hover / fokus keyboard |
| `Reveal` | `as`, `delay` (ms) | Fade-up saat masuk layar. Konten tetap tampil tanpa JS & saat reduced-motion |
| `Navbar` | `links: [{label, href}]`, `cta: {label, href}`, `brand` | Latar merah (`tone-brand`), sticky, bayangan saat scroll, CTA kuning, menu mobile. Logo SVG di kiri nama |
| `Footer` | `description`, `columns: [{title, links}]`, `copyright` | Latar maroon (`tone-brand-dark`) |
| `cn()` | `...classes` | Helper gabung class |

## Ikon
Pakai `lucide-react` saja agar konsisten (garis tipis). Warna ikon ikut teks atau `text-brand`. Ukuran lewat class, contoh `<Check className="size-4" />`.
Ikon dekoratif beri `aria-hidden`.
