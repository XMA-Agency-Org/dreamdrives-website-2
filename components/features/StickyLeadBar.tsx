import { Phone } from "lucide-react";
import { FaWhatsapp } from "@react-icons/all-files/fa/FaWhatsapp";
import { telHref, waHref } from "@/lib/contact";

/**
 * Mobile only (it tested worse on desktop): WhatsApp as the main action, Call second, in the thumb zone.
 * Pages can pass the car so the WhatsApp message names it.
 */
export function StickyLeadBar({ car, price }: { car?: string; price?: number }) {
  return (
    <div
      data-src="sticky_bar"
      className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex gap-2">
        <a
          href={waHref({ src: "sticky_bar", car })}
          data-price={price}
          target="_blank"
          rel="nofollow noopener"
          className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-md bg-[oklch(0.55_0.17_142)] text-white font-semibold"
        >
          <FaWhatsapp className="w-5 h-5" aria-hidden />
          WhatsApp us
        </a>
        <a
          href={telHref}
          className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-md border border-border text-foreground font-semibold"
        >
          <Phone className="w-5 h-5" aria-hidden />
          Call
        </a>
      </div>
    </div>
  );
}
