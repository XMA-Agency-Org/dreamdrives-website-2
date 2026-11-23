"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { initPostHog } from "@/lib/analytics";
import { trackLead } from "@/lib/track";
import type { LeadSource } from "@/lib/contact";

const ATTR_COOKIE = "dd_attr";
const ATTR_KEYS = ["gclid", "gbraid", "wbraid", "fbclid", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

/**
 * Keeps the first ad click a visitor arrived with (gclid, fbclid, UTMs) in a 90-day first-party cookie.
 * /go/wa reads it to tie a WhatsApp chat back to the ad. A later visit with new click ids replaces it.
 */
function rememberAttribution(params: URLSearchParams) {
  const found: Record<string, string> = {};
  for (const k of ATTR_KEYS) {
    const v = params.get(k);
    if (v) found[k] = v.slice(0, 200);
  }
  if (!Object.keys(found).length) {
    // No ad click: keep where an organic visitor came from (google.com, instagram.com...), first touch only.
    if (document.cookie.includes(`${ATTR_COOKIE}=`)) return;
    try {
      const host = document.referrer ? new URL(document.referrer).hostname : "";
      if (!host || host.endsWith("dreamdrivesdxb.com")) return;
      found.ref_host = host.slice(0, 80);
    } catch { return; }
  }
  found.landing = window.location.pathname;
  found.ts = new Date().toISOString();
  document.cookie = `${ATTR_COOKIE}=${encodeURIComponent(JSON.stringify(found))}; Max-Age=${90 * 86400}; Path=/; SameSite=Lax; Secure`;
}

/**
 * Renders nothing. Must sit in its own <Suspense> beside the page, never around it:
 * useSearchParams inside a boundary that wraps the page makes Next ship every page as an empty shell.
 */
export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    initPostHog();
    // One handler for every lead link on the site: /go/wa links get a ref added before the
    // browser follows them; tel: links are logged by beacon. data-src on the link (or a parent)
    // names the placement; otherwise the src baked into the URL is used.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const srcAttr = (a.closest("[data-src]") as HTMLElement | null)?.dataset.src as LeadSource | undefined;
      if (href.startsWith("/go/wa")) {
        const url = new URL(href, window.location.origin);
        const price = Number(a.dataset.price) || undefined;
        const ref = trackLead({ kind: "whatsapp", src: srcAttr ?? (url.searchParams.get("src") as LeadSource) ?? "cta_section",
          car: url.searchParams.get("car") ?? undefined, price });
        url.searchParams.set("ref", ref);
        a.setAttribute("href", url.pathname + url.search);
      } else if (href.startsWith("tel:")) {
        const ref = trackLead({ kind: "call", src: srcAttr ?? "contact" });
        try { navigator.sendBeacon?.(`/go/call?src=${srcAttr ?? "contact"}&ref=${ref}`); } catch {}
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (!pathname) return;
    const qs = searchParams?.toString();
    if (searchParams) rememberAttribution(searchParams);
    posthog.capture("$pageview", { $current_url: qs ? `${pathname}?${qs}` : pathname });
  }, [pathname, searchParams]);

  return null;
}
