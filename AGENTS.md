# Agentes del proyecto

Este documento describe los **agentes específicos** configurados para tareas concretas. Cursor usa las reglas en `.cursor/rules/` para activar cada agente según el contexto o la petición del usuario.

## Desplegable / lista de agentes disponibles

Cursor no tiene un menú aparte llamado "Agentes", pero **tus agentes (reglas) aparecen en dos sitios**:

### 1. Menú @ en el chat (desplegable al escribir @)

En el chat o en Composer, escribe **`@`**. En el menú que aparece:
- Busca la categoría **Rules** o las entradas que correspondan a tus reglas de proyecto.
- Las reglas en `.cursor/rules/` suelen listarse por **nombre de archivo** (ej. `prompt-manager-agent`) o por la **description** del frontmatter (ej. "Agent: Gestión de prompts...").
- Puedes escribir después de `@` algo como **`@prompt`** o **`@agent`** para filtrar y ver solo las reglas que coincidan.

Al elegir una regla, Cursor la añade como contexto y el agente correspondiente queda "activo" para esa conversación.

### 2. Cursor Settings → Rules, Commands (lista de todas las reglas)

Ahí ves **todas las reglas del proyecto** en una sola lista (como un desplegable/panel de agentes):

1. Abre **Cursor Settings** (icono de engranaje o `Cmd/Ctrl + ,`).
2. Entra en **Rules, Commands** (o busca "Rules" en la configuración).
3. En **Project Rules** aparecen los archivos de `.cursor/rules/`, con su estado (si aplican siempre, por archivos o manualmente).

Desde ahí puedes ver qué agentes/reglas tienes y activar o desactivar las que quieras. Para usarlas en el chat, sigue usando **@** y el nombre de la regla como en el punto anterior.

---

## Cómo indicar en el chat qué agente usar

1. **Referenciar la regla con @**  
   En el chat escribe `@` y luego el path de la regla del agente. Cursor incluirá esa regla como contexto en la conversación:
   - Para el agente de prompts: **`@.cursor/rules/prompt-manager-agent.mdc`**
   - También puedes escribir `@` y buscar por nombre (ej. "prompt-manager") si Cursor muestra las reglas en el menú.

2. **Tener abierto o en contexto un archivo que coincida con el agente**  
   Si abres o añades al chat un archivo de la carpeta que usa el agente, Cursor puede aplicar la regla por el `globs`:
   - Para el agente de prompts: abre o referencia algún archivo en **`context/prompts/`** (ej. `@context/prompts/README.md`). Así la regla `context/prompts/**` se activa.

3. **Pedir la tarea en lenguaje natural**  
   Escribe directamente lo que quieres, por ejemplo: *"Usa el agente de prompts: genera un prompt para configurar ESLint en el monorepo"* o *"Añade un nuevo prompt en context/prompts que documente cómo se creó la app X"*. Si has referenciado antes la regla o un archivo de `context/prompts`, el modelo seguirá las instrucciones del agente.

**Recomendación:** Para estar seguro de que se usa el agente de prompts, escribe en el chat **`@.cursor/rules/prompt-manager-agent.mdc`** y a continuación tu petición (ej. "Genera un prompt para…").

## Agentes disponibles

### 1. Gestión de prompts (`context/prompts`)

**Regla:** `.cursor/rules/prompt-manager-agent.mdc`  
**Cuándo se activa:** Al trabajar en archivos bajo `context/prompts/**` o cuando el usuario pide añadir/generar un prompt en esa carpeta.

**Responsabilidad:** Incorporar nuevos prompts en `context/prompts` con la estructura estándar del proyecto:
- Archivo por prompt, nombre en kebab-case.
- Secciones: título, descripción, bloque del prompt, resultado esperado, variantes (opcional).
- Actualizar `context/prompts/README.md` con el nuevo archivo.

**Frases que activan este agente (ejemplos):**
- "Genera un prompt para…"
- "Añade un prompt en context/prompts que…"
- "Incorpora un nuevo prompt que documente cómo…"
- Abrir o referenciar archivos en `context/prompts/`.

---

Para añadir más agentes, crea una nueva regla en `.cursor/rules/` (`.mdc` con `description` y `globs` o `alwaysApply`) y documenta aquí su nombre, regla y cuándo usarla.
