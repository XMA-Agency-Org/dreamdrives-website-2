# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Uptown Dubai luxury/exotic car rental website. Built with Next.js 16, React 19, Tailwind CSS 4, and Motion (Framer Motion). The aesthetic is "Gangster Luxury" - bold, aggressive, dark mode with orange accents.

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
  - `about/`, `contact/`, `faq/` - Static marketing pages
- `app/layout.tsx` - Root layout with fonts and metadata
- `app/globals.css` - Design system tokens and base styles

### Component Organization
```
components/
├── animation/      # Reusable animation wrappers (FadeIn, RevealOnScroll, etc.)
├── features/       # Business logic components (WhatsAppCTA)
├── layout/         # Header, Footer, Navigation, MobileMenu
├── sections/       # Page-specific section components
│   ├── home/       # Homepage sections (HeroSection, FeaturedCars, etc.)
│   ├── cars/       # Cars page (VehicleSearch, CarsFilters, car-card variants)
│   ├── car-detail/ # Car detail page sections
│   ├── about/      # About page sections
│   ├── contact/    # Contact page sections
│   └── shared/     # Shared sections (PageHero, FAQSection)
└── ui/             # Primitive UI components (Button, Input, Badge, etc.)
```

### Data Layer
- `data/cars.ts` - Car data queries and utilities
- `data/cars-data.ts` - Static car data
- `data/car-images.json` - Image mapping per car slug
- `types/` - TypeScript interfaces (Car, CarBrand, CarCategory, etc.)

### Utility Functions
- `lib/utils.ts` - `cn()` for class merging, `formatPrice()`, `getWhatsAppUrl()`, `slugify()`
- `lib/animations.ts` - Motion animation presets
- `lib/constants.ts` - Site-wide constants

## Design System Constraints

### Colors - OKLCH Only
Never use hex or RGB. All colors defined in `globals.css` using OKLCH:
- Primary: `--color-primary-*` (orange scale from carrot palette)
- Neutrals: `--color-neutral-*` (stone scale)
- Semantic: `--color-background`, `--color-foreground`, `--color-border`

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
4. **Border radius uses CSS variables** - `--radius-sm`, `--radius-md`, etc. (boxy aesthetic)

### Typography
- Display/Hero: Rubik Dirt (grunge font via `--font-grunge`)
- Body: Inter
- Condensed labels: Bebas Neue (`--font-display-alt`)
- Code: JetBrains Mono

The `Heading` component auto-applies grunge font for `hero`, `3xl`, `2xl`, `xl` sizes.

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
  images, pricing, specs, features, isFeatured, isAvailable, color, interiorColor
}
type CarBrand = "rolls-royce" | "lamborghini" | "ferrari" | ...
type CarCategory = "supercar" | "luxury-sedan" | "suv" | "sports" | "convertible" | "coupe"
```

## External Integrations

- WhatsApp Business: Car inquiries via `getWhatsAppUrl()` and `getCarInquiryUrl()` utilities
- Vercel: Deployment platform (`.vercel/` config present)
