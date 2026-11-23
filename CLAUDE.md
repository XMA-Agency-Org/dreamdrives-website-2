# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dream Drives luxury car rental website for Dubai. Built with Next.js 16, React 19, Tailwind CSS 4, and Motion (Framer Motion). The aesthetic is "Refined Elegance" - sophisticated, modern with navy/blue primary colors. Supports dark mode (default) and light mode via `data-theme="light"` attribute.

## Commands

```bash
bun dev          # Start development server
bun build        # Build for production
bun start        # Start production server
bun lint         # Run ESLint
```

**Always use Bun, never npm.**

## Architecture

### App Router Structure
- `app/(marketing)/` - Route group for public marketing pages
  - `page.tsx` - Homepage
  - `cars/page.tsx` - Cars listing
  - `cars/[slug]/page.tsx` - Individual car detail pages
  - `cars/brand/[brand]/page.tsx` - Brand-filtered listing
  - `cars/category/[category]/page.tsx` - Category-filtered listing
  - `cars/body-type/[type]/page.tsx` - Body type filtered listing
  - `about/`, `contact/`, `faq/`, `insurance/`, `privacy/`, `terms/` - Static pages
- `app/layout.tsx` - Root layout with fonts and metadata
- `app/globals.css` - Design system tokens and base styles

### Component Organization
```
components/
├── animation/      # Reusable animation wrappers (FadeIn, RevealOnScroll, etc.)
├── features/       # Business logic components (WhatsAppCTA)
├── layout/         # Header, Footer, Navigation, MobileMenu
├── providers/      # Context providers (AnalyticsProvider, ThemeProvider)
├── sections/       # Page-specific section components
│   ├── home/       # Homepage sections (HeroSection, FeaturedCars, etc.)
│   ├── cars/       # Cars listing (CarSearch, CarsFilters, CarsGrid, car-card variants)
│   ├── car/        # Single car detail page (CarHero, CarGallery, CarSpecs, etc.)
│   └── shared/     # Shared sections (PageHero, FAQSection)
└── ui/             # Primitive UI components with CVA (Button, Input, Badge, etc.)
```

### Data Layer (Sanity)
Sanity project **gzcp7ons** (dataset `production`, public read) is the source of truth for cars, landing pages and
site settings (every business fact the site states). Studio lives in `studio/` (`cd studio && bun dev`, deploy to
dreamdrives.sanity.studio). Contentful was retired 23 Nov 2026 (`scripts/migrate-contentful-to-sanity.ts`).
- `data/cars.ts`: async functions read Sanity (tag `cars`); sync functions read `data/fleet-snapshot.json`
  (regenerate with `bun scripts/snapshot-fleet.ts`) for client components and as fallback.
- `data/settings.ts`: Site settings. **Empty means unknown: hide it, never guess.**
- `data/landing.ts` + `app/(marketing)/rent/[slug]`: model landing pages (Google Ads destinations).
- `app/api/revalidate`: Sanity webhook target (secret `SANITY_REVALIDATE_SECRET`).
- Document ids use dashes (`car-<slug>`). Dotted ids are private paths the public API cannot read.

### Analytics and lead tracking
- Every WhatsApp button links to `/go/wa?car=&from=&to=&src=` (`lib/contact.ts` `waHref`). A site-wide click
  handler (`components/providers/AnalyticsProvider.tsx`) adds a ref code (DD-XXXX) and fires Google Ads, GA4,
  Meta Pixel (eventID = ref) and PostHog via `lib/track.ts`. `/go/wa` stores the lead + click ids (Upstash) and
  sends Meta CAPI `Contact`, then 302s to wa.me with "Ref DD-XXXX" in the text. Call buttons dial `tel:` and log by beacon.
- Click ids (gclid, fbclid, UTMs) are kept 90 days in the `dd_attr` cookie.
- Tags load from `components/providers/Tags.tsx` only when their env var is set.
- `AnalyticsTracker` must sit in its own Suspense beside the page, never around it (wrapping the page made every page
  ship as an empty shell).

### Utility Functions
- `lib/utils.ts` - `cn()`, `formatPrice()`, `getWhatsAppUrl()`, `getCarInquiryUrl()`, `slugify()`
- `lib/animations.ts` - Motion animation presets
- `lib/constants.ts` - Company info, nav links, filter options

## Design System

### Colors - OKLCH Only
Never use hex or RGB. All colors defined in `globals.css` using OKLCH color space:
- **Primary**: `--color-navy-*` / `--color-primary-*` (navy/blue scale, hue ~250-255)
- **Semantic**: `--color-background`, `--color-foreground`, `--color-border`
- **Surfaces**: `--color-surface`, `--color-background-elevated`, `--color-input-bg`
- **Feedback**: `--color-success`, `--color-warning`, `--color-error`
- **Glass effects**: `--color-glass`, `--color-glass-border`

Light mode overrides via `[data-theme="light"]` selector in globals.css.

### Component Variants (CVA)
All primitive UI components use `class-variance-authority`. Pattern:
```tsx
const buttonVariants = cva("base-classes", {
  variants: { variant: {...}, size: {...} },
  defaultVariants: {...}
});
```

### Critical Rules
1. **No `overflow: hidden` with sticky positioning** - breaks sticky behavior
2. **No ambient glow decorations** - project guideline
3. **Componentize aggressively** - pages should compose small components
4. **Border radius uses CSS variables** - `--radius-sm`, `--radius-md`, etc. (base: 0.25rem)

### Typography
- Display: Outfit (`--font-display`)
- Body: Inter (`--font-sans`)
- Condensed labels: Bebas Neue (`--font-display-alt`)
- Mono: JetBrains Mono (`--font-mono`)

### Animation Tokens
- Durations: `--duration-fast` (150ms), `--duration-normal` (300ms), `--duration-slow` (500ms)
- Easing: `--ease-out`, `--ease-in-out`, `--ease-spring`

## Car Card Variants

Multiple card variants in `components/sections/cars/car-card/`:
- `StandardCarCard` - Full specs, pricing, brand header
- `CompactCarCard` - Image overlay style for grids
- `MinimalCarCard` - Smallest display for similar cars
- `InlineCarCard` - Horizontal layout

## Key Data Types

```typescript
interface Car {
  id, slug, name, brand, category, year, tagline, description,
  images: CarImage[], pricing: CarPricing, specs: CarSpecs,
  features: string[], isFeatured?, isAvailable, color, interiorColor
}

type CarBrand = "rolls-royce" | "lamborghini" | "ferrari" | "bentley" | "mercedes" |
                "bmw" | "porsche" | "range-rover" | "audi" | "mclaren" | ...

type CarCategory = "sedan" | "suv"
```

## External Integrations

- **WhatsApp Business**: Car inquiries via `getWhatsAppUrl()` and `getCarInquiryUrl()` in `lib/utils.ts`
- **Sanity CMS**: project `gzcp7ons` (Contentful retired 23 Nov 2026)
- **PostHog**: Product analytics
- **Google Ads**: Conversion tracking (gtag.js)
- **Embla Carousel**: Touch-friendly carousels (`embla-carousel-react`)

## Environment Variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID=gzcp7ons      NEXT_PUBLIC_SANITY_DATASET=production
SANITY_REVALIDATE_SECRET=                   NEXT_PUBLIC_GSC_VERIFICATION=
NEXT_PUBLIC_POSTHOG_KEY / _HOST
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-...            NEXT_PUBLIC_GOOGLE_ADS_WA_LABEL= / _CALL_LABEL=
NEXT_PUBLIC_GA4_ID=G-...
NEXT_PUBLIC_META_PIXEL_ID=403198836109362   META_CAPI_TOKEN=   META_TEST_EVENT_CODE=
UPSTASH_REDIS_REST_URL=                     UPSTASH_REDIS_REST_TOKEN=
```

## Docs Reference

- `docs/design-system.md` — color tables, spacing scale, component patterns.
- `docs/fleet-data.md` — how `cars-raw.json`, `car-images.json` and `public/CARS/` fit together, the image naming and resize convention, and the steps to add a vehicle. Note that `public/CARS/` is gitignored, so new photo folders ship separately from code.

## Learnings & Corrections

- ❌ Contentful's `luxury`/`economy` categories fell through to `sedan`, so SUVs like the Range Rover Vogue and G63 showed a SEDAN badge → ✅ Contentful categories can be tiers; body type comes from the category only when it names one, otherwise from `cars-raw.json` by slug.

- ❌ `canonical` in the root layout was inherited by every page, and `metadataBase` was `dreamdrives.com` (someone else's domain) → ✅ canonicals are per page; `SITE_URL` in `lib/constants.ts` is the only origin.
- ❌ Contentful mapping filled missing specs with invented defaults (V8, 400 HP) → ✅ unknown specs are 0/"" and hidden.
- ❌ The site listed brands they do not rent (Ferrari, Rolls-Royce, Bentley, McLaren, Porsche) → ✅ brands come from the fleet only.
