import { cn } from "./cn";

// Maskot Syndrome: bentuk logo (kepala + buku terbuka + tangan kapsul) yang sedang membaca.
// Animasi di index.css (kelas `mascot-*`), berhenti saat prefers-reduced-motion. Selalu dekoratif.
const PAGE_LEFT =
  "M150.5 447.1C143 448.1 131.3 451.3 126.7 453.7C122.2 456 116 462 113.7 466.4C111.8 470 111.5 472.5 111.2 485.4C110.9 498.2 111 500.2 112.3 499.7C116.1 498.3 130.3 497.9 139 499C173 503.4 201 523.6 215.5 554.2C217.9 559.4 221 567.6 222.2 572.6L224.5 581.5V769.5L222.2 778.4C215.1 806.3 196.2 829.8 170.5 842.7C153.6 851.3 130.1 854.8 112.8 851.4L110 850.8V865.8C110 887.2 112.6 893.2 124.3 898.9C131.6 902.5 138.4 903.4 171.5 905C306.4 911.5 423.7 950.4 498.7 1013.4C504 1017.9 509.1 1022.1 510.1 1022.9C512 1024.2 512 1018.2 512 785.6V547L504.3 542.5C480.9 528.6 435.2 509.5 383.5 492C284.2 458.4 196.1 441.4 150.5 447.1Z";
const PAGE_RIGHT =
  "M868.5 447C817.9 452.1 751.1 468.1 680.5 492C628.8 509.5 583.1 528.6 559.8 542.5L552 547V785.6C552 1018.2 552 1024.2 553.9 1022.9C554.9 1022.1 560 1017.9 565.3 1013.4C640.3 950.4 757.6 911.5 892.5 905C925.6 903.4 932.4 902.5 939.7 898.9C951.4 893.2 954 887.2 954 865.8V850.8L951.3 851.4C933.9 854.8 910.4 851.3 893.5 842.7C867.8 829.8 848.9 806.3 841.8 778.4L839.5 769.5V581.5L841.8 572.6C851.9 532.9 884.3 504.2 925 499C933.7 497.9 947.9 498.3 951.7 499.7C953 500.2 953.1 498.2 952.8 485.4C952.5 472.4 952.2 470 950.3 466.4C945.6 457.6 936.1 451.8 921 448.3C913 446.6 881.2 445.8 868.5 447Z";
const COLLAR =
  "M506 377V387C456 390 411 402 378 417L370 420L396 429C452 447 500 467 523 481L532 487L541 481C564 467 612 447 668 429L694 420L686 417C653 402 608 390 567 387H558V377Z";

// Kepala maskot (koordinat logo 1064). Warna kepala = `currentColor` (default kuning), dipakai juga oleh
// MascotFace (kepala mini) & MascotResult. `look`: pupil ke bawah (membaca) atau ke depan.
// `mood`: happy | sad | anxious | anxious-happy (cemas lalu senyum, ditukar lewat CSS .mres-anxious/.mres-happy).
const STROKE = { className: "fill-none stroke-ink", strokeWidth: 10, strokeLinecap: "round" };
const SMILE = <path d="M508 300q24 20 48 0" {...STROKE} />;
const WORRIED_BROWS = <path d="M425 168L492 150M639 168L572 150" {...STROKE} />;
const SAD = (
  <>
    {WORRIED_BROWS}
    <path d="M508 316q24-20 48 0" {...STROKE} />
  </>
);
const ANXIOUS = (
  <>
    {WORRIED_BROWS}
    <path d="M500 310q8-12 16 0t16 0t16 0t16 0" {...STROKE} />
    {/* tetes keringat */}
    <path d="M676 120q-22 34 0 44q22-10 0-44Z" className="fill-bg" />
  </>
);

export function MascotHead({ className, look = "down", mood = "happy" }) {
  const py = look === "down" ? 243 : 228;
  return (
    <g className={className}>
      <circle cx="532" cy="208" r="170" fill="currentColor" />
      <g className="mascot-eyes">
        <ellipse cx="470" cy="225" rx="42" ry="48" className="fill-bg" />
        <ellipse cx="594" cy="225" rx="42" ry="48" className="fill-bg" />
        <g className="mascot-pupils fill-ink">
          <circle cx="470" cy={py} r="20" />
          <circle cx="594" cy={py} r="20" />
        </g>
      </g>
      <circle cx="420" cy="290" r="18" className="fill-brand opacity-30" />
      <circle cx="644" cy="290" r="18" className="fill-brand opacity-30" />
      {mood === "happy" && SMILE}
      {mood === "sad" && SAD}
      {mood === "anxious" && ANXIOUS}
      {mood === "anxious-happy" && (
        <>
          <g className="mres-anxious">{ANXIOUS}</g>
          <g className="mres-happy">{SMILE}</g>
        </>
      )}
    </g>
  );
}

// Kepala mini (ikon "satu orang"), mis. untuk visual "x dari 10". Warna lewat class text-*.
export function MascotFace({ className, style, mood }) {
  return (
    <svg viewBox="352 28 360 360" aria-hidden className={cn("text-accent", className)} style={style}>
      <MascotHead look="front" mood={mood} />
    </svg>
  );
}

// Tangan berbentuk kapsul dua warna: separuh atas putih, separuh bawah kuning.
function Hand({ x }) {
  return (
    <g className="mascot-hand">
      <rect x={x} y="562" width="112" height="225" rx="56" className="fill-accent" />
      <path d={`M${x} 674V618a56 56 0 0 1 112 0V674Z`} className="fill-bg" />
    </g>
  );
}

export default function Mascot({ className }) {
  return (
    <svg viewBox="-60 -60 1184 1150" aria-hidden className={cn("mascot w-full overflow-visible", className)}>
      {/* Kapsul & tablet melayang di sekitar maskot */}
      <g className="fill-fg opacity-20">
        {/* animasi di <g> pembungkus agar tidak menimpa atribut rotate */}
        <g className="mascot-float"><rect x="-40" y="120" width="120" height="48" rx="24" transform="rotate(-30 20 144)" /></g>
        <circle className="mascot-float [animation-delay:-2s]" cx="960" cy="140" r="34" />
        <g className="mascot-float [animation-delay:-4s]"><rect x="980" y="330" width="96" height="40" rx="20" transform="rotate(25 1028 350)" /></g>
      </g>

      <g className="mascot-body text-accent">
        <MascotHead className="mascot-head" />
        <path d={COLLAR} className="fill-accent" />
        <path d={PAGE_LEFT} className="fill-accent" />
        <path d={PAGE_RIGHT} className="fill-accent" />
        {/* Halaman yang dibalik dari kanan ke kiri, poros di punggung buku */}
        <path d={PAGE_RIGHT} className="mascot-page fill-accent-hover" />
        <Hand x={55} />
        <Hand x={897} />
      </g>
    </svg>
  );
}

// Maskot membuka pengumuman hasil UKAI: tegang (mata membesar) → stempel LULUS → melompat + konfeti kapsul.
// Urutan diputar saat pembungkus <Reveal> mendapat kelas .is-visible (lihat .mres-* di index.css).
// Tanpa JS / reduced-motion: langsung tampil kondisi akhir (stempel terlihat).
const CONFETTI = [
  [-330, -260, -40], [-220, -380, 20], [-60, -440, -70], [120, -430, 40],
  [280, -360, -20], [360, -220, 60], [-380, -80, 30], [400, -40, -50],
];

export function MascotResult({ className }) {
  return (
    <svg viewBox="-60 -80 1184 1160" aria-hidden className={cn("mres w-full overflow-visible", className)}>
      <g className="mres-body text-accent">
        <MascotHead className="mres-head" look="front" mood="anxious-happy" />
        <path d={COLLAR} fill="currentColor" />
        {/* Lembar pengumuman */}
        <g transform="rotate(-3 532 720)">
          <rect x="300" y="440" width="464" height="560" rx="24" className="fill-bg stroke-line" strokeWidth="6" />
          <text x="532" y="530" textAnchor="middle" className="fill-ink text-[52px] font-bold tracking-wide">HASIL UKAI</text>
          {[580, 630, 680].map((y, i) => (
            <rect key={y} x="360" y={y} width={i === 2 ? 220 : 344} height="18" rx="9" className="fill-line" />
          ))}
          <g transform="rotate(-12 532 840)">
            <g className="mres-stamp">
            <rect x="372" y="770" width="320" height="140" rx="18" className="fill-none stroke-brand" strokeWidth="12" />
            <text x="532" y="874" textAnchor="middle" className="fill-brand text-[92px] font-extrabold tracking-wider">LULUS</text>
            </g>
          </g>
        </g>
        <Hand x={230} />
        <Hand x={722} />
      </g>
      {/* Konfeti kapsul, meledak dari kepala */}
      <g className="fill-brand">
        {CONFETTI.map(([dx, dy, r], i) => (
          <g key={i} className="mres-confetti" style={{ "--dx": `${dx}px`, "--dy": `${dy}px`, "--r": `${r}deg`, "--d": `${(i % 4) * 0.2}s` }}>
            <rect x="512" y="190" width="44" height="18" rx="9" className={i % 2 ? "fill-accent" : undefined} />
          </g>
        ))}
      </g>
    </svg>
  );
}

// Maskot wisuda: toga (topi + jubah maroon + selempang kuning) memegang gulungan ijazah. Melanjutkan cerita
// belajar (hero) → lulus (bukti kelulusan) → wisuda (halaman alumni). Pakai animasi mascot-* + tali topi berayun (mascot-tassel).
export function MascotGraduate({ className }) {
  return (
    <svg viewBox="-60 -140 1184 1200" aria-hidden className={cn("mascot w-full overflow-visible", className)}>
      <g className="fill-fg opacity-20">
        <g className="mascot-float"><rect x="-20" y="160" width="120" height="48" rx="24" transform="rotate(-30 40 184)" /></g>
        <circle className="mascot-float [animation-delay:-3s]" cx="980" cy="200" r="34" />
      </g>

      <g className="mascot-body text-accent">
        {/* Jubah + selempang */}
        <path d="M380 420Q532 470 684 420L800 1000H264Z" className="fill-brand-dark" />
        <path d="M470 440L515 470L500 1000H430Z M594 440L549 470L564 1000H634Z" className="fill-accent" />
        <path d={COLLAR} className="fill-accent" />

        <g className="mascot-head">
          <MascotHead look="front" />
          {/* Topi wisuda */}
          <path d="M402 40V96Q532 132 662 96V40Z" className="fill-ink" />
          <path d="M532 -50L790 22L532 94L274 22Z" className="fill-ink" />
          <path d="M532 22L746 34" className="fill-none stroke-accent" strokeWidth="10" strokeLinecap="round" />
          <circle cx="532" cy="22" r="14" className="fill-accent" />
          <g className="mascot-tassel">
            <path d="M746 34V130" className="fill-none stroke-accent" strokeWidth="10" strokeLinecap="round" />
            <rect x="730" y="122" width="32" height="56" rx="10" className="fill-accent" />
          </g>
        </g>

        {/* Gulungan ijazah berpita merah, dipegang dua tangan kapsul */}
        <g transform="rotate(-10 532 690)">
          <rect x="300" y="640" width="464" height="100" rx="50" className="fill-bg stroke-line" strokeWidth="6" />
          <ellipse cx="714" cy="690" rx="24" ry="44" className="fill-line" />
          <rect x="508" y="640" width="48" height="100" className="fill-brand" />
        </g>
        <Hand x={230} />
        <Hand x={722} />
      </g>
    </svg>
  );
}

