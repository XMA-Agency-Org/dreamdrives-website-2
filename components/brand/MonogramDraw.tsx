"use client";

import { cn } from "@/lib/utils";
import { MONOGRAM_PATHS, MONOGRAM_VIEWBOX } from "./monogram-paths";
import { useInView } from "./useInView";

/**
 * The Dream Drives D: each stroke traces itself, then the mark fills in. Starts when scrolled into view.
 * currentColor drives both stroke and fill, so it follows the theme.
 */
export function MonogramDraw({ className, title = "Dream Drives" }: { className?: string; title?: string }) {
  const { ref, inView } = useInView<SVGSVGElement>(0.4);
  return (
    <svg ref={ref} viewBox={MONOGRAM_VIEWBOX} role="img" aria-label={title} className={cn("monogram", inView && "is-in", className)}>
      {MONOGRAM_PATHS.map((d, i) => (
        <path key={i} d={d} pathLength={1} fill="currentColor" stroke="currentColor" strokeWidth={1.5} vectorEffect="non-scaling-stroke" fillRule="evenodd" clipRule="evenodd" />
      ))}
    </svg>
  );
}
