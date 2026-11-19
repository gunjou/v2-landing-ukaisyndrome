import { useRef } from "react";
import { Instagram, TikTok } from "./BrandIcons";
import { cn } from "./cn";
import Container from "./Container";
import Logo from "./Logo";

const SOCIAL_ICONS = { Instagram, TikTok };

function Mark({ className }) {
  return (
    <span className={cn("flex items-center justify-center gap-[0.12em] whitespace-nowrap", className)}>
      <Logo title={null} className="size-[0.9em]" />
      SYNDROME
    </span>
  );
}

// Logo + nama besar samar (ala footer Dicoding) dengan "heatmap" seperti peta Sebaran kelas: cahaya merah → kuning
// menyingkap tulisan. Cahaya mengikuti kursor; tanpa kursor (HP) bergeser sendiri kiri-kanan (.foot-mark di index.css).
function Wordmark() {
  const ref = useRef(null);
  const track = (e) => {
    const el = ref.current;
    const r = el.firstElementChild.getBoundingClientRect(); // koordinat mask relatif ke kotak tulisan
    el.classList.add("is-tracking");
    el.style.setProperty("--hx", `${e.clientX - r.left}px`);
    el.style.setProperty("--hy", `${e.clientY - r.top}px`);
  };
  const reset = () => ref.current.classList.remove("is-tracking");
  return (
    <div ref={ref} aria-hidden onPointerMove={track} onPointerLeave={reset} className="foot-mark relative select-none">
      <Container className="relative py-6 text-[min(12.5vw,11rem)] leading-none font-extrabold tracking-tighter">
        <Mark className="text-fg opacity-[0.06]" />
        <Mark className="foot-heat foot-heat-red absolute inset-0 px-[inherit] py-6 text-brand" />
        <Mark className="foot-heat foot-heat-yellow absolute inset-0 px-[inherit] py-6 text-accent" />
      </Container>
    </div>
  );
}

// columns: [{ title, wide?, links: [{ label, href }] }] — `wide` = kolom selebar 2 dengan tautan 2 kolom (untuk daftar panjang), socials: [{ name, handle, url }] (ikon dari BrandIcons menurut `name`).
// Latar maroon; di atas garis hak cipta ada Wordmark (logo + nama besar) yang disingkap cahaya heatmap.
export default function Footer({ brand = "Syndrome UKAI", description, columns, socials = [], copyright }) {
  return (
    <footer className="tone-brand-dark relative overflow-hidden">
      {/* Mobile: tiap kolom selebar penuh (email tidak terpotong), kolom `wide` tautannya 2 kolom; tablet 4 kolom (Bantuan & Hubungi selebar isinya); desktop brand + 4 kolom */}
      <Container className="grid grid-cols-2 gap-x-6 gap-y-10 pt-14 pb-10 sm:grid-cols-[1fr_1fr_auto_auto] sm:gap-x-10 md:pt-20 lg:grid-cols-[2fr_1fr_1fr_auto_auto]">
        <div className="col-span-full max-w-sm lg:col-span-1">
          <p className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-fg">
            <Logo title={null} className="size-9" /> {brand}
          </p>
          {description && <p className="mt-4 text-sm leading-relaxed text-fg-muted">{description}</p>}
          {socials.length > 0 && (
            <div className="mt-6 flex items-center gap-3">
              <ul className="flex gap-2">
                {socials.map((s) => {
                  const Icon = SOCIAL_ICONS[s.name];
                  return (
                    <li key={s.name}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener"
                        aria-label={`${s.name} ${s.handle}`}
                        title={`${s.name} ${s.handle}`}
                        className="grid size-10 place-items-center rounded-lg border border-line text-fg transition-colors hover:border-accent hover:bg-accent hover:text-ink"
                      >
                        {Icon ? <Icon aria-hidden className="size-4" /> : <span className="text-xs font-bold">{s.name[0]}</span>}
                      </a>
                    </li>
                  );
                })}
              </ul>
              {/* Satu teks bila semua akun memakai handle yang sama */}
              {new Set(socials.map((s) => s.handle)).size === 1 && <p className="text-sm text-fg-muted">Ikuti <span className="font-semibold text-fg">{socials[0].handle}</span></p>}
            </div>
          )}
        </div>
        {columns.map((col) => (
          <div key={col.title} className={col.wide ? "col-span-2" : "col-span-2 sm:col-span-1"}>
            <p className="text-xs font-bold tracking-widest text-highlight uppercase">{col.title}</p>
            <ul className={cn("mt-5", col.wide ? "grid grid-cols-2 gap-x-6 gap-y-3" : "space-y-3")}>
              {col.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm [overflow-wrap:anywhere] text-fg-muted transition-colors hover:text-highlight">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <Wordmark />
      {copyright && (
        <Container className="border-t border-line py-6 text-xs text-fg-subtle">{copyright}</Container>
      )}
    </footer>
  );
}
