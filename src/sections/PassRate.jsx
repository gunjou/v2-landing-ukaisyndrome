import { Highlight, MascotFace, MascotResult, Reveal, Section, SectionHeader, Tabs, Text } from "../components/ui";

// Bukti kelulusan sebagai cerita "x dari 10": kepala maskot menyala satu per satu (nasional vs Syndrome),
// kepala yang tidak lulus berwajah sedih, lalu stempel LULUS per periode. Maskot membuka pengumuman. Animasi: .pr-* & .mres-* di index.css.
const outOfTen = (pct) => Math.round(pct / 10);

function FaceRow({ label, pct, highlight }) {
  const lit = outOfTen(pct);
  return (
    // Label di atas; 10 kepala + jumlah sejajar di bawahnya
    <div>
      <p className={highlight ? "text-sm font-semibold text-fg" : "text-sm text-fg-muted"}>{label}</p>
      <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
        <div className="flex gap-1 sm:gap-1.5">
          {Array.from({ length: 10 }, (_, i) =>
            i < lit ? (
              <MascotFace key={i} className="pr-lit size-6 shrink-0 min-[360px]:size-7 sm:size-9 md:size-8 lg:size-9" style={{ "--i": i }} />
            ) : (
              <MascotFace key={i} mood="sad" className="size-6 shrink-0 min-[360px]:size-7 text-line sm:size-9 md:size-8 lg:size-9" />
            ),
          )}
        </div>
        <p className={highlight ? "text-lg font-bold whitespace-nowrap text-brand" : "font-semibold whitespace-nowrap text-fg-muted"}>
          {lit} dari 10 lulus
        </p>
      </div>
    </div>
  );
}

function ExamPanel({ exam, passRates }) {
  const latest = passRates.at(-1);
  const ours = latest[exam];
  const national = latest.national[exam];
  return (
    // Maskot ada di dalam panel tab: panel yang baru ditampilkan (hidden → tampil) memutar ulang semua animasi
    <Reveal className="grid items-center gap-8 md:grid-cols-[1.6fr_1fr]">
      <div className="space-y-4">
        <FaceRow label="Rata-rata nasional" pct={national} />
        <FaceRow label="Siswa Syndrome" pct={ours} highlight />
        <Text size="sm">
          UKAI {exam.toUpperCase()} {latest.period}: {ours}% siswa Syndrome lulus ({latest.participants} peserta), rata-rata nasional {national}%.
        </Text>

        <div>
          <p className="text-sm font-semibold text-fg">Lulus di setiap periode</p>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-4 sm:flex sm:flex-wrap sm:gap-x-6">
            {passRates.map((r, i) => (
              <div key={r.period} className="text-center">
                <div className="pr-stamp mx-auto inline-block -rotate-6 rounded-md border-2 border-brand px-2.5 py-1 text-brand" style={{ "--i": i }}>
                  <span className="block text-xs font-extrabold tracking-widest">LULUS</span>
                  <span className="block text-lg leading-tight font-bold">{r[exam]}%</span>
                </div>
                <p className="mt-1.5 text-xs text-fg-muted">{r.period}</p>
                <p className="text-xs font-semibold text-fg">dari {r.participants} siswa</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Mobile: maskot di atas agar animasinya terlihat bersamaan dengan kepala mini */}
      <MascotResult className="order-first mx-auto max-w-40 sm:max-w-48 md:order-none lg:max-w-xs" />
    </Reveal>
  );
}

export default function PassRate({ passRates }) {
  const latest = passRates.at(-1);
  return (
    <Section id="kelulusan" tone="muted">
      <SectionHeader
        eyebrow="Bukti kelulusan"
        title={<><Highlight>{outOfTen(latest.cbt)} dari 10</Highlight> siswa kami lulus UKAI</>}
        description="Bandingkan dengan rata-rata nasional pada periode yang sama."
      />
      <Tabs
        className="mt-8"
        items={["cbt", "osce"].map((exam) => ({
          label: exam.toUpperCase(),
          content: <ExamPanel exam={exam} passRates={passRates} />,
        }))}
      />
    </Section>
  );
}
