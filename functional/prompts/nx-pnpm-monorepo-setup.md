# Prompt: Generación de estructura Nx con pnpm y alias @meli-challenge

Este archivo contiene el prompt de generación usado para crear la arquitectura Nx del proyecto. Sirve como referencia para reproducir la misma estructura o adaptarla a otros monorepos.

---

## Prompt

```
Implementa una arquitectura Nx en pnpm en este repositorio con las siguientes condiciones:

1. **Estructura de carpetas**
   - `apps/` – aplicaciones (web, API, etc.)
   - `libs/` – bibliotecas compartidas
   - `tools/` – herramientas y scripts (CLI, utilidades de desarrollo)
   - Cada carpeta debe existir con un `.gitkeep` si está vacía.

2. **Package manager**
   - Usar **pnpm** como gestor de dependencias.
   - Configurar `pnpm-workspace.yaml` con los paquetes:
     - `apps/*`
     - `libs/*`
     - `tools/*`
   - Incluir `autoInstallPeers: true`.

3. **Alias del monorepo**
   - El alias/scope del proyecto debe ser **@meli-challenge**.
   - En el `package.json` raíz: `"name": "@meli-challenge/root"` (Nx 17+ usa este nombre como prefijo para nuevos proyectos).
   - En `tsconfig.base.json`:
     - `compilerOptions.customConditions`: `["@meli-challenge/root"]`
     - `compilerOptions.baseUrl`: `"."`
     - `compilerOptions.paths`: `"@meli-challenge/*": ["libs/*", "apps/*", "tools/*"]`
   - Así las importaciones pueden usar `@meli-challenge/<nombre-lib>` o `@meli-challenge/<nombre-app>` según el proyecto.

4. **Nx**
   - Crear el workspace con el preset **ts** (TypeScript) y **pnpm**:  
     `create-nx-workspace@latest <nombre-temp> --preset=ts --packageManager=pnpm --name=@meli-challenge/root --skipGit --no-interactive`
   - Copiar al repo raíz los archivos generados: `nx.json`, `package.json`, `pnpm-workspace.yaml`, `tsconfig.base.json`, `tsconfig.json`, `.gitignore`, `.prettierrc`, `.prettierignore`, `.vscode/` si existe.
   - En **nx.json** añadir:
     - `workspaceLayout`: `{ "appsDir": "apps", "libsDir": "libs" }`
   - No copiar la carpeta `packages/` del preset; en su lugar crear `apps/`, `libs/` y `tools/` en la raíz.

5. **Scripts raíz**
   - En el `package.json` raíz incluir al menos:
     - `"build": "nx run-many -t build"`
     - `"test": "nx run-many -t test"`

6. **Documentación**
   - Añadir o actualizar un README en la raíz que explique:
     - Estructura (apps, libs, tools)
     - Comandos: `pnpm install`, `pnpm nx graph`, `pnpm run build`, `pnpm run test`
     - Cómo añadir una app: `nx g @nx/js:app apps/<nombre>` (o el plugin correspondiente)
     - Cómo añadir una lib con alias: `nx g @nx/js:lib libs/<nombre> --importPath=@meli-challenge/<nombre>`
     - Que el alias de importación es `@meli-challenge`.

7. **Opcional**
   - Ignorar en `.gitignore` la salida del grafo Nx: `graph.html`, `static/`.
```

---

## Resultado esperado

- Monorepo Nx con pnpm.
- Carpetas `apps/`, `libs/`, `tools/` en la raíz.
- Alias `@meli-challenge` para importaciones y nombre raíz `@meli-challenge/root`.
- `workspaceLayout` en Nx para que los generadores creen apps en `apps/` y libs en `libs/`.
- Dependencias instaladas con `pnpm install` y comandos `pnpm nx graph`, `pnpm run build`, `pnpm run test` utilizables.

---

## Variantes del prompt

- **Cambiar alias:** sustituir `@meli-challenge` y `@meli-challenge/root` por el scope deseado (por ejemplo `@mi-org/root`).
- **Sin carpeta `tools`:** en `pnpm-workspace.yaml` usar solo `apps/*` y `libs/*`; no crear `tools/` ni referenciarla en `paths`.
- **Añadir CI:** después de la estructura, usar `nx g ci-workflow` o configurar el pipeline según la documentación de Nx.
