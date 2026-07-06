import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

export function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={`https://wa.me/${site.whatsapp}?text=Hi%20Arnav%20Physio%2C%20I'd%20like%20to%20book%20an%20appointment.`}
        target="_blank" rel="noreferrer"
        aria-label="WhatsApp"
        className="grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-glow hover:scale-110 transition"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="grid h-11 w-11 place-items-center rounded-full gradient-teal text-white shadow-soft hover:scale-110 transition"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
