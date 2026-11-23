import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "gzcp7ons";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2026-11-01";

/** The dataset is public, so reads need no token. Freshness comes from tag revalidation (app/api/revalidate). */
export const client = createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: "published" });

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}, tags: string[] = ["sanity"]): Promise<T> {
  return client.fetch<T>(query, params, { next: { tags, revalidate: 3600 } });
}
