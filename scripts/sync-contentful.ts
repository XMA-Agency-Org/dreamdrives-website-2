/**
 * Sync data/cars-raw.json + data/car-images.json into Contentful.
 *
 *   bun scripts/sync-contentful.ts                    show what would change, write nothing
 *   bun scripts/sync-contentful.ts --apply            apply every pending change
 *   bun scripts/sync-contentful.ts --apply --new      only create vehicles that are missing
 *   bun scripts/sync-contentful.ts --apply --prices   only touch the four price fields
 *   bun scripts/sync-contentful.ts --only a,b --apply limit to these slugs
 *   bun scripts/sync-contentful.ts --reimage a,b --apply  replace the photos on these slugs
 *
 * Reads its tokens from .env.local, which Bun loads on its own.
 */

import { createClient } from "contentful-management";
import type { Environment, Entry, ContentType } from "contentful-management";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID || "tsz5b6wk9hsp";
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || "master";
const LOCALE = "en-US";
const VEHICLE_TYPE = "rentalVehicle";
const BRAND_TYPE = "carRentalBrand";
const CATEGORY_TYPE = "vehicleCategory";

type Pricing = { daily: number; weekly: number; monthly: number; deposit: number };
type Specs = {
  engine: string; horsepower: number; acceleration: string; topSpeed: number;
  transmission: string; fuelType: string; seats: number; doors: number;
};
type Car = {
  id: string; slug: string; name: string; brand: string; category: string; year: number;
  tagline: string; description: string; pricing: Pricing; specs: Specs; features: string[];
  isFeatured?: boolean; isAvailable: boolean; color: string; interiorColor: string;
};
type CarImages = { carSlug: string; images: string[]; thumbnail: string };

const PRICE_FIELDS = ["dailyPrice", "weeklyPrice", "monthlyPrice", "depositAmount"];

const BRAND_NAMES: Record<string, string> = {
  hyundai: "Hyundai", kia: "Kia", mazda: "Mazda", nissan: "Nissan", bmw: "BMW",
  mercedes: "Mercedes-Benz", "range-rover": "Range Rover", lamborghini: "Lamborghini",
  audi: "Audi", cadillac: "Cadillac", gmc: "GMC", ferrari: "Ferrari", porsche: "Porsche",
  bentley: "Bentley", "rolls-royce": "Rolls-Royce", mclaren: "McLaren",
  "aston-martin": "Aston Martin", chevrolet: "Chevrolet", mini: "MINI", maserati: "Maserati",
};
const CATEGORY_NAMES: Record<string, string> = { sedan: "Sedan", suv: "SUV" };

/**
 * Contentful curates a richer taxonomy than the two values in CarCategory
 * (suv, luxury-sedan, economy, luxury). Map the local value onto an existing one so a
 * bogus "sedan" category is never created.
 */
const CATEGORY_SLUGS: Record<string, string> = { suv: "suv", sedan: "luxury-sedan" };

/**
 * Fields the CMS owns once an entry exists. A curator may have filed a car under Economy
 * or Luxury, or taken it off the homepage; the local data cannot express either, so never
 * overwrite them on an update. Both are still set on creation, so a new vehicle lands
 * somewhere sensible. Drop a name from this set to let the JSON win again.
 */
const CMS_OWNED_ON_UPDATE = new Set(["category", "featuredFlag"]);

// ---------------------------------------------------------------- arguments

function parseArgs(argv: string[]) {
  const flags = new Set<string>();
  const values: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
    const name = arg.slice(2);
    const next = argv[i + 1];
    if (next && !next.startsWith("--")) {
      values[name] = next;
      i++;
    } else {
      flags.add(name);
    }
  }
  const list = (name: string) =>
    values[name] ? values[name].split(",").map((s) => s.trim()).filter(Boolean) : [];
  return {
    apply: flags.has("apply"),
    newOnly: flags.has("new"),
    pricesOnly: flags.has("prices"),
    json: flags.has("json"),
    only: list("only"),
    reimage: list("reimage"),
  };
}

const args = parseArgs(process.argv.slice(2));

// ---------------------------------------------------------------- helpers

const richText = (text: string) => ({
  nodeType: "document",
  data: {},
  content: [
    {
      nodeType: "paragraph",
      data: {},
      content: [{ nodeType: "text", value: text, marks: [], data: {} }],
    },
  ],
});

/** Flatten a Contentful value so two shapes can be compared for real equality. */
function normalize(value: unknown): unknown {
  if (value === null || value === undefined) return null;
  if (Array.isArray(value)) return value.map(normalize);
  if (typeof value === "object") {
    const obj = value as Record<string, any>;
    if (obj.sys?.id) return `link:${obj.sys.id}`;
    if (obj.nodeType === "document") return plainText(obj);
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(obj).sort()) out[key] = normalize(obj[key]);
    return out;
  }
  return value;
}

function plainText(doc: any): string {
  if (!doc?.content) return "";
  return doc.content
    .flatMap((node: any) => node.content ?? [])
    .map((node: any) => node.value ?? "")
    .join("")
    .trim();
}

const same = (a: unknown, b: unknown) =>
  JSON.stringify(normalize(a)) === JSON.stringify(normalize(b));

function preview(value: unknown): string {
  const flat = normalize(value);
  const text = typeof flat === "string" ? flat : JSON.stringify(flat);
  if (text === null || text === undefined) return "(empty)";
  return text.length > 58 ? text.slice(0, 55) + "..." : text;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Contentful rate-limits aggressively; retry the whole call on 429 / 5xx. */
async function withRetry<T>(label: string, fn: () => Promise<T>, attempts = 5): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      lastError = err;
      const status = err?.status ?? err?.statusCode;
      if (status !== 429 && !(status >= 500 && status < 600)) throw err;
      const wait = Math.min(1000 * 2 ** (attempt - 1), 15000);
      console.log(`    ${label}: ${status}, retrying in ${wait / 1000}s`);
      await sleep(wait);
    }
  }
  throw lastError;
}

// ---------------------------------------------------------------- load data

const cars: Car[] = JSON.parse(
  readFileSync(join(projectRoot, "data", "cars-raw.json"), "utf-8"),
);
const imageSets: CarImages[] = JSON.parse(
  readFileSync(join(projectRoot, "data", "car-images.json"), "utf-8"),
);
const imagesBySlug = new Map(imageSets.map((set) => [set.carSlug, set]));

/**
 * Some vehicles were loaded into Contentful under a different slug. Map local -> remote
 * so they are updated in place rather than duplicated. Contentful's slug stays canonical.
 */
const slugMap: Record<string, string> = Object.fromEntries(
  Object.entries(
    JSON.parse(readFileSync(join(projectRoot, "data", "contentful-slug-map.json"), "utf-8")),
  ).filter(([key]) => !key.startsWith("_")),
) as Record<string, string>;

const remoteSlug = (localSlug: string) => slugMap[localSlug] ?? localSlug;

function desiredFields(
  car: Car,
  brandIds: Record<string, string>,
  categoryIds: Record<string, string>,
): Record<string, unknown> {
  const link = (linkType: "Entry" | "Asset", id: string) => ({
    sys: { type: "Link", linkType, id },
  });
  return {
    vehicleName: car.name,
    urlSlug: car.slug,
    description: richText(car.description),
    dailyPrice: car.pricing.daily,
    weeklyPrice: car.pricing.weekly,
    monthlyPrice: car.pricing.monthly,
    depositAmount: car.pricing.deposit,
    brand: link("Entry", brandIds[car.brand]),
    category: link("Entry", categoryIds[CATEGORY_SLUGS[car.category] ?? car.category]),
    modelYear: car.year,
    tagline: car.tagline,
    engine: car.specs.engine,
    horsepower: car.specs.horsepower,
    accelerationTime: car.specs.acceleration.replace(/[^\d.]/g, "") || "0",
    topSpeed: car.specs.topSpeed,
    transmissionType: car.specs.transmission,
    fuelType: car.specs.fuelType,
    passengerCount: car.specs.seats,
    doorCount: car.specs.doors,
    vehicleFeatures: car.features,
    featuredFlag: car.isFeatured ?? false,
    availabilityStatus: car.isAvailable,
    exteriorColor: car.color,
    interiorColor: car.interiorColor,
  };
}

// ---------------------------------------------------------------- contentful

async function fetchAll(env: Environment, contentType: string) {
  const items: Entry[] = [];
  let skip = 0;
  for (;;) {
    const page = await withRetry(`fetch ${contentType}`, () =>
      env.getEntries({ content_type: contentType, limit: 100, skip, include: 0 }),
    );
    items.push(...(page.items as Entry[]));
    skip += 100;
    if (skip >= page.total) break;
  }
  return items;
}

async function ensureReferenceEntries(
  env: Environment,
  contentType: string,
  slugs: string[],
  names: Record<string, string>,
  nameField: string,
) {
  const existing = await fetchAll(env, contentType);
  const ids: Record<string, string> = {};
  for (const entry of existing) {
    const slug = (entry.fields as any).urlSlug?.[LOCALE];
    if (slug) ids[slug] = entry.sys.id;
  }
  const missing = slugs.filter((slug) => !ids[slug]);
  for (const slug of missing) {
    if (!args.apply) {
      console.log(`  would create ${contentType}: ${names[slug] ?? slug}`);
      ids[slug] = `pending:${slug}`;
      continue;
    }
    const entry = await withRetry(`create ${contentType} ${slug}`, () =>
      env.createEntry(contentType, {
        fields: {
          [nameField]: { [LOCALE]: names[slug] ?? slug },
          urlSlug: { [LOCALE]: slug },
        },
      }),
    );
    await withRetry(`publish ${contentType} ${slug}`, () => entry.publish());
    ids[slug] = entry.sys.id;
    console.log(`  created ${contentType}: ${names[slug] ?? slug}`);
  }
  return ids;
}

async function uploadImages(env: Environment, car: Car): Promise<string[]> {
  const set = imagesBySlug.get(car.slug);
  if (!set || set.images.length === 0) return [];
  const assetIds: string[] = [];

  for (let i = 0; i < set.images.length; i++) {
    const relative = set.images[i];
    const fileName = relative.split("/").pop() ?? `${car.slug}-${i + 1}.jpg`;
    const contentType = /\.png$/i.test(fileName) ? "image/png" : "image/jpeg";
    let file: Buffer;
    try {
      file = readFileSync(join(projectRoot, "public", relative));
    } catch {
      console.log(`    missing on disk, skipped: ${relative}`);
      continue;
    }

    try {
      const asset = await withRetry(`upload ${fileName}`, () =>
        env.createAssetFromFiles({
          fields: {
            title: { [LOCALE]: `${car.name} - Image ${i + 1}` },
            file: { [LOCALE]: { contentType, fileName, file } },
          },
        }),
      );
      await withRetry(`process ${fileName}`, () => asset.processForAllLocales());

      let processed = await env.getAsset(asset.sys.id);
      for (let wait = 0; wait < 20 && !(processed.fields as any).file?.[LOCALE]?.url; wait++) {
        await sleep(1000);
        processed = await env.getAsset(asset.sys.id);
      }
      if (!(processed.fields as any).file?.[LOCALE]?.url) {
        console.log(`    never finished processing, skipped: ${fileName}`);
        continue;
      }
      await withRetry(`publish ${fileName}`, () => processed.publish());
      assetIds.push(processed.sys.id);
      console.log(`    uploaded ${i + 1}/${set.images.length}: ${fileName}`);
    } catch (err) {
      console.log(`    failed: ${fileName} - ${err}`);
    }
  }
  return assetIds;
}

// ---------------------------------------------------------------- main

async function main() {
  if (!MANAGEMENT_TOKEN) {
    console.error("CONTENTFUL_MANAGEMENT_TOKEN is not set. Add it to .env.local.");
    process.exit(1);
  }

  const mode = args.apply ? "APPLY" : "DRY RUN";
  console.log(`\nContentful sync - ${mode}`);
  console.log(`space ${SPACE_ID} / environment ${ENVIRONMENT_ID}\n`);

  const env = await withRetry("connect", async () =>
    (await (await createClient({ accessToken: MANAGEMENT_TOKEN }).getSpace(SPACE_ID))
      .getEnvironment(ENVIRONMENT_ID)),
  );

  // Only ever write fields the content model actually declares.
  const contentType = (await withRetry("content type", () =>
    env.getContentType(VEHICLE_TYPE),
  )) as ContentType;
  const modelFields = new Set(contentType.fields.map((f) => f.id));

  let targets = cars;
  if (args.only.length) targets = targets.filter((c) => args.only.includes(c.slug));
  if (!targets.length) {
    console.error("No matching vehicles. Check the slugs passed to --only.");
    process.exit(1);
  }

  const brandIds = await ensureReferenceEntries(
    env, BRAND_TYPE, [...new Set(targets.map((c) => c.brand))], BRAND_NAMES, "brandName",
  );
  const categoryIds = await ensureReferenceEntries(
    env, CATEGORY_TYPE,
    [...new Set(targets.map((c) => CATEGORY_SLUGS[c.category] ?? c.category))],
    CATEGORY_NAMES, "categoryName",
  );

  const existingEntries = await fetchAll(env, VEHICLE_TYPE);
  const entryBySlug = new Map<string, Entry>();
  for (const entry of existingEntries) {
    const slug = (entry.fields as any).urlSlug?.[LOCALE];
    if (slug) entryBySlug.set(slug, entry);
  }
  console.log(`${existingEntries.length} vehicles already in Contentful\n`);

  const report = { created: 0, updated: 0, unchanged: 0, failed: 0, skipped: 0 };
  const jsonOut: unknown[] = [];

  for (const car of targets) {
    const existing = entryBySlug.get(remoteSlug(car.slug));
    const wants = desiredFields(car, brandIds, categoryIds);

    // ---- create ----------------------------------------------------------
    if (!existing) {
      const imageSet = imagesBySlug.get(car.slug);
      if (!imageSet?.images.length) {
        console.log(`SKIP    ${car.name} - new vehicle with no images in car-images.json`);
        report.skipped++;
        continue;
      }
      console.log(`CREATE  ${car.name}  (AED ${car.pricing.daily}/day, ${imageSet.images.length} photos)`);
      jsonOut.push({ slug: car.slug, action: "create" });
      if (!args.apply) {
        report.created++;
        continue;
      }
      try {
        const assetIds = await uploadImages(env, car);
        if (!assetIds.length) throw new Error("no images uploaded");
        const fields: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(wants)) {
          if (modelFields.has(key)) fields[key] = { [LOCALE]: value };
        }
        if (modelFields.has("mainImage")) {
          fields.mainImage = { [LOCALE]: { sys: { type: "Link", linkType: "Asset", id: assetIds[0] } } };
        }
        if (modelFields.has("imageGallery")) {
          fields.imageGallery = {
            [LOCALE]: assetIds.slice(1).map((id) => ({ sys: { type: "Link", linkType: "Asset", id } })),
          };
        }
        const entry = await withRetry(`create ${car.slug}`, () => env.createEntry(VEHICLE_TYPE, { fields } as any));
        await withRetry(`publish ${car.slug}`, () => entry.publish());
        console.log(`        created and published`);
        report.created++;
      } catch (err) {
        console.log(`        FAILED: ${err}`);
        report.failed++;
      }
      continue;
    }

    // ---- update: compare field by field, touch only what differs ----------
    const current = existing.fields as Record<string, any>;
    const changes: { field: string; from: unknown; to: unknown }[] = [];

    for (const [key, value] of Object.entries(wants)) {
      if (!modelFields.has(key)) continue;
      if (args.pricesOnly && !PRICE_FIELDS.includes(key)) continue;
      if (key === "urlSlug" && slugMap[car.slug]) continue; // keep the CMS slug
      if (CMS_OWNED_ON_UPDATE.has(key)) continue;            // curator's choice wins
      if (!same(current[key]?.[LOCALE], value)) {
        changes.push({ field: key, from: current[key]?.[LOCALE], to: value });
      }
    }

    const wantsReimage = args.reimage.includes(car.slug) || args.reimage.includes(remoteSlug(car.slug));
    const hasNoImage = !current.mainImage?.[LOCALE]?.sys?.id;
    const doImages = !args.pricesOnly && (wantsReimage || hasNoImage);

    if (!changes.length && !doImages) {
      report.unchanged++;
      continue;
    }
    if (args.newOnly) {
      report.skipped++;
      continue;
    }

    console.log(`UPDATE  ${car.name}${slugMap[car.slug] ? `  -> ${slugMap[car.slug]}` : ""}`);
    for (const change of changes) {
      console.log(`        ${change.field}: ${preview(change.from)}  ->  ${preview(change.to)}`);
    }
    if (doImages) {
      const count = imagesBySlug.get(car.slug)?.images.length ?? 0;
      console.log(`        images: ${wantsReimage ? "replace with" : "attach"} ${count} photos`);
    } else if (!args.pricesOnly) {
      console.log(`        images: left as they are`);
    }
    jsonOut.push({ slug: car.slug, action: "update", changes: changes.map((c) => c.field) });

    if (!args.apply) {
      report.updated++;
      continue;
    }

    try {
      // Re-fetch so we hold the newest version and cannot clobber a concurrent edit.
      const entry = await withRetry(`get ${car.slug}`, () => env.getEntry(existing.sys.id));
      const fields = entry.fields as Record<string, any>;

      for (const change of changes) {
        fields[change.field] = { ...(fields[change.field] ?? {}), [LOCALE]: change.to };
      }
      if (doImages) {
        const assetIds = await uploadImages(env, car);
        if (assetIds.length) {
          if (modelFields.has("mainImage")) {
            fields.mainImage = { [LOCALE]: { sys: { type: "Link", linkType: "Asset", id: assetIds[0] } } };
          }
          if (modelFields.has("imageGallery")) {
            fields.imageGallery = {
              [LOCALE]: assetIds.slice(1).map((id) => ({ sys: { type: "Link", linkType: "Asset", id } })),
            };
          }
        }
      }

      const saved = await withRetry(`update ${car.slug}`, () => entry.update());
      await withRetry(`publish ${car.slug}`, () => saved.publish());
      console.log(`        updated and published`);
      report.updated++;
    } catch (err) {
      console.log(`        FAILED: ${err}`);
      report.failed++;
    }
  }

  // ---- orphans: live in Contentful but no longer in the JSON --------------
  const localSlugs = new Set(cars.flatMap((c) => [c.slug, remoteSlug(c.slug)]));
  const orphans = [...entryBySlug.keys()].filter((slug) => !localSlugs.has(slug));

  if (args.json) {
    console.log(JSON.stringify({ report, changes: jsonOut, orphans }, null, 2));
  }

  console.log("\n----------------------------------------");
  console.log(`  create    ${report.created}`);
  console.log(`  update    ${report.updated}`);
  console.log(`  unchanged ${report.unchanged}`);
  console.log(`  skipped   ${report.skipped}`);
  console.log(`  failed    ${report.failed}`);
  if (orphans.length) {
    console.log(`\n  in Contentful but not in cars-raw.json (left untouched):`);
    for (const slug of orphans) console.log(`    ${slug}`);
  }
  if (!args.apply) {
    console.log("\nNothing was written. Re-run with --apply to make these changes.");
  }
  console.log("");

  if (report.failed) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
