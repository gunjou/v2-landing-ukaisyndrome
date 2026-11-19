# Data Asli: yang perlu dikonfirmasi & ditambahkan

Daftar semua isi situs yang masih **DUMMY** atau perlu **dikonfirmasi** sebelum rilis.
Sumber: `src/data/landing.js`, `src/data/blog.js`, dan teks di komponen. Centang bila sudah beres.
Bentuk data teknis (field & tipe) ada di [api.md](api.md).

Keterangan prioritas: **P1** = wajib sebelum rilis (bisa menyesatkan bila salah), **P2** = penting, **P3** = bisa menyusul.

## 1. Konfirmasi data yang sudah ada (REAL, tolong cek ulang)
| Prioritas | Data | Nilai sekarang | Dipakai di |
|---|---|---|---|
| P1 | Nomor WhatsApp admin | `628895946963` (+62 889 5946 963) | Semua tombol daftar/konsultasi, tombol WA melayang, footer |
| P1 | Email admin | `admin@ukaisyndrome.id` | Footer, halaman Hapus Akun |
| P1 | Link Play Store | `com.ukaisyndrome.app` | Download app, JSON-LD |
| P1 | Link App Store | `id6776521389` | Download app, JSON-LD |
| P1 | Link login aplikasi | `https://app.ukaisyndrome.id/login` | Tombol "Masuk" di navbar |
| P1 | Domain situs | `https://ukaisyndrome.id` | Canonical, sitemap, OG (`src/seo.js` & `react-router.config.js`) |
| P2 | Jumlah siswa | `5000+` | Statistik hero, CTA penutup |
| P2 | Jumlah mentor | 224 (tampil "220+") | Hero, Sebaran kelas |
| P2 | Kelompok belajar per kota | 271 kelompok, 34 kota (salinan Nov 2026) | Peta Sebaran kelas |
| P2 | Penggabungan kampus ke kota | UHAMKA, ISTN, UTA, Esa Unggul → Jakarta; STFI, UNJANI, UBK, UNPAD, UNISBA → Bandung; RIAU → Pekanbaru; LAMPUNG → Bandar Lampung | Peta Sebaran kelas |
| P2 | Halaman modul | Klinis 600, Industri + SBA 450, OSCE 200 (total 1.250) | Modul, statistik hero |
| P2 | Isi paket | Pertemuan & fitur Silver 24x, Diamond 27x, Gold 73x, Premium 70x | Kartu program, detail paket |
| P2 | Fitur bersama & syarat garansi | 10 fitur, 3 syarat | Program, detail paket, FAQ |
| P3 | Tagline | "Platform penyedia layanan pendidikan farmasi berbasis teknologi terbaik dan termurah" | Hero, footer |
| P3 | Nama pemilik hak cipta | "Outlook-Project" | Footer, halaman legal |
| P3 | Klaim "terluas" & "termurah" | Dipakai di deskripsi Sebaran kelas & tagline | Pastikan bisa dipertanggungjawabkan |

## 2. Data DUMMY yang wajib diganti
### P1: bisa menyesatkan calon siswa
| Data | Sekarang | Yang dibutuhkan |
|---|---|---|
| **Pass rate per periode** | 4 periode (Feb 2025 – Agu 2026), CBT & OSCE, dummy | Per periode UKAI: % lulus CBT, % lulus OSCE, jumlah peserta Syndrome |
| **Rata-rata nasional** | Angka dummy | % lulus nasional CBT & OSCE per periode **+ sumber resmi** (mis. pengumuman panitia UKAI) |
| **Statistik "Tingkat kelulusan" di hero** | `92%` | Satu angka, sebaiknya sama dengan pass rate periode terakhir (saat ini hero 92% ≠ kartu terakhir 93%) |
| **Alumni** | 6 nama "Nama Alumni 1–6" | Per alumni: nama, kampus, periode lulus, paket, skor akhir (opsional), kisah ±140 karakter, foto (opsional) **+ izin tertulis tampil** |
| **Mentor** | 6 mentor contoh | Per mentor: nama lengkap + gelar, kampus, online/offline, IPK (opsional), 1–3 prestasi, foto potret **+ izin tampil** |

### P2: konten pendukung
| Data | Sekarang | Yang dibutuhkan |
|---|---|---|
| Detail per paket | "Cocok untuk", silabus, jadwal dummy untuk 4 paket | Per paket: 2–4 poin "cocok untuk", 3–6 poin silabus, 1 kalimat jadwal & durasi |
| FAQ | 1 REAL, 4 DUMMY | Jawaban asli untuk: belajar dari luar kota, beda kelas intensif vs online, modul fisik dikirim?, cara mendaftar. Tambah pertanyaan yang sering masuk ke admin |
| Alur belajar | 4 langkah umum | Konfirmasi atau ganti 4 langkah (judul + 1 kalimat) |
| Fitur aplikasi | 3 poin (modul & rekaman, tryout + skor, progres) | 3 poin sesuai fitur app sebenarnya |
| Artikel blog | 5 artikel dummy (isi 1–2 kalimat) | Min. 5 artikel: judul, kategori, tanggal, ringkasan, isi lengkap, gambar sampul (opsional) |
| Kategori blog | Tips UKAI, Pembahasan Soal, OSCE, Regulasi | Konfirmasi daftar kategori |

### P3: tampilan
| Data | Catatan |
|---|---|
| Mockup layar aplikasi (section Download) | Isi layar dibuat dari HTML (progres 68%, tryout 78, modul hal. 214). Ganti agar mirip aplikasi asli, atau sediakan screenshot asli |
| Foto alumni & mentor | Rasio disarankan: alumni 1:1, mentor potret 4:5. Sertakan lebar & tinggi asli |
| Gambar sampul artikel | 16:9, min. 1200px lebar |
| Gambar OG (pratinjau link) | `public/og-image.png`: cek teks masih sesuai |

## 3. Yang perlu diputuskan
- [ ] Hero dua jalur ("UKAI pertama" vs "Mengulang UKAI"): masih dibutuhkan? (riwayat mengulang tidak lagi ditampilkan di alumni)
- [ ] "Konsultasi gratis" di CTA penutup: pastikan konsultasi memang tidak berbayar
- [ ] Paket Gold menyebut "Peserta yang pernah tidak lulus (retaker)" di "Cocok untuk": tetap?
- [ ] Widget AI Tutor: kapan & di halaman mana (menunggu info API)

## Cara mengirim data
Selama backend belum siap, kirim dalam bentuk tabel (spreadsheet) dengan kolom sesuai tabel di atas; developer memasukkannya ke `src/data/`.
Setelah backend siap, data diisi lewat admin dan dikirim ke situs mengikuti [api.md](api.md).
