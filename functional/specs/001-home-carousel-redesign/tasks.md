# Tasks: Home — Carousel Redesign

**Feature branch**: `001-home-carousel-redesign`  
**Input**: `spec.md` (3 user stories P1/P2/P3 + 5 clarificaciones de sesión 2026-03-05)  
**Prerequisites**: spec.md ✅ · plan.md ✅  
**Tests**: No solicitados — no se incluyen tareas de test.

## Stack & rutas clave (inferido del codebase)

| Qué                               | Dónde                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------ |
| Componentes reutilizables         | `libs/ui-components/src/lib/`                                                  |
| Assets e imágenes                 | `libs/ui-components/src/assets/`                                               |
| Exportaciones públicas            | `libs/ui-components/src/index.ts`                                              |
| Página Home                       | `apps/frontend/src/pages/Home.tsx`                                             |
| Componentes actuales a reemplazar | `PromoBanner` → `HeroBannerCarousel` · `SectionCard` grid → `BenefitsCarousel` |

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: ejecutable en paralelo con otras tareas [P] (archivos distintos, sin dependencias incompletas)
- **[Story]**: historia de usuario a la que pertenece (US1, US2, US3)
- Toda tarea incluye la ruta exacta del archivo

---

## Phase 1: Setup

**Purpose**: Agregar el tercer asset de banner y definir los tipos compartidos que bloquean ambas historias de usuario.

- [x] T001 [P] Agregar `banner-publicidad-3.svg` ilustrativo (estilo neumáticos/electrónica Meli) en `libs/ui-components/src/assets/banner-publicidad-3.svg` y exportar `bannerPublicidad3Url` en `libs/ui-components/src/assets/urls.ts`
- [x] T002 [P] Crear `libs/ui-components/src/lib/carousel.types.ts` con interfaces TypeScript: `BannerSlide` (imageUrl, title, subtitle, badge, href) y `QuickAccessCardData` (title, description, ctaLabel, ctaHref, icon: ReactNode). Incluir `import type { ReactNode } from 'react'` al inicio del archivo.

**Checkpoint**: Assets y tipos listos — las fases de US1 y US2 pueden comenzar.

---

## Phase 2: Foundational

**Purpose**: Hook reutilizable `useAutoplay` que comparten HeroBannerCarousel y cualquier carousel futuro. Bloquea US1.

- [x] T003 Crear `libs/ui-components/src/lib/hooks/useAutoplay.ts` — hook que recibe `(length, interval, enabled)`, gestiona `activeIndex`, avance cíclico con `setInterval`, pausa mediante flag externo y detecta `prefers-reduced-motion` (cuando activo: avance instantáneo sin transición CSS). Exportar como named export.

**Checkpoint**: Hook listo — implementación de HeroBannerCarousel puede comenzar.

---

## Phase 3: User Story 1 — Banner Publicitario en Carousel Fullscreen (Priority: P1) 🎯 MVP

**Goal**: Reemplazar `PromoBanner` estático por un carousel fullscreen con autoplay de 3 banners, transición `translateX`, loop infinito, dots de navegación y fallback por imagen rota.

**Independent Test**: Abrir el home, no interactuar y esperar 9 s — el carousel debe haber pasado por los 3 slides y vuelto al primero. Redimensionar a <768px y verificar aspect-ratio `4/3`.

- [x] T004 [US1] Crear `libs/ui-components/src/lib/HeroBannerCarousel.tsx`:
  - Props: `slides: BannerSlide[]` (mínimo 1, máximo ilimitado)
  - Contenedor `w-full overflow-hidden` sin `max-w` ni padding horizontal para fullscreen real
  - Aspect-ratio: `aspect-[16/5]` en `md:` y superior; `aspect-[4/3]` en mobile (< 768 px)
  - Track interno: `flex` con `transition-transform duration-500` (omitir `transition` si `prefers-reduced-motion`)
  - Slide activo controlado por `useAutoplay` (T003); pausa en `onMouseEnter`/`onFocus`, reanuda en `onMouseLeave`/`onBlur`
  - Fallback por imagen rota: `onError` → ocultar `<img>`, mostrar `<div>` con fondo de color y `slide.title`
  - Dot indicators: `<button>` por cada slide, `aria-label="Ir al slide N"`, activo con clase diferenciada
  - Si `slides.length === 1`: ocultar dots y flechas

- [x] T005 [US1] Exportar `HeroBannerCarousel` y re-exportar `BannerSlide` desde `libs/ui-components/src/index.ts`

- [x] T006 [US1] Actualizar `apps/frontend/src/pages/Home.tsx`:
  - Importar `HeroBannerCarousel`, `BannerSlide`, `bannerPublicidad2Url`, `bannerPublicidad3Url`; mantener `bannerPublicidadUrl` (se usa en BANNER_SLIDES[0]); eliminar solo `PromoBanner` y `SectionCard`
  - Definir array `BANNER_SLIDES: BannerSlide[]` con los 3 banners (imageUrl, title, subtitle, badge)
  - Reemplazar `<PromoBanner … />` por `<HeroBannerCarousel slides={BANNER_SLIDES} />` en todos los estados del componente (loading, error, empty, normal)
  - El `<HeroBannerCarousel>` debe estar fuera del contenedor `max-w-7xl` para ocupar el ancho completo de pantalla

**Checkpoint**: US1 completa y verificable de forma independiente. El home muestra el carousel fullscreen con autoplay.

---

## Phase 4: User Story 2 — Carousel de Tarjetas Flotante (Priority: P2)

**Goal**: Reemplazar la grilla estática de `SectionCard` por un `BenefitsCarousel` horizontal con 6 tarjetas, navegación con flechas + scroll-snap nativo, posicionado flotante sobre el borde inferior del banner.

**Independent Test**: Verificar que las tarjetas tienen `position: relative` con `z-index` mayor al banner y se superponen ≥40px. En móvil se ven ≥2 tarjetas; en escritorio ≥5. El swipe táctil y el trackpad desplazan sin JS adicional.

- [x] T007 [P] [US2] Crear `libs/ui-components/src/lib/QuickAccessCard.tsx`:
  - Props: `QuickAccessCardData` (title, description, ctaLabel, ctaHref, icon: ReactNode)
  - Estilo: `bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all`
  - Ícono: renderizar el `icon` prop (SVG inline pasado desde el padre)
  - CTA: `<a href={ctaHref}>` con `ctaLabel` como texto
  - `min-w` fijo para control de tamaño en carousel (ej. `min-w-[180px]`)

- [x] T008 [US2] Crear `libs/ui-components/src/lib/BenefitsCarousel.tsx`:
  - Props: `cards: QuickAccessCardData[]`
  - Contenedor externo: `relative` con `z-index: 10` y `margin-top: -3rem` (efecto flotante sobre el banner)
  - Track interno: `flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-3 px-4 scrollbar-hide`
  - Cada tarjeta: `snap-start shrink-0`
  - Flechas prev/next: botones `absolute` en los extremos izquierdo y derecho, `onClick` desplaza el track con `scrollBy` hacia la izquierda/derecha por el ancho de una tarjeta
  - Flechas ocultas en mobile (< 768px) con `hidden md:flex`
  - Ancho de tarjetas: `w-[45%] sm:w-[30%] md:w-[19%]` para cumplir ≥2 en móvil y ≥5 en escritorio

- [x] T009 [US2] Exportar `QuickAccessCard`, `QuickAccessCardData` y `BenefitsCarousel` desde `libs/ui-components/src/index.ts` (depende de T005 — editan el mismo archivo; aplicar tras T005)

- [x] T010 [US2] Actualizar `apps/frontend/src/pages/Home.tsx`:
  - Importar `BenefitsCarousel`, `QuickAccessCardData`; eliminar `SectionCard` del import (ya no se usa)
  - Definir array `QUICK_ACCESS_CARDS: QuickAccessCardData[]` con los 6 ítems (cada uno con SVG inline como `icon`)
  - SVGs inline a crear para: Envío gratis (camión), Ingresá a tu cuenta (persona), Medios de pago (tarjeta), Menos de $20.000 (etiqueta precio), Más vendidos (estrella), Compra protegida (escudo)
  - Reemplazar `<div className="grid …"><SectionCard … /></div>` por `<BenefitsCarousel cards={QUICK_ACCESS_CARDS} />`
  - El `<BenefitsCarousel>` se ubica inmediatamente después de `<HeroBannerCarousel>`, dentro del flujo (el `margin-top` negativo del componente produce el solapamiento)
  - Aplicar el mismo cambio en el estado de carga (loading skeleton)

**Checkpoint**: US2 completa. Home muestra carousel fullscreen + tarjetas flotantes con scroll-snap y flechas.

---

## Phase 5: Polish & Coherencia Visual (US3)

**Goal**: Verificar y ajustar aspectos finales de proporción, solapamiento y limpieza de código para que el resultado sea visualmente coherente con la referencia de Mercado Libre Argentina.

**Independent Test**: Comparar el home en escritorio (≥1280px) y móvil (~375px) con `images/home-design-reference.png`. Abrir DevTools y confirmar 0 errores de consola durante todo el ciclo de autoplay.

- [x] T011 [P] [US3] Verificar y ajustar aspect-ratio en `libs/ui-components/src/lib/HeroBannerCarousel.tsx`:
  - Confirmar clases Tailwind `aspect-[4/3] md:aspect-[16/5]` por breakpoint (móvil primero, escritorio con `md:`)
  - Confirmar que el contenedor padre en `Home.tsx` no aplica `max-w` ni `px` al carousel (SC-001)

- [x] T012 [P] [US3] Verificar solapamiento vertical en `libs/ui-components/src/lib/BenefitsCarousel.tsx`:
  - Confirmar que `margin-top` negativo produce ≥40px de solapamiento visual sobre el banner (SC-003)
  - Ajustar valor si el solapamiento es menor al requerido

- [x] T013 [US3] Limpiar `apps/frontend/src/pages/Home.tsx`:
  - Eliminar imports no usados: `PromoBanner`, `SectionCard` (nota: `bannerPublicidadUrl` sigue en uso en BANNER_SLIDES[0] — NO eliminar)
  - Verificar que no quedan referencias a las grillas antiguas en ningún estado (loading, error, empty, normal)
  - Ejecutar `pnpm nx lint frontend` y corregir cualquier warning de imports o tipos (SC-006)

**Checkpoint final**: Home completamente rediseñado, sin residuos del código anterior, sin errores de consola ni lint.

---

## Dependencies (orden de completitud por historia)

```
T001 ──┐
T002 ──┼──► T003 ──► T004 ──► T005 ──► T006   (US1 completa)
       │                               │
       └───────────────────────────────┼──► T007 ──► T008 ──► T009 ──► T010   (US2 completa)
                                       │
                                       └──► T011, T012, T013   (US3 polish)
```

## Parallel execution por historia

**Phase 1 (setup)**: T001 y T002 en paralelo — archivos distintos, sin dependencias entre sí.

**Phase 3 (US1)**: T004 es la tarea central; T005 y T006 son secuenciales (export → uso en Home).

**Phase 4 (US2)**: T007 puede arrancar en paralelo con T003/T004/T005 — solo depende de T002 (tipos). T008, T009 y T010 son secuenciales. T009 debe ejecutarse tras T005 (ambos editan `index.ts`).

**Phase 5 (US3)**: T011 y T012 en paralelo (archivos distintos); T013 espera ambas para no limpiar imports que aún se necesitan.

## Implementation Strategy

| Fase                | Alcance MVP           | Estado entregable                      |
| ------------------- | --------------------- | -------------------------------------- |
| Phase 1 + 2         | Assets + tipos + hook | Bloqueantes resueltos                  |
| Phase 3 (T004–T006) | US1 completa ✅       | Home con carousel fullscreen funcional |
| Phase 4 (T007–T010) | US2 completa ✅       | Home con tarjetas flotantes            |
| Phase 5 (T011–T013) | US3 polish ✅         | Home listo para revisión de diseño     |

**MVP mínimo entregable**: completar solo Phase 1 + 2 + Phase 3 (T001–T006).
