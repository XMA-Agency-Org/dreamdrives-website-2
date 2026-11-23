import { Phone, ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "@react-icons/all-files/fa/FaWhatsapp";
import { telHref, waHref } from "@/lib/contact";

/**
 * Mobile only (it tested worse on desktop): "Book your car" opens the booking form, with WhatsApp and Call
 * as one-tap alternatives, all in the thumb zone.
 */
export function StickyLeadBar({ car }: { car?: string }) {
  return (
    <div
      data-src="sticky_bar"
      className="lg:hidden fixed inset-x-0 bottom-0 z-40 bg-background/85 backdrop-blur-xl px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-1px_0_oklch(1_0_0/0.08)]"
    >
      <div className="flex gap-2">
        <button
          type="button"
          data-book=""
          data-car={car}
          data-src="sticky_bar"
          className="flex-1 inline-flex items-center justify-between gap-2 h-12 rounded-full bg-white pl-5 pr-1.5 text-neutral-950 font-semibold active:scale-[0.98] transition-transform"
        >
          Book your car
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-950/8" aria-hidden>
            <ArrowUpRight className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </span>
        </button>
        <a
          href={waHref({ src: "sticky_bar" })}
          target="_blank"
          rel="nofollow noopener"
          aria-label="WhatsApp us"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[oklch(0.55_0.17_142)] text-white"
        >
          <FaWhatsapp className="h-5 w-5" aria-hidden />
        </a>
        <a href={telHref} aria-label="Call us" className="inline-flex h-12 w-12 items-center justify-center rounded-full ring-1 ring-inset ring-white/15 text-foreground">
          <Phone className="h-5 w-5" strokeWidth={1.5} aria-hidden />
        </a>
      </div>
    </div>
  );
}
