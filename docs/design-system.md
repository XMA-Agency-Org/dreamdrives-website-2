# Uptown Dubai - Design System

## Brand Identity
- **Client**: Uptown Dubai - Luxury/Exotic Car Rental
- **Aesthetic**: Bold & Aggressive + Minimalist Premium ("Gangster Luxury")
- **Theme**: Dark mode primary
- **Target**: Tourists, visitors, influencers, content creators

---

## Color System (OKLCH Only)

All colors use OKLCH color space. Never use hex or RGB values.

### Brand Colors (Orange)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary-50` | `oklch(0.98 0.02 50)` | Lightest tint |
| `--color-primary-100` | `oklch(0.95 0.05 50)` | Light backgrounds |
| `--color-primary-200` | `oklch(0.90 0.10 50)` | Light accents |
| `--color-primary-300` | `oklch(0.85 0.14 50)` | Hover states |
| `--color-primary-400` | `oklch(0.78 0.17 52)` | Secondary buttons |
| `--color-primary-500` | `oklch(0.72 0.18 50)` | **Primary brand color** |
| `--color-primary-600` | `oklch(0.65 0.17 48)` | Hover on primary |
| `--color-primary-700` | `oklch(0.55 0.15 46)` | Active states |
| `--color-primary-800` | `oklch(0.45 0.12 44)` | Dark accents |
| `--color-primary-900` | `oklch(0.35 0.09 42)` | Darkest shade |

### Neutral Colors (Dark Theme)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-neutral-50` | `oklch(0.98 0 0)` | Primary text (white) |
| `--color-neutral-100` | `oklch(0.92 0 0)` | Secondary text |
| `--color-neutral-200` | `oklch(0.85 0 0)` | Muted text |
| `--color-neutral-300` | `oklch(0.70 0 0)` | Placeholder text |
| `--color-neutral-400` | `oklch(0.55 0 0)` | Disabled text |
| `--color-neutral-500` | `oklch(0.42 0 0)` | Borders |
| `--color-neutral-600` | `oklch(0.30 0 0)` | Hover borders |
| `--color-neutral-700` | `oklch(0.22 0 0)` | Elevated surfaces |
| `--color-neutral-800` | `oklch(0.15 0 0)` | Card backgrounds |
| `--color-neutral-900` | `oklch(0.10 0 0)` | Elevated background |
| `--color-neutral-950` | `oklch(0.06 0 0)` | Primary background |

### Semantic Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-background` | `oklch(0.06 0 0)` | Page background |
| `--color-background-elevated` | `oklch(0.10 0 0)` | Cards, modals |
| `--color-background-subtle` | `oklch(0.13 0 0)` | Hover states |
| `--color-foreground` | `oklch(0.98 0 0)` | Primary text |
| `--color-foreground-muted` | `oklch(0.70 0 0)` | Secondary text |
| `--color-foreground-subtle` | `oklch(0.50 0 0)` | Tertiary text |
| `--color-border` | `oklch(0.20 0 0)` | Default borders |
| `--color-border-hover` | `oklch(0.30 0 0)` | Hover borders |

---

## Typography

### Font Families
- **Grunge/Display**: Rubik Dirt (H1, H2, large headlines only)
- **Display Alt**: Bebas Neue (labels, badges, condensed text)
- **Body**: Inter (paragraphs, UI text, card headings)
- **Mono**: JetBrains Mono (code, specs)

### Grunge Typography Usage

| Element | Font | Rationale |
|---------|------|-----------|
| H1, H2 (hero, 2xl, xl sizes) | Rubik Dirt | Grunge texture works at scale |
| H3, H4, card titles | Inter (semibold) | Better readability at smaller sizes |
| Body text | Inter | Clean, professional |
| Labels/badges | Bebas Neue or Inter uppercase | Condensed, punchy |

The `Heading` component automatically applies Rubik Dirt for sizes: `hero`, `3xl`, `2xl`, `xl`.
Use `grunge={false}` prop to override and keep Inter for any size.

### CSS Variables
```css
--font-grunge: "Rubik Dirt", ui-sans-serif, system-ui, sans-serif;
--font-display-alt: "Bebas Neue", ui-sans-serif, system-ui, sans-serif;
```

### Utility Classes
- `.grunge-heading` - Applies grunge font with orange glow effect
- `.noise-texture` - Adds subtle noise texture overlay for grunge aesthetic

### Font Sizes (Modular Scale 1.25)

| Token | Size | Usage |
|-------|------|-------|
| `text-xs` | 0.75rem (12px) | Captions, labels |
| `text-sm` | 0.875rem (14px) | Small text, metadata |
| `text-base` | 1rem (16px) | Body text |
| `text-lg` | 1.125rem (18px) | Large body |
| `text-xl` | 1.25rem (20px) | Small headings |
| `text-2xl` | 1.5rem (24px) | H4 |
| `text-3xl` | 1.875rem (30px) | H3 |
| `text-4xl` | 2.25rem (36px) | H2 |
| `text-5xl` | 3rem (48px) | H1 |
| `text-6xl` | 3.75rem (60px) | Display |
| `text-7xl` | 4.5rem (72px) | Large display |
| `text-8xl` | 6rem (96px) | Hero |
| `text-9xl` | 8rem (128px) | Giant hero |

### Font Weights
- `font-normal`: 400 (body text)
- `font-medium`: 500 (emphasis)
- `font-semibold`: 600 (subheadings)
- `font-bold`: 700 (headings)
- `font-black`: 900 (hero headlines)

### Letter Spacing
- `tracking-tighter`: -0.05em (hero headlines)
- `tracking-tight`: -0.025em (headings)
- `tracking-normal`: 0 (body)
- `tracking-wide`: 0.025em (labels)
- `tracking-widest`: 0.1em (uppercase labels)

---

## Border Radius System

Use standard Tailwind border radius utilities for consistent styling.

### Radius Scale

| Class | Usage |
|-------|-------|
| `rounded-none` | No rounding |
| `rounded-sm` | Buttons, badges, small elements |
| `rounded-md` | Cards, inputs, medium elements |
| `rounded-lg` | Large cards, modals |
| `rounded-xl` | Hero sections |
| `rounded-2xl` | Full-page containers |
| `rounded-full` | Circular elements (use sparingly) |

### Design Philosophy

The boxy aesthetic reinforces the "Gangster Luxury" brand:
- Sharp corners = aggressive, bold, confident
- Minimal rounding = premium, intentional design
- Consistent application = professional, cohesive look

---

## Spacing System (8px Grid)

| Token | Value | Usage |
|-------|-------|-------|
| `spacing-1` | 0.25rem (4px) | Tight spacing |
| `spacing-2` | 0.5rem (8px) | Small gaps |
| `spacing-3` | 0.75rem (12px) | Icon gaps |
| `spacing-4` | 1rem (16px) | Default gap |
| `spacing-6` | 1.5rem (24px) | Component padding |
| `spacing-8` | 2rem (32px) | Section gaps |
| `spacing-12` | 3rem (48px) | Large gaps |
| `spacing-16` | 4rem (64px) | Section padding (mobile) |
| `spacing-20` | 5rem (80px) | Large section gaps |
| `spacing-24` | 6rem (96px) | Section padding (desktop) |
| `spacing-32` | 8rem (128px) | Hero padding |

---

## Animation Tokens

### Duration
- `--duration-fast`: 150ms (micro-interactions)
- `--duration-normal`: 300ms (standard transitions)
- `--duration-slow`: 500ms (page transitions)
- `--duration-slower`: 700ms (reveal animations)
- `--duration-slowest`: 1000ms (hero animations)

### Easing
- `--ease-out`: `cubic-bezier(0, 0, 0.2, 1)` (exits)
- `--ease-in-out`: `cubic-bezier(0.4, 0, 0.2, 1)` (standard)
- `--ease-spring`: `cubic-bezier(0.34, 1.56, 0.64, 1)` (bouncy)

---

## Component Patterns

### Primitive Components (CVA)

All primitive UI components use **class-variance-authority (CVA)** for variant management. This provides:
- Type-safe variant props
- Consistent API across components
- Easy composition with `cn()` utility

Example Button implementation:
```tsx
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "base-classes-here",
  {
    variants: {
      variant: {
        primary: "...",
        secondary: "...",
      },
      size: {
        sm: "...",
        md: "...",
        lg: "...",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  // additional props
}
```

### Buttons
- **Primary**: Orange background, dark text
- **Secondary**: Dark background, white text
- **Outline**: Transparent with orange border, orange text
- **Ghost**: Transparent, white text
- Heights: 40px (sm), 48px (md), 56px (lg)

### Cards
- Background: `--color-background-elevated`
- Border: `--color-border`
- Border radius: `var(--radius-md)` (controlled by radius system)
- No ambient glow decorations

### Inputs
- Background: `--color-background-elevated`
- Border: `--color-border`
- Focus: `--color-primary-500` border
- Height: 48px

---

## Layout Rules

1. **Container**: Max width 1280px, centered with padding
2. **Section Padding**: 64px (mobile), 128px (desktop)
3. **Grid**: 12-column grid with 24px gutters
4. **Breakpoints**: sm(640), md(768), lg(1024), xl(1280), 2xl(1536)

---

## UI Component Library

### Form Primitives

All form components use CVA for variants and `forwardRef` for proper ref forwarding.

#### Input
```tsx
import { Input } from "@/components/ui";

<Input
  label="Email"
  placeholder="you@example.com"
  variant="default" // or "error"
  size="sm" | "md" | "lg"
  error="Invalid email"
  helperText="We'll never share your email"
  leftIcon={<MailIcon />}
  rightIcon={<CheckIcon />}
/>
```

#### Textarea
```tsx
import { Textarea } from "@/components/ui";

<Textarea
  label="Message"
  placeholder="Your message..."
  rows={4}
  maxLength={500}
  showCount
  variant="default" | "error"
/>
```

#### Select
```tsx
import { Select, type SelectOption } from "@/components/ui";

const options: SelectOption[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
];

<Select
  label="Category"
  options={options}
  placeholder="Select an option"
  variant="default" | "error"
/>
```

#### FilterGroup
```tsx
import { FilterGroup, type FilterItem } from "@/components/ui";

const items: FilterItem[] = [
  { id: "all", label: "All" },
  { id: "category1", label: "Category 1" },
];

<FilterGroup
  title="Category"
  items={items}
  value={selectedValue}
  onChange={setValue}
  allOptionId="all"
  scrollable={false}
/>
```

### Layout Components

#### MobileDrawer
```tsx
import { MobileDrawer } from "@/components/ui";

<MobileDrawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Filters"
>
  {children}
</MobileDrawer>
```

### Section Components

#### PageHero
Reusable hero section for marketing pages.

```tsx
import { PageHero } from "@/components/sections/shared";

<PageHero
  tagline="Our Story"
  title="Welcome to"
  gradientText="Uptown"
  description="Your premium car rental partner"
  align="left" | "center"
  size="default" | "large"
/>
```

#### CarCard (with variants)
Unified car card with multiple display modes.

```tsx
import { CarCard } from "@/components/sections/cars";

// Full variant: specs, pricing section, brand/year header
<CarCard car={car} variant="full" />

// Compact variant: image overlay style, used in grids
<CarCard car={car} variant="compact" />

// Minimal variant: smallest display, for similar cars
<CarCard car={car} variant="minimal" showBadge={false} showInquiryButton={false} />
```

---

## Critical Constraints

| Rule | Reason |
|------|--------|
| OKLCH colors only | Never use hex/rgb in CSS |
| No `overflow: hidden` with sticky | Breaks sticky positioning |
| No ambient glow decorations | Per project guidelines |
| Use Bun, never npm | Per project guidelines |
| Componentize everything | Pages should be composed of small components |
