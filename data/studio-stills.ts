/**
 * Studio stills (the approved studio look, real plates seated): one per car, public/collection/<slug>.jpg.
 * Source: Clients/DreamDrives/assets/generated/ad-batch-static-2026-11-07/studio/plated/ (8 on 7 to 9 Nov, 20 on 23 Nov).
 */
export const STUDIO_SLUGS = new Set<string>(["audi-a3", "bmw-420i-2026", "bmw-x6-black", "bmw-x6-white", "cadillac-escalade-2025", "gmc-yukon-at4-2023", "gmc-yukon-at4-2025", "hyundai-accent-2023", "hyundai-accent-2024", "hyundai-elantra", "hyundai-tucson", "kia-k5", "kia-sportage", "lamborghini-urus-performante-2024", "lamborghini-urus-s-2024", "land-rover-range-rover-vogue-2023", "mazda-3", "mazda-6", "mazda-cx5", "mazda-cx5-red", "mercedes-benz-g63-amg-2025", "mercedes-c200-grey", "mercedes-c200-white", "mercedes-g63-2025-sand", "mercedes-g63-amg-black", "mercedes-g63-amg-blue", "nissan-xterra", "range-rover-sport"]);

export const studioStill = (slug: string): string | undefined => (STUDIO_SLUGS.has(slug) ? `/collection/${slug}.jpg` : undefined);
