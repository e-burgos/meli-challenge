# Agentes del proyecto

Este documento describe los **agentes y subagentes** configurados para tareas concretas. Los subagentes viven en `.cursor/agents/` y se invocan desde el chat o Composer.

## Dónde ver y usar agentes

### 1. Menú @ en el chat (desplegable al escribir @)

En el chat o en Composer, escribe **`@`**. En el menú que aparece:
- Busca la categoría **Agents** o **Subagents** y las entradas de `.cursor/agents/`.
- Los subagentes se listan por **nombre** (frontmatter `name`, ej. `prompt-manager`).
- Puedes escribir después de `@` algo como **`@prompt`** para filtrar y ver el subagente de prompts.

Al elegir un subagente, Cursor lo usa como contexto y el agente correspondiente queda activo para esa conversación.

### 2. Cursor Settings → Agents (si aplica)

En la configuración de Cursor puedes ver los agentes del proyecto. Los subagentes definidos en `.cursor/agents/` están disponibles para el workspace actual.

---

## Cómo indicar en el chat qué agente usar

1. **Referenciar el subagente con @**  
   En el chat escribe `@` y el nombre del agente. Por ejemplo:
   - Para el agente de prompts: **`@prompt-manager`**; para frontend: **`@senior-frontend`**; para backend: **`@senior-backend`** (o buscar por nombre en el desplegable).

2. **Pedir la tarea en lenguaje natural**  
   Escribe directamente lo que quieres, por ejemplo: *"Usa el subagente prompt-manager para generar un prompt que documente…"* o *"Añade un nuevo prompt en functional/prompts que…"*. Si invocas antes el subagente con `@prompt-manager`, el modelo seguirá sus instrucciones.

**Recomendación:** Para usar el agente de prompts, escribe **`@prompt-manager`** y a continuación tu petición (ej. "Genera un prompt para…").

## Agentes disponibles

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

### 3. Senior Backend Developer — subagente `senior-backend`

**Archivo:** `.cursor/agents/senior-backend.md`  
**Cuándo usarlo:** Para crear o revisar backends, APIs REST, servicios Express, Swagger/OpenAPI, validación, middleware y configuración Nx de apps Node/Express en el monorepo.

**Stack y responsabilidad:** Experto en Node.js, Express, TypeScript, Swagger/OpenAPI, validación (express-validator, Zod, JSON Schema), Nx (`@nx/node`, `@nx/express`), pnpm. Aplica buenas prácticas: TypeScript strict, rutas y controladores separados, middleware (auth, validación, error handling), documentación OpenAPI alineada con código, capa de servicios y repos, tests y uso correcto de Nx (generadores, targets, dependencias, proxies).

**Frases que activan este agente (ejemplos):**
- "Crea la API de…" / "Añade el endpoint…"
- "Configura Swagger en…" / "Documenta la API con OpenAPI…"
- "Revisa el backend…" / "Añade validación a…"
- "Genera una app Express en Nx…" / "Usa el subagente senior-backend para…"

---

Para añadir más agentes, crea un nuevo archivo en `.cursor/agents/` (`.md` con frontmatter `name` y `description` y el cuerpo como system prompt) y documéntalo aquí.
