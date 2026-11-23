import type { Car } from "@/types";
import type { SiteSettings } from "@/data/settings";
import { SITE_URL } from "@/lib/constants";

/** Renders one JSON-LD block. Data is built from Sanity, so it cannot disagree with the page. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function businessLd(s: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "@id": `${SITE_URL}/#business`,
    name: s.businessName ?? "Dream Drives Rent A Car",
    url: SITE_URL,
    telephone: s.phone,
    image: `${SITE_URL}/dreamdrives-logo-500x500.png`,
    priceRange: "AED 150 to 3,300 per day",
    address: s.address && { "@type": "PostalAddress", streetAddress: s.address, addressLocality: "Dubai", addressCountry: "AE" },
    ...(s.geo && { geo: { "@type": "GeoCoordinates", latitude: s.geo.lat, longitude: s.geo.lng } }),
    areaServed: { "@type": "City", name: "Dubai" },
    sameAs: [s.instagram, s.mapsUrl].filter(Boolean),
    // AggregateRating only with a verified count (Google requires both, and must match the profile).
    ...(s.googleRating && s.googleReviewCount && {
      aggregateRating: { "@type": "AggregateRating", ratingValue: s.googleRating, reviewCount: s.googleReviewCount },
    }),
  };
}

export function carLd(car: Car) {
  const url = `${SITE_URL}/cars/${car.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: `${car.name} rental in Dubai`,
    description: car.description || car.tagline,
    image: car.images.slice(0, 5).map((i) => i.src),
    brand: car.brandName && { "@type": "Brand", name: car.brandName },
    category: "Car rental",
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "AED",
      price: car.pricing.daily,
      priceSpecification: { "@type": "UnitPriceSpecification", price: car.pricing.daily, priceCurrency: "AED", unitCode: "DAY" },
      availability: car.isAvailable ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: { "@id": `${SITE_URL}/#business` },
    },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${SITE_URL}${it.path}` })),
  };
}

export function faqLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
}
