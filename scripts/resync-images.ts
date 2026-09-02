/**
 * Rebuild data/car-images.json from what is actually on disk in public/CARS/.
 *
 *   bun scripts/resync-images.ts            list the drift, change nothing
 *   bun scripts/resync-images.ts --apply    rewrite the manifest to match disk
 *
 * Run this after adding, deleting, renaming or reordering photos in a car's folder.
 * Files are ordered by the number at the end of the filename, so `-01.jpg` comes before
 * `-2.jpg`; the first file becomes the thumbnail and the card hero. Anything named `_unused`
 * is ignored, so a photo can be retired by renaming it rather than deleting it.
 *
 * Afterwards, push the new order to the CMS:
 *   bun scripts/sync-contentful.ts --apply --reimage <slug>
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST = join(projectRoot, "data", "car-images.json");
const apply = process.argv.includes("--apply");

type Entry = {
  carName: string;
  carSlug: string;
  category: string;
  images: string[];
  thumbnail: string;
};

const manifest: Entry[] = JSON.parse(readFileSync(MANIFEST, "utf-8"));

/** Trailing number in a filename, so -01 and -1 sort the same way. */
function index(file: string): number {
  const match = file.match(/-(\d+)\.[a-z]+$/i);
  return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
}

const IMAGE = /\.(jpe?g|png|webp)$/i;
const SKIP = /UPTOWN-LOGO|Thumbs\.db|_unused/i;

let changed = 0;
let broken = 0;

for (const entry of manifest) {
  if (!entry.images.length) continue;

  // The manifest stores web paths; the folder is whatever directory they sit in.
  const webDir = entry.images[0].slice(0, entry.images[0].lastIndexOf("/"));
  const diskDir = join(projectRoot, "public", webDir);

  if (!existsSync(diskDir)) {
    console.log(`MISSING FOLDER  ${entry.carSlug}  ->  public${webDir}`);
    broken++;
    continue;
  }

  const files = readdirSync(diskDir)
    .filter((f) => IMAGE.test(f) && !SKIP.test(f))
    .sort((a, b) => index(a) - index(b) || a.localeCompare(b));

  if (!files.length) {
    console.log(`EMPTY FOLDER    ${entry.carSlug}  ->  public${webDir}`);
    broken++;
    continue;
  }

  const images = files.map((f) => `${webDir}/${f}`);
  const before = entry.images;
  const sameList = before.length === images.length && before.every((p, i) => p === images[i]);
  const sameThumb = entry.thumbnail === images[0];
  if (sameList && sameThumb) continue;

  const added = images.filter((p) => !before.includes(p));
  const removed = before.filter((p) => !images.includes(p));
  const reordered = !added.length && !removed.length;

  console.log(`\n${entry.carSlug}`);
  console.log(`  ${before.length} -> ${images.length} images${reordered ? "  (reordered)" : ""}`);
  if (removed.length) console.log(`  removed ${removed.length}: ${removed.map(base).join(", ")}`);
  if (added.length) console.log(`  added   ${added.length}: ${added.map(base).join(", ")}`);
  if (!sameThumb) console.log(`  cover   ${base(entry.thumbnail)}  ->  ${base(images[0])}`);

  entry.images = images;
  entry.thumbnail = images[0];
  changed++;
}

function base(path: string) {
  return path.slice(path.lastIndexOf("/") + 1);
}

console.log("\n----------------------------------------");
console.log(`  cars out of sync  ${changed}`);
if (broken) console.log(`  folders missing   ${broken}`);

if (!changed) {
  console.log("\nThe manifest already matches what is on disk.\n");
} else if (apply) {
  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  console.log("\ndata/car-images.json rewritten.");
  console.log("Push the new order to the CMS with:");
  console.log("  bun scripts/sync-contentful.ts --apply --reimage <slug>\n");
} else {
  console.log("\nNothing was written. Re-run with --apply.\n");
}
