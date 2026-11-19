# Animasi & Maskot

Sumber: `src/index.css` (kelas & `@keyframes`), `src/components/ui/Mascot.jsx`, `Reveal.jsx`, `CountUp.jsx`.
Semua animasi dibuat dengan **CSS + SVG**, tanpa library animasi.

## Prinsip
1. **Kondisi dasar CSS = kondisi akhir.** Animasi hanya "memutar dari awal" lalu berhenti di tampilan normal. Akibatnya tanpa JS, di HTML prerender, dan saat `prefers-reduced-motion`, semua konten langsung tampil lengkap.
2. **Hormati `prefers-reduced-motion`.** Setiap kelas animasi baru wajib ditambahkan ke blok `@media (prefers-reduced-motion: reduce)` di akhir bagian animasi `index.css`.
3. **Dekoratif saja.** Maskot dan ornamen selalu `aria-hidden`. Teks penting (judul, angka, CTA) tetap teks HTML biasa agar terbaca Google & pembaca layar.
4. **Diulang tiap masuk layar.** Pemicu memakai `Reveal`: kelas `.is-visible` dipasang saat elemen ≥ 15% terlihat dan dicabut saat keluar layar penuh, jadi animasi berulang saat scroll turun maupun naik.
5. **Gerak kecil & pendek.** Transisi masuk ≤ 0.6s; gerak idle maskot ≤ 28px / 4°. Hindari gerak besar yang mengganggu membaca.
6. **Tanpa hex.** Warna maskot memakai token (`accent`, `bg`, `ink`, `brand`, `line`, `fg`) sehingga aman di area terang dan `tone-brand`.

## Pemicu & utilitas
| Nama | Cara kerja | Dipakai di |
|---|---|---|
| `Reveal` | `IntersectionObserver` memasang/mencabut `.is-visible`. CSS `.js [data-reveal]` = fade-up 0.6s, geser 16px. Prop `delay` (ms) untuk berurutan | Hampir semua section |
| `CountUp` | Hitung naik 1.5s ease-out dari 0 tiap masuk layar. Teks dari data (`"5000+"`, `"92%"`, `"1.250"`), awalan/akhiran dipertahankan, titik = pemisah ribuan. `tabular-nums` agar lebar tidak goyang | Statistik hero |
| `.is-visible .x` | Pola untuk animasi berurutan di dalam `Reveal`: animasi baru dimulai saat kelas dipasang dan otomatis reset saat dicabut | Bukti kelulusan |
| `Marquee` | Daftar dirender 2× lalu `translateX(-50%)` linear tanpa ujung, durasi `--dur` = `perItem` × jumlah item, `marquee-reverse` = arah kanan, berhenti selama ditekan-tahan (`:active`) atau fokus keyboard, tidak saat hover. Reduced-motion: diam, `.marquee-viewport` bisa digeser manual | Alumni (kiri), Mentor (kanan) |
| Panel `Tabs` | Panel yang baru ditampilkan (dari `hidden`) memutar ulang semua animasi CSS di dalamnya. Taruh elemen yang ingin diulang saat ganti tab **di dalam** panel | Tab CBT/OSCE |

Variabel CSS per elemen untuk jeda berurutan: `--i` (indeks, × 0.15s) dan `--d` (jeda konfeti).

## Maskot
Dibangun dari bentuk logo Syndrome (koordinat SVG logo 1064×1064), **tanpa atribut apoteker tambahan** agar tidak ramai. Unsur farmasi: tangan berbentuk **kapsul** (separuh putih, separuh kuning) dan kapsul/tablet yang melayang.

### Anatomi (`Mascot.jsx`)
| Bagian | Bentuk | Catatan |
|---|---|---|
| Kepala (`MascotHead`) | Lingkaran logo + mata, pipi merona, mulut | Warna = `currentColor` (default `text-accent`). Prop `look`: `down` (membaca) / `front`. Prop `mood` (lihat di bawah) |
| Kerah | Bentuk leher/bahu logo | — |
| Badan | Buku terbuka logo (`PAGE_LEFT`, `PAGE_RIGHT`) | Halaman ketiga dipakai untuk animasi membalik |
| Tangan (`Hand`) | Kapsul dua warna | Ikut bob dengan jeda 0.4s |

### Ekspresi (`mood`)
| Mood | Alis | Mulut | Lainnya | Dipakai |
|---|---|---|---|---|
| `happy` | — | senyum | — | default, kepala mini yang lulus |
| `sad` | turun di tengah | cemberut | — | kepala mini yang tidak lulus (abu, `text-line`) |
| `anxious` | turun di tengah | bergelombang | tetes keringat | — |
| `anxious-happy` | cemas → hilang | bergelombang → senyum | keringat → hilang | `MascotResult`; ditukar lewat `.mres-anxious` / `.mres-happy` |

### Varian
| Komponen | Pose | Cerita |
|---|---|---|
| `Mascot` | Membaca buku terbuka | Hero: "sedang belajar" |
| `MascotResult` | Memegang kertas "HASIL UKAI" | Bukti kelulusan: "membuka pengumuman, lalu lulus" |
| `MascotFace` | Kepala saja (ikon) | Visual "x dari 10"; di 404 `mood="anxious"` menggantikan angka 0, bernapas & celingukan |
| `MascotGraduate` | Toga + gulungan ijazah | Halaman `/alumni` & CTA penutup: "sudah wisuda" / "giliranmu" |

Alur cerita maskot mengikuti alur halaman: **belajar (hero) → lulus (bukti kelulusan) → wisuda (alumni)**. Pose baru untuk section berikutnya sebaiknya melanjutkan cerita ini.

## Daftar animasi

### Maskot hero (`mascot-*`, berjalan terus)
| Kelas | Gerak | Durasi |
|---|---|---|
| `mascot-body` | naik-turun (bernapas), 14px | 4s |
| `mascot-hand` | sama, jeda 0.4s | 4s |
| `mascot-head` | miring -4° sesekali | 8s |
| `mascot-eyes` | berkedip | 5s |
| `mascot-pupils` | membaca kiri-kanan lalu melihat ke atas | 8s |
| `mascot-page` | halaman dibalik kanan → kiri (poros punggung buku) | 8s (di 60–74%) |
| `mascot-tassel` | tali topi toga berayun 12° (`MascotGraduate`) | 3s |
| `mascot-float` | kapsul/tablet melayang 28px | 6s, jeda bergiliran |

### Bukti kelulusan (`pr-*`, `mres-*`, sekali per `.is-visible`)
| Waktu | Kejadian | Kelas |
|---|---|---|
| 0 – 1.8s | Maskot cemas & tegang (membesar 8%) | `mres-head`, `mres-anxious` |
| 0.3s + 0.15s × i | Kepala mini menyala kuning satu per satu sambil melompat | `pr-lit` |
| 1.8s | Stempel LULUS dicap di kertas, wajah berganti senyum | `mres-stamp`, `mres-happy` |
| 1.9s + 0.15s × i | Stempel per periode dicap | `pr-stamp` |
| 2.1s | Maskot melompat dua kali, konfeti kapsul meledak | `mres-body`, `mres-confetti` |
| 2.1s → seterusnya | Konfeti terus berhamburan bergiliran, maskot bernapas | `mres-confetti` (infinite), `mascot-bob` |

### Wall of Alumni (`al-*`)
| Waktu | Kejadian | Kelas |
|---|---|---|
| 0.5s | Stempel LULUS + skor akhir dicap di kartu (keyframe `pr-stamp`) | `al-stamp` |
| terus | Carousel `Marquee` (lihat Pemicu & utilitas) | `marquee` |

### Alur belajar (`st-*`, sekali per `.is-visible`)
| Waktu | Kejadian | Kelas |
|---|---|---|
| 0 – 1.6s | Garis jalur terisi merah (horizontal mulai `md`, vertikal di mobile) | `st-fill-x`, `st-fill-y` |
| 0.45s × i | Titik langkah menyala (abu → kuning/merah) sambil membesar | `st-dot` |
| 1.9s | Langkah terakhir dicap LULUS | `pr-stamp` |

### Sebaran kelas (`net-*`)
| Kelas | Gerak | Kapan |
|---|---|---|
| `net-glow` | glow kota membesar dari 0, berurutan dari kota terbesar (0.08s × peringkat) | per `.is-visible` |
| `net-pulse` | cincin kuning mengembang 4× lalu hilang, 5 kota teratas | terus, 2.4s |

### Footer wordmark (`foot-*`)
| Kelas | Gerak | Kapan |
|---|---|---|
| `foot-mark` | posisi cahaya (`--hx`/`--hy`, didaftarkan dengan `@property` agar bisa dianimasikan) bergeser kiri ↔ kanan | terus, 9s bolak-balik |
| `.is-tracking` | animasi berhenti, cahaya mengikuti kursor (JS mengisi `--hx`/`--hy` relatif ke kotak tulisan) | saat kursor di atas wordmark |
| `foot-heat-red` / `foot-heat-yellow` | salinan tulisan merah (radius besar) & kuning (radius kecil) disingkap `mask-image` radial | — |

Reduced-motion: cahaya diam di tengah.

### Modul (`mod-*`, buku 3D CSS)
| Kelas | Gerak | Kapan |
|---|---|---|
| `mod-enter` | masuk berputar dari 60° + naik 24px, 0.9s, jeda 0.15s × i | per `.is-visible` |
| `mod-sway` | buku bergoyang 8° + melayang 6px | terus, 6s |
| `mod-cover` | cover terbuka 40° mengintip halaman pertama (transition 0.6s) | hover / fokus keyboard |

Struktur: `mod-stage` (perspective) → `mod-enter` → `mod-sway` → `mod-book` (miring -34°, preserve-3d) berisi `mod-back`, `mod-pages` (sisi halaman, tebal `--t`), `mod-page1`, `mod-cover`. Transform dipisah per lapis agar animasi tidak saling menimpa.

## Catatan teknis SVG
- **`transform-box: fill-box`** hanya dipasang pada elemen beranimasi (`[class*="mascot-"]`, `[class*="mres-"]`). Elemen yang memakai atribut `transform="rotate(a cx cy)"` harus **tidak** ber-`fill-box`, karena titik putarnya akan bergeser.
- **Animasi CSS menimpa atribut `transform`.** Bila elemen perlu diputar *dan* dianimasikan, bungkus dengan `<g>`: atribut `rotate` di luar, kelas animasi di dalam (lihat stempel di `MascotResult` dan kapsul melayang di `Mascot`).
- Satu file `Mascot.jsx` hanya mengekspor komponen (aturan fast refresh), konstanta bentuk tidak diekspor.

## Menambah animasi / pose baru
1. Gambar di `Mascot.jsx` memakai `MascotHead` + bentuk logo yang ada; warna lewat token.
2. Kelas animasi baru di `index.css` dengan awalan khusus (mis. `mfoo-*`), kondisi dasar = kondisi akhir.
3. Tambahkan kelas ke blok `prefers-reduced-motion`.
4. Bila berurutan/diulang saat scroll, bungkus dengan `Reveal` dan pakai pola `.is-visible .kelas`.
5. Demokan di `/ui`, catat di `components.md` dan di dokumen ini.
