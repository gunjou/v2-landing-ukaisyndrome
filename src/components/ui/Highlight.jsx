import { cn } from "./cn";

// Kata yang ditekankan di judul. Terang: stabilo kuning. Di area merah: teks kuning.
export default function Highlight({ className, children }) {
  return <span className={cn("highlight", className)}>{children}</span>;
}
