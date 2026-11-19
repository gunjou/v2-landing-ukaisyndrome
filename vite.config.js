import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  // .env memakai nama lama (NEXT_PUBLIC_*). Nilainya publik: ikut terbaca di browser.
  envPrefix: ["VITE_", "NEXT_PUBLIC_"],
  plugins: [tailwindcss(), reactRouter()],
});
