import "server-only";
import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";

/**
 * Server side of lead tracking. Both integrations switch on by env var and are skipped silently
 * when unset, so the redirect to WhatsApp never depends on them.
 *   UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN  → store ref → click ids for 90 days (booking upload joins on it)
 *   NEXT_PUBLIC_META_PIXEL_ID + META_CAPI_TOKEN        → server-side Contact event, deduped with the Pixel by event_id
 */
export interface LeadRecord {
  ref: string;
  kind: "whatsapp" | "call";
  src: string;
  car?: string;
  from?: string;
  to?: string;
  name?: string;
  loc?: string;
  ts: string;
  attr: Record<string, string>;
  ua?: string;
  ip?: string;
  page?: string;
}

export function readAttribution(req: NextRequest): Record<string, string> {
  try {
    const raw = req.cookies.get("dd_attr")?.value;
    return raw ? JSON.parse(decodeURIComponent(raw)) : {};
  } catch {
    return {};
  }
}

async function storeLead(lead: LeadRecord) {
  const url = process.env.UPSTASH_REDIS_REST_URL, token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return;
  // Keep the IP out of storage: it is only needed for the Meta event.
  const { ip: _ip, ...stored } = lead;
  await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify([
      ["SET", `lead:${lead.ref}`, JSON.stringify(stored), "EX", String(90 * 86400)],
      ["LPUSH", "leads", lead.ref],
      ["LTRIM", "leads", "0", "4999"],
    ]),
    cache: "no-store",
  });
}

async function sendMetaContact(lead: LeadRecord) {
  const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID, token = process.env.META_CAPI_TOKEN;
  if (!pixel || !token) return;
  const fbclid = lead.attr.fbclid;
  const body = {
    data: [{
      event_name: "Contact",
      event_time: Math.floor(Date.now() / 1000),
      event_id: lead.ref,
      action_source: "website",
      event_source_url: lead.page,
      user_data: {
        client_ip_address: lead.ip,
        client_user_agent: lead.ua,
        ...(fbclid && { fbc: `fb.1.${Date.parse(lead.attr.ts ?? "") || Date.now()}.${fbclid}` }),
        external_id: createHash("sha256").update(lead.ref).digest("hex"),
      },
      custom_data: { content_name: lead.car, lead_type: lead.kind, source: lead.src },
    }],
    ...(process.env.META_TEST_EVENT_CODE && { test_event_code: process.env.META_TEST_EVENT_CODE }),
  };
  const res = await fetch(`https://graph.facebook.com/v21.0/${pixel}/events?access_token=${token}`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), cache: "no-store",
  });
  // A bad token used to fail silently (23 Nov 2026: the old token could not see the pixel). Log Meta's answer.
  if (!res.ok) throw new Error(`Meta CAPI ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

/** Fire-and-forget: errors are logged, never thrown, and never delay the redirect beyond ~1.5 s. */
export async function recordLead(lead: LeadRecord) {
  const work = Promise.allSettled([storeLead(lead), sendMetaContact(lead)]).then((r) =>
    r.forEach((x) => x.status === "rejected" && console.error("lead tracking", x.reason)));
  await Promise.race([work, new Promise((res) => setTimeout(res, 1500))]);
}

export function requestMeta(req: NextRequest) {
  return {
    ua: req.headers.get("user-agent") ?? undefined,
    ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
    page: req.headers.get("referer") ?? undefined,
  };
}
