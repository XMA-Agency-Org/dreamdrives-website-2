import { defineArrayMember, defineField, defineType } from "sanity";

/** Model, intent and area pages served at /rent/<slug>. Each is a Google Ads landing page. */
export const landingPage = defineType({
  name: "landingPage",
  title: "Landing page",
  type: "document",
  fields: [
    defineField({ name: "kind", type: "string", options: { list: ["model", "intent", "area"], layout: "radio" }, validation: (r) => r.required() }),
    defineField({ name: "title", title: "Internal title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "h1", title: "Headline (H1)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "intro", type: "text", rows: 3 }),
    defineField({ name: "answer", title: "Quick answer box", type: "text", rows: 3,
      description: "Two or three factual sentences: what, price, delivery. Search engines and AI answers quote this." }),
    defineField({ name: "cars", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "car" }] })] }),
    defineField({ name: "body", type: "array", of: [defineArrayMember({ type: "block" })] }),
    defineField({
      name: "faqs", title: "FAQs", type: "array",
      description: "Only answers Dream Drives has confirmed. These also become FAQ rich results in Google.",
      of: [defineArrayMember({ type: "object", fields: [
        defineField({ name: "question", type: "string", validation: (r) => r.required() }),
        defineField({ name: "answer", type: "text", rows: 3, validation: (r) => r.required() }),
      ], preview: { select: { title: "question" } } })],
    }),
    defineField({ name: "order", type: "number" }),
    defineField({ name: "heroImage", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string" })] }),
    defineField({ name: "whatsappText", title: "WhatsApp message", type: "string",
      description: 'Prefilled text. The ref code is added automatically. e.g. "Hi, I would like to rent a G63"' }),
    defineField({ name: "seoTitle", type: "string", validation: (r) => r.max(65) }),
    defineField({ name: "seoDescription", type: "text", rows: 3, validation: (r) => r.max(160) }),
  ],
  preview: { select: { title: "h1", subtitle: "kind" } },
});

/** One record for every business fact the site states. Nothing here is guessed: empty fields are hidden. */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "contact", title: "Contact", default: true },
    { name: "terms", title: "Rental terms" },
    { name: "trust", title: "Trust" },
  ],
  fields: [
    defineField({ name: "businessName", type: "string", group: "contact", initialValue: "Dream Drives Rent A Car L.L.C" }),
    defineField({ name: "whatsapp", title: "WhatsApp number (E.164)", type: "string", group: "contact" }),
    defineField({ name: "phone", title: "Phone (E.164)", type: "string", group: "contact" }),
    defineField({ name: "secondaryPhone", type: "string", group: "contact" }),
    defineField({ name: "email", type: "string", group: "contact" }),
    defineField({ name: "address", type: "string", group: "contact" }),
    defineField({ name: "mapsUrl", title: "Google Maps link (the business listing)", type: "url", group: "contact" }),
    defineField({ name: "geo", type: "geopoint", group: "contact" }),
    defineField({ name: "hours", title: "Opening hours", type: "string", group: "contact" }),
    defineField({ name: "replyPromise", title: "Reply time promise", type: "string", group: "contact" }),
    defineField({ name: "instagram", type: "url", group: "contact" }),
    defineField({ name: "tradeLicence", title: "Trade licence number", type: "string", group: "contact" }),

    defineField({ name: "kmPerDay", title: "Km per day (default)", type: "number", group: "terms" }),
    defineField({ name: "extraKmAed", title: "Extra km AED (default)", type: "number", group: "terms" }),
    defineField({ name: "insurance", title: "Insurance included (default)", type: "string", group: "terms" }),
    defineField({ name: "depositRefundDays", title: "Deposit refunded within (days)", type: "number", group: "terms" }),
    defineField({ name: "minimumAge", type: "number", group: "terms" }),
    defineField({ name: "pricesIncludeVat", title: "Prices include VAT", type: "boolean", group: "terms" }),
    defineField({ name: "freeDelivery", title: "Free delivery text", type: "string", group: "terms" }),
    defineField({ name: "deliveryAreas", type: "array", of: [defineArrayMember({ type: "string" })], group: "terms", options: { layout: "tags" } }),
    defineField({
      name: "documents", title: "Documents by licence", type: "array", group: "terms",
      of: [defineArrayMember({ type: "object", fields: [
        defineField({ name: "who", type: "string" }),
        defineField({ name: "needs", type: "array", of: [defineArrayMember({ type: "string" })] }),
      ], preview: { select: { title: "who" } } })],
    }),

    defineField({ name: "googleRating", type: "number", group: "trust" }),
    defineField({ name: "googleReviewCount", type: "number", group: "trust" }),
    defineField({ name: "googleReviewsUrl", type: "url", group: "trust" }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
