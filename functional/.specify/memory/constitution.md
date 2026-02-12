<!--
Informe de impacto (Sync Impact Report)
- Cambio de versión: 1.0.0 → 1.1.0 (ampliación material del stack en Principio II)
- Principios modificados: II. Cumplimiento del stack (axios, react-query, zustand en frontend; axios en backend)
- Secciones añadidas: Ninguna nueva
- Secciones eliminadas: Ninguna
- Plantillas: plan-template.md (Constitution Check con nuevo stack — ✅ actualizado); spec 001-meli-prototype (stack técnico — ✅ actualizado)
- TODOs pendientes: Ninguno.
-->

# Constitución meli-challenge

## Principios fundamentales

### I. Estructura del proyecto Nx

El proyecto DEBE constar exactamente de tres entregables Nx:

- **App `frontend`** en `apps/frontend`: aplicación web que ofrece la página de inicio (listado de productos) y la página de detalle de producto.
- **App `backend`** en `apps/backend`: API REST que sirve al frontend.
- **Lib `ui-components`** en `libs/ui-components` con `importPath` `@meli-challenge/ui-components`: todos los componentes de UI reutilizables (botones, cards, layouts, etc.) usados por el frontend.

El frontend DEBE consumir la UI desde `@meli-challenge/ui-components`; los componentes compartidos del frontend NO DEBEN vivir fuera de esta lib en el alcance de este challenge.

**Motivo**: Una única fuente de verdad para la estructura (ver `functional/context/source-of-truth.md`); permite límites claros y reutilización.

### II. Cumplimiento del stack

Las tecnologías están fijadas para este proyecto:

- **Frontend**: React, TypeScript, Tailwind CSS v4, Vite, Nx, pnpm. Para llamadas al backend: **axios** como cliente HTTP y **react-query** (TanStack Query) para datos asíncronos del servidor (cache, estados loading/error). Para estado global de cliente: **zustand**.
- **Backend**: Node.js, Express, TypeScript, Swagger/OpenAPI, Nx, pnpm. Para llamadas HTTP salientes a otros servicios: **axios**.

Las nuevas funcionalidades y apps DEBEN usar este stack; no se permiten frameworks o entornos alternativos salvo que se enmiende la constitución.

**Motivo**: Alineado con los agentes del proyecto y la herramienta existente; asegura consistencia y evaluabilidad.

### III. Contrato de API y persistencia

El backend DEBE exponer una API REST con al menos:

- Un endpoint que devuelva **todos los productos** (para el listado del home).
- Un endpoint que devuelva el **detalle de un producto** por identificador.

La persistencia DEBE ser solo basada en archivos: archivos locales **JSON** o **CSV**. No se DEBEN usar bases de datos reales (PostgreSQL, MongoDB, etc.).

**Motivo**: Requisito del challenge; mantiene el alcance y la configuración mínimos.

### IV. Referencias de diseño y UX

- **Home**: El diseño y el comportamiento DEBEN tomar como referencia la página principal de Mercado Libre Argentina (https://www.mercadolibre.com.ar/): estructura, cabecera, grid de productos, categorías.
- **Detalle de producto**: El diseño y el comportamiento DEBEN tomar como referencia una página de producto de MercadoLibre (ej. https://www.mercadolibre.com.ar/celular-samsung-galaxy-a55-5g-2568gb-black-knox-color-negro-bueno-reacondicionado/p/MLA2009168328): galería, bloque de precio, métodos de pago, datos del vendedor, detalles adicionales.

Todas las páginas orientadas al usuario DEBEN ser responsive y fáciles de usar. Las recomendaciones y la lógica de checkout quedan fuera de alcance y NO DEBEN implementarse en el alcance de esta constitución.

**Motivo**: Asegura un prototipo coherente tipo Meli; evita el alcance creep.

### V. Puerta de calidad (INNEGOCIABLE)

- **Manejo de errores**: DEBE existir un manejo de errores adecuado y explícito; los errores NO DEBEN ser silenciados ni ignorados.
- **Documentación**: El código DEBE estar documentado (APIs, módulos y lógica no obvia).
- **Cobertura de tests**: La cobertura global del código DEBE ser al menos del **80%**.

Las revisiones y la entrega DEBEN verificar el cumplimiento; las funcionalidades que incumplan este principio NO DEBEN mergearse hasta corregirse.

**Motivo**: Requisitos no funcionales del challenge; asegura mantenibilidad y evaluabilidad.

## Restricciones adicionales

- **Fuera de alcance**: Recomendaciones de productos; flujo de checkout o pago.
- **UX**: Se requiere diseño responsive e interacción user-friendly en home y detalle de producto.
- **Instrucciones de ejecución**: El repositorio DEBE incluir un `run.md` en la raíz del proyecto que describa cómo ejecutar el proyecto (frontend, backend y prerrequisitos).

## Flujo de desarrollo

- **Documento de diseño**: DEBE entregarse un documento breve (1–2 páginas) junto con el código, que cubra las decisiones de diseño y los desafíos encontrados (y cómo se abordaron).
- **Herramientas**: Se permite el uso de GenAI, IDEs agenticos y otras herramientas de asistencia al código. El código entregado DEBE reflejar la comprensión y las modificaciones del autor; el autor DEBE poder explicar la solución.
- **Fuente de verdad**: El alcance y los requisitos se definen en `functional/context/source-of-truth.md`. Los documentos en conflicto DEBEN resolverse a favor de la fuente de verdad salvo que se enmiende la constitución.

## Gobernanza

- Esta constitución es la base de gobernanza del proyecto. Las especificaciones, planes y tareas DEBEN alinearse con ella.
- **Enmiendas**: Los cambios exigen actualizar este archivo, incrementar la versión según versionado semántico (MAJOR: eliminación/cambio incompatible de principio; MINOR: nuevo principio o ampliación material; PATCH: aclaraciones, typos) y actualizar el comentario del Informe de impacto al inicio. `LAST_AMENDED_DATE` DEBE fijarse a la fecha de la enmienda.
- **Cumplimiento**: Las puertas «Constitution Check» de los planes y las revisiones de código DEBEN verificar el cumplimiento de estos principios. Las violaciones DEBEN corregirse antes del merge o la entrega.
- **Referencia**: Usar `functional/context/source-of-truth.md` para alcance y lista de artefactos; usar esta constitución para cómo está estructurado el proyecto y qué reglas de calidad y cumplimiento aplican.

**Versión**: 1.1.0 | **Ratificada**: 2025-02-12 | **Última enmienda**: 2025-02-12
