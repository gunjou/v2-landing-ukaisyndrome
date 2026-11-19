import { index, layout, route } from "@react-router/dev/routes";

// Path legal sama dengan situs lama (tertaut di Play Store / App Store). Jangan diubah.
export const legalPaths = ["privacy-policy-id", "privacy-policy", "data-deletion-request-id", "data-deletion-request"];

export default [
  layout("routes/site-layout.jsx", [
    index("routes/home.jsx"),
    ...legalPaths.map((p) => route(p, "routes/legal.jsx", { id: `legal-${p}` })),
  ]),
  // 404 di luar layout: path tak dikenal tidak di-prerender, jadi tidak boleh bergantung pada loader layout.
  route("*", "routes/not-found.jsx"),
  // Galeri komponen, hanya ada saat development (tidak ikut build produksi).
  ...(import.meta.env.DEV ? [route("ui", "routes/ui.jsx")] : []),
];
