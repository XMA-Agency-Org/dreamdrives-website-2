import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The client's own D monogram with the wordmark re-set as DREAM DRIVES / RENT A CAR.
 * Their old logo file reads "RENT & CAR L.L.C", which is wrong (Amir confirmed RENT A CAR, 12 Sep 2026;
 * Clients/DreamDrives/brand/BRAND.md). Text is HTML so it uses the site font and stays crisp.
 */
export function Logo({ className, size = "md", onDark = false }: { className?: string; size?: "sm" | "md"; onDark?: boolean }) {
  const mark = size === "sm" ? "h-7" : "h-8 md:h-10";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {/* onDark: over the hero photo the light mark shows in either theme */}
      {/* show-on-* only fade opacity, so the two marks are stacked in one grid cell (side by side they left a gap) */}
      <span className="grid shrink-0 *:col-start-1 *:row-start-1">
        <Image src="/mark-light.svg" alt="" width={301} height={311} className={cn(mark, "w-auto", !onDark && "show-on-dark")} priority />
        {!onDark && <Image src="/mark-dark.svg" alt="" width={301} height={311} className={cn(mark, "w-auto show-on-light")} priority />}
      </span>
      <span className="flex flex-col whitespace-nowrap leading-none">
        <span className={cn("font-display text-sm md:text-base font-extrabold tracking-[0.08em]", onDark ? "text-white" : "text-foreground")}>DREAM DRIVES</span>
        <span className={cn("font-display text-[0.6rem] md:text-[0.65rem] font-semibold tracking-[0.28em]", onDark ? "text-white/60" : "text-foreground-muted")}>RENT A CAR</span>
      </span>
      <span className="sr-only">Dream Drives Rent A Car, home</span>
    </span>
  );
}
