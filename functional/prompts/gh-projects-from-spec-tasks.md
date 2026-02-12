# Prompt: Configurar y mantener GitHub Projects desde spec/tasks

Este prompt sirve para **crear o mantener un GitHub Project** vinculado al repositorio, usando las tareas de un spec (p. ej. `functional/specs/<feature>/tasks.md`) y los issues del repo. Incluye uso de labels como "Phase", vistas y flujo de trabajo. Úsalo cuando quieras documentar o reproducir el setup de un Project tipo board para un feature (p. ej. 001-meli-prototype).

---

## Prompt

```
Configura y mantiene un GitHub Project para seguir las tareas de este spec/feature, usando el repo actual y los issues existentes.

**Contexto**
- Repo: [OWNER/REPO, ej. e-burgos/meli-challenge]
- Spec/feature: [ej. 001-meli-prototype]
- Fuente de tareas: `functional/specs/<feature>/tasks.md` (tareas con ID T001, T002, … y fases 1–5)

**Pasos**

1. **Crear el GitHub Project** (si no existe)
   - En GitHub: Repo → Projects → New project (o User/Org → Projects → New project).
   - Elegir template (Board, Table, etc.) y nombre (ej. "001-meli-prototype" o "Meli Challenge").
   - Si es proyecto de usuario: vincular el repo en la configuración del Project (Add repository).

2. **Asegurar issues por tarea**
   - Si aún no hay issues: crear un issue por cada tarea de `tasks.md`, con título `[TXXX] Descripción breve` y en el body: fase, enlace a tasks.md y descripción.
   - Si ya hay issues: verificar que tengan el prefijo [T001]…[T036] en el título y que el body indique la fase.

3. **Campo "Phase" (vía labels)**
   - Crear labels en el repo para cada fase (GitHub los crea al asignarlos si no existen):
     - `phase: 1-Setup`
     - `phase: 2-Foundational`
     - `phase: 3-US1`
     - `phase: 4-US2`
     - `phase: 5-Polish`
   - Asignar a cada issue la label correspondiente según la fase en `tasks.md` (Fase 1 → phase: 1-Setup, etc.).
   - En el Project: opcionalmente añadir un campo personalizado "Phase" (Single select) con esas opciones y rellenar según la label de cada ítem, o filtrar/agrupar por label.

4. **Añadir issues al Project**
   - En el Project: Add item → buscar por "is:issue" del repo o por label (ej. `label:"phase: 1-Setup"`).
   - Añadir todos los issues de las tareas (T001–T036 o el rango que aplique).
   - Ordenar o agrupar por Phase (o por Status si defines columnas Todo / In progress / Done).

5. **Vistas y flujo**
   - Board: columnas sugeridas (Status) — Todo, In progress, Done (o según workflow del equipo).
   - Table: columnas útiles — Title, Phase (label o custom field), Assignees, Status.
   - Guardar la URL del Project (ej. `https://github.com/users/<user>/projects/<id>/views/<view_id>`) y, si aplica, referenciarla en `functional/specs/<feature>/tasks.md` o en un README bajo "Seguimiento".

6. **Mantenimiento**
   - Al cerrar un issue, mover la tarjeta a Done en el board (si usas Status).
   - Al añadir tareas nuevas en `tasks.md`, crear el issue correspondiente y añadirlo al Project con la label de fase.
   - Para nuevos features: repetir desde el paso 1 con otro Project o otra vista filtrada por label del feature.
```

## Resultado esperado

- Un **GitHub Project** vinculado al repo (o al usuario/org) con nombre identificable.
- **Issues** con prefijo [T001]–[T036] (o rango del spec), cada uno con la **label de Phase** correcta.
- **Todos los issues de tareas** añadidos al Project.
- **Vista** (board o table) con columnas Status y/o Phase.
- **URL del Project** guardada o referenciada en el spec/README para acceso rápido.

## Variantes del prompt

- **Solo documentar**: "Genera una sección en `functional/specs/001-meli-prototype/tasks.md` (o README) con el enlace al GitHub Project y los pasos para añadir nuevos issues al Project."
- **Solo issues + labels**: "Crea los issues para las tareas de `tasks.md` y asígnales las labels phase: 1-Setup … phase: 5-Polish; no modifiques el Project."
- **Project desde cero**: Si el repo no tiene issues aún, usar el prompt completo; si ya tiene issues con phase labels, saltar al paso 4 (añadir al Project) y 5 (vistas).
- **Otro repo**: Sustituir [OWNER/REPO] y la ruta `functional/specs/<feature>/` por las del otro repositorio.
