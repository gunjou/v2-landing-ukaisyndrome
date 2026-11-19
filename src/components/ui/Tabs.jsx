import { useId, useRef, useState } from "react";
import { cn } from "./cn";

// items: [{ label, content }]. Navigasi panah kiri/kanan sesuai pola ARIA tabs.
export default function Tabs({ items, className }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const refs = useRef([]);

  const onKeyDown = (e) => {
    const dir = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!dir) return;
    const next = (active + dir + items.length) % items.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div className={className}>
      {/* Label tidak boleh terbelah; bila tetap tidak muat, daftar tab bisa digeser */}
      <div role="tablist" className="inline-flex max-w-full overflow-x-auto rounded-lg bg-surface p-1" onKeyDown={onKeyDown}>
        {items.map((item, i) => (
          <button
            key={item.label}
            ref={(el) => (refs.current[i] = el)}
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className={cn(
              "shrink-0 rounded-md px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-150",
              active === i ? "bg-accent text-ink" : "text-fg-muted hover:text-fg",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item, i) => (
        <div key={item.label} role="tabpanel" id={`${id}-panel-${i}`} aria-labelledby={`${id}-tab-${i}`} hidden={active !== i} className="mt-8">
          {item.content}
        </div>
      ))}
    </div>
  );
}
