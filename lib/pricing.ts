import type { CarPricing } from "@/types";

/**
 * Rental estimate for a date range, using the car's own day / week / month rates:
 * 30+ days at the monthly rate per day, 7+ days at the weekly rate per day, otherwise daily.
 * It is an estimate shown to the customer and confirmed on WhatsApp, so it rounds to the dirham
 * and never adds charges we have not been told about.
 */
export interface Estimate {
  days: number;
  tier: "daily" | "weekly" | "monthly";
  perDay: number;
  total: number;
  savedVsDaily: number;
}

export function daysBetween(from: string, to: string): number {
  const a = Date.parse(`${from}T12:00:00`), b = Date.parse(`${to}T12:00:00`);
  if (Number.isNaN(a) || Number.isNaN(b)) return 0;
  return Math.max(0, Math.round((b - a) / 86400000));
}

export function estimate(pricing: CarPricing, days: number): Estimate | null {
  if (!days || days < 1) return null;
  let tier: Estimate["tier"] = "daily";
  let perDay = pricing.daily;
  if (days >= 30 && pricing.monthly) { tier = "monthly"; perDay = pricing.monthly / 30; }
  else if (days >= 7 && pricing.weekly) { tier = "weekly"; perDay = pricing.weekly / 7; }
  perDay = Math.min(perDay, pricing.daily);
  const total = Math.round(perDay * days);
  return { days, tier, perDay: Math.round(perDay), total, savedVsDaily: Math.max(0, pricing.daily * days - total) };
}

export const aed = (n: number) => `AED ${Math.round(n).toLocaleString("en-US")}`;

export function isoDate(d: Date): string {
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}
