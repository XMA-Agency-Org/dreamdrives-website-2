import { Check } from "lucide-react";
import { Heading, Text } from "@/components/ui";
import type { Car } from "@/types";
import type { SiteSettings } from "@/data/settings";
import { aed } from "@/lib/pricing";

/**
 * "The price you see is the price you pay": every term that applies to this car, from the car's own
 * values first, then Site settings. A line appears only when the fact is known; nothing is guessed.
 */
export function IncludedBox({ car, settings }: { car: Car; settings: SiteSettings }) {
  const inc = { ...settings, ...Object.fromEntries(Object.entries(car.included ?? {}).filter(([, v]) => v != null)) } as SiteSettings;
  const lines: { label: string; value: string }[] = [];
  if (settings.freeDelivery) lines.push({ label: "Delivery", value: settings.freeDelivery });
  if (inc.kmPerDay) lines.push({ label: "Mileage", value: `${inc.kmPerDay} km a day included${inc.extraKmAed ? `, then AED ${inc.extraKmAed} per km` : ""}` });
  if (inc.insurance) lines.push({ label: "Insurance", value: inc.insurance });
  if (car.pricing.deposit) lines.push({ label: "Deposit", value: `${aed(car.pricing.deposit)} refundable${inc.depositRefundDays ? `, back within ${inc.depositRefundDays} days of return` : ""}` });
  if (inc.minimumAge) lines.push({ label: "Driver age", value: `${inc.minimumAge}+` });
  if (car.pricing.weekly) lines.push({ label: "Weekly", value: `${aed(car.pricing.weekly)} for 7 days` });
  if (car.pricing.monthly) lines.push({ label: "Monthly", value: `${aed(car.pricing.monthly)} for 30 days` });
  if (!lines.length) return null;

  return (
    <section>
      <Heading as="h2" size="md" className="mb-4">What&apos;s included</Heading>
      <ul className="divide-y divide-border rounded-lg border border-border bg-background-elevated">
        {lines.map((l) => (
          <li key={l.label} className="flex items-start gap-3 p-4">
            <Check className="w-5 h-5 mt-0.5 text-success shrink-0" aria-hidden />
            <div>
              <Text size="sm" weight="semibold">{l.label}</Text>
              <Text size="sm" color="muted">{l.value}</Text>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
