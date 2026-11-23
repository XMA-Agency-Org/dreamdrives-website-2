import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { FaWhatsapp } from "@react-icons/all-files/fa/FaWhatsapp";
import { Container, Button, Heading, Text } from "@/components/ui";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { waHref } from "@/lib/contact";
import { aed } from "@/lib/pricing";
import type { Car } from "@/types";

interface HeroSectionProps {
  /** The car in the photo. Its real price is shown on it. */
  car?: Car;
  fleetCount: number;
  fromPrice: number;
  rating?: string | null;
}

/**
 * Server-rendered so the headline and photo are in the first HTML (LCP). One real car with its real
 * price, the fleet promise, WhatsApp first. No invented brands: the fleet is what is in Sanity.
 */
export function HeroSection({ car, fleetCount, fromPrice, rating }: HeroSectionProps) {
  const photo = car?.images[0];
  return (
    <section className="relative isolate flex min-h-[88svh] items-end overflow-clip">
      {photo && (
        <Image
          src={photo.src}
          alt={`${car!.name} available to rent in Dubai`}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/85 via-black/45 to-black/20" />

      <Container className="pb-24 pt-36 sm:pb-28">
        <div className="max-w-3xl">
          <Heading as="h1" size="hero" className="mb-5 text-white">
            Luxury car rental in Dubai, delivered to your door
          </Heading>
          <Text size="xl" className="mb-8 max-w-2xl text-neutral-200">
            {fleetCount} cars from {aed(fromPrice)} a day. The daily price is on every car, delivery anywhere in Dubai is free,
            and you book in one WhatsApp message.
          </Text>

          <div className="mb-8 flex flex-col gap-3 sm:flex-row" data-src="hero">
            <Button
              as="a"
              href={waHref({ src: "hero" })}
              target="_blank"
              rel="nofollow noopener"
              variant="whatsapp"
              size="lg"
              className="sm:min-w-[220px]"
              leftIcon={<FaWhatsapp className="h-5 w-5" />}
            >
              WhatsApp us
            </Button>
            <Link
              href="/cars"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-white/40 text-white hover:border-white/60 hover:bg-white/10 sm:min-w-[220px]")}
            >
              See all {fleetCount} cars
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
            {rating && (
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden />
                {rating}
              </span>
            )}
            {car && (
              <Link href={`/cars/${car.slug}`} className="underline-offset-4 hover:underline">
                In the photo: {car.name}, {aed(car.pricing.daily)} a day
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
