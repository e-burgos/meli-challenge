# Tasks: Prototipo Meli — Home y detalle de ítem

**Input**: Design documents from `functional/specs/001-meli-prototype/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: Incluidos (FR-011: cobertura ≥80%).

**Organization**: Tareas agrupadas por user story (US1 P1, US2 P2). Rutas según plan: `apps/frontend/`, `apps/backend/`, `libs/ui-components/`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Puede ejecutarse en paralelo (archivos distintos, sin dependencias).
- **[Story]**: User story (US1, US2).
- Incluir rutas de archivo exactas en las descripciones.

## Path Conventions

- **Frontend**: `apps/frontend/src/`
- **Backend**: `apps/backend/src/`
- **Backend mocks**: Datos de desarrollo en `apps/backend/src/data/` como archivos **`.json`** (ej. `products.json`); el backend sirve esos mocks en desarrollo; misma estructura de datos que los contratos OpenAPI.
- **Lib ui-components**: `libs/ui-components/src/`
- **Tests**: `apps/frontend/` y `apps/backend/` con sus respectivos tests (unit/integration/contract según proyecto Nx).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicialización de la estructura Nx (apps + lib) según constitución.

- [x] T001 Crear app **backend** en `apps/backend` con Nx (Node/Express), targets build/serve/test/lint.
- [x] T002 Crear app **frontend** en `apps/frontend` con Nx (React + Vite), targets build/serve/test/lint; configurar Tailwind v4 y paths `@meli-challenge/ui-components`.
- [x] T003 Crear lib **ui-components** en `libs/ui-components` con `importPath` `@meli-challenge/ui-components`; configurar build y exports; que el frontend pueda importar desde ella.
- [x] T004 [P] Configurar proxy del dev server del frontend hacia el backend (Vite/Nx) para evitar CORS en desarrollo.
- [x] T005 [P] Añadir dependencias de stack en cada proyecto: frontend (axios, react-query, zustand, react-router-dom si aplica); backend (express, swagger-ui-express o equivalente); lib ui-components (react si exporta componentes).

**Checkpoint**: Estructura Nx lista; `pnpm nx build backend`, `pnpm nx build frontend`, `pnpm nx build ui-components` ejecutables.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infraestructura que DEBE estar lista antes de implementar user stories.

**⚠️ CRITICAL**: No comenzar US1/US2 hasta completar esta fase.

### Backend — Base

- [x] T006 [P] Definir tipos/interfaces **Product** y **Seller** en `apps/backend/src/` (ej. `types/product.ts`) según data-model.md y contracts/openapi.yaml.
- [x] T007 Crear mocks en `apps/backend/src/data/` como archivos **`.json`**: al menos `products.json` con 2–3 productos de ejemplo que cumplan el schema Product/Seller (data-model.md / openapi.yaml); el backend devolverá estos datos en desarrollo.
- [x] T008 Implementar servicio de lectura en `apps/backend/src/services/products.service.ts`: leer desde los JSON en `apps/backend/src/data/` (ej. `products.json`), devolver listado y detalle por id; manejar id inexistente (null o throw).
- [x] T009 Configurar Express en `apps/backend`: app, middleware (json, CORS), error handler global de 4 argumentos; puerto desde env.
- [x] T010 [P] Configurar rutas base `/api` y montar Swagger/OpenAPI con el spec de `contracts/openapi.yaml` (o generado desde código) en ruta `/api-docs` o similar.
- [x] T011 Documentar API (OpenAPI) alineada con contracts; asegurar que GET /products y GET /products/:id estén descritos.

### Frontend — Base

- [ ] T012 [P] Configurar cliente **axios** en `apps/frontend/src/api/` (instancia con baseURL hacia el backend); tipar respuestas según contracts.
- [ ] T013 [P] Configurar **react-query** (QueryClient, QueryClientProvider) en el árbol de la app frontend.
- [ ] T014 Configurar enrutado en la app frontend: ruta home (ej. `/`) y ruta detalle (ej. `/product/:id`); estructura de páginas en `apps/frontend/src/pages/` o equivalente.
- [ ] T015 [P] Crear en `libs/ui-components` componentes base reutilizables: al menos Button, Card, Layout (header/content); exportar desde `libs/ui-components/src/index.ts`; el frontend los importa desde `@meli-challenge/ui-components`.

**Checkpoint**: Backend sirve datos desde los mocks JSON en `apps/backend/src/data/`; frontend tiene routing, axios y react-query listos; ui-components consumibles desde frontend.

### Design — Look & feel Meli (UX)

**Purpose**: Entregable concreto del **@senior-ux-designer** para que el frontend implemente home y detalle alineados con Mercado Libre Argentina. T021 y T029 se implementan siguiendo esta spec.

- [ ] **T015b [UX]** Producir **especificación de diseño** concreta y ejecutable para home y página de detalle, alineada con **Mercado Libre Argentina**. Referencias: [home Meli](https://www.mercadolibre.com.ar/), [detalle producto Meli](https://www.mercadolibre.com.ar/celular-samsung-galaxy-a55-5g-2568gb-black-knox-color-negro/p/MLA46689590). **Entregables** (sin Figma): (A) **Markdown**: `functional/specs/001-meli-prototype/design-spec-meli.md` — design system (tokens, tipografía, colores, espaciado, botones), layout home, layout detalle; todo en **Tailwind v4** para que @senior-frontend implemente en T021 y T029. (B) **Página Design System**: `apps/frontend/src/pages/DesignSystem.tsx` — documentación visual para desarrolladores (tokens, componentes, ejemplos) accesible en la app (ruta `/design-system`). (C) **Página Prototype**: `apps/frontend/src/pages/Prototype.tsx` — prototipo que muestra cómo usar cada componente (ejemplos de uso, variantes) accesible en la app (ruta `/prototype`). Con estos tres entregables el front puede implementar T021 y T029. Responsable: **@senior-ux-designer** (especs) y **@senior-frontend** (páginas React).

**Checkpoint**: Documento de diseño disponible; T021 y T029 pueden ejecutarse siguiendo la spec.

---

## Phase 3: User Story 1 — Ver listado de productos en el home (Priority: P1) 🎯 MVP

**Goal**: Página de inicio con listado de productos; diseño referencia Mercado Libre Argentina; datos desde GET /products; responsive.

**Independent Test**: Abrir la app en la ruta del home y comprobar que se muestran productos en un layout responsive; los datos provienen del backend.

### Tests for User Story 1

- [ ] T016 [P] [US1] Test unitario o de contrato para GET /api/products en `apps/backend`: respuesta 200, cuerpo array de productos con campos esperados (id, title, price, etc.).
- [ ] T017 [P] [US1] Test del servicio de productos (backend): dado los mocks en `apps/backend/src/data/*.json`, listProducts devuelve array; getProductById(id) devuelve producto o null según exista.
- [ ] T018 [US1] Test de la página home (frontend): renderiza listado (mock de react-query o MSW); muestra estado loading/error si aplica; al menos un snapshot o aserciones de contenido.

### Implementation for User Story 1

- [ ] T019 [US1] Implementar en backend **GET /api/products**: controlador que llama al servicio de listado; respuesta JSON según ProductSummary (contracts); manejo de errores (500 con mensaje).
- [ ] T020 [US1] En frontend: hook o función que usa react-query (useQuery) para GET /products; clave de query estable; tipado según ProductSummary.
- [ ] T021 [US1] Implementar página **Home** en `apps/frontend/src/pages/Home.tsx` (o equivalente): usar hook de listado; mostrar grid de productos usando Card de ui-components; **diseño según spec T015b (design-spec-meli)** — layout, cabecera, grid; estado vacío si array vacío.
- [ ] T022 [US1] Enlaces desde cada ítem del listado a la ruta de detalle (ej. `/product/:id`) para preparar US2.
- [ ] T023 [US1] Asegurar que la página home sea responsive (Tailwind: breakpoints, grid/flex).

**Checkpoint**: User Story 1 completada; home muestra listado de productos; se puede navegar a detalle por enlace.

---

## Phase 4: User Story 2 — Ver detalle de un producto (Priority: P2)

**Goal**: Página de detalle de producto con imágenes, título, descripción, precio, métodos de pago, vendedor, detalles adicionales; diseño referencia página producto Meli; manejo de 404 y error.

**Independent Test**: Navegar a la ruta de detalle de un producto (desde home o URL directa) y comprobar que se muestran todos los bloques; probar con id inexistente y ver mensaje/estado de error.

### Tests for User Story 2

- [ ] T024 [P] [US2] Test de contrato para GET /api/products/:id en backend: 200 con cuerpo Product cuando id existe; 404 cuando id no existe; 400 si id inválido (si aplica).
- [ ] T025 [P] [US2] Test del servicio getProductById: retorna producto cuando existe; retorna null o lanza cuando no existe (y el controlador traduce a 404).
- [ ] T026 [US2] Test de la página de detalle (frontend): renderiza detalle con datos mock; muestra estado de error cuando falla la query (ej. 404).

### Implementation for User Story 2

- [ ] T027 [US2] Implementar en backend **GET /api/products/:id**: controlador que valida id, llama al servicio getProductById; si no existe responder 404 con cuerpo Error; si existe 200 con Product (schema completo).
- [ ] T028 [US2] En frontend: hook useQuery para GET /api/products/:id con productId como clave; manejar isError, error (incl. 404) para mostrar UI de error.
- [ ] T029 [US2] Implementar página **ProductDetail** en `apps/frontend/src/pages/ProductDetail.tsx`: galería de imágenes, título, descripción, precio, métodos de pago, bloque vendedor, detalles adicionales; **diseño según spec T015b (design-spec-meli)**; responsive.
- [ ] T030 [US2] Mostrar estado de error o mensaje cuando el producto no existe (404) o falla la red; enlace para volver al home.
- [ ] T031 [US2] Asegurar que la página de detalle sea responsive y user-friendly.

**Checkpoint**: User Stories 1 y 2 completadas; home y detalle funcionando; errores manejados.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: run.md, documentación, cobertura ≥80%, validación quickstart.

- [ ] T032 Crear **run.md** en la raíz del repositorio: instrucciones para instalar dependencias (`pnpm install`), ejecutar backend (`pnpm nx serve backend`), ejecutar frontend (`pnpm nx serve frontend`), y cualquier prerrequisito (Node 18+, pnpm 9+).
- [ ] T033 Revisar y completar documentación de código (APIs, módulos, lógica no obvia) en backend y frontend según FR-010.
- [ ] T034 Ejecutar suite de tests (backend + frontend + lib) y verificar cobertura ≥80%; añadir tests unitarios/integración donde falte para alcanzar el umbral.
- [ ] T035 [P] Validar flujo con quickstart.md: seguir pasos de ejecución y comprobar que home y detalle funcionan; corregir run.md si hace falta.
- [ ] T036 Revisar manejo de errores en toda la app (backend: middleware de error; frontend: estados de error en queries); asegurar que no se silencian errores (constitución V).

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Sin dependencias; puede iniciarse de inmediato.
- **Phase 2 (Foundational)**: Depende de Phase 1; BLOQUEA el inicio de US1 y US2.
- **Phase 2.5 (Design Meli)**: T015b es opcional pero recomendado; T021 y T029 aplican la spec de T015b cuando exista.
- **Phase 3 (US1)**: Depende de Phase 2; puede iniciarse cuando foundational esté listo; para look & feel Meli, conviene tener T015b antes de T021.
- **Phase 4 (US2)**: Depende de Phase 2; puede hacerse en paralelo con US1 o después; la navegación desde home a detalle usa la ruta definida en T022; para look & feel Meli, T029 sigue la spec de T015b.
- **Phase 5 (Polish)**: Depende de que US1 y US2 estén implementados.

### User Story Dependencies

- **US1 (P1)**: Sin dependencia de US2; solo requiere Phase 1 + 2.
- **US2 (P2)**: Sin dependencia de US1 a nivel de backend; el frontend puede enlazar desde home (T022) una vez US1 esté listo; independientemente se puede probar accediendo por URL directa `/product/:id`.

### Within Each User Story

- **Design (T015b)**: El UX designer produce `design-spec-meli.md`; frontend (T021, T029) implementa según esa spec.
- Tests (T016–T018, T024–T026) pueden escribirse antes o en paralelo con la implementación; idealmente fallan hasta que la implementación esté lista.
- Backend: tipos → servicio → controlador → ruta.
- Frontend: api/hooks → página → integración con ui-components (y con design-spec cuando exista).

### Parallel Opportunities

- T004 y T005 pueden ejecutarse en paralelo (Phase 1).
- T006, T010, T012, T013, T015 pueden ejecutarse en paralelo dentro de Phase 2.
- T016, T017 (tests US1 backend) en paralelo; T019–T023 (impl US1) en orden lógico.
- T024, T025 (tests US2 backend) en paralelo; T027–T031 (impl US2) en orden lógico.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Completar Phase 1: Setup.
2. Completar Phase 2: Foundational.
3. Completar Phase 3: User Story 1 (tests + implementación).
4. **STOP and VALIDATE**: Probar home en navegador; verificar que listado se muestra y enlace a detalle existe.
5. Opcional: desplegar o hacer demo.

### Incremental Delivery

1. Setup + Foundational → Base lista.
2. US1 (home) → Probar independientemente → MVP listo.
3. US2 (detalle) → Probar independientemente → Feature completo.
4. Polish → run.md, docs, cobertura, quickstart.

### Notes

- Cada tarea debe ser completable y verificable; commit tras cada tarea o grupo lógico.
- Detener en cualquier checkpoint para validar la story de forma independiente.
- Evitar tareas vagas o que modifiquen el mismo archivo en conflicto; mantener independencia entre stories donde sea posible.
