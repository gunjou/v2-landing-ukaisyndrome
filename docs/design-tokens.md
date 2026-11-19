# Design Tokens

Sumber: `src/index.css` (blok `@theme`). Token otomatis jadi class Tailwind, contoh `--color-brand` → `bg-brand`, `text-brand`, `border-brand`.
**Jangan memakai hex langsung di komponen.** Kalau butuh warna baru, tambahkan token di sini dan di `index.css`.

## Arah visual: clean modern
Referensi: dicoding.com, notion.com. Latar putih, ruang lega, netral abu hangat, tipografi sans tegas.
**Merah Syndrome = warna dominan sebagai LATAR** (navbar, hero, section unggulan, banner CTA, footer maroon).
**Kuning Syndrome = AKSEN** yang muncul di banyak komponen: tombol utama, kata sorotan di judul, eyebrow, tab aktif, angka penting.

Aturan:
- Sudut: tombol `rounded-lg`, kartu `rounded-xl`, badge `rounded-md`. Hindari bentuk pil.
- Bayangan tipis untuk hover/interaksi. Bayangan tebal hanya untuk satu objek yang ditonjolkan per area (kartu paket favorit, etiket paket, mockup ponsel). Pemisah utama adalah border `line`.
- Ritme halaman: selang-seling `brand` (merah) dengan `default`/`muted` (terang). Merah harus terasa dominan, bukan sekadar aksen.
- Transisi masuk pendek (≤ 0.6s); urutan cerita (stempel, jalur progres) boleh lebih panjang. Detail di motion.md.
- Hindari: emoji sebagai ikon, gradient ramai, glassmorphism, ikon generik bertumpuk, copy klise.

## Arah visual farmasi
Metafora farmasi dipakai konsisten agar tampilan khas, bukan sekadar "landing kursus":
| Metafora | Wujud | Dipakai di |
|---|---|---|
| **Stempel** | Kotak bergaris tebal miring (-6° s.d. -12°), huruf kapital rapat, dicap dengan animasi `pr-stamp` | LULUS (bukti kelulusan, alumni, alur belajar, mockup app), GARANSI LULUS (program, detail paket) |
| **Etiket / label kemasan** | Kepala kartu bergaris putus-putus (`border-dashed`), label kecil kapital `tracking-widest` | Kartu program, "Etiket paket", kartu alumni "HASIL UKAI", sampul blog tanpa gambar |
| **Kapsul** | Bentuk pil dua warna (putih/kuning) | Tangan maskot, dekorasi melayang, konfeti |
| **Resep** | Bahasa ringan bernuansa farmasi di momen kecil | 404: "tidak ada di resep kami" |
| **Maskot** | Kepala logo dengan ekspresi (lihat motion.md) | Hero, bukti kelulusan, alumni, CTA, FAQ, 404 |

Aturan: satu metafora menonjol per kartu; stempel selalu warna `brand` (di area terang) atau `accent` (di area merah).

## Warna

### Merah Syndrome (utama)
| Token | Hex | Pakai untuk |
|---|---|---|
| `brand` | `#a11d1d` | **Latar dominan**: navbar, hero, section unggulan (`tone-brand`). Tombol `brand` di area terang
| `brand-dark` | `#531d1d` | Latar footer / penutup (`tone-brand-dark`), hover tombol `brand`
| `brand-100` | `#f9dede` | Seleksi teks, border tint |
| `brand-50` | `#fdf3f3` | Latar badge / blok tint merah |

### Kuning Syndrome (aksen)
| Token | Hex | Pakai untuk |
|---|---|---|
| `accent` | `#eab308` | **Tombol utama** (teks `ink`), tab aktif, teks sorotan di area merah, stabilo di area terang, logo |
| `accent-hover` | `#facc15` | Hover tombol kuning |
| `accent-dark` | `#a16207` | Teks kuning di atas putih (eyebrow di area terang) |
| `accent-50` | `#fefbe8` | Latar badge / blok tint kuning |

> Jangan menulis teks `accent` di atas putih — kontrasnya rendah. Pakai `accent-dark`. Di atas merah, `accent` hanya 4.0:1: boleh untuk judul besar & angka besar, **teks kecil wajib `text-highlight`** (`#facc15`, 5.1:1).

### Teks khusus
| Token | Hex | Pakai untuk |
|---|---|---|
| `ink` | `#1f1a1a` | Teks gelap yang **tidak** ikut tone — dipakai di atas kuning (tombol, tab aktif) dan tooltip |
| `highlight` | `#a16207` → `#facc15` di area merah | Eyebrow, teks kuning kecil, stempel di area merah, hover link. Berubah otomatis menurut tone |

### Status
| Token | Hex | Pakai untuk |
|---|---|---|
| `success` | `#16a34a` | Ikon centang, status berhasil |
| `success-50` | `#f0fdf4` | Latar badge sukses |

### Netral (abu hangat)
| Token | Hex | Pakai untuk |
|---|---|---|
| `bg` | `#ffffff` | Latar halaman, kartu |
| `surface` | `#f7f6f5` | Section selang-seling, footer, latar tabs |
| `line` | `#e9e6e3` | Border, divider |
| `fg` | `#1f1a1a` | Teks utama, judul |
| `fg-muted` | `#5f5755` | Paragraf, deskripsi |
| `fg-subtle` | `#736b68` | Caption, label kecil, tanggal. ≥ 4.8:1 di `bg`/`surface`/`accent-50` (lolos WCAG AA) |

## Tipografi
Satu keluarga font: **Plus Jakarta Sans** (variable, self-host). Judul `font-bold` dengan letter-spacing negatif.

| Ukuran `Heading` | Mobile → Desktop |
|---|---|
| `xl` | 36px → 60px (h1 hero) |
| `lg` | 30px → 48px (judul section) |
| `md` | 24px → 30px |
| `sm` | 20px |

## Aksesibilitas
Target WCAG 2.1 AA. Dicek dengan axe-core (0 pelanggaran) + uji Tab di semua halaman, 1280 & 390px (2026-11-19).
- Teks kecil ≥ 4.5:1, teks besar & ikon ≥ 3:1. Pakai token di atas, jangan menurunkan opacity teks.
- Fokus keyboard selalu terlihat (`:focus-visible`), jangan `outline-none` tanpa pengganti.
- Tautan "Lewati ke konten" di awal setiap halaman (`site-layout.jsx` → `#konten`).
- Ornamen, maskot, salinan carousel: `aria-hidden`. Ikon tanpa teks wajib `aria-label`.
- Area yang bisa digeser (carousel) bisa difokus (`Marquee` = `role="region"` + `tabIndex`).

## Efek global (`src/index.css`)
- **Fokus**: `:focus-visible` outline merah 2px.
- **Seleksi teks**: latar `brand-100`, teks `brand-dark`.
- **Animasi & maskot**: lihat [motion.md](motion.md). Ringkas: kondisi dasar = kondisi akhir, semua mati saat `prefers-reduced-motion`.

## Sistem tone (latar merah)
Area berlatar merah memakai kelas `tone-brand` (merah) atau `tone-brand-dark` (maroon). Kelas ini **menimpa token netral**
(`fg`, `fg-muted`, `fg-subtle`, `line`, `surface`, `highlight`) di dalam area tersebut, sehingga semua komponen otomatis
terbaca tanpa prop tambahan.

| Token | Terang | Di dalam `tone-brand` |
|---|---|---|
| `fg` | `#1f1a1a` | `#ffffff` |
| `fg-muted` | `#5f5755` | `#f3dada` |
| `fg-subtle` | `#736b68` | `#e8c4c4` (4.8:1 di merah) |
| `line` | `#e9e6e3` | putih 18% |
| `surface` | `#f7f6f5` | putih 8% |
| `highlight` | `#a16207` | `#facc15` (5.1:1 di merah; `accent` hanya 4.0:1) |

Cara pakai:
- Section: `<Section tone="brand">` atau `tone="brand-dark"`.
- Elemen lain: tambahkan class `tone-brand` / `tone-brand-dark`.
- `Card` selalu memakai `tone-light` (kembali terang) sehingga kartu putih tetap terbaca di area merah.
- Komponen baru: pakai token netral (`text-fg`, `border-line`, ...) agar ikut tone. Pakai `text-ink` hanya untuk teks di atas kuning.

## Sorotan judul (`<Highlight>`)
- Area terang: teks tetap gelap dengan **stabilo kuning** di bagian bawah kata.
- Area merah: teks berwarna **kuning**.
- Satu sorotan per judul, 1–3 kata.
