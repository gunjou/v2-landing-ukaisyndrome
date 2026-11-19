import { useEffect, useRef, useState } from "react";

// Angka yang menghitung naik setiap kali masuk layar. `value` berupa teks dari data, mis. "5000+", "92%", "1.250".
// HTML prerender & reduced-motion menampilkan nilai akhir apa adanya.
export default function CountUp({ value, duration = 1500 }) {
  const ref = useRef(null);
  const [text, setText] = useState(value);

  useEffect(() => {
    const m = value.match(/^(\D*)([\d.]+)(.*)$/);
    if (!m || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [, prefix, digits, suffix] = m;
    const target = Number(digits.replaceAll(".", "")); // titik = pemisah ribuan (format Indonesia)
    const format = (n) => prefix + (digits.includes(".") ? n.toLocaleString("id-ID") : n) + suffix;
    let raf;

    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (!entry.isIntersecting) return setText(format(0));
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        setText(format(Math.round(target * (1 - (1 - t) ** 3)))); // ease-out
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  // tabular-nums agar lebar angka tidak goyang saat menghitung
  return (
    <span ref={ref} className="tabular-nums">
      {text}
    </span>
  );
}
