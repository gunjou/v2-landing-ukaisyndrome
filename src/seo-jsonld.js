import { SITE_NAME, SITE_URL } from "./seo";

// Data terstruktur schema.org untuk halaman beranda.
export function landingJsonLd(c) {
  const org = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon-512.png`,
    description: c.site.tagline,
    email: c.site.email,
    telephone: `+${c.site.whatsapp}`,
    sameAs: [c.site.instagram, c.site.playStore, c.site.appStore],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "id-ID",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  const courses = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Program bimbingan UKAI",
    itemListElement: c.programs.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        name: `Program ${p.name} — Bimbingan UKAI`,
        description: `Bimbingan persiapan UKAI CBT & OSCE, ${p.sessions}x pertemuan (intensif ${p.intensive}, online ${p.online}).`,
        provider: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "id",
        offers: { "@type": "Offer", category: "Paid", price: p.price, priceCurrency: "IDR", url: `${SITE_URL}/#program` },
        hasCourseInstance: { "@type": "CourseInstance", courseMode: "Blended", courseWorkload: `P${p.sessions}D` },
      },
    })),
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return [org, website, courses, faq];
}
