import { MessageCircle } from "lucide-react";

export default function WhatsAppButton({ waLink }) {
  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener"
      aria-label="Chat admin via WhatsApp"
      className="fixed right-5 bottom-5 z-40 grid size-14 place-items-center rounded-full bg-success text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
