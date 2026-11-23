import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Key, MessageCircle, ShieldCheck, Tag } from "lucide-react";
import { FaWhatsapp } from "@react-icons/all-files/fa/FaWhatsapp";
import { MonogramDraw, PillLink, Reveal } from "@/components/brand";
import { BookButton } from "@/components/booking";
import { waHref } from "@/lib/contact";
import { aed } from "@/lib/pricing";
import type { Car } from "@/types";
import type { SiteSettings } from "@/data/settings";

/* ------------------------------------------------------------------ */
/* Studio stills: the approved studio set, real plates seated (ad batch 7 to 9 Nov). */
export const STUDIO_STILLS: Record<string, string> = {
  "lamborghini-urus-s-2024": "/collection/lamborghini-urus-s-2024.jpg",
  "mercedes-g63-2025-sand": "/collection/mercedes-g63-2025-sand.jpg",
  "cadillac-escalade-2025": "/collection/cadillac-escalade-2025.jpg",
  "land-rover-range-rover-vogue-2023": "/collection/land-rover-range-rover-vogue-2023.jpg",
  "mercedes-g63-amg-black": "/collection/mercedes-g63-amg-black.jpg",
  "mercedes-g63-amg-blue": "/collection/mercedes-g63-amg-blue.jpg",
  "gmc-yukon-at4-2025": "/collection/gmc-yukon-at4-2025.jpg",
  "bmw-x6-black": "/collection/bmw-x6-black.jpg",
};

function SectionHead({ eyebrow, title, sub, align = "left" }: { eyebrow: string; title: React.ReactNode; sub?: string; align?: "left" | "center" }) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="eyebrow mb-6">{eyebrow}</p>
      <h2 className="font-display text-4xl font-extrabold leading-[1] tracking-[-0.03em] text-foreground sm:text-6xl">{title}</h2>
      {sub && <p className="mt-6 text-lg leading-relaxed text-foreground-muted">{sub}</p>}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/** Brand names in the fleet, drifting. Only brands they actually rent. */
export function MarqueeStrip() {
  const names = ["Mercedes-AMG", "Lamborghini", "Cadillac", "Range Rover", "GMC", "BMW"];
  const row = [...names, ...names];
  return (
    <div className="relative overflow-clip border-y border-white/[0.06] bg-black py-7" aria-hidden>
      <div className="flex w-max animate-[scroll_40s_linear_infinite] gap-16 pr-16">
        {[...row, ...row].map((n, i) => (
          <span key={i} className="whitespace-nowrap font-display text-xl font-semibold uppercase tracking-[0.3em] text-white/25">{n}</span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/** The collection: studio portraits in a horizontal snap row, each opening its car page. */
export function CollectionShowcase({ cars }: { cars: Car[] }) {
  const items = cars
    .filter((c) => STUDIO_STILLS[c.slug])
    .sort((a, b) => b.pricing.daily - a.pricing.daily);
  if (!items.length) return null;
  return (
    <section id="collection" className="relative scroll-mt-24 overflow-clip py-28 sm:py-40">
      <Image src="/brand/studio-empty.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover opacity-30" />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-background via-background/60 to-background" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHead
            eyebrow="The collection"
            title={<>Every car,<span className="text-foreground-muted"> as it really is.</span></>}
            sub="Photographed in the studio with its own plate, priced on the page. Choose one and send us your dates."
          />
          <Reveal delay={150}>
            <PillLink href="/cars" tone="ghost">View every car</PillLink>
          </Reveal>
        </div>
      </div>

      <div className="snap-row mt-16 flex gap-5 overflow-x-auto px-4 pb-6 sm:px-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
        {items.map((car, i) => (
          <Reveal key={car.slug} delay={i * 80} className="w-[72vw] shrink-0 sm:w-[340px]">
            <Link href={`/cars/${car.slug}`} className="group block">
              <div className="bezel">
                <div className="bezel-core relative aspect-[9/14] bg-neutral-900">
                  <Image
                    src={STUDIO_STILLS[car.slug]}
                    alt={`${car.name} in the Dream Drives studio`}
                    fill
                    sizes="(min-width: 640px) 340px, 72vw"
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/40 to-transparent p-5 pt-20">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/50">{car.brandName}</p>
                    <div className="mt-1 flex items-end justify-between gap-3">
                      <p className="font-display text-lg font-bold leading-tight text-white">{car.variant ?? car.name}</p>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden>
                        <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-white/70">{aed(car.pricing.daily)} a day</p>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/** Brand moment: the monogram draws itself on black leather. */
export function SignatureSection() {
  return (
    <section className="relative isolate overflow-clip bg-black py-32 sm:py-44">
      <Image src="/brand/leather-navy.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-60" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_70%_at_50%_50%,transparent,oklch(0_0_0/0.85))]" />
      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 text-center">
        <MonogramDraw className="w-40 text-white sm:w-56" />
        <Reveal delay={300} className="mt-14">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.45em] text-white/50">Dream Drives · Rent A Car</p>
          <p className="mx-auto mt-8 max-w-3xl font-display text-3xl font-bold leading-[1.15] tracking-[-0.02em] text-white sm:text-5xl">
            Every car photographed as it is. Every price on the page. Every key brought to your door.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/** "The Dream Drives standard": asymmetric bento of the promises we can stand behind. */
export function StandardBento({ settings }: { settings: SiteSettings }) {
  const deposit = settings.depositRefundDays
    ? `Refundable, back within ${settings.depositRefundDays} days of return.`
    : "Shown on every car page before you message us. Refunded after the car comes back.";
  return (
    <section className="py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead eyebrow="The Dream Drives standard" title={<>No surprises.<span className="text-foreground-muted"> Just the car.</span></>} />
        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-12 md:grid-rows-2">
          <Reveal className="md:col-span-7 md:row-span-2">
            <div className="bezel h-full">
              <div className="bezel-core relative flex h-full min-h-[420px] flex-col justify-end p-8 sm:p-10">
                <Image src="/collection/mercedes-g63-2025-sand.jpg" alt="Mercedes-AMG G63 Sand in the studio" fill sizes="(min-width: 768px) 58vw, 100vw" className="object-cover object-[50%_65%]" />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
                <div className="relative">
                  <Key className="mb-5 h-7 w-7 text-white" strokeWidth={1} aria-hidden />
                  <h3 className="font-display text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">{settings.freeDelivery ?? "Delivered to you"}</h3>
                  <p className="mt-3 max-w-md text-white/70">Hotel, home or the airport. We bring the car with a full handover and collect it when you are done.</p>
                </div>
              </div>
            </div>
          </Reveal>
          {[
            { icon: Tag, title: "The real price, on every car", body: "Daily, weekly and monthly rates on each car page. Never price on request." },
            { icon: ShieldCheck, title: "Deposit shown upfront", body: deposit },
          ].map((b, i) => (
            <Reveal key={b.title} delay={(i + 1) * 120} className="md:col-span-5">
              <div className="bezel h-full">
                <div className="bezel-core flex h-full flex-col justify-between gap-10 p-8">
                  <b.icon className="h-6 w-6 text-primary-400" strokeWidth={1} aria-hidden />
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-[-0.01em] text-foreground">{b.title}</h3>
                    <p className="mt-2 text-foreground-muted">{b.body}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200} className="mt-5">
          <div className="bezel">
            <div className="bezel-core flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
              <div className="flex items-start gap-5">
                <MessageCircle className="mt-1 h-6 w-6 shrink-0 text-primary-400" strokeWidth={1} aria-hidden />
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">Booked in one message</h3>
                  <p className="mt-1 text-foreground-muted">{settings.replyPromise ?? "Send the car and your dates. We confirm availability and the final price on WhatsApp."}</p>
                </div>
              </div>
              <BookButton src="bento">Book your car</BookButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/** Closing call to action over Dubai at blue hour. */
export function ClosingCTA() {
  return (
    <section className="relative isolate overflow-clip py-36 sm:py-52">
      <Image src="/brand/dubai-bluehour.jpg" alt="Dubai skyline at blue hour" fill sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-background via-black/30 to-black/80" />
      <div className="mx-auto max-w-4xl px-4 text-center">
        <Reveal>
          <p className="eyebrow mb-8">Ready when you are</p>
          <h2 className="font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.03em] text-white sm:text-7xl">Tell us when.<span className="block text-white/55">We bring the car.</span></h2>
        </Reveal>
        <Reveal delay={200} className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <BookButton src="closing">Book your car</BookButton>
          <div data-src="cta_section">
            <PillLink href={waHref({ src: "cta_section" })} external tone="ghost" className="text-white" icon={<FaWhatsapp className="h-[18px] w-[18px]" />}>
              WhatsApp us
            </PillLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
