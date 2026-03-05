# Data Model: Home — Carousel Redesign

**Feature**: `001-home-carousel-redesign`  
**Date**: 2026-03-05  
**Scope**: Tipos de datos de UI — sin cambios en el backend ni en la persistencia.

---

## Entidades

### BannerSlide

Representa un slide del carousel de banners publicitarios (`HeroBannerCarousel`).

```typescript
// libs/ui-components/src/lib/carousel.types.ts
export interface BannerSlide {
  /** URL de la imagen de fondo del slide. Puede ser SVG, PNG o URL externa. */
  imageUrl: string;
  /** Texto principal del slide (ej. "Hasta 50% de descuento"). */
  title: string;
  /** Texto secundario/subtítulo (ej. "En toda la línea Samsung"). Opcional. */
  subtitle?: string;
  /** Etiqueta de badge/oferta (ej. "OFERTA DEL DÍA"). Opcional. */
  badge?: string;
  /** URL de destino al hacer clic en el slide. Opcional — sin link si omitido. */
  href?: string;
}
```

**Validaciones**:

- `imageUrl` no vacío (si está vacío se usa el fallback de color sólido).
- `title` requerido para el fallback cuando la imagen no carga.
- Mínimo 1 slide; si hay exactamente 1, no se muestran dots ni flechas.

**Estado relevante** (gestionado en `HeroBannerCarousel` + `useAutoplay`):

- `activeIndex: number` — índice del slide activo (0-based).
- `isPaused: boolean` — true cuando el usuario hace hover/focus.
- `reducedMotion: boolean` — true si `prefers-reduced-motion: reduce` está activo.

---

### QuickAccessCardData

Representa una tarjeta de acceso rápido del carousel `BenefitsCarousel`.

```typescript
// libs/ui-components/src/lib/carousel.types.ts
export interface QuickAccessCardData {
  /** Título de la tarjeta (ej. "Envío gratis"). */
  title: string;
  /** Descripción corta (ej. "Beneficio por ser tu primera compra"). */
  description: string;
  /** Texto del botón/enlace de acción (ej. "Mostrar productos"). */
  ctaLabel: string;
  /** URL de destino del CTA (ruta interna o ancla "#"). */
  ctaHref: string;
  /** Ícono SVG inline como ReactNode — creado ad-hoc, monocromático. */
  icon: React.ReactNode;
}
```

**Validaciones**:

- `title`, `description`, `ctaLabel`, `ctaHref` requeridos (no empty strings).
- `icon` requerido — el componente no renderiza un placeholder si está ausente.

---

### Props de componentes

#### HeroBannerCarouselProps

```typescript
export interface HeroBannerCarouselProps {
  /** Array de slides a mostrar. Mínimo 1. */
  slides: BannerSlide[];
  /** Intervalo de autoplay en ms. Default: 3000. */
  autoplayInterval?: number;
  /** Clase CSS adicional para el contenedor raíz. */
  className?: string;
}
```

#### BenefitsCarouselProps

```typescript
export interface BenefitsCarouselProps {
  /** Array de tarjetas de acceso rápido. */
  cards: QuickAccessCardData[];
  /** Clase CSS adicional para el contenedor raíz. */
  className?: string;
}
```

#### QuickAccessCardProps

```typescript
// Idéntico a QuickAccessCardData — el componente recibe los datos aplanados
export type QuickAccessCardProps = QuickAccessCardData;
```

---

## Datos estáticos (definidos en Home.tsx)

### BANNER_SLIDES

```typescript
// apps/frontend/src/pages/Home.tsx
const BANNER_SLIDES: BannerSlide[] = [
  {
    imageUrl: bannerPublicidadUrl, // asset 1 existente
    title: 'Hasta 50% en electrónica',
    subtitle: 'Solo por hoy',
    badge: 'OFERTA DEL DÍA',
    href: '#',
  },
  {
    imageUrl: bannerPublicidad2Url, // asset 2 existente
    title: 'Envío gratis en miles de productos',
    subtitle: 'Comprando desde la app',
    badge: 'ENVÍO GRATIS',
    href: '#',
  },
  {
    imageUrl: bannerPublicidad3Url, // asset 3 nuevo (T001)
    title: 'Neumáticos al mejor precio',
    subtitle: 'Con cuotas sin interés',
    badge: 'NUEVO',
    href: '#',
  },
];
```

### QUICK_ACCESS_CARDS

```typescript
// apps/frontend/src/pages/Home.tsx
const QUICK_ACCESS_CARDS: QuickAccessCardData[] = [
  { title: 'Envío gratis',        description: 'Beneficio por ser tu primera compra',  ctaLabel: 'Mostrar productos', ctaHref: '#', icon: <TruckIcon /> },
  { title: 'Ingresá a tu cuenta', description: 'Accedé a tus compras y favoritos',      ctaLabel: 'Ingresar',          ctaHref: '#', icon: <UserIcon /> },
  { title: 'Medios de pago',      description: 'Tarjetas, efectivo y más',              ctaLabel: 'Ver medios',        ctaHref: '#', icon: <CardIcon /> },
  { title: 'Menos de $20.000',    description: 'Productos al mejor precio',             ctaLabel: 'Ver ofertas',       ctaHref: '#', icon: <TagIcon /> },
  { title: 'Más vendidos',        description: 'Los favoritos de la comunidad',         ctaLabel: 'Ver productos',     ctaHref: '#', icon: <StarIcon /> },
  { title: 'Compra protegida',    description: 'Tu dinero siempre protegido',           ctaLabel: 'Saber más',         ctaHref: '#', icon: <ShieldIcon /> },
];
// TruckIcon, UserIcon, CardIcon, TagIcon, StarIcon, ShieldIcon → SVG inline
// definidos como constantes en el mismo archivo Home.tsx
```

---

## Flujo de estado del HeroBannerCarousel

```
mount
  └─► useAutoplay(slides.length, 3000, true)
        ├─► setInterval cada 3000ms → setActiveIndex((i+1) % length)
        ├─► onMouseEnter/onFocus → pause()  → clearInterval
        ├─► onMouseLeave/onBlur  → resume() → reinicia setInterval
        └─► prefers-reduced-motion → skipTransition = true
              └─► transición CSS omitida; avance numérico continúa

click dot[n] → setActiveIndex(n) directamente (omite timer reset)
unmount → clearInterval (cleanup)
```

---

## Relaciones entre entidades

```
Home.tsx
  ├── BANNER_SLIDES: BannerSlide[]  ──► HeroBannerCarousel
  │                                       └── useAutoplay (hook interno)
  └── QUICK_ACCESS_CARDS: QuickAccessCardData[]  ──► BenefitsCarousel
                                                       └── QuickAccessCard (×N)
```

Sin entidades de backend involucradas. Sin cambios en `useProducts`, `Product`, ni ningún tipo del backend.
