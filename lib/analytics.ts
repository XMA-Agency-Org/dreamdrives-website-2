import posthog from "posthog-js";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || "";
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com";

let initialized = false;

export function initPostHog() {
  if (typeof window === "undefined" || initialized || !POSTHOG_KEY) {
    return;
  }

  posthog.init(POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    defaults: "2026-01-30",
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
    persistence: "localStorage",
  });

  initialized = true;
}

export function isAnalyticsConfigured(): boolean {
  return Boolean(POSTHOG_KEY);
}

interface WhatsAppClickData {
  carName?: string;
  carBrand?: string;
  carCategory?: string;
  carPrice?: number;
  source:
    | "floating_cta"
    | "car_card"
    | "car_detail"
    | "booking_section"
    | "header"
    | "footer"
    | "mobile_menu";
}

export function trackWhatsAppClick(data: WhatsAppClickData) {
  if (!initialized) return;

  posthog.capture("whatsapp_click", {
    car_name: data.carName,
    car_brand: data.carBrand,
    car_category: data.carCategory,
    car_price: data.carPrice,
    source: data.source,
  });

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: process.env.NEXT_PUBLIC_GOOGLE_CONVERSION_ID,
      event_category: "engagement",
      event_label: data.source,
      value: data.carPrice,
    });
  }
}

interface ContactFormData {
  formType: "inquiry" | "general" | "booking";
}

export function trackContactFormSubmit(data: ContactFormData) {
  if (!initialized) return;

  posthog.capture("contact_form_submit", {
    form_type: data.formType,
  });

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "generate_lead", {
      event_category: "engagement",
      event_label: data.formType,
    });
  }
}

interface CarDetailViewData {
  carName: string;
  carBrand: string;
  carCategory: string;
  carPrice: number;
  carSlug: string;
}

export function trackCarDetailView(data: CarDetailViewData) {
  if (!initialized) return;

  posthog.capture("car_detail_view", {
    car_name: data.carName,
    car_brand: data.carBrand,
    car_category: data.carCategory,
    car_price: data.carPrice,
    car_slug: data.carSlug,
  });

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "view_item", {
      currency: "AED",
      value: data.carPrice,
      items: [
        {
          item_id: data.carSlug,
          item_name: data.carName,
          item_brand: data.carBrand,
          item_category: data.carCategory,
          price: data.carPrice,
        },
      ],
    });
  }
}

interface FilterData {
  filterType: "brand" | "category" | "price" | "search";
  filterValue: string;
}

export function trackCarFilter(data: FilterData) {
  if (!initialized) return;

  posthog.capture("car_listing_filter", {
    filter_type: data.filterType,
    filter_value: data.filterValue,
  });
}

export function trackPhoneClick(source: string) {
  if (!initialized) return;

  posthog.capture("phone_click", {
    source,
  });
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}
