import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "light" | "whatsapp" | "ghost";

const TONE: Record<Tone, { btn: string; icon: string }> = {
  light: { btn: "bg-white text-neutral-950 hover:bg-neutral-200", icon: "bg-neutral-950/8" },
  whatsapp: { btn: "bg-[oklch(0.55_0.17_142)] text-white hover:bg-[oklch(0.5_0.17_142)] shadow-[0_10px_40px_-12px_oklch(0.55_0.17_142/0.7)]", icon: "bg-white/15" },
  ghost: { btn: "text-foreground ring-1 ring-inset ring-white/15 hover:bg-white/5", icon: "bg-white/8" },
};

/** Island button: rounded pill, trailing icon in its own circle that nudges on hover. Server-safe. */
export function PillLink({
  href, children, tone = "light", icon, external, className, ...rest
}: {
  href: string; children: React.ReactNode; tone?: Tone; icon?: React.ReactNode; external?: boolean; className?: string;
  [data: `data-${string}`]: string | number | undefined;
}) {
  const cls = cn("pill-cta group", TONE[tone].btn, className);
  const inner = (
    <>
      <span className="whitespace-nowrap">{children}</span>
      <span className={cn("pill-icon", TONE[tone].icon)} aria-hidden>
        {icon ?? <ArrowUpRight className="h-[18px] w-[18px]" strokeWidth={1.5} />}
      </span>
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="nofollow noopener" className={cls} {...rest}>{inner}</a>
  ) : (
    <Link href={href} className={cls} {...rest}>{inner}</Link>
  );
}
