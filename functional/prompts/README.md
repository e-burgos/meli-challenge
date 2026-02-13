# Prompts de generación del proyecto

Esta carpeta guarda los **prompts** usados para generar o configurar partes del repositorio. Sirven como:

- Referencia para reproducir la misma configuración en otro repo.
- Documentación de las decisiones de setup.
- Entrada reutilizable para asistentes de código (Cursor, Copilot, etc.).

## Archivos

| Archivo                           | Descripción                                                                                                                                                                                                                                                |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `nx-pnpm-monorepo-setup.md`       | Prompt para crear la estructura Nx con pnpm, carpetas apps/libs/tools y alias `@meli-challenge`.                                                                                                                                                           |
| `gh-spec-kit-under-functional.md` | Prompt para instalar GitHub Spec Kit con toda la estructura bajo `functional/` (`.specify/`, `specs/`, scripts y comandos Cursor).                                                                                                                         |
| `gh-projects-from-spec-tasks.md`  | Prompt para configurar y mantener un GitHub Project desde un spec (tasks.md): crear Project, issues con labels Phase, añadir ítems y vistas.                                                                                                               |
| `create-frontend-agent.md`        | Prompt para crear o reproducir el agente Senior Frontend Developer de Cursor (`.cursor/agents/senior-frontend.md`): stack, buenas prácticas, diseño pixel-perfect, apps/libs/tools.                                                                        |
| `create-backend-agent.md`         | Prompt para crear o reproducir el agente Senior Backend Developer de Cursor (`.cursor/agents/senior-backend.md`): stack, Nx, Express, Swagger/OpenAPI, validación, estructura de APIs.                                                                     |
| `create-gh-tasks-sync-agent.md`   | Prompt para crear o reproducir el agente gh-tasks-sync de Cursor (`.cursor/agents/gh-tasks-sync.md`): sincronizar tasks.md con GitHub Issues, labels Phase/Status, cerrar issues cuando la tarea está hecha.                                               |
| `create-orchestrator-agent.md`    | Prompt para crear o reproducir el agente orquestador de Cursor (`.cursor/agents/orchestrator.md`): arquitecto, coordinador y solucionador; analiza plan y tareas, puede iniciar implementación o delegar; planifica ejecución en paralelo cuando convenga. |
| `create-senior-ux-designer-agent.md` | Prompt para crear o reproducir el agente Senior UX Designer de Cursor (`.cursor/agents/senior-ux-designer.md`): alinea diseño con Mercado Libre Argentina, puede diseñar cualquier componente de la web de Meli, experto en Tailwind v4, produce specs para senior-frontend. |

Al añadir nuevos prompts, usar nombres descriptivos y mantener el mismo formato: título, prompt en bloque de código y resultado esperado.
