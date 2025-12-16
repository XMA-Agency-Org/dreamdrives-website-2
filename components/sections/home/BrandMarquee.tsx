"use client";

import Image from "next/image";
import Link from "next/link";
import { brands } from "@/data/brands";
import { ScrollVelocityRow } from "@/components/ui/ScrollVelocity";

interface BrandMarqueeProps {
  fadeColor?: string;
}

export function BrandMarquee({ fadeColor = "from-neutral-950/80" }: BrandMarqueeProps) {
  return (
    <div className="relative">
      <div className={`absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r ${fadeColor} to-transparent z-10`} />
      <div className={`absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l ${fadeColor} to-transparent z-10`} />

      <ScrollVelocityRow baseVelocity={3} className="py-4">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            href={`/cars/brand/${brand.id}`}
            className="flex-none flex items-center justify-center w-28 md:w-36 px-2 md:px-4 opacity-60 hover:opacity-100 transition-opacity duration-300"
          >
            <Image
              src={brand.logo}
              alt={brand.name}
              width={160}
              height={80}
              className={`object-contain max-h-12 md:max-h-14 w-auto ${brand.invert ? "invert" : ""}`}
            />
          </Link>
        ))}
      </ScrollVelocityRow>
    </div>
  );
}
