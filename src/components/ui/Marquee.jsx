import { cn } from "./cn";
import Reveal from "./Reveal";

// Carousel otomatis tanpa ujung (CSS .marquee): daftar dirender dua kali lalu digeser -50%; salinan kedua aria-hidden.
// Tanpa efek pudar: untuk lebar penuh layar pakai className "mx-[calc(50%-50vw)]" + Section "overflow-x-clip".
// role=region + tabIndex: bisa difokus keyboard (menjeda carousel; saat reduced-motion bisa digeser dengan panah). Tetap jalan saat hover; berhenti selama ditekan-tahan (:active) atau saat fokus keyboard. Reduced-motion: diam & bisa digeser manual. `perItem` = detik per item (kecepatan tetap).
export default function Marquee({ items, getKey, render, label, reverse = false, perItem = 6, itemClassName, className }) {
  const copy = (n) =>
    items.map((item) => (
      <li key={`${n}-${getKey(item)}`} aria-hidden={n ? true : undefined} className={cn("shrink-0 pr-4", itemClassName)}>
        {render(item)}
      </li>
    ));
  return (
    <Reveal role="region" aria-label={label} tabIndex={0} className={cn("marquee-viewport", className)}>
      {/* onTouchStart kosong: syarat iOS Safari agar :active aktif saat disentuh; select-none agar tahan-tekan tidak memblok teks */}
      <ul onTouchStart={() => {}} className={cn("marquee flex w-max select-none", reverse && "marquee-reverse")} style={{ "--dur": `${items.length * perItem}s` }}>
        {copy(0)}
        {copy(1)}
      </ul>
    </Reveal>
  );
}
