# Research: Home — Carousel Redesign

**Feature**: `001-home-carousel-redesign`  
**Date**: 2026-03-05  
**Status**: Complete — sin NEEDS CLARIFICATION pendientes

Todas las decisiones técnicas fueron resueltas en la sesión de clarificación del 2026-03-05 (ver `spec.md § Clarifications`).

---

## Decisión 1 — Implementación de autoplay sin librería externa

**Decision**: Hook propio `useAutoplay` con `setInterval` + `clearInterval` en `useEffect`.

**Rationale**: El Principio II de la constitución prohíbe dependencias de runtime no listadas. Un `setInterval` gestionado correctamente en un hook (cleanup en unmount y cuando el componente pierde foco) cumple todos los requisitos de FR-003, FR-004 y FR-004b sin añadir peso de bundle.

**Alternatives considered**:

- Swiper.js / Embla Carousel: rechazados por Principio II (dependencias externas no permitidas).
- `requestAnimationFrame`: innecesariamente complejo para un intervalo de 3 s.

---

## Decisión 2 — Transición `transform: translateX` vs fade

**Decision**: Slide horizontal mediante `transform: translateX(-${activeIndex * 100}%)` en el track flex.

**Rationale**: Fiel al comportamiento del banner de Mercado Libre Argentina (ver imagen de referencia `images/banner-fullscreen-autoplay.png`). `transform` es acelerado por GPU y no afecta el layout; evita el parpadeo de un crossfade con múltiples imágenes superpuestas.

**Alternatives considered**:

- Fade con `opacity`: visualmente suave pero requiere posicionamiento absoluto de todos los slides y un segundo estado gestionado; más complejo sin ventaja visual para este caso de uso.
- CSS `scroll-snap` para el banner también: descartado porque el autoplay con `scrollBy` produce comportamientos inconsistentes entre navegadores; `translateX` ofrece control total del timing.

---

## Decisión 3 — Aspect-ratio proporcional para la altura del banner

**Decision**: Clases Tailwind `aspect-[4/3] md:aspect-[16/5]` en el contenedor del carousel.

**Rationale**: No depende del viewport height (evita el problema de `100vh` en móviles con barra de URL retráctil); las proporciones son consistentes en cualquier ancho de pantalla. `16/5` produce ~320px a 1280px de ancho (similar al banner de MeLi AR en escritorio); `4/3` produce una altura razonable en móvil para mostrar el contenido del slide.

**Alternatives considered**:

- Altura fija px: no escala bien en pantallas intermedias.
- `50vh` / `35vh`: se distorsiona en móviles con barra de navegación retráctil (iOS Safari).
- Altura natural de la imagen: produce saltos de layout si las 3 imágenes tienen alturas distintas.

---

## Decisión 4 — Scroll nativo `overflow-x: scroll` + `scroll-snap` para BenefitsCarousel

**Decision**: Contenedor `overflow-x-auto scroll-smooth snap-x snap-mandatory` con tarjetas `snap-start shrink-0`.

**Rationale**: El swipe táctil y el scroll de trackpad funcionan automáticamente sin eventos touch manuales; accesible vía teclado (tab + foco en tarjetas). Las flechas prev/next usan `scrollBy` al DOM, que respeta el `scroll-smooth`. Tailwind v4 soporta estas utilidades nativamente.

**Alternatives considered**:

- Eventos touch manuales (`touchstart`/`touchend`): mayor complejidad, más superficie de bugs en distintos dispositivos.
- Librería externa (Swiper): Principio II lo prohíbe.

---

## Decisión 5 — SVGs inline ad-hoc para íconos de tarjetas

**Decision**: Cada `QuickAccessCardData.icon` es un `ReactNode` (JSX de SVG) definido inline en el array `QUICK_ACCESS_CARDS` de `Home.tsx`.

**Rationale**: Sin dependencias externas (Principio II); el SVG es monocromático y de trazo simple (6 íconos: camión, persona, tarjeta, etiqueta, estrella, escudo), perfectamente reproducibles en <10 líneas de JSX cada uno. Al estar como `ReactNode` en el tipo, el componente `QuickAccessCard` es agnóstico al tipo de ícono (no acopla implementación).

**Alternatives considered**:

- Heroicons / Phosphor Icons: dependencia externa no justificada para 6 íconos.
- Emojis: inconsistencia visual entre sistemas operativos (renderizado diferente en iOS, Android, Windows).
- PNGs descargadas de MeLi: assets de terceros con posibles problemas de copyright.

---

## Decisión 6 — Posicionamiento flotante del BenefitsCarousel

**Decision**: `margin-top: -3rem` en el contenedor de `BenefitsCarousel` + `relative z-10` para superponer el carousel sobre el banner.

**Rationale**: Patrón CSS estándar para el efecto "card floating over banner" de MeLi AR. El `z-index: 10` garantiza que las tarjetas queden sobre el banner (que tiene `z-index: 0` implícito). El valor `-3rem` (48px) supera el requisito mínimo de SC-003 (≥40px de solapamiento).

**Alternatives considered**:

- `position: absolute` en las tarjetas: requiere conocer la altura exacta del banner, que varía por breakpoint.
- `overlap` con `padding-bottom` en el banner + `margin-top` negativo igual: equivalente pero más frágil al cambiar el aspect-ratio.

---

## Patrones de referencia validados en el codebase existente

| Patrón                                            | Ubicación actual                        | Aplicación en esta feature                                                      |
| ------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------- |
| Componente con props tipadas + export desde index | `libs/ui-components/src/lib/Card.tsx`   | Mismo patrón para `HeroBannerCarousel`, `QuickAccessCard`, `BenefitsCarousel`   |
| Hook de React en ui-components                    | No existe aún                           | Crear `lib/hooks/useAutoplay.ts` — precedente ausente pero estructura preparada |
| Asset URL export                                  | `libs/ui-components/src/assets/urls.ts` | Añadir `bannerPublicidad3Url`                                                   |
| Breakpoint Tailwind responsive                    | `Home.tsx` (grids)                      | Mismo patrón `md:aspect-[16/5]` para aspect-ratio                               |
| `negative margin` para solapamiento               | No existe aún — introduce este archivo  | `BenefitsCarousel` con `mt-[-3rem]`                                             |
