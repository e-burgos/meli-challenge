# Implementation Plan: Prototipo Meli — Home y detalle de ítem

**Branch**: `001-meli-prototype` | **Date**: 2025-02-12 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `functional/specs/001-meli-prototype/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command.

## Summary

Prototipo tipo MercadoLibre con (1) **home** que muestra listado de productos y (2) **página de detalle** de ítem (imágenes, título, descripción, precio, métodos de pago, vendedor, detalles adicionales). Backend REST con endpoint de listado y endpoint de detalle por id; persistencia en archivos JSON o CSV. Estructura Nx: app `frontend` (apps/frontend), app `backend` (apps/backend), lib `ui-components` (libs/ui-components). Stack fijado por constitución: React, TypeScript, Tailwind v4, Vite, axios, react-query, zustand en frontend; Node.js, Express, TypeScript, Swagger/OpenAPI, axios en backend. Cobertura ≥80%, documentación y run.md obligatorios.

## Technical Context

**Language/Version**: TypeScript (strict), Node.js 18+ (backend), ES2022+ (frontend)  
**Primary Dependencies**: React, Vite, Tailwind CSS v4, axios, react-query, zustand (frontend); Express, Swagger/OpenAPI, axios (backend); Nx, pnpm (workspace)  
**Storage**: Archivos locales JSON o CSV en backend (sin base de datos real)  
**Testing**: Jest o Vitest (unit/integration); cobertura ≥80%  
**Target Platform**: Navegador (frontend), Node.js (backend)  
**Project Type**: Web application (frontend + backend + lib ui-components)  
**Performance Goals**: Carga del home <5s; respuestas API razonables para datos en archivo  
**Constraints**: Persistencia solo JSON/CSV; diseño referencia Meli; responsive y user-friendly  
**Scale/Scope**: Prototipo; listado y detalle de productos; sin recomendaciones ni checkout  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify alignment with `functional/.specify/memory/constitution.md`:

- **I. Nx project structure**: frontend app, backend app, ui-components lib; frontend consumes `@meli-challenge/ui-components`. ✅
- **II. Stack compliance**: Frontend (React, TypeScript, Tailwind v4, Vite, Nx, pnpm; axios + react-query para llamadas al backend; zustand para estado de cliente); Backend (Node.js, Express, TypeScript, Swagger/OpenAPI, Nx, pnpm; axios para llamadas HTTP salientes). ✅
- **III. API contract and persistence**: List products + product detail endpoints; file-based persistence (JSON/CSV only). ✅
- **IV. Design references and UX**: Home and product detail reference Meli URLs; responsive, user-friendly; no recommendations/checkout. ✅
- **V. Quality gate**: Error handling, documentation, ≥80% coverage. ✅

**Result**: All gates pass. No violations.

## Project Structure

### Documentation (this feature)

```text
functional/specs/001-meli-prototype/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 — decisions and rationale
├── data-model.md        # Phase 1 — entities (Product, Seller)
├── quickstart.md        # Phase 1 — how to run and test
├── contracts/           # Phase 1 — OpenAPI (products API)
├── tasks.md             # Phase 2 — task list (T001–T036, T015b)
└── design-spec-meli.md  # (T015b) UX deliverable — design spec Meli (Tailwind v4) for home + detail
```

**Design spec (T015b)**: **@senior-ux-designer** produce `design-spec-meli.md` (Tailwind v4). **@senior-frontend** implementa: (B) página **DesignSystem** (`apps/frontend/src/pages/DesignSystem.tsx`, ruta `/design-system`) — documentación visual del design system para desarrolladores; (C) página **Prototype** (`apps/frontend/src/pages/Prototype.tsx`, ruta `/prototype`) — prototipo de uso de cada componente. Con design-spec-meli.md + DesignSystem + Prototype, el front implementa T021 (Home) y T029 (ProductDetail). Sin Figma.

### Source Code (repository root)

```text
apps/
├── frontend/                    # App web (home + detalle)
│   ├── src/
│   │   ├── app/
│   │   ├── pages/               # home, product-detail
│   │   ├── hooks/               # react-query, etc.
│   │   ├── api/                 # axios client, endpoints
│   │   └── stores/              # zustand (si aplica)
│   └── ...
├── backend/                     # API REST
│   ├── src/
│   │   ├── app/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── data/                # JSON/CSV files
│   │   └── ...
│   └── ...
libs/
├── ui-components/               # @meli-challenge/ui-components
│   ├── src/
│   │   ├── lib/
│   │   │   ├── components/      # Button, Card, Layout, etc.
│   │   │   └── ...
│   │   └── index.ts
│   └── ...
run.md                           # Root: how to run project
```

**Structure Decision**: Web application con tres entregables Nx (constitución I): `apps/frontend`, `apps/backend`, `libs/ui-components`. El frontend consume componentes desde `@meli-challenge/ui-components`; las llamadas al backend se hacen con axios y react-query. El backend lee/escribe productos en archivos bajo `apps/backend/src/data/` (o equivalente). Contratos de API en `specs/001-meli-prototype/contracts/` para alinear frontend y backend.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations. This section is empty.
