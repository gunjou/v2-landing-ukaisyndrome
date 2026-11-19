import { useEffect, useRef } from "react";
import { cn } from "./cn";

// Muncul halus saat masuk layar. Konten tetap terlihat tanpa JS (lihat .js [data-reveal] di index.css).
export default function Reveal({ as: Tag = "div", delay = 0, className, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("is-visible");
        io.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} data-reveal style={{ transitionDelay: `${delay}ms` }} className={cn(className)}>
      {children}
    </Tag>
  );
}
