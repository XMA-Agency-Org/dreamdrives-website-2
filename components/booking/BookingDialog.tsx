"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { X, CalendarDays, MapPin, User, Car as CarIcon } from "lucide-react";
import { FaWhatsapp } from "@react-icons/all-files/fa/FaWhatsapp";
import { getAllCars } from "@/data/cars";
import { aed, daysBetween, estimate, isoDate } from "@/lib/pricing";
import { waHref } from "@/lib/contact";
import { trackEvent, trackLead } from "@/lib/track";
import { cn } from "@/lib/utils";

/**
 * "Book your car": a short booking request that ends in WhatsApp, already written.
 * Any element with data-book opens it (data-car = slug, data-from / data-to = yyyy-mm-dd), so server-rendered
 * buttons need no client code. Fields are the minimum Basil needs to quote: car, dates, delivery place, name.
 * No phone or email field: WhatsApp gives him the number, and every extra field costs bookings.
 */

const DURATIONS = [
  { id: "1", label: "1 day", days: 1 },
  { id: "3", label: "Weekend", days: 3 },
  { id: "7", label: "A week", days: 7 },
  { id: "30", label: "A month", days: 30 },
] as const;

const AREAS = ["Dubai Marina", "Downtown Dubai", "Palm Jumeirah", "JBR", "Business Bay", "DXB Airport", "Jumeirah", "Deira", "DIFC", "Al Barsha"];

const addDays = (iso: string, n: number) => isoDate(new Date(Date.parse(`${iso}T12:00:00`) + n * 86400000));

export function BookingDialog() {
  const cars = useMemo(() => [...getAllCars()].sort((a, b) => b.pricing.daily - a.pricing.daily), []);
  const ref = useRef<HTMLDialogElement>(null);
  const today = isoDate(new Date());
  const [slug, setSlug] = useState(cars[0]?.slug ?? "");
  const [from, setFrom] = useState(addDays(today, 1));
  const [to, setTo] = useState(addDays(today, 4));
  const [loc, setLoc] = useState("");
  const [name, setName] = useState("");
  const [src, setSrc] = useState("booking_form");

  const car = cars.find((c) => c.slug === slug);
  const days = daysBetween(from, to);
  const est = car ? estimate(car.pricing, days) : null;

  const open = useCallback((opts: { car?: string; from?: string; to?: string; src?: string }) => {
    if (opts.car && cars.some((c) => c.slug === opts.car)) setSlug(opts.car);
    if (opts.from) setFrom(opts.from);
    if (opts.to) setTo(opts.to);
    setSrc(opts.src ?? "booking_form");
    ref.current?.showModal();
    trackEvent("booking_form_open", { car: opts.car, source: opts.src });
  }, [cars]);

  // One delegated listener: any [data-book] element opens the form.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.("[data-book]") as HTMLElement | null;
      if (!el) return;
      e.preventDefault();
      open({ car: el.dataset.car, from: el.dataset.from, to: el.dataset.to, src: el.dataset.src });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  const setDuration = (n: number) => setTo(addDays(from, n));
  const onFrom = (v: string) => { const keep = Math.max(1, days); setFrom(v); setTo(addDays(v, keep)); };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!car || !est) return;
    const leadRef = trackLead({ kind: "whatsapp", src: "booking_form", car: car.name, price: car.pricing.daily, days: est.days });
    trackEvent("booking_submit", { car: car.name, days: est.days, value: est.total, placement: src, has_location: !!loc });
    const href = waHref({ src: "booking_form", car: car.name, from, to, loc: loc.trim() || undefined, name: name.trim() || undefined, est: est.total, days: est.days });
    const url = `${href}&ref=${leadRef}`;
    // Same-origin /go/wa then a 302 to wa.me; if the browser blocks the new tab, continue in this one.
    if (!window.open(url, "_blank")) window.location.assign(url);
    ref.current?.close();
  };

  const field = "h-12 w-full rounded-xl bg-white/[0.04] px-4 text-foreground ring-1 ring-inset ring-white/10 outline-none transition focus:ring-primary-500";
  const label = "mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-muted";

  return (
    <dialog
      ref={ref}
      aria-label="Book your car"
      className="m-auto w-[min(560px,calc(100vw-1.5rem))] rounded-[2rem] bg-transparent p-0 text-foreground backdrop:bg-black/70 backdrop:backdrop-blur-sm open:animate-[rise_0.6s_cubic-bezier(0.32,0.72,0,1)_both]"
      onClick={(e) => { if (e.target === ref.current) ref.current?.close(); }}
    >
      <div className="bezel">
        <form onSubmit={submit} className="bezel-core relative max-h-[90dvh] overflow-y-auto p-6 sm:p-8">
          <button type="button" onClick={() => ref.current?.close()} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-foreground-muted hover:text-foreground" aria-label="Close">
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>

          <p className="eyebrow mb-4">Booking request</p>
          <h2 className="font-display text-3xl font-extrabold tracking-[-0.02em]">Book your car</h2>
          <p className="mt-2 text-sm text-foreground-muted">Tell us the car and dates. We confirm availability and the final price on WhatsApp.</p>

          <div className="mt-7 space-y-5">
            <label className="block">
              <span className={label}><CarIcon className="h-3.5 w-3.5" strokeWidth={1.5} />Car</span>
              <select value={slug} onChange={(e) => setSlug(e.target.value)} className={field} required>
                {cars.map((c) => <option key={c.slug} value={c.slug}>{c.name}, {aed(c.pricing.daily)}/day</option>)}
              </select>
            </label>

            <div>
              <span className={label}><CalendarDays className="h-3.5 w-3.5" strokeWidth={1.5} />How long</span>
              <div className="mb-3 grid grid-cols-4 gap-2">
                {DURATIONS.map((d) => (
                  <button key={d.id} type="button" onClick={() => setDuration(d.days)}
                    className={cn("h-11 rounded-full text-sm font-medium ring-1 ring-inset transition",
                      days === d.days ? "bg-white text-neutral-950 ring-white" : "ring-white/12 text-foreground-muted hover:text-foreground")}>
                    {d.label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="mb-1 block text-xs text-foreground-subtle">Pick up</span>
                  <input type="date" min={today} value={from} onChange={(e) => onFrom(e.target.value)} className={field} required />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs text-foreground-subtle">Return</span>
                  <input type="date" min={addDays(from, 1)} value={to} onChange={(e) => setTo(e.target.value)} className={field} required />
                </label>
              </div>
            </div>

            <label className="block">
              <span className={label}><MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />Deliver to</span>
              <input list="dd-areas" value={loc} onChange={(e) => setLoc(e.target.value)} placeholder="Hotel, area or the airport" className={field} />
              <datalist id="dd-areas">{AREAS.map((a) => <option key={a} value={a} />)}</datalist>
            </label>

            <label className="block">
              <span className={label}><User className="h-3.5 w-3.5" strokeWidth={1.5} />Your name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="So we know who we're talking to" autoComplete="name" className={field} />
            </label>
          </div>

          {est && car && (
            <div className="mt-6 flex items-end justify-between gap-4 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-inset ring-white/10">
              <div className="text-sm text-foreground-muted">
                {est.days} {est.days === 1 ? "day" : "days"} × {aed(est.perDay)}
                {est.savedVsDaily > 0 && <span className="block text-success">You save {aed(est.savedVsDaily)}</span>}
                <span className="block">Delivery in Dubai free</span>
              </div>
              <div className="text-right">
                <span className="block text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">Estimate</span>
                <span className="font-display text-2xl font-bold">{aed(est.total)}</span>
              </div>
            </div>
          )}

          <button type="submit" disabled={!est}
            className="pill-cta group mt-6 w-full justify-between bg-[oklch(0.55_0.17_142)] text-white shadow-[0_10px_40px_-12px_oklch(0.55_0.17_142/0.7)] hover:bg-[oklch(0.5_0.17_142)] disabled:opacity-50">
            <span>Send booking request</span>
            <span className="pill-icon bg-white/15"><FaWhatsapp className="h-[18px] w-[18px]" /></span>
          </button>
          <p className="mt-3 text-center text-xs text-foreground-subtle">Opens WhatsApp with your request written. Nothing is booked until we confirm.</p>
        </form>
      </div>
    </dialog>
  );
}
