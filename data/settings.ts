import { sanityFetch } from "@/lib/sanity/client";
import { SITE_SETTINGS } from "@/lib/sanity/queries";

/** Business facts from Sanity → Site settings. Anything empty is unknown and must be hidden, not guessed. */
export interface SiteSettings {
  businessName?: string;
  whatsapp?: string;
  phone?: string;
  secondaryPhone?: string;
  address?: string;
  mapsUrl?: string;
  geo?: { lat: number; lng: number };
  hours?: string;
  replyPromise?: string;
  instagram?: string;
  tradeLicence?: string;
  kmPerDay?: number;
  extraKmAed?: number;
  insurance?: string;
  depositRefundDays?: number;
  minimumAge?: number;
  pricesIncludeVat?: boolean;
  freeDelivery?: string;
  deliveryAreas?: string[];
  documents?: { _key: string; who: string; needs: string[] }[];
  googleRating?: number;
  googleReviewCount?: number;
  googleReviewsUrl?: string;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    return (await sanityFetch<SiteSettings | null>(SITE_SETTINGS, {}, ["sanity", "siteSettings"])) ?? {};
  } catch {
    return {};
  }
}

/** "5.0 on Google (84 reviews)" only when both are known; never a bare count we have not verified. */
export function ratingLine(s: SiteSettings): string | null {
  if (!s.googleRating) return null;
  const r = s.googleRating.toFixed(1);
  return s.googleReviewCount ? `${r} on Google from ${s.googleReviewCount} reviews` : `Rated ${r} on Google`;
}

/** VAT note when the client has told us; otherwise nothing (the old site claimed "exclusive of 5% VAT" unverified). */
export function vatNote(s: SiteSettings): string | null {
  if (s.pricesIncludeVat === true) return "Prices include VAT.";
  if (s.pricesIncludeVat === false) return "Prices exclude 5% VAT.";
  return null;
}
