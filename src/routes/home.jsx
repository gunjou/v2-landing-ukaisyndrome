import { useLoaderData } from "react-router";
import AlumniWall from "../sections/AlumniWall";
import BlogPreview from "../sections/BlogPreview";
import ClosingCta from "../sections/ClosingCta";
import DownloadApp from "../sections/DownloadApp";
import Faq from "../sections/Faq";
import Hero from "../sections/Hero";
import Mentors from "../sections/Mentors";
import Modules from "../sections/Modules";
import Network from "../sections/Network";
import PassRate from "../sections/PassRate";
import Programs from "../sections/Programs";
import Steps from "../sections/Steps";
import { landingJsonLd } from "../seo-jsonld";
import { seo } from "../seo";
import { getLandingContent } from "../services/landing";
import { getPosts } from "../services/blog";

// Dijalankan saat build (prerender), sehingga konten ikut tertanam di HTML.
export async function loader() {
  const [content, { posts }] = await Promise.all([getLandingContent(), getPosts()]);
  return { ...content, posts: posts.slice(0, 3) }; // 3 artikel terbaru
}

export function meta({ data }) {
  return seo({
    title: "Syndrome UKAI — Bimbingan UKAI untuk Apoteker Masa Depan",
    description:
      "Bimbingan persiapan UKAI CBT & OSCE dengan jaringan mentor terluas se-Indonesia, modul terupdate, tryout CBT, dan garansi lulus.",
    path: "/",
    jsonLd: landingJsonLd(data),
  });
}

export default function Home() {
  const c = useLoaderData();
  const waLink = `https://wa.me/${c.site.whatsapp}`;

  return (
    <main>
      {/* Alur cerita: janji → bukti (angka, manusia) → siapa & apa (mentor, modul, sebaran kelas) → cara mulai (alur) → penawaran → keberatan → bacaan → ajakan → aplikasi */}
      <Hero site={c.site} stats={c.stats} waLink={waLink} />
      <PassRate passRates={c.passRates} />
      <AlumniWall alumni={c.alumni} />
      <Mentors mentors={c.mentors} />
      <Modules modules={c.modules} />
      <Network network={c.network} />
      <Steps steps={c.steps} />
      <Programs programs={c.programs} sharedFeatures={c.sharedFeatures} guaranteeTerms={c.guaranteeTerms} waLink={waLink} />
      <Faq faqs={c.faqs} waLink={waLink} />
      <BlogPreview posts={c.posts} />
      <ClosingCta waLink={waLink} students={c.stats[0]} />
      <DownloadApp site={c.site} />
    </main>
  );
}
