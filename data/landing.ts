import { sanityFetch } from "@/lib/sanity/client";
import { LANDING_BY_SLUG, LANDING_PAGES } from "@/lib/sanity/queries";

export interface LandingPage {
  kind: "model" | "intent" | "area";
  title: string;
  h1: string;
  slug: string;
  intro?: string;
  answer?: string;
  body?: string;
  faqs?: { question: string; answer: string }[];
  whatsappText?: string;
  seoTitle?: string;
  seoDescription?: string;
  carSlugs?: string[];
}

export async function getLandingPages(): Promise<Pick<LandingPage, "title" | "h1" | "slug" | "kind">[]> {
  try { return (await sanityFetch(LANDING_PAGES, {}, ["sanity", "landingPage"])) ?? []; } catch { return []; }
}

export async function getLandingPage(slug: string): Promise<LandingPage | null> {
  try { return await sanityFetch<LandingPage | null>(LANDING_BY_SLUG, { slug }, ["sanity", "landingPage", `landingPage:${slug}`]); } catch { return null; }
}
