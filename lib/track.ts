"use client";

import posthog from "posthog-js";
import { makeRef, type LeadSource } from "./contact";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID; // AW-XXXXXXXXX
const WA_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_WA_LABEL;
const CALL_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL;

export interface LeadInfo {
  kind: "whatsapp" | "call";
  src: LeadSource;
  car?: string;
  price?: number;
  days?: number;
}

/**
 * One call fires the lead everywhere: Google Ads conversion, GA4 event, Meta Pixel `Contact`
 * (eventID = ref, matching the server-side CAPI event so Meta counts it once) and PostHog.
 * Returns the ref so the caller can put it in the link.
 */
export function trackLead(info: LeadInfo): string {
  const ref = makeRef();
  const value = info.price && info.days ? info.price * info.days : info.price;
  const label = info.kind === "whatsapp" ? WA_LABEL : CALL_LABEL;
  try {
    if (window.gtag) {
      if (ADS_ID && label) window.gtag("event", "conversion", { send_to: `${ADS_ID}/${label}`, value, currency: "AED", transaction_id: ref });
      window.gtag("event", info.kind === "whatsapp" ? "whatsapp_click" : "phone_click", {
        source: info.src, car: info.car, ref, value, currency: "AED", transport_type: "beacon",
      });
    }
    window.fbq?.("track", "Contact", { content_name: info.car, value, currency: "AED" }, { eventID: ref });
    posthog.capture(info.kind === "whatsapp" ? "whatsapp_click" : "phone_click", {
      source: info.src, car_name: info.car, car_price: info.price, days: info.days, ref,
    });
  } catch {
    // Tracking must never block the customer reaching WhatsApp.
  }
  return ref;
}

/**
 * onClick for lead links.
 * - WhatsApp (<a href="/go/wa?...">): adds the ref to the URL before the browser follows it.
 * - Call (<a href="tel:...">): dials directly; the ref is logged with a beacon to /go/call.
 */
export function leadClick(info: LeadInfo) {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    const ref = trackLead(info);
    const a = e.currentTarget;
    if (info.kind === "call") {
      try { navigator.sendBeacon?.(`/go/call?src=${info.src}&ref=${ref}`); } catch {}
      return;
    }
    const url = new URL(a.href, window.location.origin);
    url.searchParams.set("ref", ref);
    a.href = url.toString();
  };
}

export function trackEvent(name: string, props: Record<string, unknown> = {}) {
  try {
    window.gtag?.("event", name, props);
    posthog.capture(name, props);
  } catch {}
}
