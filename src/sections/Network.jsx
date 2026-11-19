import { Check } from "lucide-react";
import { Reveal, Section, SectionHeader } from "../components/ui";

export default function Network({ network }) {
  return (
    <Section id="capaian">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionHeader eyebrow="Capaian" title={network.title} description={network.description} />
          <ul className="mt-8 space-y-3">
            {network.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-fg">
                <span className="grid size-6 place-items-center rounded-full bg-brand-50 text-brand">
                  <Check aria-hidden className="size-3.5" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={150} className="rounded-xl border border-line bg-surface p-4 md:p-8">
          <img src={network.image} alt="Peta sebaran mentor Syndrome UKAI di Indonesia" width="5699" height="3707" loading="lazy" decoding="async" className="h-auto w-full" />
        </Reveal>
      </div>
    </Section>
  );
}
