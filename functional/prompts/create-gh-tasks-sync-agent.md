# Prompt: Crear el agente gh-tasks-sync (sincronización de tareas con GitHub)

Este prompt sirve para **crear o reproducir el agente gh-tasks-sync** de Cursor en este repo o en otro. El agente se invoca con `@gh-tasks-sync` y sincroniza las tareas de `functional/specs/*/tasks.md` con GitHub Issues (crear issues faltantes, actualizar labels Phase/Status, cerrar issues cuando la tarea está hecha), dejando el estado listo para GitHub Projects. Úsalo cuando quieras documentar cómo se creó el agente o replicarlo en otro workspace.

---

## Prompt

```
Crea un agente de Cursor para **sincronizar las tareas del proyecto con GitHub** que actuará como subagente en el chat (invocable con @gh-tasks-sync).

**Ubicación y formato**
- Archivo: `.cursor/agents/gh-tasks-sync.md`
- Formato: Markdown con frontmatter YAML al inicio.
- Frontmatter obligatorio: `name` (ej. gh-tasks-sync), `description` (una línea clara: sincroniza tasks.md con GitHub Issues, crea/actualiza issues y labels, cierra issues cuando la tarea está implementada; usar de forma proactiva al cambiar tasks.md o al pedir "actualizar GH Projects").

**Estructura del cuerpo del agente**

1. **Título H1**  
   - Ej.: `# GitHub Tasks Sync Agent`  
   - Párrafo breve: agente que sincroniza tareas de functional/specs/*/tasks.md con GitHub Issues y mantiene el estado alineado para GitHub Projects (issues creados/actualizados; el usuario añade los issues al Project en la interfaz de GitHub).

2. **Alcance y limitaciones**  
   - **Puedes**: Crear issues, actualizar issues (título, body, labels, state open/closed), listar y buscar issues. Usar labels Phase (phase: 1-Setup, phase: 2-Foundational, phase: 3-US1, phase: 4-US2, phase: 5-Polish) y Status (status: todo, status: in-progress, status: done).
   - **No puedes**: Crear un GitHub Project, añadir o quitar ítems de un Project, ni escribir campos del Project (limitación de la API). El usuario añade los issues al Project desde GitHub; tu trabajo es dejar los issues creados y actualizados.

3. **Cuándo actuar**  
   - Al invocarte explícitamente: "Sincroniza las tareas con GitHub", "Actualiza GH Projects", "Crea los issues que falten", "Marca T012 como hecho en GitHub".
   - De forma proactiva: cuando se modifique tasks.md (nuevas tareas o checkboxes [x]) o cuando el usuario mencione el estado del proyecto o de GitHub Projects.
   - Revisiones periódicas: "revisa el estado del proyecto y actualiza GitHub" → recorrer tasks.md, comparar con issues, crear/actualizar.

4. **Flujo de trabajo al ser invocado**  
   Subsecciones numeradas:
   - **1. Obtener tareas del repo**: Leer functional/specs/*/tasks.md; extraer tareas con formato - [ ] TXXX o - [x] TXXX, descripción y fase (Phase 1–5); mapear fase a label (Phase 1 → phase: 1-Setup, etc.).
   - **2. Obtener issues existentes**: Listar issues del repositorio (owner/repo inferido o por defecto); filtrar por título [T001]…[T036] para emparejar tarea con issue.
   - **3. Crear issues faltantes**: Para cada TXXX sin issue: crear issue con título [TXXX] Descripción breve, body con fase y enlace a tasks.md; asignar label Phase; opcional status: todo.
   - **4. Actualizar issues existentes**: Añadir/corregir label Phase; si la tarea está hecha (usuario o checkbox [x] en tasks.md), añadir status: done y cerrar issue (state: closed) salvo indicación contraria; opcional: detección por código (rutas/archivos clave) para sugerir qué issues cerrar.
   - **5. Labels de estado**: Usar status: todo, status: in-progress, status: done; al crear issue asignar status: todo; al marcar hecha asignar status: done y cerrar.
   - **6. Reporte al usuario**: Resumir cuántos issues creados/actualizados/cerrados; listar números de issue creados para que el usuario los añada al Project; recordar que añadir/ordenar ítems en el Project se hace en la interfaz de GitHub.

5. **Repositorio por defecto**  
   - Si no se infiere del workspace: usar owner y repo por defecto (ej. e-burgos, meli-challenge). Si el usuario indica otro owner/repo, usarlo.

6. **Buenas prácticas**  
   - No duplicar issues: comprobar por título [TXXX] antes de crear.
   - Mantener body del issue con enlace a spec/tasks (rama o ruta).
   - Usar nombres de label existentes en el repo; si creas status: *, nombres cortos y claros.
   - Al cerrar un issue, comentario opcional y breve ("Tarea implementada según tasks.md").

7. **Respuesta típica**  
   - Ejemplos de salida en lenguaje natural: "Se crearon 3 issues (#40, #41, #42)… Añádelos al Project desde GitHub si aún no están."; "Se actualizaron las labels Phase en 5 issues y se cerraron 2 issues (T001, T002)…"

**Referencia de contenido completo**  
Para copiar el texto exacto de cada sección, usar como fuente el archivo `.cursor/agents/gh-tasks-sync.md` de este repositorio (meli-challenge).

**Registro del agente**  
Opcional: en AGENTS.md (o README), añadir una entrada que describa el subagente (nombre, archivo, cuándo usarlo, frases que lo activan).
```

## Resultado esperado

- Archivo **`.cursor/agents/gh-tasks-sync.md`** con frontmatter (`name`, `description`) y cuerpo en Markdown.
- Contenido que define alcance y limitaciones (issues sí, Project no), cuándo actuar, flujo de trabajo (obtener tareas, obtener issues, crear faltantes, actualizar existentes, labels Phase/Status, reporte), repositorio por defecto, buenas prácticas y respuesta típica.
- El agente aparece en el menú @ de Cursor como **gh-tasks-sync** y, al elegirlo, el modelo sigue ese rol para sincronizar tasks.md con GitHub Issues.
- Opcional: entrada en **AGENTS.md** (o README) describiendo el agente y cómo invocarlo.

## Variantes del prompt

- **Solo frontmatter y estructura**: "Genera solo el esqueleto del agente (frontmatter + títulos de secciones y 1–2 líneas por sección); el contenido detallado se rellenará después."
- **Otro nombre o fuente de tareas**: Cambiar `gh-tasks-sync` por otro nombre (ej. `jira-sync`) y ajustar la fuente de tareas (ej. otro archivo o formato) y el mapeo de fases/labels.
- **Registro obligatorio**: "Además de crear el archivo del agente, añade o actualiza la sección de agentes en AGENTS.md con la descripción y las frases que activan el agente gh-tasks-sync."
