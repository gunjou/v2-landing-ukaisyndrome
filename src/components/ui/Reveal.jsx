import { useEffect, useRef } from "react";
import { cn } from "./cn";

// Muncul halus saat masuk layar dan diulang setiap kali masuk lagi (keluar layar = di-reset).
// Konten tetap terlihat tanpa JS (lihat .js [data-reveal] di index.css).
export default function Reveal({ as: Tag = "div", delay = 0, className, children, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        // tampil saat 15% terlihat, reset hanya saat benar-benar keluar layar agar tidak berkedip di tepi
        if (entry.intersectionRatio >= 0.15) el.classList.add("is-visible");
        else if (!entry.isIntersecting) el.classList.remove("is-visible");
      },
      { threshold: [0, 0.15] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} data-reveal style={{ transitionDelay: `${delay}ms` }} className={cn(className)} {...props}>
      {children}
    </Tag>
  );
}
