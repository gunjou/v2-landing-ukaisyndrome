import { Link } from "react-router";
import { Button, Logo, MascotFace } from "../components/ui";

export function meta() {
  return [{ title: "Halaman tidak ditemukan — Syndrome UKAI" }, { name: "robots", content: "noindex" }];
}

// Di luar layout (tanpa Navbar/Footer, lihat routes.js), jadi halaman ini berdiri sendiri: latar merah penuh.
// "404" dengan angka 0 diganti kepala maskot yang cemas & celingukan (pupil bergerak: mascot-pupils).
export default function NotFound() {
  return (
    <main className="tone-brand relative flex min-h-svh flex-col overflow-hidden bg-brand">
      {/* Kapsul melayang sebagai dekorasi */}
      <span aria-hidden className="mascot-float absolute top-[18%] left-[10%] h-6 w-14 -rotate-30 rounded-full bg-accent opacity-30" />
      <span aria-hidden className="mascot-float absolute right-[12%] bottom-[22%] h-5 w-12 rotate-20 rounded-full bg-fg opacity-15 [animation-delay:-2s]" />
      <span aria-hidden className="mascot-float absolute top-[28%] right-[18%] size-5 rounded-full bg-fg opacity-20 [animation-delay:-4s]" />

      <header className="px-5 py-5 sm:px-8">
        <Link to="/" className="inline-flex items-center gap-2 font-bold text-fg">
          <Logo title={null} className="size-8" /> Syndrome UKAI
        </Link>
      </header>

      <div className="relative flex flex-1 flex-col items-center justify-center px-5 pb-16 text-center">
        <p className="flex items-center text-[7.5rem] leading-none font-extrabold tracking-tighter text-accent sm:text-[11rem]">
          <span className="sr-only">404</span>
          <span aria-hidden>4</span>
          <span aria-hidden className="mascot mx-1 grid size-[0.85em] place-items-center rounded-full bg-brand-dark ring-8 ring-surface">
            <MascotFace mood="anxious" className="mascot-body size-[0.7em]" />
          </span>
          <span aria-hidden>4</span>
        </p>
        <h1 className="mt-8 text-3xl font-bold text-balance text-fg sm:text-4xl">Ups, halaman ini tidak ada di resep kami</h1>
        <p className="mt-3 max-w-md text-fg-muted">Halaman yang kamu cari mungkin sudah dipindahkan atau alamatnya salah ketik.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/" size="lg">Kembali ke beranda</Button>
          <Button to="/#program" variant="secondary" size="lg">Lihat program</Button>
        </div>
        <nav aria-label="Tautan cepat" className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          {[["Alumni", "/alumni"], ["Blog & materi", "/blog"], ["FAQ", "/#faq"]].map(([label, to]) => (
            <Link key={to} to={to} className="text-fg-muted underline-offset-4 hover:text-highlight hover:underline">{label}</Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
