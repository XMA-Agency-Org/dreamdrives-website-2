"use client";

import { useMemo, useState } from "react";
import { FaWhatsapp } from "@react-icons/all-files/fa/FaWhatsapp";
import { Phone, ArrowUpRight } from "lucide-react";
import { Button, Text } from "@/components/ui";
import { aed, daysBetween, estimate, isoDate } from "@/lib/pricing";
import { telHref, waHref, type LeadSource } from "@/lib/contact";
import { trackEvent } from "@/lib/track";
import type { Car } from "@/types";
import { cn } from "@/lib/utils";

interface PriceCalculatorProps {
  /** One car (car page) or several to pick from (homepage). */
  cars: Pick<Car, "slug" | "name" | "pricing">[];
  initialSlug?: string;
  deposit?: number;
  depositRefundDays?: number;
  vatNote?: string | null;
  src?: LeadSource;
  className?: string;
}

const TIER_LABEL = { daily: "Daily rate", weekly: "Weekly rate", monthly: "Monthly rate" } as const;

/**
 * Dates in, total out, then "send these dates on WhatsApp". Kept deliberately small: research shows
 * long calculators are skipped. The estimate never adds a charge the client has not confirmed.
 */
export function PriceCalculator({ cars, initialSlug, deposit, depositRefundDays, vatNote, src = "calculator", className }: PriceCalculatorProps) {
  const today = isoDate(new Date());
  const [slug, setSlug] = useState(initialSlug ?? cars[0]?.slug);
  const [from, setFrom] = useState(isoDate(new Date(Date.now() + 86400000)));
  const [to, setTo] = useState(isoDate(new Date(Date.now() + 4 * 86400000)));
  const car = cars.find((c) => c.slug === slug) ?? cars[0];
  const days = daysBetween(from, to);
  const est = useMemo(() => (car ? estimate(car.pricing, days) : null), [car, days]);
  if (!car) return null;
  const dep = deposit ?? car.pricing.deposit;

  const onFrom = (v: string) => {
    setFrom(v);
    if (daysBetween(v, to) < 1) setTo(isoDate(new Date(Date.parse(`${v}T12:00:00`) + 86400000)));
  };
  const touched = () => trackEvent("calculator_used", { car: car.name, days });

  return (
    <div className={cn("rounded-lg border border-border bg-background-elevated p-5 sm:p-6", className)} data-src={src}>
      {cars.length > 1 && (
        <label className="block mb-4">
          <Text size="xs" color="muted" className="uppercase tracking-wider mb-1.5">Car</Text>
          <select
            value={slug}
            onChange={(e) => { setSlug(e.target.value); touched(); }}
            className="w-full h-12 rounded-md bg-background border border-border px-3 text-foreground"
          >
            {cars.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}, {aed(c.pricing.daily)}/day</option>
            ))}
          </select>
        </label>
      )}

      <div className="grid grid-cols-2 gap-3 mb-5">
        <label className="block">
          <Text size="xs" color="muted" className="uppercase tracking-wider mb-1.5">Pick up</Text>
          <input type="date" min={today} value={from} onChange={(e) => { onFrom(e.target.value); touched(); }}
            className="w-full h-12 rounded-md bg-background border border-border px-3 text-foreground" />
        </label>
        <label className="block">
          <Text size="xs" color="muted" className="uppercase tracking-wider mb-1.5">Return</Text>
          <input type="date" min={from} value={to} onChange={(e) => { setTo(e.target.value); touched(); }}
            className="w-full h-12 rounded-md bg-background border border-border px-3 text-foreground" />
        </label>
      </div>

      {est ? (
        <dl className="space-y-2 mb-5 text-sm">
          <div className="flex justify-between">
            <dt className="text-foreground-muted">{est.days} {est.days === 1 ? "day" : "days"} × {aed(est.perDay)}</dt>
            <dd>{TIER_LABEL[est.tier]}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-foreground-muted">Delivery in Dubai</dt>
            <dd>Free</dd>
          </div>
          {est.savedVsDaily > 0 && (
            <div className="flex justify-between text-success">
              <dt>You save vs the daily rate</dt>
              <dd>{aed(est.savedVsDaily)}</dd>
            </div>
          )}
          <div className="flex justify-between items-baseline pt-3 border-t border-border">
            <dt className="font-semibold">Rental total</dt>
            <dd className="text-2xl font-semibold">{aed(est.total)}</dd>
          </div>
          {dep > 0 && (
            <div className="flex justify-between text-foreground-muted">
              <dt>Refundable deposit</dt>
              <dd>{aed(dep)}{depositRefundDays ? `, back within ${depositRefundDays} days` : ""}</dd>
            </div>
          )}
        </dl>
      ) : (
        <Text size="sm" color="muted" className="mb-5">Choose a return date after the pick up date.</Text>
      )}

      <div className="space-y-3">
        <button
          type="button"
          data-book=""
          data-car={car.slug}
          data-from={est ? from : undefined}
          data-to={est ? to : undefined}
          data-src={src}
          className="pill-cta group w-full justify-between bg-white text-neutral-950 hover:bg-neutral-200"
        >
          <span>{est ? "Book these dates" : "Book this car"}</span>
          <span className="pill-icon bg-neutral-950/8" aria-hidden><ArrowUpRight className="h-[18px] w-[18px]" strokeWidth={1.5} /></span>
        </button>
        <div className="grid grid-cols-2 gap-3">
          <Button as="a" href={waHref({ src, car: car.name, from: est ? from : undefined, to: est ? to : undefined })} data-price={car.pricing.daily}
            target="_blank" rel="nofollow noopener" variant="whatsappOutline" size="md" className="w-full rounded-full" leftIcon={<FaWhatsapp className="w-5 h-5" />}>
            WhatsApp
          </Button>
          <Button as="a" href={telHref} variant="secondary" size="md" className="w-full rounded-full" leftIcon={<Phone className="w-5 h-5" />}>
            Call
          </Button>
        </div>
      </div>
      <Text size="xs" color="subtle" className="text-center mt-3">
        {vatNote ? `${vatNote} ` : ""}We confirm your car on WhatsApp.
      </Text>
    </div>
  );
}
