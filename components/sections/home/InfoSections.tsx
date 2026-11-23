import Link from "next/link";
import { Car as CarIcon, MapPin, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { Heading, Section, Text } from "@/components/ui";
import { Reveal } from "@/components/brand";
import type { SiteSettings } from "@/data/settings";

/** "The price you see is the price you pay": only facts Site settings holds. */
export function PricePromise({ settings }: { settings: SiteSettings }) {
  const items = [
    { icon: CarIcon, title: "Real price on every car", body: "Daily, weekly and monthly rates on each car page. No \"price on request\"." },
    settings.freeDelivery && { icon: Truck, title: settings.freeDelivery, body: "Hotel, home or the airport. We bring the car and collect it." },
    { icon: ShieldCheck, title: "Deposit shown upfront", body: settings.depositRefundDays
        ? `Refundable, and back within ${settings.depositRefundDays} days of return.`
        : "Every car page shows its refundable deposit before you message us." },
    { icon: MessageCircle, title: "Book in one message", body: settings.replyPromise ?? "Send the car and your dates on WhatsApp. We confirm the final price there." },
  ].filter(Boolean) as { icon: typeof CarIcon; title: string; body: string }[];
  return (
    <Section spacing="md" className="border-y border-border bg-background-elevated">
      <Heading as="h2" size="md" className="mb-8 text-center">The price you see is the price you pay</Heading>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, body }) => (
          <div key={title}>
            <Icon className="mb-3 h-6 w-6 text-primary-500" aria-hidden />
            <Text weight="semibold" className="mb-1">{title}</Text>
            <Text size="sm" color="muted">{body}</Text>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function HowItWorks() {
  const steps = [
    { n: "1", title: "Pick a car", body: "Every car shows its real price and photos of that exact car." },
    { n: "2", title: "WhatsApp your dates", body: "One message with the car and dates. We confirm availability and the final price." },
    { n: "3", title: "We deliver it", body: "To your hotel, home or the airport, anywhere in Dubai, free." },
  ];
  return (
    <section className="py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow mb-6">How it works</p>
          <h2 className="font-display text-4xl font-extrabold leading-[1] tracking-[-0.03em] sm:text-6xl">Three steps.<span className="text-foreground-muted"> One message.</span></h2>
        </Reveal>
        <ol className="mt-16 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 120}>
              <div className="bezel h-full">
                <div className="bezel-core flex h-full flex-col gap-12 p-8">
                  <span className="font-display text-6xl font-extrabold leading-none text-white/10">{s.n}</span>
                  <div>
                    <p className="font-display text-xl font-bold">{s.title}</p>
                    <p className="mt-2 text-foreground-muted">{s.body}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function DeliveryAreas({ areas }: { areas?: string[] }) {
  if (!areas?.length) return null;
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow mb-6">Delivery</p>
          <h2 className="font-display text-4xl font-extrabold leading-[1] tracking-[-0.03em] sm:text-5xl">Anywhere in Dubai.<span className="block text-foreground-muted">Free.</span></h2>
          <p className="mt-5 text-lg text-foreground-muted">We bring the car to you and collect it at the end. These are the places we deliver to most.</p>
        </Reveal>
        <Reveal delay={150} className="lg:col-span-7">
          <ul className="flex flex-wrap gap-2.5">
            {areas.map((a) => (
              <li key={a} className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] px-5 py-2.5 text-sm ring-1 ring-inset ring-white/10">
                <MapPin className="h-4 w-4 text-primary-400" strokeWidth={1.25} aria-hidden />
                {a}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function DocumentsSection({ settings }: { settings: SiteSettings }) {
  if (!settings.documents?.length) return null;
  return (
    <section className="py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal>
        <p className="eyebrow mb-6">Documents</p>
        <h2 className="mb-5 font-display text-4xl font-extrabold leading-[1] tracking-[-0.03em] sm:text-5xl">What you need to rent</h2>
      </Reveal>
      <Text color="muted" className="mb-10 max-w-2xl">
        Bring the original documents to the handover.
        {settings.minimumAge ? ` Minimum driver age is ${settings.minimumAge}.` : ""}
      </Text>
      <div className="grid gap-4 md:grid-cols-2">
        {settings.documents.map((d) => (
          <Reveal key={d._key} className="bezel">
            <div className="bezel-core h-full p-6">
              <p className="mb-3 font-display font-bold">{d.who}</p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-foreground-muted">
                {d.needs.map((n) => <li key={n}>{n}</li>)}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
      <Text size="sm" color="muted" className="mt-6">
        Not sure about your licence? <Link href="/faq" className="text-primary-500 underline-offset-4 hover:underline">Read the FAQ</Link> or ask us on WhatsApp.
      </Text>
      </div>
    </section>
  );
}
