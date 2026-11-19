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
  { label: "Mentor", href: "/#mentor" },
  { label: "Modul", href: "/#modul" },
  { label: "Sebaran Kelas", href: "/#sebaran" },
  { label: "Program", href: "/#program" },
  { label: "Alumni", href: "/alumni" },
  { label: "Blog", href: "/blog" },
];

export default function SiteLayout() {
  const site = useLoaderData();
  const waLink = `https://wa.me/${site.whatsapp}`;

  return (
    <>
      {/* Lewati navigasi: muncul hanya saat difokus keyboard */}
      <a href="#konten" className="sr-only z-50 rounded-lg bg-accent px-4 py-2 font-bold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Lewati ke konten
      </a>
      <Navbar brand={site.name} links={navLinks} cta={{ label: "Masuk", href: site.loginUrl }} />
      <div id="konten" tabIndex={-1} className="outline-none">
        <Outlet />
      </div>
      <Footer
        brand={site.name}
        description={site.tagline}
        columns={[
          { title: "Layanan", wide: true, links: [...navLinks, { label: "FAQ", href: "/#faq" }, { label: "Download Aplikasi", href: "/#download" }] },
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
            ],
          },
        ]}
        socials={site.socials}
        copyright={`© ${new Date().getFullYear()} Outlook-Project. All rights reserved.`}
      />
      <WhatsAppButton waLink={waLink} />
    </>
  );
}
