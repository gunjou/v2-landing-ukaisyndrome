import { BookOpen, Check, ClipboardCheck, Home, User } from "lucide-react";
import { AppleLogo, GooglePlay, Heading, Highlight, Logo, MascotFace, Reveal, Section, Text } from "../components/ui";

// Tombol toko ala badge resmi (dua baris).
function StoreButton({ href, icon: Icon, small, label }) {
  return (
    <a href={href} target="_blank" rel="noopener" className="flex items-center gap-3 rounded-lg bg-ink px-4 py-2.5 text-white ring-1 ring-line transition-transform hover:-translate-y-0.5">
      <Icon aria-hidden className="size-6" />
      <span className="text-left leading-tight">
        <span className="block text-[10px] tracking-wide uppercase opacity-80">{small}</span>
        <span className="block text-base font-bold">{label}</span>
      </span>
    </a>
  );
}

// Mockup ponsel dari HTML + token (bukan screenshot), dekoratif. Bar progres terisi saat masuk layar (st-fill-x).
function PhoneMockup() {
  return (
    <div aria-hidden className="mascot-body relative mx-auto w-60 sm:w-64">
      <div className="rotate-3 rounded-[2.5rem] bg-ink p-2.5 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)]">
        <div className="tone-light relative aspect-[9/18] overflow-hidden rounded-[2rem] bg-surface">
          <span className="absolute top-2 left-1/2 h-4 w-20 -translate-x-1/2 rounded-full bg-ink" />
          <div className="tone-brand bg-brand px-4 pt-9 pb-4">
            <div className="flex items-center gap-2">
              <Logo title={null} className="size-6" />
              <span className="text-xs font-bold text-fg">Syndrome UKAI</span>
            </div>
            <p className="mt-3 text-sm font-bold text-fg">Halo, calon apoteker!</p>
            <p className="mt-2 flex justify-between text-[10px] text-fg-muted"><span>Progres belajar</span><span>68%</span></p>
            <span className="mt-1 block h-1.5 rounded-full bg-surface">
              <span className="st-fill-x block h-full w-[68%] rounded-full bg-accent" />
            </span>
          </div>
          <div className="space-y-2.5 p-3">
            <div className="relative rounded-xl bg-bg p-3">
              <p className="text-[10px] text-fg-subtle">Tryout CBT #12</p>
              <p className="text-lg font-extrabold text-fg">78 <span className="text-xs font-semibold text-fg-subtle">/ 100</span></p>
              <span className="pr-stamp absolute top-3 right-3 -rotate-6 rounded border-2 border-brand px-1.5 text-[9px] font-extrabold tracking-widest text-brand" style={{ "--i": 0 }}>LULUS</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl bg-bg p-3">
              <span className="grid size-8 place-items-center rounded-lg bg-accent-50 text-accent-dark"><BookOpen className="size-4" /></span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold text-fg">Modul Klinis</p>
                <p className="text-[10px] text-fg-subtle">Hal. 214 dari 600</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl bg-bg p-3">
              <span className="grid size-8 place-items-center rounded-full bg-accent-50"><MascotFace className="size-6" /></span>
              <p className="text-[10px] text-fg-muted">Mentor: <span className="font-bold text-fg">Kelas online 19.30</span></p>
            </div>
          </div>
          {/* Bar navigasi aplikasi */}
          <div className="absolute inset-x-0 bottom-0 flex justify-around border-t border-line bg-bg py-3">
            {[Home, BookOpen, ClipboardCheck, User].map((I, i) => (
              <I key={i} className={i === 0 ? "size-4 text-brand" : "size-4 text-fg-subtle"} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DownloadApp({ site }) {
  return (
    <Section id="download" tone="brand" className="overflow-hidden">
      <Reveal className="grid items-center gap-12 md:grid-cols-[1.3fr_1fr]">
        <div className="text-center md:text-left">
          <Heading>
            Belajar lebih mudah, <Highlight>kapanpun & dimanapun</Highlight>
          </Heading>
          <Text size="lg" className="mt-4 max-w-xl">
            Akses modul terbaru, mentor profesional, dan latihan soal interaktif langsung dari smartphone.
          </Text>
          <ul className="mx-auto mt-6 max-w-sm space-y-2.5 text-left md:mx-0">
            {site.appFeatures.map((f) => (
              <li key={f} className="flex items-center gap-3 text-fg">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent text-ink"><Check aria-hidden className="size-3.5" strokeWidth={3} /></span>
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <StoreButton href={site.playStore} icon={GooglePlay} small="Download di" label="Google Play" />
            <StoreButton href={site.appStore} icon={AppleLogo} small="Download di" label="App Store" />
          </div>
        </div>
        <PhoneMockup />
      </Reveal>
    </Section>
  );
}
