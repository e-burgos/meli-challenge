# GitHub Copilot — Workspace Instructions

## Proyecto

**meli-challenge** es un monorepo Nx/pnpm que implementa un prototipo de Mercado Libre Argentina con:

- `apps/frontend` — React + TypeScript + Tailwind CSS v4 + Vite
- `apps/backend` — Node.js + Express + TypeScript + Swagger/OpenAPI
- `libs/ui-components` — Componentes reutilizables (`@meli-challenge/ui-components`)

Stack fijo: React, TypeScript, Tailwind v4, Vite, Nx, pnpm, Express, Swagger, axios, react-query (TanStack Query), zustand.

## GitHub Spec Kit

Este proyecto usa **GitHub Spec Kit** para gestionar especificaciones de features.
Toda la estructura de Spec Kit vive bajo `functional/`:

| Artefacto            | Ruta                                         |
| -------------------- | -------------------------------------------- |
| Scripts bash         | `functional/.specify/scripts/bash/`          |
| Templates            | `functional/.specify/templates/`             |
| Memoria/constitución | `functional/.specify/memory/constitution.md` |
| Specs activas        | `functional/specs/<branch-name>/`            |

### Estructura de cada feature en `functional/specs/<branch>/`

```
spec.md          # Especificación funcional
plan.md          # Plan técnico de implementación
tasks.md         # Desglose de tareas
research.md      # Investigación y decisiones técnicas
data-model.md    # Modelo de datos
quickstart.md    # Escenarios de integración
contracts/       # Contratos OpenAPI / GraphQL
checklists/      # Checklists de calidad de requisitos
```

### Scripts disponibles (ejecutar siempre desde la raíz del repo)

| Script                                                                                          | Qué hace                      |
| ----------------------------------------------------------------------------------------------- | ----------------------------- |
| `functional/.specify/scripts/bash/create-new-feature.sh --json --short-name "<name>" "<title>"` | Crea rama + `spec.md`         |
| `functional/.specify/scripts/bash/setup-plan.sh --json`                                         | Crea `plan.md`                |
| `functional/.specify/scripts/bash/check-prerequisites.sh --json`                                | Valida artefactos disponibles |
| `functional/.specify/scripts/bash/update-agent-context.sh github-copilot`                       | Actualiza contexto del agente |

### Flujo completo de una feature

| Paso | Prompt file             | Qué hace                                                      |
| ---- | ----------------------- | ------------------------------------------------------------- |
| 1    | `speckit.specify`       | Crear `spec.md` desde descripción en lenguaje natural         |
| 2    | `speckit.clarify`       | Resolver ambigüedades de la spec (antes del plan)             |
| 3    | `speckit.plan`          | Generar plan técnico, data-model, contratos, research         |
| 4    | `speckit.tasks`         | Generar `tasks.md` ordenado por user story y dependencias     |
| 5    | `speckit.analyze`       | Análisis de consistencia (solo lectura, antes de implementar) |
| 6    | `speckit.checklist`     | Generar checklist de calidad de requisitos                    |
| 7    | `speckit.implement`     | Ejecutar implementación siguiendo `tasks.md`                  |
| 8    | `speckit.taskstoissues` | Convertir `tasks.md` en GitHub Issues                         |
| 9    | `speckit.constitution`  | Crear/actualizar la constitución del proyecto                 |

Cada prompt está en `.github/prompts/speckit.<name>.prompt.md`.

### Cómo invocar los prompts en GitHub Copilot Chat (VS Code)

- **Opción A — Selector de prompts**: En el panel de Copilot Chat, haz clic en el ícono de adjuntar (`📎`) → **Prompt...** y selecciona el archivo `speckit.<name>.prompt.md`.
- **Opción B — Slash desde el chat**: Escribe `/` en el chat y selecciona el prompt file del listado que aparece.
- **Opción C — Referencia directa**: Arrastra el archivo `.github/prompts/speckit.<name>.prompt.md` al chat o escribe `#speckit.<name>.prompt.md` para referenciarlo como contexto.

## Constitución del proyecto (principios no negociables)

Ver `functional/.specify/memory/constitution.md` para los principios completos. Resumen:

- **Estructura Nx**: tres entregables exactos (`frontend`, `backend`, `ui-components`).
- **Stack fijo**: no introducir frameworks alternativos sin enmendar la constitución.
- **Persistencia**: solo JSON/CSV local; sin bases de datos reales.
- **API REST mínima**: endpoint de listado de productos + endpoint de detalle.
- **Diseño**: basado en Mercado Libre Argentina (home + detalle de producto).
- **Calidad**: manejo de errores explícito, sin silenciar errores.
- **Componentes UI**: todos los componentes reutilizables van en `libs/ui-components`.

## Convenciones de código

- TypeScript estricto en todo el monorepo (`strict: true`).
- Componentes React funcionales con hooks; no clases.
- Tailwind CSS v4 (CSS-first, directiva `@source` para monorepo).
- Separación de rutas, controladores, servicios y repositorios en el backend.
- Documentación OpenAPI alineada con el código (Swagger).

## Comandos útiles (desde la raíz del repo)

```bash
pnpm install                          # instalar dependencias
pnpm nx serve frontend                # dev server frontend
pnpm nx serve backend                 # dev server backend
pnpm nx build frontend                # build frontend
pnpm nx build backend                 # build backend
pnpm nx test frontend                 # tests frontend
pnpm nx test backend                  # tests backend
pnpm nx lint frontend                 # lint frontend
```
