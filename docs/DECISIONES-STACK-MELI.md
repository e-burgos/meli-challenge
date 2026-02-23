# Decisiones de stack tecnológico — Challenge MELI

**Objetivo del challenge:** Demostrar que es posible construir un equipo de trabajo con agentes de manera organizada, constituir y planificar un proyecto, documentar con historias de usuario y implementar una solución punta a punta en un monorepo.

---

## Por qué este stack

Elegí un stack que permitiera **separar responsabilidades claras** (backend, frontend, UX, orquestación) y **trabajar con agentes** sin que el código se convierta en un bloque monolítico. A la vez, quería que el resultado fuera **ejecutable, testeable y desplegable** con poco fricción.

### Monorepo con Nx + pnpm

- **Un solo repo** para backend, frontend y libs compartidas: facilita que varios “agentes” (o personas) trabajen sobre el mismo código con dependencias explícitas (`nx graph`, `affected`).
- **Nx** da estructura por proyectos (apps/libs), targets (build, serve, test, lint) y caché, lo que encaja con un flujo donde el orquestador asigna tareas y cada agente trabaja en su proyecto.
- **pnpm** con workspaces mantiene dependencias por proyecto y evita duplicados; el lockfile hace los builds reproducibles (incluido CI y deploy).

### Backend: Node.js + Express + TypeScript

- **Express** es sencillo de especificar por contrato (rutas, middlewares, OpenAPI) y de implementar por un agente “backend” sin ambigüedad.
- **TypeScript** estricto y tipos alineados con OpenAPI permiten que el frontend y el backend compartan el mismo “contrato” (tipos, rutas) y reduzcan errores de integración.
- API REST documentada con **OpenAPI/Swagger** para que cualquier agente (o humano) entienda qué expone el backend sin adivinar.

### Frontend: React + Vite + Tailwind v4

- **React** con hooks y componentes funcionales es fácil de descomponer en tareas por pantalla o por componente; encaja con historias de usuario (“página Home”, “página Detalle”).
- **Vite** ofrece build rápido y proxy de desarrollo hacia el backend, lo que permite probar front y back juntos en local con una sola configuración.
- **Tailwind v4** permite que un agente “UX” entregue una spec en utilidades CSS y que el frontend la implemente sin inventar estilos; el diseño de referencia (Meli) se traduce en tokens y clases reutilizables.

### Especificación y planificación

- **functional/specs/** con plan, data-model, contratos OpenAPI y **tasks.md** por feature: las historias de usuario y tareas (T001, T002, …) son el input para el orquestador y para cada agente. Así se demuestra “constituir y planificar” en algo concreto.
- **Agentes en `.cursor/agents/`** (senior-backend, senior-frontend, senior-ux-designer, orchestrator, prompt-manager): cada uno tiene un rol y un scope; el orquestador coordina fases y dependencias. Eso muestra un “equipo de trabajo con agentes de manera organizada”.

### Deploy

- **Backend en Render** y **frontend en GitHub Pages** con un workflow de CI que buildea con las variables correctas (base path, API URL). La solución queda punta a punta: desde el repo hasta una app usable en producción.

---

En resumen: el stack está elegido para que **agentes con roles bien definidos** puedan colaborar sobre un **monorepo planificado y documentado**, con **historias de usuario traducidas en tareas** y una **implementación de punta a punta** que se puede ejecutar, testear y desplegar.
