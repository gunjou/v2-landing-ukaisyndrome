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
  instagram: "https://www.instagram.com/syndrome_ukai/",
};

export const stats = [
  { value: "5000+", label: "Siswa terdaftar" }, // REAL
  { value: "92%", label: "Tingkat kelulusan" }, // DUMMY
  { value: "120+", label: "Mentor apoteker" }, // DUMMY
  { value: "1.250", label: "Halaman modul" }, // REAL (600 + 450 + 200)
];

export const network = {
  title: "Jaringan mentor terluas se-Indonesia", // REAL
  description: "Dengan jaringan mentor terluas, anda akan mendapatkan persiapan UKAI yang lebih optimal dan termurah.", // REAL
  image: "https://mgf.ukaisyndrome.id/images/ukaisyndrome/2026/assets/maps.png", // REAL
  points: ["Mentor dari berbagai kampus farmasi", "Kelas intensif tatap muka di banyak kota", "Networking antar kampus"],
};

// DUMMY: nama & foto mentor
export const mentors = [
  { name: "apt. Nama Mentor, M.Farm", role: "Farmasi Klinis", campus: "Universitas A" },
  { name: "apt. Nama Mentor, M.Sc", role: "Farmasi Industri", campus: "Universitas B" },
  { name: "apt. Nama Mentor, S.Farm", role: "OSCE", campus: "Universitas C" },
  { name: "apt. Nama Mentor, M.Clin.Pharm", role: "SBA & Farmakoterapi", campus: "Universitas D" },
];

export const modules = [ // REAL
  { name: "Klinis", pages: 600, description: "Modul latihan soal klinis berisikan literatur yang jelas sesuai PERMENKES, DiPiro, WHO, dan Koda-Kimble." },
  { name: "Industri + SBA", pages: 450, description: "Modul dan latihan soal industri serta SBA, sesuai Farmakope edisi VI, Ansel, dan Kemenkes Kefarmasian." },
  { name: "OSCE", pages: 200, description: "Dilengkapi gambar alat dan prosedur kerja. Modul berwarna sesuai blueprint dan soal OSCE terbaru." },
];

export const steps = [ // DUMMY (alur umum, sesuaikan)
  { title: "Pilih program", description: "Tentukan paket sesuai kebutuhan dan jadwal ujianmu." },
  { title: "Belajar bersama mentor", description: "Kelas intensif dan online, dipantau wali kelas." },
  { title: "Latihan & tryout", description: "Ribuan soal, pretest, posttest, dan tryout CBT." },
  { title: "Siap UKAI", description: "Kisi-kisi dan prediksi soal UKMPPAI menjelang ujian." },
];

// sessions & detail REAL, price DUMMY
export const programs = [
  { id: "silver", name: "Silver", sessions: 24, price: 2990000, intensive: "12x", online: "12x", osce: "—", drill: 600, prePost: 600 },
  { id: "diamond", name: "Diamond", sessions: 27, price: 3490000, intensive: "12x", online: "12x", osce: "3x", drill: 400, prePost: 400 },
  { id: "gold", name: "Gold", sessions: 73, price: 6990000, intensive: "12x", online: "60x", osce: "—", drill: 800, prePost: 600, favorite: true },
  { id: "premium", name: "Premium", sessions: 70, price: 7490000, intensive: "12x", online: "60x", osce: "—", drill: 1000, prePost: 1200 },
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

// DUMMY
export const testimonials = [
  { name: "Nama Alumni", campus: "Universitas A, 2025", quote: "Mentornya sabar dan materinya runtut. Tryout CBT-nya mirip sekali dengan ujian asli." },
  { name: "Nama Alumni", campus: "Universitas B, 2025", quote: "Wali kelas rajin memantau, jadi saya tidak tertinggal walau sambil koas." },
  { name: "Nama Alumni", campus: "Universitas C, 2024", quote: "Modul OSCE berwarna dengan gambar alat sangat membantu latihan praktik." },
];

export const faqs = [
  { question: "Apa syarat klaim Garansi Lulus?", answer: "Tidak bolos les lebih dari 3x, hafalan seluruh materi terpenuhi, dan mengerjakan semua pretest, posttest, serta tryout." }, // REAL
  { question: "Apakah kelas bisa diikuti dari luar kota?", answer: "Bisa. Semua program memiliki sesi online dan rekaman kelas dapat diakses sampai hari UKAI." }, // DUMMY
  { question: "Apa bedanya kelas intensif dan online?", answer: "Kelas intensif berlangsung 4–5 jam per pertemuan untuk pendalaman materi, kelas online untuk latihan dan pembahasan rutin." }, // DUMMY
  { question: "Apakah modul dikirim dalam bentuk fisik?", answer: "Ya, modul UKAI CBT dan OSCE dikirim dalam bentuk cetak ke alamat peserta." }, // DUMMY
  { question: "Bagaimana cara mendaftar?", answer: "Pilih program, lalu hubungi admin melalui WhatsApp untuk pendaftaran dan pembayaran." }, // DUMMY
];
