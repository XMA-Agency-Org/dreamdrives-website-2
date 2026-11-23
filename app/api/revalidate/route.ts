import { revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Sanity webhook target (project gzcp7ons → API → Webhooks, on create/update/delete,
 * projection {_type, "slug": slug.current}, secret = SANITY_REVALIDATE_SECRET).
 */
export async function POST(req: NextRequest) {
  const { isValidSignature, body } = await parseBody<{ _type: string; slug?: string }>(req, process.env.SANITY_REVALIDATE_SECRET);
  if (!isValidSignature) return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  if (!body?._type) return NextResponse.json({ message: "No type" }, { status: 400 });

  const tags = ["sanity", body._type === "car" ? "cars" : body._type];
  if (body.slug) tags.push(`${body._type === "car" ? "car" : body._type}:${body.slug}`);
  for (const tag of tags) revalidateTag(tag, "max");
  return NextResponse.json({ revalidated: tags });
}
