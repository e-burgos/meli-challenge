# Prompt: Spec de mejora del home — Carousel Redesign

Prompt para reproducir la especificación funcional de la feature `001-home-carousel-redesign`: reemplazar el banner publicitario estático por un carousel fullscreen con autoplay (3 slides, cada 3 segundos) y reemplazar la grilla de tarjetas de acceso rápido por un carousel horizontal flotante encima del banner, alineado con el diseño de Mercado Libre Argentina.

**Resultado**: `functional/specs/001-home-carousel-redesign/spec.md` con 3 user stories (P1/P2/P3), 14 requisitos funcionales, 6 criterios de éxito medibles, edge cases y supuestos documentados.

---

## Contexto del proyecto

El monorepo `meli-challenge` tiene:

- `apps/frontend` — React + TypeScript + Tailwind CSS v4 + Vite
- `libs/ui-components` — Componentes reutilizables (`@meli-challenge/ui-components`)
- Página principal `Home.tsx` que usa `PromoBanner` (banner estático) y `SectionCard` (grilla estática de tarjetas de acceso rápido)
- Referencia de diseño: [Mercado Libre Argentina](https://www.mercadolibre.com.ar/)

---

## Prompt

```
Genera una especificación funcional (spec.md) para mejorar el aspecto del home de un prototipo de Mercado Libre Argentina con los siguientes cambios:

### Cambio 1 — Banner publicitario: carousel fullscreen con autoplay

- Reemplazar el banner publicitario actual (componente PromoBanner estático) por un carousel fullscreen.
- El carousel debe:
  - Ocupar el 100% del ancho de la ventana (sin márgenes laterales).
  - Mostrar 3 slides con imágenes ilustrativas de ofertas (tomar de la web pública de Mercado Libre Argentina o assets existentes).
  - Avanzar automáticamente al siguiente slide cada 3 segundos (autoplay).
  - Pausar el autoplay cuando el usuario hace hover o foco por teclado.
  - Tener loop infinito (al terminar el tercer slide, vuelve al primero).
  - Mostrar indicadores de posición (dots/bullets) para navegar directamente a cualquier slide.
  - Si una imagen no carga, mostrar fondo de color sólido con texto de la oferta como fallback.

### Cambio 2 — Tarjetas de acceso rápido: carousel flotante encima del banner

- Reemplazar la grilla estática de tarjetas de acceso rápido (componente SectionCard) por un carousel horizontal.
- El carousel de tarjetas debe:
  - Posicionarse flotando sobre el borde inferior del banner (efecto de superposición con z-index mayor).
  - Contener al menos 6 tarjetas: Envío gratis, Ingresá a tu cuenta, Medios de pago, Menos de $20.000, Más vendidos, Compra protegida.
  - Cada tarjeta muestra: título, icono ilustrativo (SVG estilo Meli), descripción corta y botón/enlace CTA.
  - Ser navegable con flechas anteriores/siguientes en los extremos.
  - Mostrar al menos 5 tarjetas en escritorio y al menos 2 en móvil simultáneamente.
  - Las tarjetas tienen fondo blanco, bordes redondeados, sombra sutil y efecto hover de elevación.

### Diseño objetivo

El diseño final debe ser reconociblemente similar al home de Mercado Libre Argentina:
- Banner fullscreen en la parte superior.
- Fila de tarjetas de acceso rápido flotante sobre el borde inferior del banner.
- Grilla de productos debajo.
- Paleta de colores: amarillo Meli (#FFE600), blanco, gris claro.
- Responsive: escritorio (≥1280px) y móvil (≤768px).

### Stack de implementación

- React + TypeScript strict.
- Tailwind CSS v4 (sin frameworks externos de carousel; implementar con CSS scroll o transiciones nativas).
- Componentes en `libs/ui-components`: crear `HeroBannerCarousel` y `BenefitsCarousel`.
- No usar librerías de carousel externas (Swiper, Splide, etc.).
- No requiere backend ni cambios de datos.

### Estructura de la spec a generar

Usar el formato spec-template.md del proyecto con las siguientes secciones obligatorias:
1. User Scenarios & Testing — 3 user stories con prioridad P1/P2/P3, cada una con acceptance scenarios en formato Given/When/Then.
2. Edge Cases — al menos 5 casos borde.
3. Requirements — Functional Requirements (FR-001 a FR-014) y Key Entities (BannerSlide, QuickAccessCard, HeroBannerCarousel, BenefitsCarousel).
4. Success Criteria — 6 criterios de éxito medibles y tecnológicamente agnósticos.
5. Assumptions — 6 supuestos documentados.

### Imágenes de referencia

Guardar en `functional/specs/001-home-carousel-redesign/images/`:
- `banner-fullscreen-autoplay.png` — Captura del carousel de banner fullscreen con dots de navegación.
- `quick-access-card-reference.png` — Detalle de una tarjeta de acceso rápido (icono, título, descripción, CTA).
- `carousel-of-quick-access-cards.png` — Vista del carousel de tarjetas completo.
- `home-design-reference.png` — Vista general del home con ambos elementos combinados.

Referenciar cada imagen inline en la user story correspondiente usando sintaxis Markdown: `![alt](images/nombre.png)`.
```

---

## Resultado esperado

Archivo `functional/specs/001-home-carousel-redesign/spec.md` con:

| Sección       | Contenido                                                          |
| ------------- | ------------------------------------------------------------------ |
| Header        | Branch `001-home-carousel-redesign`, fecha, status Draft           |
| US1 (P1)      | Carousel fullscreen banner + 5 acceptance scenarios                |
| US2 (P2)      | Carousel flotante de tarjetas + 5 acceptance scenarios             |
| US3 (P3)      | Coherencia visual con MeLi AR + 3 acceptance scenarios             |
| Edge Cases    | 5 casos borde documentados                                         |
| FR-001→FR-014 | 14 requisitos funcionales testables                                |
| Key Entities  | BannerSlide, QuickAccessCard, HeroBannerCarousel, BenefitsCarousel |
| SC-001→SC-006 | 6 criterios de éxito medibles                                      |
| Assumptions   | 6 supuestos documentados                                           |

Checklist de calidad generado en `functional/specs/001-home-carousel-redesign/checklists/requirements.md` con todos los ítems pasando.

---

## Variantes

- **Sin imágenes de referencia**: Omitir la sección de imágenes y las referencias inline; el prompt sigue siendo válido.
- **Con más banners**: Cambiar FR-002 de "exactamente 3 slides" a "configurable entre 2 y 5 slides".
- **Con librería externa**: Reemplazar la restricción de "sin librerías externas" por "usar Embla Carousel o Swiper" y ajustar el stack en Assumptions.
- **Para otro prototipo de e-commerce**: Reemplazar referencias a "Mercado Libre Argentina" por el sitio objetivo y ajustar paleta de colores y tarjetas de acceso rápido.
