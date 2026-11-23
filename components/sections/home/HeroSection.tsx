import { getImageProps } from "next/image";
import { Star } from "lucide-react";
import { PillLink } from "@/components/brand";
import { BookButton } from "@/components/booking";
import { aed } from "@/lib/pricing";
import type { Car } from "@/types";

interface HeroSectionProps {
  /** The car in the photo; its real price is shown under it. */
  car?: Car;
  rating?: string | null;
}

/**
 * Art-directed hero (23 Nov 2026). The old banner stretched a 759px portrait still across the full width, so it looked
 * smeared. Now two purpose-drawn 4K studio frames of Basil's red Urus Performante, real plate R 50555
 * (Clients/DreamDrives/assets/generated/website-hero-2026-11-23): a wide one with the car on the right and dark wall on
 * the left for the words, and a tall one for phones with the car mid-frame and the words over the floor.
 * Server rendered, the image is the LCP element and preloads; motion is CSS only.
 */
const ALT = "Red Lamborghini Urus Performante available to rent in Dubai from Dream Drives";

export function HeroSection({ car, rating }: HeroSectionProps) {
  const common = { alt: ALT, priority: true, quality: 80 } as const;
  const {
    props: { srcSet: wide },
  } = getImageProps({ ...common, src: "/hero/urus-performante-wide.jpg", width: 3840, height: 2143, sizes: "100vw" });
  const {
    props: { srcSet: tall, ...img },
  } = getImageProps({ ...common, src: "/hero/urus-performante-tall.jpg", width: 1440, height: 2560, sizes: "100vw" });

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-clip bg-black text-white md:justify-center">
      <picture className="absolute inset-x-0 top-0 -z-10 h-[66svh] md:inset-0 md:h-auto">
        <source media="(min-width: 768px)" srcSet={wide} sizes="100vw" />
        <source media="(max-width: 767px)" srcSet={tall} sizes="100vw" />
        <img
          {...img}
          alt={ALT}
          fetchPriority="high"
          className="hero-in h-full w-full object-cover object-[50%_88%] md:object-[62%_60%]"
        />
      </picture>

      {/* Phones: the photo is a block in the top two thirds with the car whole; it fades into black where the words start. */}
      <div className="absolute inset-x-0 top-[38svh] -z-10 h-[28svh] bg-linear-to-t from-black via-black/60 to-transparent md:hidden" />
      {/* Desktop: the wall on the left falls into shadow for the words; a soft floor fade grounds the car. */}
      <div className="absolute inset-0 -z-10 hidden bg-linear-to-r from-black/85 via-black/45 via-40% to-transparent to-70% md:block" />
      <div className="absolute inset-x-0 bottom-0 -z-10 hidden h-1/3 bg-linear-to-t from-black/80 to-transparent md:block" />
      <div className="absolute inset-x-0 top-0 -z-10 h-32 bg-linear-to-b from-black/60 to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-4 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-28 sm:px-6 md:pb-24 md:pt-32 lg:px-8">
        <div className="max-w-[34rem] lg:max-w-[38rem]">
          <p className="eyebrow rise mb-7 max-md:hidden! border-white/15! bg-white/5! text-white/80!" style={{ animationDelay: "0.1s" }}>
            Luxury car rental · Dubai
          </p>
          <h1
            className="rise text-balance font-display text-[2.35rem] font-extrabold leading-[0.98] tracking-[-0.035em] min-[380px]:text-[2.6rem] sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.2s" }}
          >
            Luxury car rental in Dubai,
            <span className="text-white/55"> delivered to your door.</span>
          </h1>
          <p
            className="rise mt-5 max-w-md text-[0.98rem] leading-relaxed text-white/75 md:mt-7 md:text-lg"
            style={{ animationDelay: "0.35s" }}
          >
            G63, Urus, Escalade and Range Rover.<span className="hidden sm:inline"> The real price on every car, free delivery
            anywhere in Dubai, booked in one message.</span><span className="sm:hidden"> Real prices, free delivery, booked in one message.</span>
          </p>

          <div
            className="rise mt-6 flex flex-col gap-3 sm:flex-row md:mt-10"
            style={{ animationDelay: "0.5s" }}
            data-src="hero"
          >
            <BookButton src="hero" className="w-full justify-between sm:w-auto">
              Book your car
            </BookButton>
            {/* Phones already have Book, WhatsApp and Call in the sticky bar, so the second button is desktop only. */}
            <span className="hidden sm:contents">
              <PillLink href="#collection" tone="ghost" className="text-white">
                See the cars
              </PillLink>
            </span>
          </div>
        </div>

        <div
          className="rise mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/10 pt-4 text-[0.8rem] text-white/60 md:mt-16 md:pt-6 md:text-sm"
          style={{ animationDelay: "0.7s" }}
        >
          {rating ? (
            <span className="inline-flex items-center gap-2">
              <Star className="h-3.5 w-3.5 fill-white text-white" strokeWidth={1} aria-hidden />
              {rating}
            </span>
          ) : (
            <span />
          )}
          {car && (
            <a href={`/cars/${car.slug}`} className="transition-colors duration-500 hover:text-white">
              In the photo · {car.name} · {aed(car.pricing.daily)} a day
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
