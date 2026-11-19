// DUMMY: artikel blog / bank materi. Bentuk = kontrak API backend: slug, title, category, date (ISO), excerpt,
// cover ({ url, width, height } | null → sampul etiket berikon kategori), body (array paragraf, tanpa HTML agar aman).
export const categories = ["Tips UKAI", "Pembahasan Soal", "OSCE", "Regulasi"];

export const posts = [
  {
    slug: "strategi-lulus-ukai-cbt",
    title: "Strategi Lulus UKAI CBT dalam 3 Bulan",
    category: "Tips UKAI",
    date: "2026-11-01",
    excerpt: "Pembagian waktu belajar klinis, industri, dan SBA agar persiapan UKAI CBT tidak berantakan.",
    body: [
      "Paragraf pembuka artikel. Ganti dengan isi asli.",
      "Paragraf kedua: pembagian minggu belajar, target soal harian, dan kapan mulai tryout.",
    ],
  },
  {
    slug: "pembahasan-soal-farmakoterapi-hipertensi",
    title: "Pembahasan Soal Farmakoterapi: Hipertensi pada Ibu Hamil",
    category: "Pembahasan Soal",
    date: "2026-10-20",
    excerpt: "Contoh soal kasus hipertensi kehamilan beserta alasan memilih metildopa.",
    body: ["Kasus soal.", "Pembahasan langkah demi langkah."],
  },
  {
    slug: "persiapan-stase-konseling-osce",
    title: "Persiapan Stase Konseling OSCE",
    category: "OSCE",
    date: "2026-10-05",
    excerpt: "Urutan konseling yang dinilai penguji dan kesalahan yang paling sering terjadi.",
    body: ["Urutan konseling.", "Kesalahan umum."],
  },
  {
    slug: "perubahan-blueprint-ukai-2027",
    title: "Apa yang Berubah di Blueprint UKAI 2027?",
    category: "Regulasi",
    date: "2026-09-18",
    excerpt: "Ringkasan perubahan proporsi soal dan dampaknya ke strategi belajar.",
    body: ["Ringkasan perubahan.", "Dampak ke strategi belajar."],
  },
  {
    slug: "bangkit-setelah-gagal-ukai",
    title: "Bangkit Setelah Gagal UKAI: Apa yang Harus Diubah",
    category: "Tips UKAI",
    date: "2026-09-02",
    excerpt: "Evaluasi jujur atas persiapan sebelumnya dan langkah konkret untuk percobaan berikutnya.",
    body: ["Evaluasi.", "Langkah konkret."],
  },
];
