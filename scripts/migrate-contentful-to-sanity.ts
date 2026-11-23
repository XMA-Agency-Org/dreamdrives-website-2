/**
 * One-off move of the fleet from Contentful (space tsz5b6wk9hsp) to Sanity (project gzcp7ons).
 *
 *   bun scripts/migrate-contentful-to-sanity.ts            # dry run: writes migration/sanity-docs.json, touches nothing
 *   bun scripts/migrate-contentful-to-sanity.ts --write    # uploads images and creates/replaces documents
 *
 * Reads the export in migration/{entries,assets}.json (made with the Contentful delivery API).
 * Env: SANITY_API_WRITE_TOKEN (from ~/.config/dreamdrives/sanity.env).
 *
 * Safe to rerun: document ids are fixed (car-<slug>, brand-<slug>, category-<slug>; never dots: dotted ids are private paths the public API cannot read) and each image
 * is uploaded once, keyed by its Contentful asset id in migration/asset-map.json.
 * Slugs are copied unchanged so no live URL moves.
 */
import { createClient } from "@sanity/client";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import localFleet from "../data/cars-raw.json";
import slugMap from "../data/contentful-slug-map.json";

const WRITE = process.argv.includes("--write");
const entries = JSON.parse(readFileSync("migration/entries.json", "utf8"));
const assets = JSON.parse(readFileSync("migration/assets.json", "utf8"));
const assetById = new Map<string, any>(assets.items.map((a: any) => [a.sys.id, a]));
const byId = new Map<string, any>(entries.items.map((e: any) => [e.sys.id, e]));
const type = (e: any) => e.sys.contentType.sys.id;

/** Corrections confirmed by the client (see Clients/DreamDrives/README.md, 9 Nov 2026). Slugs stay put. */
const CORRECTIONS: Record<string, Record<string, unknown>> = {
  "cadillac-escalade-2025": { name: "Cadillac Escalade 2026", year: 2026, plate: "P 5503" },
  "land-rover-range-rover-vogue-2023": { name: "Range Rover Vogue 2027", year: 2027, plate: "R 40444", variant: "Range Rover Vogue" },
  "lamborghini-urus-s-2024": { variant: "Urus S" },
  "lamborghini-urus-performante-2024": { variant: "Urus Performante" },
};

// Body type: from the Contentful category when it names one, else from cars-raw.json (same rule as the old site).
const reverseSlug = new Map<string, string>();
for (const [local, cf] of Object.entries(slugMap)) if (!local.startsWith("_")) reverseSlug.set(cf as string, local);
const localBody = new Map<string, string>((localFleet as any[]).map((c) => [c.slug, c.category]));
function bodyType(vehicleSlug: string, categorySlug?: string): "suv" | "sedan" {
  if (categorySlug === "suv") return "suv";
  if (categorySlug && /sedan|coupe|sports|convertible/.test(categorySlug)) return "sedan";
  const local = localBody.get(reverseSlug.get(vehicleSlug) ?? vehicleSlug);
  return local === "suv" ? "suv" : "sedan";
}

const richToBlocks = (rt: any) =>
  (rt?.content ?? [])
    .filter((n: any) => n.nodeType === "paragraph")
    .map((n: any, i: number) => ({
      _type: "block", _key: `p${i}`, style: "normal", markDefs: [],
      children: [{ _type: "span", _key: `s${i}`, marks: [], text: (n.content ?? []).map((t: any) => t.value ?? "").join("") }],
    }))
    .filter((b: any) => b.children[0].text.trim());

const num = (v: unknown) => (typeof v === "number" ? v : v ? Number(v) || undefined : undefined);
const clean = <T extends Record<string, unknown>>(o: T) =>
  Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && !v.length)));

const sanity = createClient({
  projectId: "gzcp7ons", dataset: "production", apiVersion: "2026-11-01", useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const MAP_FILE = "migration/asset-map.json";
const assetMap: Record<string, string> = existsSync(MAP_FILE) ? JSON.parse(readFileSync(MAP_FILE, "utf8")) : {};

async function imageRef(cfAssetId: string | undefined, alt: string, extra: Record<string, unknown> = {}) {
  if (!cfAssetId) return undefined;
  const a = assetById.get(cfAssetId);
  if (!a?.fields?.file?.url) { console.warn("missing asset", cfAssetId); return undefined; }
  let ref = assetMap[cfAssetId];
  if (!ref && WRITE) {
    const url = "https:" + a.fields.file.url;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`download ${url} ${res.status}`);
    const up = await sanity.assets.upload("image", Buffer.from(await res.arrayBuffer()), {
      filename: a.fields.file.fileName, contentType: a.fields.file.contentType, source: { name: "contentful", id: cfAssetId, url },
    });
    ref = up._id;
    assetMap[cfAssetId] = ref;
    writeFileSync(MAP_FILE, JSON.stringify(assetMap, null, 2));
  }
  return clean({ _type: "image", _key: cfAssetId.slice(0, 12), asset: { _type: "reference", _ref: ref ?? `pending:${cfAssetId}` }, alt, ...extra });
}

async function main() {
  if (WRITE && !process.env.SANITY_API_WRITE_TOKEN) throw new Error("SANITY_API_WRITE_TOKEN not set");
  const docs: any[] = [];

  for (const e of entries.items.filter((e: any) => type(e) === "carRentalBrand")) {
    const f = e.fields;
    const logo = await imageRef(f.logo?.sys?.id, f.brandName);
    docs.push(clean({ _id: `brand-${f.urlSlug}`, _type: "brand", name: f.brandName, slug: { _type: "slug", current: f.urlSlug },
      description: f.description, logo: logo && { ...logo, _key: undefined } }));
  }
  for (const e of entries.items.filter((e: any) => type(e) === "vehicleCategory")) {
    const f = e.fields;
    docs.push(clean({ _id: `category-${f.urlSlug}`, _type: "category", name: f.categoryName, slug: { _type: "slug", current: f.urlSlug }, description: f.description }));
  }

  const cars = entries.items.filter((e: any) => type(e) === "rentalVehicle");
  for (const [i, e] of cars.entries()) {
    const f = e.fields;
    const slug = f.urlSlug;
    const fix = CORRECTIONS[slug] ?? {};
    const name = (fix.name as string) ?? f.vehicleName;
    const brandSlug = byId.get(f.brand?.sys?.id)?.fields?.urlSlug;
    const categorySlug = byId.get(f.category?.sys?.id)?.fields?.urlSlug;
    const main = await imageRef(f.mainImage?.sys?.id, name);
    const gallery = [];
    for (const g of f.imageGallery ?? []) {
      if (g.sys.id === f.mainImage?.sys?.id) continue;
      gallery.push(await imageRef(g.sys.id, name));
    }
    docs.push(clean({
      _id: `car-${slug}`, _type: "car",
      name, slug: { _type: "slug", current: slug },
      variant: fix.variant, plate: fix.plate,
      brand: brandSlug ? { _type: "reference", _ref: `brand-${brandSlug}` } : undefined,
      category: categorySlug ? { _type: "reference", _ref: `category-${categorySlug}` } : undefined,
      bodyType: bodyType(slug, categorySlug),
      year: (fix.year as number) ?? num(f.modelYear),
      tagline: f.tagline, description: richToBlocks(f.description),
      featured: f.featuredFlag ?? false, available: f.availabilityStatus ?? true, order: i,
      dailyPrice: num(f.dailyPrice), weeklyPrice: num(f.weeklyPrice), monthlyPrice: num(f.monthlyPrice), deposit: num(f.depositAmount),
      engine: f.engine, horsepower: num(f.horsepower), acceleration: f.accelerationTime, topSpeed: num(f.topSpeed),
      transmission: f.transmissionType, fuelType: f.fuelType, fuelConsumption: f.fuelConsumption,
      seats: num(f.passengerCount), doors: num(f.doorCount),
      exteriorColor: f.exteriorColor, interiorColor: f.interiorColor,
      features: f.vehicleFeatures ?? f.features,
      mainImage: main && { ...main, _key: undefined },
      gallery: gallery.filter(Boolean),
    }));
    if (WRITE) process.stdout.write(`\r${i + 1}/${cars.length} cars, ${Object.keys(assetMap).length} images uploaded`);
  }

  writeFileSync("migration/sanity-docs.json", JSON.stringify(docs, null, 2));
  const counts = docs.reduce((a: any, d) => ((a[d._type] = (a[d._type] ?? 0) + 1), a), {});
  const imgs = docs.filter((d) => d._type === "car").reduce((n, d) => n + 1 + (d.gallery?.length ?? 0), 0);
  console.log(`\n${WRITE ? "WRITE" : "DRY RUN"}: ${JSON.stringify(counts)}, car images ${imgs}`);

  if (!WRITE) return;
  const tx = sanity.transaction();
  for (const d of docs) tx.createOrReplace(d);
  await tx.commit({ visibility: "async" });
  console.log("committed", docs.length, "documents");
}

main().catch((e) => { console.error(e); process.exit(1); });
