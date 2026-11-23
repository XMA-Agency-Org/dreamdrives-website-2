/**
 * Every WhatsApp and call button goes through /go/wa or /go/call so the lead can be traced to its ad.
 * The ref code (e.g. DD-7K3Q) is generated on click, written into the WhatsApp text, and stored
 * server-side with the visitor's click ids. Dates are optional (the calculator fills them).
 */
export const WHATSAPP_NUMBER = "971545555402";
export const PHONE_E164 = "+971545555402";

export type LeadSource =
  | "hero" | "sticky_bar" | "header" | "car_card" | "car_detail" | "calculator"
  | "landing" | "footer" | "mobile_menu" | "cta_section" | "floating_cta" | "contact";

export interface WaParams {
  car?: string;
  from?: string; // yyyy-mm-dd
  to?: string;
  src: LeadSource;
  text?: string; // custom opener, e.g. from a landing page
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

/** The message the customer sees prefilled. Short: people edit long ones, and the ref must survive. */
export function buildWhatsAppText(p: Omit<WaParams, "src">, ref?: string): string {
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
  return `/go/wa?${q.toString()}`;
}

export const telHref = `tel:${PHONE_E164}`;
