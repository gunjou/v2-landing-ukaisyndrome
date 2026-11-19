import * as data from "../data/landing";

// Satu-satunya pintu data landing. Ganti isi fungsi ini dengan fetch ke API backend saat siap.
// Dipanggil oleh `loader` di routes/home.jsx saat build, sehingga data ikut ter-prerender (SEO).
export async function getLandingContent() {
  return data;
}

export const formatRupiah = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

// Info dasar situs untuk Navbar/Footer di semua halaman.
export async function getSiteInfo() {
  return data.site;
}
