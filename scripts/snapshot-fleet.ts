/**
 * Writes data/fleet-snapshot.json from Sanity: the fallback the site uses if Sanity is unreachable,
 * and the source for client-side counts (nav). Run after fleet changes:  bun scripts/snapshot-fleet.ts
 */
import { writeFileSync } from "node:fs";
import { createClient } from "@sanity/client";
import { ALL_CARS } from "../lib/sanity/queries";
import { toCar } from "../data/cars";

const client = createClient({ projectId: "gzcp7ons", dataset: "production", apiVersion: "2026-11-01", useCdn: false });
const cars = await client.fetch(ALL_CARS.replace("available != false", "defined(slug)"));
writeFileSync("data/fleet-snapshot.json", JSON.stringify(cars.map(toCar), null, 2) + "\n");
console.log(`snapshot: ${cars.length} cars`);
