# Agentes del proyecto

Este documento describe los **agentes y subagentes** configurados para tareas concretas. Los subagentes viven en `.cursor/agents/` y se invocan desde el chat o Composer.

## Dónde ver y usar agentes

Hay **dos formas** de invocar a cada agente; ambas están configuradas para los mismos subagentes.

### 1. Comandos de barra `/` (recomendado para listado completo)

En el chat escribe **`/`**. Aparecen todos los comandos, incluidos los que invocan a cada agente:

| Comando       | Agente            |
|---------------|-------------------|
| `/senior-backend` | Senior Backend     |
| `/senior-frontend` | Senior Frontend   |
| `/senior-ux-designer` | Senior UX Designer |
| `/orchestrator` | Orquestador        |
| `/prompt-manager` | Gestión de prompts |
| `/gh-tasks-sync` | Sincronizar tareas con GitHub |

Ejemplo: escribe **`/senior-backend`** y luego tu petición (o **`/senior-backend añade validación al endpoint`**).

### 2. Menú @ en el chat (desplegable al escribir @)

En el chat o en Composer, escribe **`@`**. En el menú:
- Busca la categoría **Agents** o **Subagents** y las entradas de `.cursor/agents/`.
- Los subagentes se listan por **nombre** (frontmatter `name`), ej. `senior-backend`, `prompt-manager`.
- Escribe después de `@` algo como **`@senior-backend`** o **`@prompt`** para filtrar.

Al elegir un subagente, Cursor lo usa como contexto para esa conversación.

### 3. Cursor Settings → Agents (si aplica)

En la configuración de Cursor puedes ver los agentes del proyecto. Los subagentes en `.cursor/agents/` están disponibles en el workspace actual.

---

## Cómo indicar en el chat qué agente usar

1. **Con `/` (comandos)**  
   Escribe **`/`** y elige el agente en el listado (ej. **`/senior-backend`**). Luego escribe tu petición. Así ves todos los agentes en un solo listado.

2. **Con `@` (menciones)**  
   Escribe `@` y el nombre del agente, ej.: **`@senior-backend`**, **`@orchestrator`**, **`@prompt-manager`**, **`@senior-frontend`**, **`@senior-ux-designer`**, **`@gh-tasks-sync`** (o filtra escribiendo después de `@`).

3. **Pedir la tarea en lenguaje natural**  
   Escribe lo que quieres y, si hace falta, invoca antes el agente con `/` o `@`, por ejemplo: *"Usa el subagente prompt-manager para generar un prompt que…"* o **`/senior-backend añade validación al endpoint de productos`**.

**Recomendación:** Si no ves un agente en el menú `@`, usa **`/`** y busca por nombre (ej. `/senior-backend`).

## Agentes disponibles

### 0. Orquestador — subagente `orchestrator` (arquitecto, coordinador, solucionador)

**Archivo:** `.cursor/agents/orchestrator.md`  
**Cuándo usarlo:** Para "con qué seguimos", implementar fases completas (Phase 2 backend/frontend, US1, US2), coordinar backend y frontend, o desbloquear problemas. El orquestador tiene todo el contexto del plan y las tareas (tasks.md); puede **iniciar la implementación** aplicando las guías del agente correspondiente (senior-backend, senior-frontend) o indicar qué agente invocar; cuando es posible, **planifica y ejecuta en paralelo** (p. ej. backend base y frontend base).

**Responsabilidad:** Actuar como **arquitecto** (diseño de alto nivel, alineación con plan y contratos), **coordinador** (quién hace qué, orden, paralelo) y **solucionador** (corregir errores, desalineaciones con tasks.md). Puede implementar él mismo o delegar con instrucción concreta.

**Frases que activan este agente (ejemplos):**
- "¿Con qué seguimos?" / "Siguiente paso según tasks.md"
- "Continuemos con la implementación de Phase 2 backend" / "Implementar Phase 2 completo"
- "Orquesta la implementación de US1" / "Coordina backend y frontend en paralelo"
- "Usa el orquestador para…"

### 1. Gestión de prompts (`functional/prompts`) — subagente `prompt-manager`

**Archivo:** `.cursor/agents/prompt-manager.md`  
**Cuándo usarlo:** Cuando quieras añadir, generar o documentar un prompt en `functional/prompts`, o reproducir una tarea/configuración ya hecha como prompt.

**Responsabilidad:** Incorporar nuevos prompts en `functional/prompts` con la estructura estándar del proyecto:
- Un archivo por prompt, nombre en kebab-case.
- Secciones: título, descripción, bloque del prompt, resultado esperado, variantes (opcional).
- Actualizar `functional/prompts/README.md` con el nuevo archivo.
- No inventar pasos; inspeccionar el repo si el prompt documenta algo ya hecho.

**Frases que activan este agente (ejemplos):**
- "Genera un prompt para…"
- "Añade un prompt en functional/prompts que…"
- "Incorpora un nuevo prompt que documente cómo…"
- "Usa el subagente prompt-manager para…"

### 2. Senior Frontend Developer — subagente `senior-frontend`

**Archivo:** `.cursor/agents/senior-frontend.md`  
**Cuándo usarlo:** Para implementar o revisar UI, componentes React, estilos (Tailwind v4), configuración de build (Vite, Nx) y buenas prácticas en el stack JS/TS del monorepo.

**Stack y responsabilidad:** Experto en React, TypeScript, Node, Tailwind CSS v4, Nx, Vite y pnpm. Aplica buenas prácticas: TypeScript estricto, componentes funcionales y hooks, Vite con Nx, Tailwind v4 (CSS-first, @source en monorepo), pnpm workspaces, accesibilidad, tests y código mantenible.

**Frases que activan este agente (ejemplos):**
- "Implementa el componente…" / "Refactoriza la pantalla…"
- "Configura Tailwind v4 en…" / "Ajusta Vite para…"
- "Revisa el código frontend…" / "Mejora la accesibilidad de…"
- "Usa el subagente senior-frontend para…"

### Senior UX Designer — subagente `senior-ux-designer`

**Archivo:** `.cursor/agents/senior-ux-designer.md`  
**Cuándo usarlo:** Cuando necesites especificaciones de diseño alineadas con **Mercado Libre Argentina** (home y página de detalle de producto), design system (layout, botones, branding, imágenes, contenedores) o alineación pixel-perfect con Meli antes de que senior-frontend implemente la UI.

**Responsabilidad:** Definir con exactitud el diseño de componentes clave (layout, botones, design system, branding, imágenes, contenedores) tomando como referencia [Mercado Libre Argentina](https://www.mercadolibre.com.ar/) (home) y [página de detalle de producto](https://www.mercadolibre.com.ar/celular-samsung-galaxy-a55-5g-2568gb-black-knox-color-negro/p/MLA46689590). Experto en Tailwind v4; produce specs (clases Tailwind, tokens, estructura) para que **@senior-frontend** implemente. Trabaja en conjunto con senior-frontend: UX define la spec, frontend implementa.

**Frases que activan este agente (ejemplos):**
- "Define el design system alineado con Mercado Libre" / "Especifica layout y componentes para el home tipo Meli"
- "Quiero que el home y el detalle se vean como Mercado Libre Argentina"
- "Dame las especificaciones de diseño (Tailwind) para la página de detalle"
- "Usa el subagente senior-ux-designer para…"

### 3. Senior Backend Developer — subagente `senior-backend`

**Archivo:** `.cursor/agents/senior-backend.md`  
**Cuándo usarlo:** Para crear o revisar backends, APIs REST, servicios Express, Swagger/OpenAPI, validación, middleware y configuración Nx de apps Node/Express en el monorepo.

**Stack y responsabilidad:** Experto en Node.js, Express, TypeScript, Swagger/OpenAPI, validación (express-validator, Zod, JSON Schema), Nx (`@nx/node`, `@nx/express`), pnpm. Aplica buenas prácticas: TypeScript strict, rutas y controladores separados, middleware (auth, validación, error handling), documentación OpenAPI alineada con código, capa de servicios y repos, tests y uso correcto de Nx (generadores, targets, dependencias, proxies).

**Frases que activan este agente (ejemplos):**
- "Crea la API de…" / "Añade el endpoint…"
- "Configura Swagger en…" / "Documenta la API con OpenAPI…"
- "Revisa el backend…" / "Añade validación a…"
- "Genera una app Express en Nx…" / "Usa el subagente senior-backend para…"

### 4. Sincronización de tareas con GitHub (Issues / Projects) — subagente `gh-tasks-sync`

**Archivo:** `.cursor/agents/gh-tasks-sync.md`  
**Cuándo usarlo:** Para sincronizar las tareas del repo (`functional/specs/*/tasks.md`) con GitHub Issues y mantener el estado alineado para GitHub Projects. Crear issues faltantes, actualizar labels (Phase, Status) y cerrar issues cuando la tarea está implementada.

**Responsabilidad:** Leer tasks.md, emparejar tareas T001–T036 con issues existentes (por título `[TXXX]`), crear issues que falten con labels de fase, actualizar labels Phase/Status y cerrar issues cuando la tarea esté hecha. No puede añadir ítems al Project ni editar campos del Project (se hace en la interfaz de GitHub); deja los issues listos para que el Project refleje el estado.

**Frases que activan este agente (ejemplos):**
- "Sincroniza las tareas con GitHub" / "Actualiza GH Projects"
- "Crea los issues que falten para las tareas" / "Marca T012 como hecho en GitHub"
- "Revisa el estado del proyecto y actualiza GitHub"
- "Usa el subagente gh-tasks-sync para…"

---

Para añadir más agentes, crea un nuevo archivo en `.cursor/agents/` (`.md` con frontmatter `name` y `description` y el cuerpo como system prompt) y documéntalo aquí.
