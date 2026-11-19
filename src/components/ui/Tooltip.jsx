import { useId } from "react";

// Muncul saat hover atau fokus keyboard. Anak harus elemen yang bisa difokus.
export default function Tooltip({ content, children }) {
  const id = useId();
  return (
    <span className="group relative inline-flex" aria-describedby={id}>
      {children}
      <span
        role="tooltip"
        id={id}
        className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-max max-w-60 -translate-x-1/2 translate-y-1 rounded-lg bg-ink px-3 py-2 text-xs text-white opacity-0 shadow-lg transition-all duration-200 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100"
      >
        {content}
      </span>
    </span>
  );
}
