# Quickstart / Integration Scenarios: Home — Carousel Redesign

**Feature**: `001-home-carousel-redesign`  
**Date**: 2026-03-05

Escenarios de integración para verificar que cada pieza encaja correctamente antes de dar la feature por completa.

---

## Escenario 1 — US1: MVP completo (banner fullscreen con autoplay)

**Pre-condición**: Phases 1, 2 y 3 de `tasks.md` completadas (T001–T006).

```bash
# 1. Levantar el frontend
pnpm nx serve frontend

# 2. Abrir http://localhost:4200 en el navegador
# 3. Observar sin interacción durante 9 segundos
```

**Verificar**:

- [ ] El banner ocupa el 100% del ancho de la ventana (sin padding lateral externo visible).
- [ ] La altura sigue la proporción `16/5` en escritorio (≥768px): a 1280px de ancho → ~400px de alto.
- [ ] El banner avanza al slide 2 a los 3 s, al slide 3 a los 6 s, y vuelve al slide 1 a los 9 s.
- [ ] La transición es un deslizamiento horizontal suave (`translateX`).
- [ ] Los dots debajo del banner muestran el slide activo resaltado.
- [ ] Al hacer clic en un dot, el carousel va directamente al slide correspondiente.
- [ ] Al posicionar el cursor sobre el banner, el autoplay se pausa (no avanza aunque pasen 3 s).
- [ ] Al retirar el cursor, el autoplay se reanuda.
- [ ] Console → 0 errores.

**Verificar en móvil** (DevTools → 375px):

- [ ] La altura sigue la proporción `4/3` (~500px a 375px de ancho).
- [ ] Los tres slides se muestran correctamente.

---

## Escenario 2 — US2: Carousel de tarjetas flotante

**Pre-condición**: Phase 4 completada (T007–T010).

```bash
# Con el frontend levantado:
# Abrir http://localhost:4200
```

**Verificar en escritorio** (≥1280px):

- [ ] Las tarjetas aparecen superpuestas sobre el borde inferior del banner (al menos 40px de solapamiento visible).
- [ ] Se ven al menos 5 tarjetas simultáneamente sin hacer scroll.
- [ ] Cada tarjeta muestra: icono SVG, título, descripción y botón CTA.
- [ ] Las flechas `‹` y `›` son visibles en los extremos del carousel.
- [ ] Al hacer clic en `›`, el carousel se desplaza hacia la derecha mostrando las tarjetas ocultas.
- [ ] Al hacer clic en `‹`, el carousel retrocede.
- [ ] Las tarjetas tienen fondo blanco, bordes redondeados, sombra sutil.
- [ ] Al hacer hover sobre una tarjeta, se eleva levemente (`-translate-y-0.5` o similar).

**Verificar en móvil** (375px):

- [ ] Se ven al menos 2 tarjetas simultáneamente.
- [ ] Las flechas `‹`/`›` están ocultas.
- [ ] El swipe táctil (o scroll horizontal en DevTools) desplaza las tarjetas con `scroll-snap` (snap a tarjeta completa).
- [ ] No hay desbordamiento horizontal en la página (el spinner de Chrome no aparece).

---

## Escenario 3 — US3: Coherencia visual con MeLi AR

**Pre-condición**: Phase 5 completada (T011–T013).

```bash
pnpm nx lint frontend   # debe terminar con 0 warnings/errors
```

**Verificar comparando con `images/home-design-reference.png`**:

- [ ] Disposición general: banner fullscreen → tarjetas flotantes → grilla de productos.
- [ ] Paleta: fondo gris claro de la página, banner con imágenes coloridas, tarjetas blancas.
- [ ] En móvil (375px): no hay overflow horizontal, tarjetas apiladas o en carousel funcional.
- [ ] Console → 0 errores durante todo el ciclo de autoplay (9 s observación).

---

## Escenario 4 — Edge case: imagen de banner rota

**Pre-condición**: Escenario 1 completado.

```bash
# En Home.tsx, modificar temporalmente imageUrl del primer banner
# a una URL inválida: imageUrl: 'https://invalid-url-that-does-not-exist.xyz/img.png'
```

**Verificar**:

- [ ] El slide 1 muestra un fondo de color sólido (no imagen).
- [ ] El texto `title` del slide ("Hasta 50% en electrónica") es visible sobre el fondo.
- [ ] El carousel sigue funcionando con autoplay normalmente.
- [ ] No hay errores de React ni mensajes de error visibles al usuario.

---

## Escenario 5 — Edge case: `prefers-reduced-motion`

**Pre-condición**: Escenario 1 completado.

```bash
# En DevTools → Rendering → Emulate CSS media feature: prefers-reduced-motion: reduce
```

**Verificar**:

- [ ] El banner sigue avanzando cada 3 s (autoplay activo).
- [ ] La transición entre slides es instantánea (sin deslizamiento visible).
- [ ] No hay errores de consola.

---

## Comandos útiles

```bash
# Levantar frontend en dev
pnpm nx serve frontend

# Build para verificar que no hay errores de TS
pnpm nx build frontend

# Lint
pnpm nx lint frontend

# Verificar que el build de ui-components compila
pnpm nx build ui-components
```
