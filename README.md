# meli-challenge

Monorepo Nx con **pnpm**, alias `@meli-challenge`. Prototipo tipo Mercado Libre (home + detalle de producto): backend Express, frontend React/Vite, desplegado en Render + GitHub Pages.

- **Ejecución local:** [run.md](run.md)
- **Decisiones de stack (para MELI):** [DECISIONES-STACK-MELI.md](DECISIONES-STACK-MELI.md)

## Estructura

- **`apps/`** – Aplicaciones (web, API, etc.)
- **`libs/`** – Bibliotecas compartidas
- **`tools/`** – Herramientas y scripts (CLI, etc.)
- **`functional/`** – Spec Kit (spec-driven development) y prompts:
  - **`functional/.specify/`** – Scripts, plantillas y memoria de Spec Kit
  - **`functional/specs/`** – Especificaciones por feature (rama `001-nombre`, etc.)
  - **`functional/prompts/`** – Prompts de generación del proyecto

## Requisitos

- **Node.js** 18+
- **pnpm** 9+

## Instalación

```bash
pnpm install
```

## Cómo ejecutar

Resumen; detalle en **[run.md](run.md)**.

1. `pnpm install`
2. Backend: `pnpm dev:backend` → http://localhost:3333/api (Swagger: /api/docs)
3. Frontend: `pnpm dev:frontend` → http://localhost:3000

El backend debe estar en marcha para que el home y el detalle carguen datos.

## Alias

Las importaciones usan el scope `@meli-challenge`:

- `@meli-challenge/root` – Package raíz
- Al añadir proyectos en `libs/` o `apps/`, se usarán como `@meli-challenge/<nombre-proyecto>` (según `importPath` del proyecto)

## Comandos Nx

```bash
# Grafo de dependencias
pnpm nx graph

# Build de todos los proyectos
pnpm run build

# Tests
pnpm run test

# Ejecutar un target en un proyecto
pnpm nx <target> <project-name>
```

## Añadir proyectos

- **App:** `pnpm nx g @nx/js:app apps/<nombre>` (o el plugin que uses: React, Next, etc.)
- **Lib:** `pnpm nx g @nx/js:lib libs/<nombre> --importPath=@meli-challenge/<nombre>`
- **Tool:** crear en `tools/` y configurar como app o lib según el caso

## Referencias

- [Nx](https://nx.dev)
- [Nx + pnpm](https://nx.dev/getting-started/package-managers/pnpm)
