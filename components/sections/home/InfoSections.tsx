import Link from "next/link";
import { Car as CarIcon, MapPin, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { Container, Heading, Section, Text } from "@/components/ui";
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
    <Section spacing="lg">
      <Heading as="h2" size="lg" className="mb-10">How it works</Heading>
      <ol className="grid gap-8 md:grid-cols-3">
        {steps.map((s) => (
          <li key={s.n} className="border-t border-border pt-5">
            <span className="mb-3 block font-display text-3xl text-primary-500">{s.n}</span>
            <Text weight="semibold" size="lg" className="mb-1">{s.title}</Text>
            <Text color="muted">{s.body}</Text>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function DeliveryAreas({ areas }: { areas?: string[] }) {
  if (!areas?.length) return null;
  return (
    <Section spacing="md">
      <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-center">
        <div>
          <Heading as="h2" size="md" className="mb-3">Free delivery anywhere in Dubai</Heading>
          <Text color="muted">We bring the car to you and collect it at the end. These are the places we deliver to most.</Text>
        </div>
        <ul className="flex flex-wrap gap-2">
          {areas.map((a) => (
            <li key={a} className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm">
              <MapPin className="h-4 w-4 text-primary-500" aria-hidden />
              {a}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export function DocumentsSection({ settings }: { settings: SiteSettings }) {
  if (!settings.documents?.length) return null;
  return (
    <Section spacing="lg" className="bg-background-elevated">
      <Heading as="h2" size="lg" className="mb-3">What you need to rent</Heading>
      <Text color="muted" className="mb-8 max-w-2xl">
        Bring the original documents to the handover.
        {settings.minimumAge ? ` Minimum driver age is ${settings.minimumAge}.` : ""}
      </Text>
      <div className="grid gap-4 md:grid-cols-2">
        {settings.documents.map((d) => (
          <div key={d._key} className="rounded-lg border border-border bg-background p-5">
            <Text weight="semibold" className="mb-2">{d.who}</Text>
            <ul className="list-disc space-y-1 pl-5 text-sm text-foreground-muted">
              {d.needs.map((n) => <li key={n}>{n}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <Text size="sm" color="muted" className="mt-6">
        Not sure about your licence? <Link href="/faq" className="text-primary-500 underline-offset-4 hover:underline">Read the FAQ</Link> or ask us on WhatsApp.
      </Text>
    </Section>
  );
}
