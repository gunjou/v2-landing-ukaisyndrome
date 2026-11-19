# SEO

Domain kanonik: **https://ukaisyndrome.id** (`SITE_URL` di `src/seo.js` dan `react-router.config.js` — ubah keduanya bila domain berubah).

## Cara kerja
- Semua halaman publik di-**prerender** jadi HTML statis berisi konten lengkap (lihat architecture.md).
- Daftar halaman publik ada di **satu tempat**: `pages` di `react-router.config.js`. Dipakai untuk prerender **dan** `sitemap.xml` (dibuat otomatis di hook `buildEnd`).

## Meta per halaman: `seo()` (`src/seo.js`)
Setiap route mengekspor `meta()` yang memanggil `seo({...})`:

```js
export function meta({ data }) {
  return seo({
    title: "Judul Halaman",          // " — Syndrome UKAI" ditambahkan otomatis
    description: "120–160 karakter",
    path: "/path-halaman",           // untuk canonical & og:url
    lang: "id",                      // opsional, "en" untuk halaman Inggris
    alternates: [...],               // opsional, hreflang versi bahasa lain
    jsonLd: [...],                   // opsional, objek schema.org
    noindex: false,                  // true → robots noindex, tanpa canonical
  });
}
```

Yang dihasilkan: `<title>`, description, canonical, hreflang, Open Graph (title, description, url, image 1200×630, locale), Twitter card, JSON-LD.

## Data terstruktur (JSON-LD) — `src/seo-jsonld.js`
Beranda memuat:
| Schema | Isi | Manfaat |
|---|---|---|
| `EducationalOrganization` | nama, logo, kontak, sosmed, link aplikasi | Knowledge panel / identitas brand |
| `WebSite` | nama & URL situs | Nama situs di hasil pencarian |
| `ItemList` of `Course` | 4 paket + harga (`Offer` IDR) | Rich result kursus |
| `FAQPage` | semua FAQ | Data FAQ untuk mesin pencari & AI |

Data diambil dari loader, jadi otomatis ikut berubah saat data dari admin berubah. Validasi: https://search.google.com/test/rich-results dan https://validator.schema.org setelah deploy.

## Aset (`public/`)
| File | Ukuran | Fungsi |
|---|---|---|
| `favicon.ico` | 32px | Favicon lama (browser lama) |
| `favicon.svg` | vektor | Favicon utama: logo kuning di kotak merah |
| `apple-touch-icon.png` | 180px | Ikon saat disimpan ke layar utama iOS |
| `icon-512.png` | 512px | Manifest & logo JSON-LD |
| `og-image.png` | 1200×630 | Gambar pratinjau saat link dibagikan (WA, IG, FB, X) |
| `site.webmanifest` | — | Nama, ikon, warna tema |
| `robots.txt` | — | Izinkan semua + lokasi sitemap |
| `sitemap.xml` | — | **Dibuat otomatis saat build**, jangan ditaruh di `public/` |

Sumber gambar OG yang bisa diedit: `src/assets/og-image.source.svg` (render ulang ke PNG 1200×630 bila teks berubah).

## Checklist halaman baru
1. `meta()` memakai `seo()` dengan `title` & `description` unik.
2. Tepat satu `<h1>`, heading berurutan (h2 → h3).
3. Gambar: `alt`, `width`/`height` asli, `loading="lazy"` bila di bawah lipatan.
4. Tambahkan path ke `pages` di `react-router.config.js`.
5. Halaman non-publik (mis. 404, `/ui`): `noindex`.

## Setelah deploy
- Daftarkan domain di Google Search Console, kirim `https://ukaisyndrome.id/sitemap.xml`.
- Cek pratinjau link: https://www.opengraph.xyz.
- Uji performa: PageSpeed Insights (target ≥ 90 di mobile).
