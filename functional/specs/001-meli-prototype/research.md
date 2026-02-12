# Research: 001-meli-prototype

**Feature**: Prototipo Meli — Home y detalle de ítem  
**Phase**: 0 (Outline & Research)  
**Date**: 2025-02-12

## Decisions and Rationale

Las decisiones técnicas principales están fijadas por la **constitución** y la **fuente de verdad** (`functional/context/source-of-truth.md`). Este documento consolida lo que ya está decidido y no requiere NEEDS CLARIFICATION.

### 1. Estructura del proyecto (Nx)

- **Decisión**: Tres entregables: app `frontend` (apps/frontend), app `backend` (apps/backend), lib `ui-components` (libs/ui-components, importPath `@meli-challenge/ui-components`).
- **Rationale**: Constitución I; fronteras claras, reutilización de componentes, alineado con el challenge.
- **Alternativas consideradas**: Monolito único (rechazado: el challenge pide frontend y backend separados); más de una lib (rechazado: YAGNI; ui-components basta para el alcance).

### 2. Stack frontend

- **Decisión**: React, TypeScript, Tailwind CSS v4, Vite, Nx, pnpm; axios para HTTP; react-query para datos del servidor; zustand para estado de cliente.
- **Rationale**: Constitución II y agentes del proyecto; react-query evita estado manual de loading/error y da cache; zustand para UI global sin duplicar datos del API.
- **Alternativas consideradas**: fetch nativo (rechazado: axios es estándar del proyecto); Redux (rechazado: zustand más ligero para el alcance); estado local solo (rechazado: zustand para estado global de UI cuando haga falta).

### 3. Stack backend

- **Decisión**: Node.js, Express, TypeScript, Swagger/OpenAPI, Nx, pnpm; axios para llamadas HTTP salientes si en el futuro se integra con otros servicios.
- **Rationale**: Constitución II; Express y Swagger alineados con documentación y validación; persistencia en archivo no requiere axios para el MVP, pero queda en stack para consistencia.

### 4. Persistencia

- **Decisión**: Archivos locales JSON o CSV en el backend; sin base de datos real.
- **Rationale**: Requisito explícito del challenge (source-of-truth y constitución III); reduce complejidad y tiempo de setup.
- **Alternativas consideradas**: SQLite/PostgreSQL (rechazado: fuera de alcance del challenge).

### 5. Contrato de API

- **Decisión**: REST con dos endpoints: (1) GET listado de productos (home), (2) GET detalle de producto por id. Esquema en OpenAPI en `contracts/`.
- **Rationale**: Spec y constitución III; OpenAPI permite generar tipos y documentar para frontend y backend.
- **Alternativas consideradas**: GraphQL (rechazado: no requerido; REST suficiente para dos recursos).

### 6. Diseño y UX

- **Decisión**: Home con referencia a mercadolibre.com.ar; detalle con referencia a página de producto Meli (ej. Samsung Galaxy A55). Páginas responsive y user-friendly.
- **Rationale**: Constitución IV y source-of-truth; prototipo tipo Meli sin recomendaciones ni checkout.
- **Alternativas consideradas**: Diseño desde cero (rechazado: el challenge pide look & feel Meli).

## NEEDS CLARIFICATION

Ninguno. Todas las decisiones necesarias para el plan y la Fase 1 están cubiertas por la constitución y la fuente de verdad.

## Next Steps

- Phase 1: Definir data-model.md (Producto, Vendedor), contracts/ (OpenAPI), quickstart.md.
- Phase 2: Generar tasks.md con /speckit.tasks.
