import Image from "next/image";
import { Star } from "lucide-react";
import { FaWhatsapp } from "@react-icons/all-files/fa/FaWhatsapp";
import { PillLink } from "@/components/brand";
import { waHref } from "@/lib/contact";
import { aed } from "@/lib/pricing";
import type { Car } from "@/types";

interface HeroSectionProps {
  /** The car in the photo; its real price is shown on it. */
  car?: Car;
  rating?: string | null;
}

/**
 * Server-rendered for LCP. Real car, real price, WhatsApp first. Motion is CSS only (push-in photo,
 * staggered rise) so nothing waits on JavaScript.
 */
export function HeroSection({ car, rating }: HeroSectionProps) {
  const photo = car?.images[0];
  return (
    <section className="relative isolate flex min-h-[100dvh] items-end overflow-clip bg-black">
      {photo && (
        <Image
          src={photo.src}
          alt={`${car!.name} available to rent in Dubai`}
          fill
          priority
          sizes="100vw"
          className="kenburns -z-10 object-cover object-[60%_center]"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_70%_40%,transparent_0%,oklch(0_0_0/0.35)_55%,oklch(0_0_0/0.9)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-linear-to-t from-black via-black/70 to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-40 sm:px-6 sm:pb-28 lg:px-8">
        <div className="max-w-4xl">
          <p className="eyebrow rise mb-7" style={{ animationDelay: "0.1s" }}>Luxury car rental · Dubai</p>
          <h1 className="rise font-display text-[2.6rem] font-extrabold leading-[0.95] tracking-[-0.03em] text-white sm:text-7xl lg:text-[6.25rem]" style={{ animationDelay: "0.2s" }}>
            Luxury car rental in Dubai,
            <span className="block text-white/55">delivered to your door.</span>
          </h1>
          <p className="rise mt-8 max-w-xl text-lg leading-relaxed text-white/75" style={{ animationDelay: "0.35s" }}>
            Mercedes-AMG G63, Lamborghini Urus, Cadillac Escalade and Range Rover. The real price on every car, delivered free
            anywhere in Dubai, booked in one message.
          </p>

          <div className="rise mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "0.5s" }} data-src="hero">
            <PillLink href={waHref({ src: "hero" })} external tone="whatsapp" icon={<FaWhatsapp className="h-[18px] w-[18px]" />}>
              WhatsApp us
            </PillLink>
            <PillLink href="#collection" tone="ghost" className="text-white">
              Explore the collection
            </PillLink>
          </div>
        </div>

        <div className="rise mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-6 text-sm text-white/60" style={{ animationDelay: "0.7s" }}>
          {rating ? (
            <span className="inline-flex items-center gap-2">
              <Star className="h-4 w-4 fill-white text-white" strokeWidth={1} aria-hidden />
              {rating}
            </span>
          ) : <span />}
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
