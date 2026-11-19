import * as data from "../data/landing";

// Satu-satunya pintu data landing. Ganti isi fungsi ini dengan fetch ke API backend saat siap.
// Dipanggil oleh `loader` di routes/home.jsx saat build, sehingga data ikut ter-prerender (SEO).
export async function getLandingContent() {
  // Statistik mentor di hero ikut angka asli section Sebaran kelas agar tidak ada dua angka berbeda.
  const stats = data.stats.map((s) => (s.key === "mentors" ? { ...s, value: roundedPlus(data.network.mentors) } : s));
  return { ...data, stats, modules: data.modules.map(withCover) };
}

// 224 → "220+" (dibulatkan ke bawah per 10 agar klaim tidak berlebih).
export const roundedPlus = (n) => `${Math.floor(n / 10) * 10}+`;

// Cover modul 576×720 dari CDN; null bila env belum diisi → komponen menampilkan cover polos.
const CDN = import.meta.env.VITE_CDN_ASSET_URL;
const withCover = (m) => ({ ...m, cover: CDN && m.image ? { url: `${CDN}/${m.image}`, width: 576, height: 720 } : null });

// timeZone UTC agar hasil sama saat prerender dan di browser (hindari hydration mismatch).
export const formatDate = (iso) =>
  new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));

// Info dasar situs untuk Navbar/Footer di semua halaman.
export async function getSiteInfo() {
  return data.site;
}

// Satu paket + detailnya untuk halaman /program/:id. null bila tidak ada.
export async function getProgram(id) {
  const program = data.programs.find((p) => p.id === id);
  if (!program) return null;
  return {
    program,
    detail: data.programDetails[id],
    // Untuk pengalih paket di header
    programs: data.programs.map(({ id, name, favorite }) => ({ id, name, favorite })),
    sharedFeatures: data.sharedFeatures,
    guaranteeTerms: data.guaranteeTerms,
    site: data.site,
    students: data.stats[0],
  };
}

export async function getAlumni() {
  return { alumni: data.alumni, site: data.site, students: data.stats[0] };
}

