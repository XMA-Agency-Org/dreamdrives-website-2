import { NextResponse, type NextRequest } from "next/server";
import { isRef, makeRef, PHONE_E164 } from "@/lib/contact";
import { isRealTap, readAttribution, recordLead, requestMeta } from "@/lib/server/leads";

export const dynamic = "force-dynamic";

/** /go/call?src=&ref= → logs the call tap, then hands off to the phone dialler. */
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  const ref = isRef(q.get("ref")) ? q.get("ref")! : makeRef();
  if (isRealTap(req, q.get("ref"))) await recordLead({
    ref, kind: "call", src: (q.get("src") ?? "unknown").slice(0, 40),
    ts: new Date().toISOString(), attr: readAttribution(req), ...requestMeta(req),
  });
  const res = NextResponse.redirect(`tel:${PHONE_E164}`, 302);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

/** Beacon from the Call button (navigator.sendBeacon), which dials tel: directly. */
export async function POST(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  if (!isRef(q.get("ref"))) return new NextResponse(null, { status: 400 });
  if (!isRealTap(req, q.get("ref"))) return new NextResponse(null, { status: 204 });
  await recordLead({
    ref: q.get("ref")!, kind: "call", src: (q.get("src") ?? "unknown").slice(0, 40),
    ts: new Date().toISOString(), attr: readAttribution(req), ...requestMeta(req),
  });
  return new NextResponse(null, { status: 204 });
}
