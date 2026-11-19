import { useLoaderData } from "react-router";
import ClosingCta from "../sections/ClosingCta";
import DownloadApp from "../sections/DownloadApp";
import Faq from "../sections/Faq";
import Hero from "../sections/Hero";
import Mentors from "../sections/Mentors";
import Modules from "../sections/Modules";
import Network from "../sections/Network";
import Programs from "../sections/Programs";
import Steps from "../sections/Steps";
import Testimonials from "../sections/Testimonials";
import { landingJsonLd } from "../seo-jsonld";
import { seo } from "../seo";
import { getLandingContent } from "../services/landing";

// Dijalankan saat build (prerender), sehingga konten ikut tertanam di HTML.
export async function loader() {
  return getLandingContent();
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
      <Hero site={c.site} stats={c.stats} waLink={waLink} />
      <Network network={c.network} />
      <Mentors mentors={c.mentors} />
      <Modules modules={c.modules} />
      <Steps steps={c.steps} />
      <Programs programs={c.programs} sharedFeatures={c.sharedFeatures} guaranteeTerms={c.guaranteeTerms} waLink={waLink} />
      <Testimonials testimonials={c.testimonials} />
      <DownloadApp site={c.site} />
      <Faq faqs={c.faqs} waLink={waLink} />
      <ClosingCta waLink={waLink} />
    </main>
  );
}
