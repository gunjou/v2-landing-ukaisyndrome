# Deploy

Situs ini **statis**: `npm run build` menghasilkan folder `build/client` berisi HTML, CSS, JS, dan gambar.
Tidak perlu server Node saat berjalan. Folder itu cukup diunggah ke hosting statis apa pun.

## Ringkas
| Langkah | Perintah / nilai |
|---|---|
| Versi Node (saat build) | ≥ 20 (`engines` di `package.json`) |
| Pasang dependensi | `npm ci` |
| Build | `npm run build` |
| Folder yang diunggah | `build/client` |
| Halaman 404 | `build/client/404.html` (salinan `__spa-fallback.html`, dibuat otomatis saat build) |
| Env saat build | `VITE_CDN_ASSET_URL` (lihat di bawah) |

## 1. Siapkan env
Env dibaca **saat build**, bukan saat situs berjalan. Isi di `.env` (lokal) atau di pengaturan "Environment variables" milik hosting/CI.

| Variabel | Wajib | Fungsi |
|---|---|---|
| `VITE_CDN_ASSET_URL` | ya | Alamat CDN untuk cover modul. Kosong → buku modul tampil polos |
| `VITE_API_URL` | belum | Disiapkan untuk backend |
| `VITE_TUTORAI_API_URL` | belum | Disiapkan untuk AI Tutor |

Semua `VITE_*` ikut terbaca di browser. **Jangan menaruh rahasia** (token, kunci API privat) di sini.

## 2. Build & cek lokal
```bash
npm ci
npm run lint
npm run build
npm run preview     # menyajikan build/client di http://localhost:3000
```
Cek sebelum mengunggah:
- [ ] Beranda, `/alumni`, `/blog`, satu artikel, satu `/program/...`, dan 4 halaman legal terbuka.
- [ ] Alamat ngawur (mis. `/abc`) menampilkan halaman 404 bermaskot.
- [ ] Cover modul tampil (env CDN terisi).
- [ ] `build/client/sitemap.xml` berisi semua halaman, `robots.txt` menunjuk ke sitemap.

## 3. Pilih hosting

### A. Netlify / Cloudflare Pages / Vercel (paling mudah)
Hubungkan repo, lalu isi:

| Pengaturan | Nilai |
|---|---|
| Build command | `npm run build` |
| Output / publish directory | `build/client` |
| Node version | 20 atau lebih baru |
| Environment variables | `VITE_CDN_ASSET_URL`, dst. |

`404.html` otomatis dipakai untuk alamat yang tidak dikenal. **Jangan** mengaktifkan aturan "rewrite semua ke `index.html`" (pola SPA biasa): halaman yang tidak ada akan tampil sebagai beranda dengan status 200, buruk untuk SEO.

### B. VPS dengan Nginx
Unggah isi `build/client` ke server (mis. `/var/www/ukaisyndrome`), lalu:

```nginx
server {
  listen 80;
  server_name ukaisyndrome.id www.ukaisyndrome.id;
  root /var/www/ukaisyndrome;

  # /alumni → /alumni/index.html; file .data dipakai React Router saat pindah halaman di browser
  location / {
    try_files $uri $uri/index.html $uri.html =404;
  }
  error_page 404 /404.html;

  # Aset ber-hash: aman di-cache selamanya
  location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
  # HTML & data selalu dicek ulang agar perubahan langsung terlihat
  location ~* \.(html|data)$ {
    add_header Cache-Control "no-cache";
  }
}
```
Pasang HTTPS (mis. Certbot) dan arahkan `www` ke domain utama agar canonical konsisten (`https://ukaisyndrome.id`).

Unggah ulang dengan `rsync -av --delete build/client/ user@server:/var/www/ukaisyndrome/`.

## 4. Build ulang saat konten berubah
Konten (alumni, mentor, artikel, paket, data peta) ikut tertanam di HTML saat build. Jadi **setiap data berubah, situs harus di-build ulang**:
- Sekarang (data di `src/data/`): commit perubahan → hosting/CI build otomatis.
- Nanti (data dari backend): pasang **deploy hook** (Netlify/Cloudflare/Vercel menyediakan URL build hook) dan panggil dari backend admin setiap kali admin menyimpan. Path dinamis (`/program/...`, `/blog/...`) juga harus dibaca dari API di `react-router.config.js` (lihat komentar `pages`).

## 5. Setelah deploy
- [ ] Buka situs di HP sungguhan (Safari iOS & Chrome Android): buku 3D modul, cahaya footer, carousel.
- [ ] Daftarkan domain di Google Search Console, kirim `https://ukaisyndrome.id/sitemap.xml`.
- [ ] Uji data terstruktur: https://search.google.com/test/rich-results.
- [ ] Cek pratinjau tautan (WA/IG): https://www.opengraph.xyz.
- [ ] PageSpeed Insights mobile, target ≥ 90 (lihat roadmap tahap 5).
- [ ] Pastikan tautan legal dari Play Store / App Store (`/privacy-policy-id`, `/data-deletion-request-id`, dst.) masih terbuka.

## Masalah umum
| Gejala | Penyebab & solusi |
|---|---|
| Alamat tak dikenal menampilkan beranda | Ada rewrite "semua ke index.html" di hosting. Hapus; biarkan `404.html` yang dipakai |
| Cover modul polos | `VITE_CDN_ASSET_URL` tidak diisi di env build hosting. Isi lalu build ulang |
| Konten baru tidak muncul | Belum build ulang, atau HTML ter-cache. Build ulang; pastikan HTML `no-cache` |
| Halaman `/program/xyz` atau `/blog/xyz` baru 404 | Slug belum ada di data saat build (daftar `pages`). Tambah data lalu build ulang |
