# Prompts de generación del proyecto

Esta carpeta guarda los **prompts** usados para generar o configurar partes del repositorio. Sirven como:

- Referencia para reproducir la misma configuración en otro repo.
- Documentación de las decisiones de setup.
- Entrada reutilizable para asistentes de código (Cursor, Copilot, etc.).

## Archivos

| Archivo | Descripción |
|---------|-------------|
| `nx-pnpm-monorepo-setup.md` | Prompt para crear la estructura Nx con pnpm, carpetas apps/libs/tools y alias `@meli-challenge`. |
| `gh-spec-kit-under-functional.md` | Prompt para instalar GitHub Spec Kit con toda la estructura bajo `functional/` (`.specify/`, `specs/`, scripts y comandos Cursor). |

Al añadir nuevos prompts, usar nombres descriptivos y mantener el mismo formato: título, prompt en bloque de código y resultado esperado.
