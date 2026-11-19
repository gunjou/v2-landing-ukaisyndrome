# Design Tokens

Sumber: `src/index.css` (blok `@theme`). Token otomatis jadi class Tailwind, contoh `--color-brand` → `bg-brand`, `text-brand`, `border-brand`.
**Jangan memakai hex langsung di komponen.** Kalau butuh warna baru, tambahkan token di sini dan di `index.css`.

## Arah visual: clean modern
Referensi: dicoding.com, notion.com. Latar putih, ruang lega, netral abu hangat, tipografi sans tegas.
**Merah Syndrome = warna dominan sebagai LATAR** (navbar, hero, section unggulan, banner CTA, footer maroon).
**Kuning Syndrome = AKSEN** yang muncul di banyak komponen: tombol utama, kata sorotan di judul, eyebrow, tab aktif, harga.

Aturan:
- Sudut: tombol `rounded-lg`, kartu `rounded-xl`, badge `rounded-md`. Hindari bentuk pil.
- Bayangan sangat tipis, hanya untuk hover/interaksi. Pemisah utama adalah border `line`.
- Ritme halaman: selang-seling `brand` (merah) dengan `default`/`muted` (terang). Merah harus terasa dominan, bukan sekadar aksen.
- Animasi pendek (≤ 0.6s), tidak berlebihan.
- Hindari: emoji sebagai ikon, gradient ramai, glassmorphism, ikon generik bertumpuk, copy klise.

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

> Jangan menulis teks `accent` di atas putih — kontrasnya rendah. Pakai `accent-dark`. Di atas merah, `accent` hanya ~3.4:1: aman untuk judul besar, kurang ideal untuk teks kecil.

### Teks khusus
| Token | Hex | Pakai untuk |
|---|---|---|
| `ink` | `#1f1a1a` | Teks gelap yang **tidak** ikut tone — dipakai di atas kuning (tombol, tab aktif) dan tooltip |
| `highlight` | `#a16207` → `#eab308` di area merah | Eyebrow, fokus, hover link. Berubah otomatis menurut tone |

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
| `fg-subtle` | `#8d8582` | Caption, label kecil (bukan teks penting — kontras rendah) |

## Tipografi
Satu keluarga font: **Plus Jakarta Sans** (variable, self-host). Judul `font-bold` dengan letter-spacing negatif.

| Ukuran `Heading` | Mobile → Desktop |
|---|---|
| `xl` | 36px → 60px (h1 hero) |
| `lg` | 30px → 48px (judul section) |
| `md` | 24px → 30px |
| `sm` | 20px |

## Efek global (`src/index.css`)
- **Fokus**: `:focus-visible` outline merah 2px.
- **Seleksi teks**: latar `brand-100`, teks `brand-dark`.
- **Reveal**: `[data-reveal]` / `.is-visible`, 0.6s ease-out, geser 16px. Mati saat `prefers-reduced-motion`.

## Sistem tone (latar merah)
Area berlatar merah memakai kelas `tone-brand` (merah) atau `tone-brand-dark` (maroon). Kelas ini **menimpa token netral**
(`fg`, `fg-muted`, `fg-subtle`, `line`, `surface`, `highlight`) di dalam area tersebut, sehingga semua komponen otomatis
terbaca tanpa prop tambahan.

| Token | Terang | Di dalam `tone-brand` |
|---|---|---|
| `fg` | `#1f1a1a` | `#ffffff` |
| `fg-muted` | `#5f5755` | `#f3dada` |
| `fg-subtle` | `#8d8582` | `#d8a7a7` |
| `line` | `#e9e6e3` | putih 18% |
| `surface` | `#f7f6f5` | putih 8% |
| `highlight` | `#a16207` | `#eab308` |

Cara pakai:
- Section: `<Section tone="brand">` atau `tone="brand-dark"`.
- Elemen lain: tambahkan class `tone-brand` / `tone-brand-dark`.
- `Card` selalu memakai `tone-light` (kembali terang) sehingga kartu putih tetap terbaca di area merah.
- Komponen baru: pakai token netral (`text-fg`, `border-line`, ...) agar ikut tone. Pakai `text-ink` hanya untuk teks di atas kuning.

## Sorotan judul (`<Highlight>`)
- Area terang: teks tetap gelap dengan **stabilo kuning** di bagian bawah kata.
- Area merah: teks berwarna **kuning**.
- Satu sorotan per judul, 1–3 kata.
