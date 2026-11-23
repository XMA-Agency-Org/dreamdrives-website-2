/**
 * Every WhatsApp and call button goes through /go/wa or /go/call so the lead can be traced to its ad.
 * The ref code (e.g. DD-7K3Q) is generated on click, written into the WhatsApp text, and stored
 * server-side with the visitor's click ids. Dates are optional (the calculator fills them).
 */
export const WHATSAPP_NUMBER = "971545555402";
export const PHONE_E164 = "+971545555402";

export type LeadSource =
  | "hero" | "sticky_bar" | "header" | "car_card" | "car_detail" | "calculator"
  | "landing" | "footer" | "mobile_menu" | "cta_section" | "floating_cta" | "contact" | "booking_form";

export interface WaParams {
  car?: string;
  from?: string; // yyyy-mm-dd
  to?: string;
  src: LeadSource;
  text?: string; // custom opener, e.g. from a landing page
  /** Booking form fields (all optional) */
  name?: string;
  loc?: string;
  est?: number; // estimated rental total, AED
  days?: number;
  budget?: string; // e.g. "AED 1,000 to 2,000 a day"
}

const ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ"; // no 0/O/1/I/L: read aloud without confusion

export function makeRef(): string {
  let s = "";
  const bytes = typeof crypto !== "undefined" && "getRandomValues" in crypto
    ? crypto.getRandomValues(new Uint8Array(4))
    : Uint8Array.from({ length: 4 }, () => Math.floor(Math.random() * 256));
  for (const b of bytes) s += ALPHABET[b % ALPHABET.length];
  return `DD-${s}`;
}

export const isRef = (v: unknown): v is string => typeof v === "string" && /^DD-[2-9A-Z]{4}$/.test(v);

function fmtDate(iso?: string): string | undefined {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return undefined;
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

/** Booking request from the form: one fact per line so Basil can read it at a glance. */
export function buildBookingText(p: Omit<WaParams, "src">, ref?: string): string {
  const from = fmtDate(p.from), to = fmtDate(p.to);
  const lines = ["Hi Dream Drives, I'd like to book:"];
  if (p.car) lines.push(`Car: ${p.car}`);
  if (from && to) lines.push(`Dates: ${from} to ${to}${p.days ? ` (${p.days} ${p.days === 1 ? "day" : "days"})` : ""}`);
  else if (from) lines.push(`From: ${from}`);
  if (p.budget) lines.push(`Budget: ${p.budget}`);
  if (p.loc) lines.push(`Delivery: ${p.loc}`);
  if (p.est) lines.push(`Estimate: AED ${Math.round(p.est).toLocaleString("en-US")}`);
  if (p.name) lines.push(`Name: ${p.name}`);
  if (ref) lines.push(`Ref ${ref}`);
  return lines.join("\n");
}

/** The message the customer sees prefilled. Short: people edit long ones, and the ref must survive. */
export function buildWhatsAppText(p: Omit<WaParams, "src">, ref?: string): string {
  if (p.name || p.loc) return buildBookingText(p, ref);
  const from = fmtDate(p.from), to = fmtDate(p.to);
  let msg = p.text?.trim() || (p.car ? `Hi, I'd like to rent the ${p.car}` : "Hi, I'd like to rent a car");
  if (from && to) msg += ` from ${from} to ${to}`;
  else if (from) msg += ` from ${from}`;
  msg += ".";
  if (ref) msg += ` Ref ${ref}`;
  return msg;
}

export function waHref(p: WaParams): string {
  const q = new URLSearchParams({ src: p.src });
  if (p.car) q.set("car", p.car);
  if (p.from) q.set("from", p.from);
  if (p.to) q.set("to", p.to);
  if (p.text) q.set("text", p.text);
  if (p.name) q.set("name", p.name);
  if (p.loc) q.set("loc", p.loc);
  if (p.est) q.set("est", String(Math.round(p.est)));
  if (p.days) q.set("days", String(p.days));
  if (p.budget) q.set("budget", p.budget);
  return `/go/wa?${q.toString()}`;
}

export const telHref = `tel:${PHONE_E164}`;
