# Implementation Plan: Home — Carousel Redesign

**Branch**: `001-home-carousel-redesign` | **Date**: 2026-03-05 | **Spec**: [spec.md](spec.md)  
**Input**: Feature specification from `/specs/001-home-carousel-redesign/spec.md`

## Summary

Reemplazar el banner publicitario estático (`PromoBanner`) por un carousel fullscreen con autoplay de 3 slides cada 3 s y transición `translateX`; y reemplazar la grilla estática de `SectionCard` por un `BenefitsCarousel` horizontal flotante sobre el borde inferior del banner. Todo implementado como componentes reutilizables en `libs/ui-components`, consumidos desde `apps/frontend/src/pages/Home.tsx`. Sin cambios en el backend ni en datos.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)  
**Primary Dependencies**: React 18, Tailwind CSS v4, Vite, Nx monorepo, pnpm  
**Storage**: N/A — esta feature es puramente de UI; los datos de banners y tarjetas son arrays estáticos inline  
**Testing**: Vitest + React Testing Library (no solicitado para esta feature)  
**Target Platform**: Web (escritorio + móvil); sin soporte IE/browsers legacy  
**Project Type**: Monorepo web — `apps/frontend` + `libs/ui-components`  
**Performance Goals**: Transición entre slides visualmente fluida (≤16ms frame time); sin dependencias externas de carousel  
**Constraints**: Sin librerías externas de carousel (Swiper, Embla, etc.); íconos SVG inline; scroll-snap nativo para el carousel de tarjetas  
**Scale/Scope**: 3 slides de banner · 6 tarjetas de acceso rápido · 2 nuevos componentes en ui-components

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principio                             | Estado  | Notas                                                                                                                         |
| ------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **I. Nx project structure**           | ✅ PASS | Nuevos componentes van en `libs/ui-components`; `Home.tsx` en `apps/frontend` los consume vía `@meli-challenge/ui-components` |
| **II. Stack compliance**              | ✅ PASS | React, TypeScript, Tailwind v4, Vite, Nx, pnpm. Sin nuevas dependencias de runtime; no se toca el backend                     |
| **III. API contract and persistence** | ✅ PASS | No aplica — feature puramente de UI sin cambios en endpoints ni persistencia                                                  |
| **IV. Design references and UX**      | ✅ PASS | Alineado con el home de Mercado Libre Argentina (banner fullscreen + tarjetas flotantes + responsive)                         |
| **V. Quality gate**                   | ✅ PASS | Fallback por imagen rota (FR-014); cleanup de imports; lint sin warnings                                                      |

## Project Structure

### Documentation (this feature)

```text
specs/001-home-carousel-redesign/
├── plan.md              ← este archivo
├── spec.md              ← especificación funcional completa
├── tasks.md             ← desglose de 13 tareas por fase/US (ya generado)
├── research.md          ← Phase 0 output (generado abajo)
├── data-model.md        ← Phase 1 output (generado abajo)
├── quickstart.md        ← Phase 1 output (generado abajo)
├── images/              ← referencias visuales (4 capturas)
└── checklists/
    └── requirements.md
```

### Source Code (archivos tocados por esta feature)

```text
libs/ui-components/src/
├── assets/
│   ├── banner-publicidad-3.svg          ← NUEVO (T001)
│   └── urls.ts                          ← MODIFICAR: export bannerPublicidad3Url
├── lib/
│   ├── hooks/
│   │   └── useAutoplay.ts               ← NUEVO (T003)
│   ├── carousel.types.ts                ← NUEVO (T002)
│   ├── HeroBannerCarousel.tsx           ← NUEVO (T004)
│   ├── QuickAccessCard.tsx              ← NUEVO (T007)
│   └── BenefitsCarousel.tsx             ← NUEVO (T008)
└── index.ts                             ← MODIFICAR: nuevos exports (T005, T009)

apps/frontend/src/
└── pages/
    └── Home.tsx                         ← MODIFICAR: reemplazar PromoBanner + SectionCard (T006, T010, T013)
```

**Structure Decision**: Monorepo web (Option 2). Todos los componentes nuevos van en `libs/ui-components` (Principio I); `Home.tsx` los consume vía `@meli-challenge/ui-components`. No se modifica el backend.

## Complexity Tracking

> Sin violaciones de la constitución — no se requiere justificación.

---

## Phase 0: Research

> Todos los NEEDS CLARIFICATION de Technical Context fueron resueltos en la sesión de clarificación del 2026-03-05 (ver `spec.md § Clarifications`). No quedan incógnitas bloqueantes.

**Decisiones técnicas tomadas:**

| Decisión                        | Elección                                                       | Alternativa rechazada         | Motivo                                                                                                      |
| ------------------------------- | -------------------------------------------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Transición entre slides         | `transform: translateX` (slide horizontal)                     | Fade (opacity)                | Fiel al comportamiento de MeLi AR; más fluido visualmente                                                   |
| Altura del banner               | `aspect-ratio` proporcional (`16/5` desktop, `4/3` móvil)      | Altura fija px / `vh`         | No depende del viewport height; proporciones correctas en cualquier pantalla                                |
| Scroll del carousel de tarjetas | Scroll horizontal nativo + `scroll-snap`                       | Eventos touch manuales        | Sin JS adicional; funciona con swipe táctil y trackpad automáticamente; accesible por defecto               |
| `prefers-reduced-motion`        | Avance automático cada 3 s mantenido; transición CSS suprimida | Deshabilitar autoplay         | El usuario pierde la funcionalidad de avance; la preferencia solo afecta la animación, no el comportamiento |
| Íconos de tarjetas              | SVG inline ad-hoc monocromáticos                               | Heroicons / Phosphor / emojis | Sin dependencias externas; Principio II del stack                                                           |
| Librería de carousel            | Ninguna — implementación nativa                                | Swiper / Embla Carousel       | Principio II: stack fijo sin nuevas dependencias de runtime                                                 |

---

## Phase 1: Design & Contracts

### data-model.md

Ver [data-model.md](data-model.md) — generado abajo.

### contracts/

No aplica — esta feature es puramente de UI sin cambios en la API REST del backend.

### quickstart.md

Ver [quickstart.md](quickstart.md) — generado abajo.

---

## Implementation Phases

### Phase 1 — Setup (T001, T002) · Paralelo

| Tarea | Archivo                                                 | Descripción                                                   |
| ----- | ------------------------------------------------------- | ------------------------------------------------------------- |
| T001  | `libs/ui-components/src/assets/banner-publicidad-3.svg` | SVG ilustrativo tercer banner + export `bannerPublicidad3Url` |
| T002  | `libs/ui-components/src/lib/carousel.types.ts`          | Interfaces `BannerSlide` y `QuickAccessCardData`              |

### Phase 2 — Foundational (T003) · Secuencial

| Tarea | Archivo                                           | Descripción                                                                                                                 |
| ----- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| T003  | `libs/ui-components/src/lib/hooks/useAutoplay.ts` | Hook `useAutoplay(length, interval, enabled)` — gestiona índice activo, setInterval, loop, pausa y `prefers-reduced-motion` |

### Phase 3 — US1: HeroBannerCarousel (T004–T006) · Secuencial

| Tarea | Archivo                                             | Descripción                                                                                                                  |
| ----- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| T004  | `libs/ui-components/src/lib/HeroBannerCarousel.tsx` | Componente principal: props `slides: BannerSlide[]`, aspect-ratio responsive, track `translateX`, dots, fallback imagen rota |
| T005  | `libs/ui-components/src/index.ts`                   | Export `HeroBannerCarousel`, re-export `BannerSlide`                                                                         |
| T006  | `apps/frontend/src/pages/Home.tsx`                  | Reemplazar `<PromoBanner>` → `<HeroBannerCarousel>` en todos los estados; definir array `BANNER_SLIDES`                      |

**MVP checkpoint**: US1 completa y verificable de forma independiente.

### Phase 4 — US2: BenefitsCarousel (T007–T010) · T007 paralelo con T006

| Tarea | Archivo                                           | Descripción                                                                                                      |
| ----- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| T007  | `libs/ui-components/src/lib/QuickAccessCard.tsx`  | Tarjeta individual: props `QuickAccessCardData`, SVG icon, CTA, hover elevación                                  |
| T008  | `libs/ui-components/src/lib/BenefitsCarousel.tsx` | Carousel: `overflow-x-scroll scroll-snap`, flechas prev/next, `margin-top` negativo flotante, responsive widths  |
| T009  | `libs/ui-components/src/index.ts`                 | Export `QuickAccessCard`, `BenefitsCarousel`, `QuickAccessCardData`                                              |
| T010  | `apps/frontend/src/pages/Home.tsx`                | Reemplazar grilla `<SectionCard>` → `<BenefitsCarousel>`; definir `QUICK_ACCESS_CARDS` con 6 items + SVGs inline |

### Phase 5 — US3: Polish (T011–T013) · T011+T012 paralelo

| Tarea | Archivo                                             | Descripción                                           |
| ----- | --------------------------------------------------- | ----------------------------------------------------- |
| T011  | `libs/ui-components/src/lib/HeroBannerCarousel.tsx` | Verificar aspect-ratio por breakpoint (SC-001)        |
| T012  | `libs/ui-components/src/lib/BenefitsCarousel.tsx`   | Verificar solapamiento ≥40px (SC-003)                 |
| T013  | `apps/frontend/src/pages/Home.tsx`                  | Limpiar imports, `pnpm nx lint frontend` sin warnings |

---

## Constitution Check Post-Design

| Principio                   | Estado  | Verificación                                                                                                 |
| --------------------------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| **I. Nx project structure** | ✅ PASS | Todos los componentes nuevos en `libs/ui-components`; `Home.tsx` consume via `@meli-challenge/ui-components` |
| **II. Stack compliance**    | ✅ PASS | Sin dependencias externas de carousel; Tailwind v4; TypeScript strict                                        |
| **III. API contract**       | ✅ PASS | No se toca el backend                                                                                        |
| **IV. Design references**   | ✅ PASS | Banner fullscreen + tarjetas flotantes + responsive alineado con MeLi AR                                     |
| **V. Quality gate**         | ✅ PASS | Fallback imagen rota (FR-014); lint clean (T013); sin errores de consola (SC-006)                            |
