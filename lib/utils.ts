import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
 * Generate WhatsApp URL with pre-filled message
 */
export function getWhatsAppUrl(message?: string): string {
  const phone = "971545555402";
  const baseUrl = "https://api.whatsapp.com/send";
  const encodedMessage = encodeURIComponent(
    message || "Hello Dream Drives, I'm interested in renting a car. Please share your prices and current offers."
  );
  return `${baseUrl}?phone=${phone}&text=${encodedMessage}`;
}

/**
 * Generate WhatsApp URL for specific car inquiry
 */
export function getCarInquiryUrl(carName: string, carYear: number): string {
  const message = `Hello Dream Drives, I'm interested in renting the ${carYear} ${carName}. Please share availability and pricing.`;
  return getWhatsAppUrl(message);
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
