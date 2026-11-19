import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "./Button";
import Container from "./Container";
import Logo from "./Logo";
import { cn } from "./cn";

// links: [{ label, href }], cta: { label, href }
export default function Navbar({ brand = "Syndrome UKAI", links, cta }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "tone-brand sticky top-0 z-40 border-b transition-shadow duration-300",
        scrolled || open ? "border-line shadow-[0_8px_24px_-12px_rgb(0_0_0/0.35)]" : "border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        <a href="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight whitespace-nowrap text-fg">
          <Logo title={null} />
          {brand}
        </a>

        <nav aria-label="Utama" className="hidden items-center gap-6 lg:flex xl:gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium whitespace-nowrap text-fg-muted transition-colors hover:text-fg">
              {l.label}
            </a>
          ))}
          {cta && <Button href={cta.href} size="sm">{cta.label}</Button>}
        </nav>

        <button
          type="button"
          className="-mr-2 p-2 text-fg lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </Container>

      <nav id="mobile-nav" aria-label="Utama" hidden={!open} className="border-t border-line lg:hidden">
        <Container className="flex flex-col py-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 text-base font-medium text-fg-muted hover:text-fg">
              {l.label}
            </a>
          ))}
          {cta && <Button href={cta.href} className="mt-4">{cta.label}</Button>}
        </Container>
      </nav>
    </header>
  );
}
