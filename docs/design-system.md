# Dream Drives - Design System

## Brand Identity
- **Client**: Dream Drives - Luxury Car Rental Dubai
- **Aesthetic**: Refined Elegance - sophisticated, modern, premium
- **Theme**: Dark mode primary
- **Target**: Tourists, visitors, business travelers, luxury seekers

---

## Color System (OKLCH Only)

All colors use OKLCH color space. Never use hex or RGB values.

### Brand Colors (Navy/Blue)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary-50` | `oklch(0.97 0.015 255)` | Lightest tint |
| `--color-primary-100` | `oklch(0.93 0.03 255)` | Light backgrounds |
| `--color-primary-200` | `oklch(0.86 0.06 255)` | Light accents |
| `--color-primary-300` | `oklch(0.76 0.10 255)` | Hover states |
| `--color-primary-400` | `oklch(0.65 0.14 255)` | Secondary buttons |
| `--color-primary-500` | `oklch(0.55 0.16 250)` | **Primary brand color** |
| `--color-primary-600` | `oklch(0.45 0.14 250)` | Hover on primary |
| `--color-primary-700` | `oklch(0.38 0.12 250)` | Active states |
| `--color-primary-800` | `oklch(0.30 0.09 250)` | Dark accents |
| `--color-primary-900` | `oklch(0.22 0.06 250)` | Darkest shade |

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
- **Display**: Outfit (headings, hero text)
- **Display Alt**: Bebas Neue (labels, badges, condensed text)
- **Body**: Inter (paragraphs, UI text, card content)

### CSS Variables
```css
--font-display: "Outfit", ui-sans-serif, system-ui, sans-serif;
--font-display-alt: "Bebas Neue", ui-sans-serif, system-ui, sans-serif;
--font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
```

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

### Font Weights
- `font-normal`: 400 (body text)
- `font-medium`: 500 (emphasis)
- `font-semibold`: 600 (subheadings)
- `font-bold`: 700 (headings)
- `font-black`: 900 (hero headlines)

---

## Border Radius System

Uses soft corners for a refined, elegant feel.

### Base Radius
```css
--radius-base: 0.25rem; /* 4px */
```

### Radius Scale

| Class | Usage |
|-------|-------|
| `rounded-sm` | Buttons, badges, small elements |
| `rounded-md` | Cards, inputs, medium elements |
| `rounded-lg` | Large cards, modals |
| `rounded-xl` | Hero sections |
| `rounded-2xl` | Full-page containers |

### Design Philosophy

The soft corner aesthetic reinforces "Refined Elegance":
- Subtle rounding = sophisticated, approachable
- Consistent application = professional, cohesive
- Not too round = maintains premium feel

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

All primitive UI components use **class-variance-authority (CVA)** for variant management.

Example Button implementation:
```tsx
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "base-classes-here",
  {
    variants: {
      variant: {
        primary: "bg-primary-500 text-white",
        secondary: "bg-background-elevated text-foreground",
        outline: "border border-primary-500 text-primary-500",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6",
        lg: "h-14 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);
```

### Buttons
- **Primary**: Navy background, white text
- **Secondary**: Dark background, white text
- **Outline**: Transparent with navy border, navy text
- **Ghost**: Transparent, white text
- **WhatsApp**: Green background for WhatsApp CTAs

### Cards
- Background: `--color-background-elevated`
- Border: `--color-border`
- Border radius: `rounded-md`
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

## Critical Constraints

| Rule | Reason |
|------|--------|
| OKLCH colors only | Never use hex/rgb in CSS |
| No `overflow: hidden` with sticky | Breaks sticky positioning |
| No ambient glow decorations | Per project guidelines |
| Use Bun, never npm | Per project guidelines |
| Componentize everything | Pages should be composed of small components |
