# Tailwind v4 theme reference

## Theme variable namespaces (official)

Defining a variable in these namespaces creates the corresponding utility classes or variants.

| Namespace | Maps to |
|-----------|---------|
| `--color-*` | `bg-*`, `text-*`, `border-*`, `ring-*`, `fill-*`, `stroke-*`, etc. |
| `--font-*` | `font-sans`, `font-serif`, `font-mono`, custom `font-*` |
| `--text-*` | `text-xs` … `text-9xl` (size); `--text-*--line-height` for line height |
| `--font-weight-*` | `font-thin` … `font-black` |
| `--tracking-*` | `tracking-tighter` … `tracking-widest` |
| `--leading-*` | `leading-tight`, `leading-normal`, etc. |
| `--breakpoint-*` | Responsive variants `sm:*`, `md:*`, `lg:*`, `xl:*`, `2xl:*` |
| `--container-*` | Container query variants and `max-w-*` sizes |
| `--spacing-*` | `p-*`, `m-*`, `gap-*`, `w-*`, `h-*`, `top/right/bottom/left-*` (default scale 0–96, step 0.25rem) |
| `--radius-*` | `rounded-*` |
| `--shadow-*` | `shadow-sm` … `shadow-2xl` |
| `--inset-shadow-*` | `inset-shadow-*` |
| `--drop-shadow-*` | `drop-shadow-*` |
| `--blur-*` | `blur-*` |
| `--ease-*` | `ease-in`, `ease-out`, etc. |
| `--animate-*` | `animate-*` (define `@keyframes` inside `@theme` for custom animations) |

## Default scale (spacing)

One unit = 0.25rem (4px). Common: `0`, `px`, `0.5`, `1`, `2`, `3`, `4`, `5`, `6`, `8`, `10`, `12`, `16`, `20`, `24`, `32`, `40`, `48`, `56`, `64`, `80`, `96`.

## Default breakpoints

- `sm`: 40rem  
- `md`: 48rem  
- `lg`: 64rem  
- `xl`: 80rem  
- `2xl`: 96rem  

Override or extend in `@theme` with `--breakpoint-*`.

## Using theme variables in custom CSS

After build, theme variables are available as CSS variables, e.g. `var(--color-slate-700)`, `var(--spacing-4)`. Use them in `@layer components` or arbitrary values: `rounded-[calc(var(--radius-xl)-1px)]`.

## Referencing other variables

Use `@theme inline { ... }` when a theme variable should resolve to another variable’s *value* (e.g. `--font-sans: var(--font-inter);`) so the generated utility uses the value, not the reference.
