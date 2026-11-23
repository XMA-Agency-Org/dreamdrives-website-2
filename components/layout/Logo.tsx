import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The client's own D monogram with the wordmark re-set as DREAM DRIVES / RENT A CAR.
 * Their old logo file reads "RENT & CAR L.L.C", which is wrong (Amir confirmed RENT A CAR, 12 Sep 2026;
 * Clients/DreamDrives/brand/BRAND.md). Text is HTML so it uses the site font and stays crisp.
 */
export function Logo({ className, size = "md" }: { className?: string; size?: "sm" | "md" }) {
  const mark = size === "sm" ? "h-7" : "h-8 md:h-10";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image src="/mark-light.svg" alt="" width={301} height={311} className={cn(mark, "w-auto show-on-dark")} priority />
      <Image src="/mark-dark.svg" alt="" width={301} height={311} className={cn(mark, "w-auto show-on-light")} priority />
      <span className="flex flex-col leading-none">
        <span className="font-display text-sm md:text-base font-extrabold tracking-[0.08em] text-foreground">DREAM DRIVES</span>
        <span className="font-display text-[0.6rem] md:text-[0.65rem] font-semibold tracking-[0.28em] text-foreground-muted">RENT A CAR</span>
      </span>
      <span className="sr-only">Dream Drives Rent A Car, home</span>
    </span>
  );
}
