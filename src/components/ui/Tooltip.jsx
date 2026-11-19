import { useId } from "react";

// Muncul saat hover atau fokus keyboard. Anak harus elemen yang bisa difokus.
// Disembunyikan dengan `hidden` (bukan opacity) agar tidak membuat halaman bisa digeser ke samping di layar sempit.
export default function Tooltip({ content, children }) {
  const id = useId();
  return (
    <span className="group relative inline-flex" aria-describedby={id}>
      {children}
      <span
        role="tooltip"
        id={id}
        className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden w-max max-w-[min(15rem,80vw)] -translate-x-1/2 rounded-lg bg-ink px-3 py-2 text-xs text-white shadow-lg group-focus-within:block group-hover:block"
      >
        {content}
      </span>
    </span>
  );
}
