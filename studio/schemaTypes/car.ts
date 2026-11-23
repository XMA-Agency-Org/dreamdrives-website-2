import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * One rentable car. Field names follow the old Contentful `rentalVehicle` so the
 * migration is a straight copy. Rule for editors: leave a field empty rather than
 * guess. The site hides empty specs instead of inventing them.
 */
export const car = defineType({
  name: "car",
  title: "Car",
  type: "document",
  groups: [
    { name: "main", title: "Main", default: true },
    { name: "pricing", title: "Pricing & terms" },
    { name: "specs", title: "Specs" },
    { name: "media", title: "Photos" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "name", title: "Name", type: "string", group: "main", validation: (r) => r.required(),
      description: 'As customers say it, with model year. e.g. "Cadillac Escalade 2026"' }),
    defineField({ name: "slug", title: "URL slug", type: "slug", group: "main", options: { source: "name" },
      description: "Changing this changes the page address and breaks Google rankings. Leave it alone once live.",
      validation: (r) => r.required() }),
    defineField({ name: "variant", title: "Exact variant", type: "string", group: "main",
      description: 'e.g. "Urus S", "Urus Performante", "G63 AMG". Shown so the price makes sense.' }),
    defineField({ name: "brand", type: "reference", to: [{ type: "brand" }], group: "main", validation: (r) => r.required() }),
    defineField({ name: "category", type: "reference", to: [{ type: "category" }], group: "main" }),
    defineField({ name: "bodyType", title: "Body type", type: "string", group: "main",
      options: { list: [{ title: "SUV", value: "suv" }, { title: "Sedan / coupe", value: "sedan" }], layout: "radio" },
      validation: (r) => r.required() }),
    defineField({ name: "year", title: "Model year", type: "number", group: "main" }),
    defineField({ name: "plate", title: "Plate", type: "string", group: "main", description: "e.g. P 5503. Internal, used to match photos and ads." }),
    defineField({ name: "tagline", type: "string", group: "main" }),
    defineField({ name: "description", type: "array", of: [defineArrayMember({ type: "block" })], group: "main" }),
    defineField({ name: "useCases", title: "Good for", type: "array", of: [defineArrayMember({ type: "string" })], group: "main",
      options: { list: ["weekend", "family", "airport", "wedding", "business", "monthly"], layout: "tags" } }),
    defineField({ name: "featured", type: "boolean", group: "main", initialValue: false }),
    defineField({ name: "available", type: "boolean", group: "main", initialValue: true }),
    defineField({ name: "order", title: "Sort order", type: "number", group: "main" }),

    defineField({ name: "dailyPrice", title: "Daily price (AED)", type: "number", group: "pricing", validation: (r) => r.required().positive() }),
    defineField({ name: "weeklyPrice", title: "Weekly price (AED)", type: "number", group: "pricing" }),
    defineField({ name: "monthlyPrice", title: "Monthly price (AED)", type: "number", group: "pricing" }),
    defineField({ name: "deposit", title: "Security deposit (AED)", type: "number", group: "pricing" }),
    defineField({
      name: "included", title: "What's included (overrides site defaults)", type: "object", group: "pricing",
      description: "Leave empty to use the defaults in Site settings.",
      fields: [
        defineField({ name: "kmPerDay", title: "Km per day", type: "number" }),
        defineField({ name: "extraKmAed", title: "Extra km (AED)", type: "number" }),
        defineField({ name: "insurance", title: "Insurance included", type: "string" }),
        defineField({ name: "depositRefundDays", title: "Deposit refunded within (days)", type: "number" }),
        defineField({ name: "minimumAge", title: "Minimum driver age", type: "number" }),
      ],
    }),

    defineField({ name: "engine", type: "string", group: "specs" }),
    defineField({ name: "horsepower", type: "number", group: "specs" }),
    defineField({ name: "acceleration", title: "0 to 100 km/h (s)", type: "string", group: "specs" }),
    defineField({ name: "topSpeed", title: "Top speed (km/h)", type: "number", group: "specs" }),
    defineField({ name: "transmission", type: "string", group: "specs" }),
    defineField({ name: "fuelType", title: "Fuel", type: "string", group: "specs" }),
    defineField({ name: "fuelConsumption", type: "string", group: "specs" }),
    defineField({ name: "seats", type: "number", group: "specs" }),
    defineField({ name: "doors", type: "number", group: "specs" }),
    defineField({ name: "exteriorColor", title: "Exterior colour", type: "string", group: "specs", description: "Read it off the photos." }),
    defineField({ name: "interiorColor", title: "Interior colour", type: "string", group: "specs", description: "Read it off the photos." }),
    defineField({ name: "features", type: "array", of: [defineArrayMember({ type: "string" })], group: "specs", options: { layout: "tags" } }),

    defineField({ name: "mainImage", title: "Main photo", type: "image", group: "media", options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })], validation: (r) => r.required() }),
    defineField({
      name: "gallery", type: "array", group: "media",
      of: [defineArrayMember({
        type: "image", options: { hotspot: true },
        fields: [
          defineField({ name: "alt", type: "string" }),
          defineField({ name: "angle", type: "string", options: { list: ["front34", "side", "rear", "interior", "dash", "boot", "seats", "detail", "lifestyle"] } }),
        ],
      })],
    }),

    defineField({ name: "seoTitle", title: "SEO title", type: "string", group: "seo", validation: (r) => r.max(65) }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 3, group: "seo", validation: (r) => r.max(160) }),
  ],
  orderings: [
    { title: "Price, low to high", name: "priceAsc", by: [{ field: "dailyPrice", direction: "asc" }] },
    { title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", price: "dailyPrice", available: "available", media: "mainImage" },
    prepare: ({ title, price, available, media }) => ({
      title, media, subtitle: `AED ${price ?? "?"}/day${available === false ? " · hidden" : ""}`,
    }),
  },
});
