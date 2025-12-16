"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { brands } from "@/data/brands";

interface BrandMarqueeProps {
  fadeColor?: string;
}

export function BrandMarquee({ fadeColor = "from-neutral-950/80" }: BrandMarqueeProps) {
  const duplicatedBrands = [...brands, ...brands];

  return (
    <div className="relative overflow-clip">
      <div className={`absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r ${fadeColor} to-transparent z-10`} />
      <div className={`absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l ${fadeColor} to-transparent z-10`} />

      <motion.div
        className="flex items-center gap-0"
        animate={{
          x: [0, -180 * brands.length],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {duplicatedBrands.map((brand, index) => (
          <Link
            key={`${brand.id}-${index}`}
            href={`/fleet/brand/${brand.id}`}
            className="flex-none flex items-center justify-center w-40 h-20 opacity-60 hover:opacity-100 transition-opacity duration-300"
          >
            <Image
              src={brand.logo}
              alt={brand.name}
              width={160}
              height={80}
              className={`object-contain max-h-14 w-auto ${brand.invert ? "invert" : ""}`}
            />
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
