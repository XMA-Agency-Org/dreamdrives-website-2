import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { waHref, type LeadSource } from "./contact";

/**
 * Combines class names with Tailwind CSS merge support
 * Handles conditional classes and resolves Tailwind conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price with AED currency
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-AE").format(num);
}

/**
 * WhatsApp link for general enquiries. Goes through /go/wa (lead logging + ref code), see lib/contact.ts.
 */
export function getWhatsAppUrl(message?: string, src: LeadSource = "cta_section"): string {
  return waHref({ src, text: message });
}

/**
 * WhatsApp link for one car. Names already carry the year where it matters, so the year is not repeated.
 */
export function getCarInquiryUrl(carName: string, _carYear?: number, src: LeadSource = "car_card"): string {
  return waHref({ src, car: carName });
}

/**
 * Create a slug from a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

/**
 * Truncate text to a specified length
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "...";
}
