---
name: tailwind-v4-best-practices
description: Applies Tailwind CSS v4 best practices for design system, pixel-perfect implementation, and utility-first styling. Use when implementing or reviewing UI with Tailwind v4, pixel-perfect layouts from mockups, @theme customization, or Tailwind design tokens.
---

# Tailwind CSS v4 Best Practices

## Quick start

- **Import**: `@import "tailwindcss";` (single import; no `@tailwind base/components/utilities`).
- **No JS config**: v4 is CSS-first; use `@theme` in CSS instead of `tailwind.config.js`.
- **Prefer utilities in HTML**: Use classes like `flex`, `p-4`, `text-slate-700`; avoid `@apply` for one-off styles.
- **Vite**: Use `@tailwindcss/vite` plugin; no PostCSS plugin required.

## Design system: @theme and namespaces

Define design tokens in CSS with `@theme` so Tailwind generates matching utility classes:

```css
@import "tailwindcss";

@theme {
  /* Extend or override; new vars create new utilities */
  --color-mint-500: oklch(0.72 0.11 178);
  --font-poppins: Poppins, sans-serif;
  --breakpoint-3xl: 120rem;
}
```

**Theme variable namespaces** (defining a var creates the corresponding utilities/variants):

| Namespace     | Use for                          |
|---------------|-----------------------------------|
| `--color-*`   | `bg-*`, `text-*`, `border-*`, etc. |
| `--spacing-*` | `p-*`, `m-*`, `gap-*`, `w-*`, `h-*` (scale 0–96, 1 unit = 0.25rem) |
| `--font-*`    | `font-sans`, `font-mono`, custom `font-*` |
| `--text-*`    | `text-xs` … `text-9xl`            |
| `--font-weight-*` | `font-light` … `font-black`   |
| `--leading-*`, `--tracking-*` | Line height, letter spacing |
| `--breakpoint-*` | Responsive variants `sm:*`, `md:*`, etc. |
| `--radius-*`  | `rounded-sm` … `rounded-3xl`      |
| `--shadow-*`  | `shadow-sm` … `shadow-2xl`        |
| `--ease-*`    | `ease-in`, `ease-out`             |
| `--animate-*` | Custom keyframe animations        |

Override the whole namespace with `initial` then redefine:

```css
@theme {
  --color-*: initial;
  --color-primary: oklch(0.72 0.11 178);
  --color-muted: oklch(0.55 0.02 260);
}
```

For full default theme reference, see [reference.md](reference.md).

## Pixel-perfect from mockups

1. **Map to the scale**: Use Tailwind’s spacing (`p-4`, `gap-6`), type (`text-base`, `text-lg`), and colors (`bg-slate-100`, `text-slate-700`) first.
2. **Avoid arbitrary values** unless the design needs a value not in the scale: e.g. `w-[13px]` or `bg-[#f0f0f0]` only when no token fits.
3. **Spacing**: Prefer `gap-*`, `p-*`, `m-*`, `space-x-*`/`space-y-*`; keep rhythm consistent (e.g. multiples of 4).
4. **Typography**: Combine `text-*`, `font-*`, `leading-*`, `tracking-*`; use semantic headings and a clear type scale.
5. **Colors**: Prefer theme colors (`text-slate-600`, `bg-blue-500`); ensure contrast (e.g. text on background) for accessibility.

## Layers

Use layers for custom CSS so utilities still win:

- `@layer theme` — design tokens (or use `@theme`).
- `@layer base` — resets, default typography.
- `@layer components` — reusable patterns (cards, buttons) when a component class is justified.
- `@layer utilities` — one-off helpers.

Do not use `!important` on utilities; fix specificity with the right layer instead.

## Accessibility and states

- Use `focus-visible:ring-2 focus-visible:ring-offset-2` (or similar) instead of removing focus outline globally.
- Prefer `focus-visible:*` over `focus:*` for keyboard-only focus.
- Ensure color contrast (e.g. `text-slate-900` on `bg-white`); test with devtools or a contrast checker.

## Responsive and container queries

- Breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:` (and custom `--breakpoint-*` in `@theme`).
- Container queries: use `@container` and size utilities when the design is component-driven.

## Production

- **Purging**: v4 detects used classes automatically; list all template/source paths if using custom content sources.
- **Safelist**: For dynamic class names (e.g. user-driven colors), safelist only what’s needed.
- **Minify**: Use the build pipeline (e.g. Vite) to minify and compress (e.g. Brotli) CSS.

## Monorepos

- Use `@source` in CSS so Tailwind scans packages that contain classes (e.g. shared component libs).
- Keep a single main CSS entry that `@import "tailwindcss"` and any shared `@theme` files.

## Reference

- Full theme variable list and namespaces: [reference.md](reference.md)
- Official docs: [tailwindcss.com/docs](https://tailwindcss.com/docs)
