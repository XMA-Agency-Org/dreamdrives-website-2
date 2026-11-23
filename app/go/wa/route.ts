import { NextResponse, type NextRequest } from "next/server";
import { buildWhatsAppText, isRef, makeRef, WHATSAPP_NUMBER } from "@/lib/contact";
import { readAttribution, recordLead, requestMeta } from "@/lib/server/leads";

export const dynamic = "force-dynamic";

/** /go/wa?car=&from=&to=&src=&text=&ref=  → logs the lead, then 302 to WhatsApp with the ref in the message. */
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  const ref = isRef(q.get("ref")) ? q.get("ref")! : makeRef();
  const lead = {
    ref, kind: "whatsapp" as const, src: (q.get("src") ?? "unknown").slice(0, 40),
    car: q.get("car")?.slice(0, 80) ?? undefined,
    from: q.get("from") ?? undefined, to: q.get("to") ?? undefined,
    name: q.get("name")?.slice(0, 60) ?? undefined, loc: q.get("loc")?.slice(0, 80) ?? undefined,
    ts: new Date().toISOString(), attr: readAttribution(req), ...requestMeta(req),
  };
  await recordLead(lead);
  const est = Number(q.get("est")) || undefined, days = Number(q.get("days")) || undefined;
  const text = buildWhatsAppText({ car: lead.car, from: lead.from, to: lead.to, name: lead.name, loc: lead.loc, est, days,
    text: q.get("text")?.slice(0, 120) ?? undefined }, ref);
  const res = NextResponse.redirect(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, 302);
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Cache-Control", "no-store");
  return res;
}
