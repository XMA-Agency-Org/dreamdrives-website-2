import { defineArrayMember, defineField, defineType } from "sanity";

export const brand = defineType({
  name: "brand",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "logo", type: "image" }),
    defineField({ name: "description", type: "text", rows: 3 }),
  ],
});

export const category = defineType({
  name: "category",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 3 }),
  ],
});

export const review = defineType({
  name: "review",
  title: "Review",
  type: "document",
  description: "Real Google reviews only, copied word for word, with the date.",
  fields: [
    defineField({ name: "author", type: "string", validation: (r) => r.required() }),
    defineField({ name: "rating", type: "number", validation: (r) => r.required().min(1).max(5) }),
    defineField({ name: "text", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "source", type: "string", initialValue: "Google", options: { list: ["Google", "Tripadvisor"] } }),
    defineField({ name: "car", type: "reference", to: [{ type: "car" }] }),
    defineField({ name: "url", title: "Link to the review", type: "url" }),
  ],
  preview: { select: { title: "author", subtitle: "text" } },
});

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", type: "array", of: [defineArrayMember({ type: "block" })], validation: (r) => r.required() }),
    defineField({ name: "topic", type: "string", options: { list: ["booking", "documents", "deposit", "delivery", "insurance", "mileage", "payment"] } }),
    defineField({ name: "showOnHome", title: "Show on homepage", type: "boolean", initialValue: false }),
    defineField({ name: "order", type: "number" }),
    defineField({ name: "confirmedByClient", title: "Confirmed by Dream Drives", type: "boolean", initialValue: false,
      description: "Only confirmed answers are published to the site." }),
  ],
  preview: { select: { title: "question", confirmed: "confirmedByClient" },
    prepare: ({ title, confirmed }) => ({ title, subtitle: confirmed ? "confirmed" : "NOT confirmed, hidden" }) },
});
