# Fleet Data

How vehicles, prices and photos are stored, and how to add a car.

## Files

| File | Role |
| --- | --- |
| `data/cars-raw.json` | Every vehicle: identity, pricing, specs, features. The single source of truth for rates. |
| `data/car-images.json` | Photo manifest, keyed by `carSlug`. Maps a slug to its ordered image paths and thumbnail. |
| `data/cars-data.ts` | Joins the two at import time via `getImagesForSlug(slug)`. |
| `data/cars.ts` | Query functions (`getAllCars`, `getCarBySlug`, …) plus the async Contentful-first variants. |
| `public/CARS/<FOLDER>/` | The image files themselves. |

A car with no matching entry in `car-images.json` renders with an empty gallery, so the two files must be
updated together.

## Image convention

- One folder per vehicle under `public/CARS/`, named in caps after the car (`G63 2025 SAND`).
- Files inside are `<slug>-<n>.jpg`, numbered from 1, in display order.
- The first image is the thumbnail and card hero — lead with a three-quarter exterior shot.
- Resized to fit 1280×1280, JPEG quality 50, EXIF stripped:
  `magick in.jpg -auto-orient -resize '1280x1280>' -quality 50 -strip out.jpg`

**`public/CARS/` is gitignored.** New photo folders are not committed and must be copied to the
server (or uploaded to Contentful) separately from the code deploy.

## After reordering or curating photos

Renaming, deleting or reordering files in a car's folder leaves `car-images.json` pointing at
paths that no longer exist. Rebuild it from disk rather than editing the JSON by hand:

```bash
bun scripts/resync-images.ts            # show the drift, change nothing
bun scripts/resync-images.ts --apply    # rewrite the manifest to match disk
```

Files are ordered by the number at the end of the filename, so `-01.jpg` and `-1.jpg` sort the
same way and zero-padding a folder is safe. The first file becomes the thumbnail and the card
hero, so putting the best exterior shot at `-01` is how you set the cover.

Anything named `_unused` is ignored — retire a photo by renaming it rather than deleting it.

Then push the new order to the CMS:

```bash
bun scripts/sync-contentful.ts --apply --only <slug> --reimage <slug>
```

`--reimage` uploads fresh assets and repoints the entry. The previous assets stay in the
Contentful media library, unreferenced.

## Pushing to Contentful

Contentful is the live source: `output: "export"` means the build reads it at build time and
bakes the result into the static site. `public/CARS/` is only the local fallback.

```bash
bun scripts/sync-contentful.ts                       # dry run, writes nothing
bun scripts/sync-contentful.ts --apply               # apply every pending change
bun scripts/sync-contentful.ts --apply --prices      # only the four price fields
bun scripts/sync-contentful.ts --apply --new         # only create missing vehicles
bun scripts/sync-contentful.ts --apply --only a,b    # limit to these slugs
bun scripts/sync-contentful.ts --apply --reimage a   # replace the photos on a vehicle
```

The script compares field by field and writes only what differs, so it is safe to re-run —
a second pass reports everything as unchanged.

**Images are never touched on a vehicle that already has one.** They are uploaded only when
an entry has no main image, or when you name it in `--reimage`.

**Fields the CMS owns.** `category` and `featuredFlag` are set when a vehicle is created and
never overwritten afterwards: a curator may file a car under Economy or Luxury, or pull it
off the homepage, and the local JSON cannot express either. Adjust `CMS_OWNED_ON_UPDATE` in
the script to change that.

**Category names differ from the code.** `types/car.ts` knows only `sedan` and `suv`, while
Contentful curates `suv`, `luxury-sedan`, `economy` and `luxury`. `CATEGORY_SLUGS` maps
between them — never let a bare `sedan` category get created.

**Slug aliases.** `data/contentful-slug-map.json` maps a local slug to the slug a vehicle
already uses in Contentful, so a car loaded into the CMS under another name is updated in
place instead of duplicated. Contentful's slug stays canonical and `urlSlug` is not
overwritten for a mapped car.

Uploading changes nothing on the live site by itself. The site must be rebuilt and
redeployed afterwards.

## Pricing

Rates come from the Dream Drives WhatsApp Business catalogue and are per day in AED. The derived
tiers roughly follow:

- `weekly` ≈ daily × 6.3
- `monthly` ≈ daily × 21.3
- `deposit` scales with the tier (AED 1,500 economy → 8,500 exotic)

Round to a clean figure rather than using the exact multiple.

## Adding a vehicle

1. Drop the resized photos into `public/CARS/<FOLDER>/` using the naming convention above.
2. Append an entry to `data/car-images.json` with `carName`, `carSlug`, `category`, `images`, `thumbnail`.
3. Append an entry to `data/cars-raw.json` with a fresh `id`, the same `slug`, and full `pricing`/`specs`.
4. `brand` must be one of the `CarBrand` values in `types/car.ts`; `category` is only `sedan` or `suv`
   (coupes are filed as `sedan`).
5. Set `isFeatured: true` only for cars that should reach the homepage.

Brand logos in `data/brands.ts` cover eight marques only. A car whose brand has no logo entry still
lists and filters correctly — it just does not appear in the brand marquee.

## August 2026 catalogue sync

Ten vehicles were added from the client's photo sets (Urus Performante, two 2025 G63s, a 2024 G63
Black, Range Rover Vogue 2024, Escalade 2025, Yukon 2026 and 2023, BMW 420i 2026, Audi A3 2024).
Seven existing cars were repriced against the same catalogue; their original photos were kept.
