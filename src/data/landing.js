// Data sementara. Nanti diganti respons API backend (diatur dari halaman admin).
// Penanda: REAL = dari situs lama, DUMMY = contoh, wajib diganti data asli.

export const site = {
  name: "Syndrome UKAI",
  tagline: "Platform penyedia layanan pendidikan farmasi berbasis teknologi terbaik dan termurah", // REAL
  whatsapp: "628895946963", // REAL
  phoneLabel: "+62 889 5946 963",
  email: "admin@ukaisyndrome.id", // REAL
  loginUrl: "https://app.ukaisyndrome.id/login",
  playStore: "https://play.google.com/store/apps/details?id=com.ukaisyndrome.app",
  appStore: "https://apps.apple.com/app/syndrome-ukai/id6776521389",
  socials: [ // REAL
    { name: "Instagram", handle: "@syndrome_ukai", url: "https://www.instagram.com/syndrome_ukai/" },
    { name: "TikTok", handle: "@syndrome_ukai", url: "https://www.tiktok.com/@syndrome_ukai" },
  ],
  // DUMMY: poin fitur aplikasi di section Download, cek dengan fitur app sebenarnya
  appFeatures: ["Modul & rekaman kelas di genggaman", "Tryout CBT dengan skor langsung keluar", "Pantau progres belajar setiap hari"],
};

export const stats = [
  { value: "5000+", label: "Siswa terdaftar" }, // REAL
  { value: "92%", label: "Tingkat kelulusan" }, // DUMMY
  { key: "mentors", label: "Mentor apoteker" }, // REAL, nilai diisi services dari network.mentors
  { value: "1.250", label: "Halaman modul" }, // REAL (600 + 450 + 200)
];

// REAL (Nov 2026): jumlah kelompok belajar per kota (kampus di Jakarta/Bandung digabung ke kotanya; kelompok uji coba dibuang)
// dan jumlah mentor unik (akun uji & nama ganda dibuang). Bentuk = kontrak API backend: cities[] { city, groups, lng, lat }.
export const network = {
  description: "Dengan jaringan mentor terluas, anda akan mendapatkan persiapan UKAI yang lebih optimal dan termurah.", // REAL
  mentors: 224,
  cities: [
    { city: "Bandung", groups: 35, lng: 107.6, lat: -6.9 },
    { city: "Makassar", groups: 34, lng: 119.43, lat: -5.14 },
    { city: "Semarang", groups: 26, lng: 110.42, lat: -6.97 },
    { city: "Jakarta", groups: 24, lng: 106.83, lat: -6.2 },
    { city: "Yogyakarta", groups: 19, lng: 110.37, lat: -7.8 },
    { city: "Bali", groups: 15, lng: 115.2, lat: -8.65 },
    { city: "Samarinda", groups: 14, lng: 117.15, lat: -0.5 },
    { city: "Medan", groups: 13, lng: 98.67, lat: 3.59 },
    { city: "Purwokerto", groups: 10, lng: 109.24, lat: -7.42 },
    { city: "Solo", groups: 10, lng: 110.82, lat: -7.57 },
    { city: "Lubuk Pakam", groups: 6, lng: 98.87, lat: 3.55 },
    { city: "Malang", groups: 6, lng: 112.63, lat: -7.98 },
    { city: "Kendari", groups: 6, lng: 122.5, lat: -3.97 },
    { city: "Tasikmalaya", groups: 6, lng: 108.22, lat: -7.33 },
    { city: "Kediri", groups: 6, lng: 112.0, lat: -7.82 },
    { city: "Banjarmasin", groups: 5, lng: 114.59, lat: -3.32 },
    { city: "Kudus", groups: 4, lng: 110.84, lat: -6.8 },
    { city: "Pekalongan", groups: 4, lng: 109.67, lat: -6.89 },
    { city: "Banjarbaru", groups: 4, lng: 114.84, lat: -3.44 },
    { city: "Bogor", groups: 3, lng: 106.8, lat: -6.6 },
    { city: "Surabaya", groups: 3, lng: 112.75, lat: -7.25 },
    { city: "Jambi", groups: 2, lng: 103.6, lat: -1.6 },
    { city: "Tegal", groups: 2, lng: 109.14, lat: -6.87 },
    { city: "Palu", groups: 2, lng: 119.87, lat: -0.9 },
    { city: "Garut", groups: 2, lng: 107.9, lat: -7.2 },
    { city: "Mataram", groups: 2, lng: 116.1, lat: -8.58 },
    { city: "Tangerang", groups: 1, lng: 106.63, lat: -6.18 },
    { city: "Palembang", groups: 1, lng: 104.75, lat: -2.99 },
    { city: "Gorontalo", groups: 1, lng: 123.06, lat: 0.54 },
    { city: "Pekanbaru", groups: 1, lng: 101.45, lat: 0.51 },
    { city: "Padang", groups: 1, lng: 100.36, lat: -0.95 },
    { city: "Cilacap", groups: 1, lng: 109.0, lat: -7.73 },
    { city: "Lampung", groups: 1, lng: 105.26, lat: -5.43 },
    { city: "Magelang", groups: 1, lng: 110.22, lat: -7.47 },
  ],
};

// DUMMY. Bentuk = kontrak API backend: id, name (lengkap dengan gelar), photo ({ url, width, height } | null, potret),
// mode ("online" | "offline"), campus, gpa (angka skala 4.00 | null), achievements (1–3 poin singkat).
export const mentors = [
  { id: "m1", name: "apt. Nama Mentor 1, S.Farm.", photo: null, mode: "online", campus: "Universitas A", gpa: 3.89, achievements: ["Lulusan terbaik, cumlaude S1 & Apoteker", "Asisten dosen praktikum"] },
  { id: "m2", name: "apt. Nama Mentor 2, M.Farm.", photo: null, mode: "offline", campus: "Universitas B", gpa: 3.82, achievements: ["Spesialis farmasi klinis", "5 tahun mengajar UKAI"] },
  { id: "m3", name: "apt. Nama Mentor 3, S.Farm.", photo: null, mode: "online", campus: "Universitas C", gpa: 3.91, achievements: ["Cumlaude program profesi apoteker", "Mentor OSCE"] },
  { id: "m4", name: "apt. Nama Mentor 4, M.Sc.", photo: null, mode: "offline", campus: "Universitas D", gpa: 3.76, achievements: ["Praktisi farmasi industri & CPOB", "Penyusun modul Industri + SBA"] },
  { id: "m5", name: "apt. Nama Mentor 5, S.Farm.", photo: null, mode: "online", campus: "Universitas E", gpa: 3.85, achievements: ["Lulusan terbaik angkatan", "Asisten dosen farmakoterapi"] },
  { id: "m6", name: "apt. Nama Mentor 6, M.Clin.Pharm.", photo: null, mode: "online", campus: "Universitas F", gpa: null, achievements: ["Apoteker rumah sakit", "Mentor SBA & farmakoterapi"] },
];

// REAL. `image` = nama file cover di CDN (VITE_CDN_ASSET_URL), diubah jadi URL penuh di services.
export const modules = [
  { name: "Klinis", pages: 600, image: "modul_klinis.png", description: "Modul latihan soal klinis berisikan literatur yang jelas sesuai PERMENKES, DiPiro, WHO, dan Koda-Kimble." },
  { name: "Industri + SBA", pages: 450, image: "modul_industri_sba.png", description: "Modul dan latihan soal industri serta SBA, sesuai Farmakope edisi VI, Ansel, dan Kemenkes Kefarmasian." },
  { name: "OSCE", pages: 200, image: "modul_osce.png", description: "Dilengkapi gambar alat dan prosedur kerja. Modul berwarna sesuai blueprint dan soal OSCE terbaru." },
];

export const steps = [ // DUMMY (alur umum, sesuaikan)
  { title: "Pilih program", description: "Tentukan paket sesuai kebutuhan dan jadwal ujianmu." },
  { title: "Belajar bersama mentor", description: "Kelas intensif dan online, dipantau wali kelas." },
  { title: "Latihan & tryout", description: "Ribuan soal, pretest, posttest, dan tryout CBT." },
  { title: "Siap UKAI", description: "Kisi-kisi dan prediksi soal UKMPPAI menjelang ujian." },
];

// REAL. Bentuk = kontrak API backend: id (slug URL), name, sessions (jumlah pertemuan), favorite (pita "Paling dipilih"),
// features [{ label, value }] — value = teks tampil ("12x", "600 soal"), null = tidak termasuk (ditampilkan dicoret).
// Harga sengaja tidak ada: harga & promo diberikan admin lewat WhatsApp.
export const programs = [
  { id: "silver", name: "Silver", sessions: 24, features: [{ label: "Kelas intensif (4–5 jam)", value: "12x" }, { label: "Kelas online", value: "12x" }, { label: "Kelas OSCE", value: null }, { label: "Latihan soal via Zoom", value: "600 soal" }, { label: "Pretest & posttest", value: "600 soal" }] },
  { id: "diamond", name: "Diamond", sessions: 27, features: [{ label: "Kelas intensif (4–5 jam)", value: "12x" }, { label: "Kelas online", value: "12x" }, { label: "Kelas OSCE", value: "3x" }, { label: "Latihan soal via Zoom", value: "400 soal" }, { label: "Pretest & posttest", value: "400 soal" }] },
  { id: "gold", name: "Gold", sessions: 73, favorite: true, features: [{ label: "Kelas intensif (4–5 jam)", value: "12x" }, { label: "Kelas online", value: "60x" }, { label: "Kelas OSCE", value: null }, { label: "Latihan soal via Zoom", value: "800 soal" }, { label: "Pretest & posttest", value: "600 soal" }] },
  { id: "premium", name: "Premium", sessions: 70, features: [{ label: "Kelas intensif (4–5 jam)", value: "12x" }, { label: "Kelas online", value: "60x" }, { label: "Kelas OSCE", value: null }, { label: "Latihan soal via Zoom", value: "1.000 soal" }, { label: "Pretest & posttest", value: "1.200 soal" }] },
];

export const sharedFeatures = [ // REAL
  "Akses rekaman kelas sampai UKAI",
  "Tryout CBT via website",
  "Pemantauan perkembangan oleh wali kelas",
  "Modul fisik UKAI CBT & OSCE",
  "Konsultasi kejiwaan oleh wali kelas/psikolog",
  "Networking antar kampus",
  "Kisi-kisi & prediksi soal UKMPPAI",
  "Garansi lulus*",
];

export const guaranteeTerms = [ // REAL
  "Tidak boleh bolos les lebih dari 3x.",
  "Hafalan seluruh materi wajib terpenuhi.",
  "Wajib mengerjakan semua pretest, posttest, dan tryout.",
];

export const faqs = [
  { question: "Apa syarat klaim Garansi Lulus?", answer: "Tidak bolos les lebih dari 3x, hafalan seluruh materi terpenuhi, dan mengerjakan semua pretest, posttest, serta tryout." }, // REAL
  { question: "Apakah kelas bisa diikuti dari luar kota?", answer: "Bisa. Semua program memiliki sesi online dan rekaman kelas dapat diakses sampai hari UKAI." }, // DUMMY
  { question: "Apa bedanya kelas intensif dan online?", answer: "Kelas intensif berlangsung 4–5 jam per pertemuan untuk pendalaman materi, kelas online untuk latihan dan pembahasan rutin." }, // DUMMY
  { question: "Apakah modul dikirim dalam bentuk fisik?", answer: "Ya, modul UKAI CBT dan OSCE dikirim dalam bentuk cetak ke alamat peserta." }, // DUMMY
  { question: "Bagaimana cara mendaftar?", answer: "Pilih program, lalu hubungi admin melalui WhatsApp untuk pendaftaran dan pembayaran." }, // DUMMY
];

// ===== Tahap 7: ekspansi (semua DUMMY) =====

// Pass rate per periode UKAI. `national` = rata-rata nasional periode yang sama.
export const passRates = [
  { period: "Februari 2025", cbt: 88, osce: 91, national: { cbt: 62, osce: 70 }, participants: 380 },
  { period: "Agustus 2025", cbt: 90, osce: 93, national: { cbt: 60, osce: 72 }, participants: 412 },
  { period: "Februari 2026", cbt: 91, osce: 92, national: { cbt: 64, osce: 71 }, participants: 455 },
  { period: "Agustus 2026", cbt: 93, osce: 94, national: { cbt: 63, osce: 73 }, participants: 498 },
];

// DUMMY. Bentuk = kontrak API backend: id, name, campus, photo ({ url, width, height } | null), period, program (= programs[].id),
// score (skor akhir | null), story (±140 karakter).
export const alumni = [
  { id: "a1", name: "Nama Alumni 1", photo: null, score: 71, campus: "Universitas A", period: "Agustus 2026", program: "gold", story: "Pembahasan soal tiap malam bikin saya paham pola soal CBT, bukan sekadar hafal." },
  { id: "a2", name: "Nama Alumni 2", photo: null, score: 78, campus: "Universitas B", period: "Agustus 2026", program: "premium", story: "Belajar sambil koas, tetap terpantau wali kelas sampai hari ujian." },
  { id: "a3", name: "Nama Alumni 3", photo: null, score: 74, campus: "Universitas C", period: "Februari 2026", program: "diamond", story: "Kelas OSCE dengan alat peraga membuat saya tenang saat stase." },
  { id: "a4", name: "Nama Alumni 4", photo: null, score: 69, campus: "Universitas D", period: "Februari 2026", program: "silver", story: "Drill soal tiap minggu membuat saya cepat dan yakin saat menjawab." },
  { id: "a5", name: "Nama Alumni 5", photo: null, score: 80, campus: "Universitas E", period: "Agustus 2025", program: "gold", story: "Tryout CBT-nya sangat mirip ujian asli, jadi tidak kaget saat ujian." },
  { id: "a6", name: "Nama Alumni 6", photo: null, score: 72, campus: "Universitas F", period: "Agustus 2025", program: "premium", story: "Konsultasi dengan psikolog membantu saya tetap tenang menjelang ujian." },
];

// Detail halaman /program/:id. Kunci = `programs[].id`.
export const programDetails = {
  silver: {
    audience: ["Peserta UKAI pertama dengan dasar materi yang cukup", "Butuh latihan soal terarah dengan biaya ringan"],
    syllabus: ["Farmakoterapi dasar", "Farmasi industri & CPOB", "Perundang-undangan kefarmasian", "Strategi menjawab SBA"],
    schedule: "Intensif tiap Sabtu, online Selasa & Kamis malam. Durasi ±3 bulan.",
  },
  diamond: {
    audience: ["Ingin persiapan CBT sekaligus OSCE", "Belum pernah latihan OSCE dengan alat peraga"],
    syllabus: ["Seluruh materi Silver", "Stase OSCE: konseling, compounding, swamedikasi", "Simulasi OSCE berpenilai"],
    schedule: "Intensif tiap Sabtu, online Selasa & Kamis malam, 3 sesi OSCE di akhir program.",
  },
  gold: {
    audience: ["Peserta yang pernah tidak lulus (retaker)", "Butuh pendampingan rutin hampir setiap hari"],
    syllabus: ["Seluruh materi klinis & industri", "60 sesi online pembahasan soal", "Evaluasi mingguan bersama wali kelas"],
    schedule: "Online 5x seminggu, intensif tiap Sabtu. Durasi ±4 bulan.",
  },
  premium: {
    audience: ["Ingin paket terlengkap dengan bank soal terbanyak", "Target nilai tinggi, bukan sekadar lulus"],
    syllabus: ["Seluruh materi Gold", "1.000 soal drill + 1.200 soal pre/posttest", "Prioritas konsultasi mentor"],
    schedule: "Online 5x seminggu, intensif tiap Sabtu. Durasi ±4 bulan.",
  },
};

