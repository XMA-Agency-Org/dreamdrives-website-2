"use client";

import { cn } from "@/lib/utils";
import { useInView } from "./useInView";

/** Heavy fade-up with blur as the block enters the viewport. Content is in the HTML either way (SEO). */
export function Reveal({ children, className, delay = 0, as: Tag = "div" }: { children: React.ReactNode; className?: string; delay?: number; as?: "div" | "section" | "li" }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  return (
    <Tag ref={ref as never} className={cn("reveal", inView && "is-in", className)} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  );
}
