# Pre-Implementación Checklist: Home — Carousel Redesign

**Purpose**: Validar la calidad, completitud y ausencia de ambigüedades en los requisitos ANTES de comenzar la implementación. Cada ítem es un "unit test para los requisitos escritos", no para el comportamiento del sistema.
**Created**: 2026-03-05
**Feature**: [spec.md](../spec.md) · [tasks.md](../tasks.md) · [data-model.md](../data-model.md)
**Dominios cubiertos**: UX/Visual · Comportamiento del Carousel · Accesibilidad (a11y) · Contrato técnico · Cobertura de escenarios
**Actor**: Autor / revisor — uso pre-implementación

---

## UX / Requisitos Visuales

- [x] CHK001 — ¿Está especificado el comportamiento del banner exactamente en el breakpoint de transición (768px)? **RESUELTO**: Tailwind `md:` = ≥768px; `aspect-[4/3] md:aspect-[16/5]` aplica 16/5 exactamente en 768px. Sin ambigüedad.
- [x] CHK002 — ¿Está cuantificado "reconociblemente similar"? **RESUELTO**: SC-004 es criterio de P3 (polish) en un prototipo. Criterio cualitativo aceptable para este contexto.
- [x] CHK003 — ¿Están definidos los estados visuales de los dots? **RESUELTO via Assumption**: activo = círculo amarillo (#FFE600) 10px; inactivo = círculo blanco/gris 6px con opacidad 60%; hover = opacidad 100%. Ver spec.md §Assumptions.
- [x] CHK004 — ¿Propiedades cuantitativas del hover en tarjetas? **RESUELTO**: tasks.md T007 define `hover:shadow-md hover:-translate-y-0.5 transition-all` como spec de implementación. Suficiente.
- [x] CHK005 — ¿Estado loading/skeleton para los carousels? **RESUELTO via Assumption**: durante loading, ambos carousels muestran un `div` con el mismo aspect-ratio/dimensiones rellenado con fondo `bg-gray-200 animate-pulse`. Ver spec.md §Assumptions.
- [x] CHK006 — ¿Requisitos para texto sobre imágenes del banner? **RESUELTO via Assumption**: texto blanco (white) semibold con `text-shadow` oscuro. Contraste asegurado por assets controlados (nuestros propios SVG/PNG). Ver spec.md §Assumptions.

---

## Comportamiento del Carousel

- [x] CHK007 — ¿Duración de transición CSS formalizada? **RESUELTO**: tasks.md T004 define `transition-transform duration-500` (500ms). Valor fijado como requisito de implementación.
- [x] CHK008 — ¿El timer se reinicia al navegar manualmente? **RESUELTO**: data-model.md §Flujo de estado define explícitamente: `click dot[n] → setActiveIndex(n) directamente (omite timer reset)`. Hover exit sí reinicia el timer via `resume()`.
- [x] CHK009 — ¿Señal visual de pausa? **RESUELTO via Assumption**: no se muestra indicador visual de estado pausado. El comportamiento silencioso es coherente con el carousel de MeLi AR. Ver spec.md §Assumptions.
- [x] CHK010 — ¿Comportamiento al soltar scroll-snap entre posiciones? **RESUELTO**: `scroll-snap-type: x mandatory` (CSS nativo) siempre hace snap al punto más cercano. Comportamiento determinista sin código adicional.
- [x] CHK011 — ¿FR-004 vs FR-004b son consistentes? **RESUELTO**: no hay conflicto. FR-004 = pausar `setInterval` en hover (siempre aplica). FR-004b = transición CSS instantánea cuando prefers-reduced-motion (solo afecta animación, no el timer). Si ambos activos: autoplay pausado (FR-004 prevalece) + transición instantánea cuando reanuda.
- [x] CHK012 — `slides.length === 1`: ¿autoplay activo o inactivo? **RESUELTO via Assumption**: si `slides.length === 1`, el autoplay se desactiva (sin sentido avanzar). Controles ya ocultos por spec. Ver spec.md §Assumptions.

---

## Accesibilidad (a11y)

- [x] CHK013 — ¿Atributos ARIA del carousel definidos? **RESUELTO via Assumption**: `HeroBannerCarousel` tendrá `role="region" aria-label="Banner publicitario"`. Slide activo anunciado con `aria-live="polite"` en un elemento oculto. Ver spec.md §Assumptions.
- [x] CHK014 — ¿Navegación por teclado? **RESUELTO via Assumption**: `Tab` navega entre dots y flechas visibles (tabindex natural); `Enter`/`Space` los activa. No se requieren teclas de flecha (⬅️/➡️) para el carousel de banners en este prototipo. Ver spec.md §Assumptions.
- [x] CHK015 — ¿Contraste mínimo texto/banner? **RESUELTO via Assumption**: los assets de banner son controlados (nuestros propios SVG/PNG con fondo designado). Se usará texto blanco semibold con `drop-shadow` o semitransparente oscuro debajo. Auditoría WCAG formal fuera del alcance del prototipo. Ver spec.md §Assumptions.
- [x] CHK016 — ¿`aria-label` de dots suficiente? **RESUELTO**: mejora adoptada — implementar como `aria-label={\`Ir al slide ${index + 1}: ${slide.title}\`}` para incluir contexto descriptivo. Actualizado en T004.
- [x] CHK017 — ¿`aria-label` en flechas de BenefitsCarousel? **RESUELTO via Assumption**: flecha izquierda → `aria-label="Tarjeta anterior"`; flecha derecha → `aria-label="Tarjeta siguiente"`. Ver spec.md §Assumptions.

---

## Contrato Técnico de Componentes

- [x] CHK018 — ¿`BannerSlide` alineada entre spec y data-model? **RESUELTO**: spec §Key Entities: "imagen (URL), texto principal, subtexto, etiqueta de oferta, enlace" = data-model: `imageUrl, title, subtitle?, badge?, href?`. Alineación perfecta. Sin renombrados.
- [x] CHK019 — ¿Required vs optional para `BannerSlide`? **RESUELTO**: data-model.md define con TypeScript `?` y sección §Validaciones: `imageUrl` + `title` requeridos; `subtitle`, `badge`, `href` opcionales. Ídem `QuickAccessCardData`: todos requeridos excepto implementación de `icon`.
- [x] CHK020 — ¿`slides` array vacío en `HeroBannerCarousel`? **RESUELTO via Assumption**: si `slides.length === 0`, el componente retorna `null` (no renderiza). Ver spec.md §Assumptions.
- [x] CHK021 — ¿Impacto de T005 y T009 editando el mismo `index.ts`? **RESUELTO**: tasks.md T009 ya documenta explícitamente "depende de T005 — editan el mismo archivo; aplicar tras T005". Traceabilidad establecida.
- [x] CHK022 — ¿`BenefitsCarousel` con `cards` vacío o < 2? **RESUELTO via Assumption**: `cards.length === 0` → retorna `null`. Si `cards.length < visibleCount` (las que caben en pantalla), las flechas de navegación se ocultan. Ver spec.md §Assumptions.

---

## Cobertura de Escenarios y Edge Cases

- [x] CHK023 — ¿Navegación fuera del home durante transición activa? **RESUELTO**: `useEffect` cleanup ejecuta `clearInterval` en unmount (React estándar). La transición CSS se abandona con el desmontaje del componente. Comportamiento determinista, sin requisito adicional.
- [x] CHK024 — ¿Altura mínima a < 320px? **RESUELTO via Assumption**: no se define altura mínima en píxeles. `aspect-[4/3]` es proporcional y funciona a cualquier ancho (a 280px → 210px altura). Ver spec.md §Assumptions.
- [x] CHK025 — ¿Fallback JS deshabilitado para `HeroBannerCarousel`? **RESUELTO via Assumption**: Vite/React SPA requiere JavaScript. El fallback de JS deshabilitado no aplica a ningún componente. La mención en spec para `BenefitsCarousel` se entiende como "grilla CSS pura", pero en práctica la app entera requiere JS. Ver spec.md §Assumptions.
- [x] CHK026 — ¿Acceptance scenarios de US2 para loading/error? **RESUELTO**: `QUICK_ACCESS_CARDS` es un array estático definido en `Home.tsx` — no hay operación asíncrona ni fuente de fallo. No hay loading/error state para US2.
- [x] CHK027 — ¿`ctaHref` inválido? **RESUELTO**: todos los CTAs usan `href="#"` (ancla HTML válida). El comportamiento estándar del browser es suficiente. Fuera del alcance del prototipo.

---

## Notes

- Check items off as completed: `[x]`
- Ítems con `[Gap]` indican requisitos que faltan en la spec y deben añadirse o aclararse antes de implementar.
- Ítems con `[Ambiguity]` indican lenguaje impreciso que puede producir implementaciones divergentes.
- Ítems con `[Consistency]` indican posibles conflictos entre secciones de la spec.
- Si un ítem [Gap] se considera fuera del alcance de la feature, documentarlo explícitamente como Assumption en `spec.md`.
