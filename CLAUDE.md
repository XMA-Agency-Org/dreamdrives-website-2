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
│   ├── cars/       # Cars page (VehicleSearch, CarsFilters, car-card variants)
│   ├── car-detail/ # Car detail page sections
│   └── shared/     # Shared sections (PageHero, FAQSection)
└── ui/             # Primitive UI components with CVA (Button, Input, Badge, etc.)
```

### Data Layer (Dual-Mode Pattern)
The data layer uses a **sync/async dual-mode pattern** for CMS fallback:
- Sync functions (`getAllCars`, `getCarBySlug`) - Use static data from `data/cars-data.ts`
- Async functions (`getAllCarsAsync`, `getCarBySlugAsync`) - Try Contentful first, fallback to static

```tsx
// In Server Components, prefer async versions
const cars = await getAllCarsAsync();

// Sync versions for static generation or when CMS is not needed
const cars = getAllCars();
```

Key files:
- `data/cars.ts` - Query functions (both sync and async)
- `data/cars-data.ts` - Static car data
- `data/car-images.json` - Image URL mapping per car slug

### CMS Integration (Contentful)
- `lib/contentful.ts` - Client init, `isContentfulConfigured()` check
- `lib/contentful-api.ts` - Data fetching and Car type transformation
- Content automatically falls back to static data when Contentful is unavailable

### Analytics
- `lib/analytics.ts` - PostHog and Google Ads tracking functions
- `components/providers/AnalyticsProvider.tsx` - Client-side analytics initialization
- Tracking: WhatsApp clicks, contact forms, car detail views

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

type CarCategory = "supercar" | "luxury-sedan" | "suv" | "sports" | "convertible" | "coupe"
```

## External Integrations

- **WhatsApp Business**: Car inquiries via `getWhatsAppUrl()` and `getCarInquiryUrl()` in `lib/utils.ts`
- **Contentful CMS**: Vehicle data (Space: `tsz5b6wk9hsp`)
- **PostHog**: Product analytics
- **Google Ads**: Conversion tracking (gtag.js)
- **Embla Carousel**: Touch-friendly carousels (`embla-carousel-react`)

## Environment Variables

```
CONTENTFUL_SPACE_ID=tsz5b6wk9hsp
CONTENTFUL_ACCESS_TOKEN=<token>
NEXT_PUBLIC_POSTHOG_KEY=<key>
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
NEXT_PUBLIC_GOOGLE_ADS_ID=<id>
NEXT_PUBLIC_GOOGLE_CONVERSION_ID=<id>
```

## Docs Reference

See `docs/design-system.md` for comprehensive design system documentation including color tables, spacing scale, and component patterns.
