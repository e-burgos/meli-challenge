# meli-challenge

Monorepo Nx con **pnpm**, alias `@meli-challenge`.

## Estructura

- **`apps/`** – Aplicaciones (web, API, etc.)
- **`libs/`** – Bibliotecas compartidas
- **`tools/`** – Herramientas y scripts (CLI, etc.)
- **`legacy/`** – Contenido previo (Spec Kit y demás), por referencia

## Requisitos

- **Node.js** 18+
- **pnpm** 9+

## Instalación

```bash
pnpm install
```

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
