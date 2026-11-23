import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "light" | "brand" | "ghost";
const TONE: Record<Tone, { btn: string; icon: string }> = {
  light: { btn: "bg-white text-neutral-950 hover:bg-neutral-200", icon: "bg-neutral-950/8" },
  brand: { btn: "bg-primary-500 text-white hover:bg-primary-600 shadow-[0_10px_40px_-12px_oklch(0.55_0.16_250/0.8)]", icon: "bg-white/15" },
  ghost: { btn: "text-foreground ring-1 ring-inset ring-white/15 hover:bg-white/5", icon: "bg-white/8" },
};

/**
 * Opens the booking form (components/booking/BookingDialog.tsx) via data-book. Server-safe: no client code here.
 * Pass the car slug to pre-select it, and dates if known.
 */
export function BookButton({
  children = "Book your car", car, from, to, src, tone = "light", className, compact,
}: { children?: React.ReactNode; car?: string; from?: string; to?: string; src?: string; tone?: Tone; className?: string; compact?: boolean }) {
  return (
    <button
      type="button"
      data-book=""
      data-car={car}
      data-from={from}
      data-to={to}
      data-src={src}
      className={cn("pill-cta group", compact && "py-1.5 pl-4 pr-1.5 text-sm", TONE[tone].btn, className)}
    >
      <span className="whitespace-nowrap">{children}</span>
      <span className={cn("pill-icon", compact && "h-8 w-8", TONE[tone].icon)} aria-hidden>
        <ArrowUpRight className="h-[18px] w-[18px]" strokeWidth={1.5} />
      </span>
    </button>
  );
}
