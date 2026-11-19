import { Outlet, useLoaderData } from "react-router";
import { Footer, Navbar } from "../components/ui";
import WhatsAppButton from "../sections/WhatsAppButton";
import { getSiteInfo } from "../services/landing";

// Kerangka semua halaman publik: Navbar + konten + Footer + tombol WA.
export async function loader() {
  return getSiteInfo();
}

// Pakai "/#..." agar anchor tetap berfungsi dari halaman selain beranda.
const navLinks = [
  { label: "Capaian", href: "/#capaian" },
  { label: "Mentor", href: "/#mentor" },
  { label: "Modul", href: "/#modul" },
  { label: "Program", href: "/#program" },
  { label: "FAQ", href: "/#faq" },
];

export default function SiteLayout() {
  const site = useLoaderData();
  const waLink = `https://wa.me/${site.whatsapp}`;

  return (
    <>
      <Navbar brand={site.name} links={navLinks} cta={{ label: "Masuk", href: site.loginUrl }} />
      <Outlet />
      <Footer
        brand={site.name}
        description={site.tagline}
        columns={[
          { title: "Layanan", links: navLinks.slice(0, 4) },
          {
            title: "Bantuan",
            links: [
              { label: "Kebijakan Privasi", href: "/privacy-policy-id" },
              { label: "Hapus Akun", href: "/data-deletion-request-id" },
            ],
          },
          {
            title: "Hubungi Kami",
            links: [
              { label: site.phoneLabel, href: waLink },
              { label: site.email, href: `mailto:${site.email}` },
              { label: "Instagram", href: site.instagram },
            ],
          },
        ]}
        copyright={`© ${new Date().getFullYear()} Outlook-Project. All rights reserved.`}
      />
      <WhatsAppButton waLink={waLink} />
    </>
  );
}
