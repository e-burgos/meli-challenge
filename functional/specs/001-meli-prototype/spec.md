# Feature Specification: Prototipo Meli — Home y detalle de ítem

**Feature Branch**: `001-meli-prototype`  
**Created**: 2025-02-12  
**Status**: Draft  
**Input**: Prototipo tipo MercadoLibre: Home con listado de productos, página de detalle de ítem, backend REST con listado y detalle, estructura Nx frontend/backend/ui-components, stack React Tailwind Vite y Node Express Swagger, cobertura 80% y run.md. Referencia: `functional/context/source-of-truth.md`.

### Stack técnico (alineado con constitución y agentes)

- **Frontend**: React, TypeScript, Tailwind CSS v4, Vite, Nx, pnpm. Llamadas al backend: **axios** (cliente HTTP) y **react-query** (TanStack Query) para datos asíncronos del servidor. Estado global de cliente: **zustand**.
- **Backend**: Node.js, Express, TypeScript, Swagger/OpenAPI, Nx, pnpm. Llamadas HTTP salientes a otros servicios: **axios**.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ver listado de productos en el home (Priority: P1)

Como usuario quiero ver la página de inicio con un listado de productos para poder explorar qué hay disponible y elegir un ítem que me interese.

**Why this priority**: Sin listado no hay punto de entrada al prototipo; es el primer valor entregable.

**Independent Test**: Se puede verificar abriendo la app en la ruta del home y comprobando que se muestran productos en un layout responsive; los datos provienen del endpoint de listado del backend.

**Acceptance Scenarios**:

1. **Given** la app frontend está en ejecución, **When** el usuario navega al home, **Then** se muestra un listado de productos con diseño de referencia tipo Mercado Libre Argentina (layout, cabecera, grid/categorías).
2. **Given** el backend está disponible, **When** el frontend solicita el listado de productos, **Then** el backend responde con todos los productos (persistidos en JSON o CSV).
3. **Given** el usuario está en el home, **When** la ventana se redimensiona, **Then** la página se adapta (responsive) y sigue siendo usable.

---

### User Story 2 - Ver detalle de un producto (Priority: P2)

Como usuario quiero ver la página de detalle de un producto (imágenes, título, descripción, precio, métodos de pago, vendedor, detalles adicionales) al seleccionar un ítem del listado.

**Why this priority**: Es el segundo valor principal; requiere que exista al menos el backend de detalle y una forma de llegar (p. ej. desde el home).

**Independent Test**: Se puede verificar navegando a la ruta de detalle de un producto (p. ej. por id) y comprobando que se muestran todos los bloques de información con diseño de referencia tipo página de producto Meli.

**Acceptance Scenarios**:

1. **Given** el usuario está en el home o tiene un enlace a un producto, **When** accede a la página de detalle de un ítem válido, **Then** se muestran imágenes, título, descripción, precio, métodos de pago, información del vendedor y detalles adicionales (ej. valoraciones, reseñas, stock).
2. **Given** el backend está disponible, **When** el frontend solicita el detalle de un producto por identificador, **Then** el backend responde con los datos del producto.
3. **Given** el usuario solicita el detalle de un producto inexistente o id inválido, **When** el backend no encuentra el ítem, **Then** se devuelve un error adecuado y el frontend maneja el caso (mensaje o estado acorde).
4. **Given** el usuario está en la página de detalle, **When** la ventana se redimensiona, **Then** la página es responsive y user-friendly.

---

### Edge Cases

- ¿Qué ocurre cuando el listado de productos está vacío? El home debe mostrarse sin errores (estado vacío o mensaje claro).
- ¿Qué ocurre cuando se solicita el detalle de un id que no existe? El backend responde con código de error apropiado (p. ej. 404); el frontend muestra un estado de error o mensaje al usuario.
- ¿Qué ocurre cuando el backend no está disponible o falla? El frontend debe manejar el error (timeout, 5xx) sin romperse y, si aplica, mostrar un mensaje al usuario.
- ¿Qué ocurre con parámetros de query o path inválidos? El backend valida y responde con 400 u otro código adecuado.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema DEBE exponer una app **frontend** en `apps/frontend` (Nx) que incluya la página de inicio (home) y la página de detalle de producto.
- **FR-002**: El sistema DEBE exponer una app **backend** en `apps/backend` (Nx) que implemente una API REST.
- **FR-003**: El sistema DEBE incluir una lib **ui-components** en `libs/ui-components` con `importPath` `@meli-challenge/ui-components`; el frontend DEBE consumir los componentes de UI desde esta lib.
- **FR-004**: El backend DEBE ofrecer un endpoint que devuelva **todos los productos** (para el listado del home).
- **FR-005**: El backend DEBE ofrecer un endpoint que devuelva el **detalle de un producto** dado su identificador.
- **FR-006**: La persistencia DEBE ser solo archivos locales (JSON o CSV); no se usarán bases de datos reales.
- **FR-007**: El frontend DEBE tomar como referencia de diseño el home de Mercado Libre Argentina y la página de producto de MercadoLibre (referencias en source-of-truth).
- **FR-008**: Las páginas DEBE ser responsive y user-friendly.
- **FR-009**: El código DEBE tener manejo de errores explícito y adecuado.
- **FR-010**: El código DEBE estar documentado (APIs, módulos, lógica no obvia).
- **FR-011**: La cobertura de tests DEBE ser al menos del 80%.
- **FR-012**: El repositorio DEBE incluir un archivo `run.md` en la raíz que explique cómo ejecutar el proyecto (frontend, backend y prerrequisitos).

### Key Entities

- **Producto**: Ítem listado en el home y mostrado en detalle; atributos: id, título, descripción, precio, imágenes, métodos de pago, información del vendedor, detalles adicionales (valoraciones, reseñas, stock, etc.).
- **Vendedor**: Información asociada a un producto (nombre, reputación, etc.); puede ser un objeto anidado en el producto para este prototipo.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un usuario puede ver el listado de productos en el home en menos de 5 segundos (tiempo de carga razonable con datos en archivo).
- **SC-002**: Un usuario puede ver el detalle completo de un producto al navegar desde el home o por URL directa.
- **SC-003**: La cobertura de código del proyecto es ≥ 80%.
- **SC-004**: Cualquier desarrollador puede ejecutar frontend y backend siguiendo únicamente las instrucciones de `run.md`.
- **SC-005**: Las páginas del frontend son usables en viewport móvil y escritorio (responsive).
