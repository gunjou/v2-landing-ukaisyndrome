# Konvensi

## Dokumentasi
- Setiap perubahan pada route, token, komponen umum, struktur folder, atau alur data **wajib** memperbarui dokumen terkait di `docs/` pada perubahan yang sama.
- Tugas yang selesai dicentang di `roadmap.md`.

## Komponen
- Komponen umum ada di `src/components/ui/`, satu file per komponen, nama PascalCase.
- Setiap komponen umum baru **wajib** ditampilkan (semua varian) di halaman `/ui` dan dicatat di `components.md` (dibuat bersama komponen pertama).
- Styling hanya pakai class Tailwind + token. Tanpa hex langsung, tanpa file CSS per komponen.
- Konten tidak di-hardcode di komponen; ambil dari `services/`.

## SEO
Lihat **seo.md**. Ringkas: setiap route memakai `seo()` di `meta()`, satu `<h1>`, gambar ber-`alt` + ukuran, halaman publik masuk `pages` di `react-router.config.js`.

## Bahasa
- Konten, komentar, dan dokumentasi: Bahasa Indonesia.
