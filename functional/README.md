# functional/

Contenido funcional y de especificación del proyecto.

## Contenido

- **`.specify/`** – [GitHub Spec Kit](https://github.com/github/spec-kit): scripts, plantillas y memoria para spec-driven development. Los comandos Cursor (`/speckit.*`) usan `functional/.specify/scripts/bash/` y `functional/specs/`.
- **`specs/`** – Especificaciones por feature (una carpeta por rama, ej. `001-feature-name/` con `spec.md`, `plan.md`, `tasks.md`, etc.).
- **`prompts/`** – Prompts de generación del proyecto (setup Nx, etc.).

## Spec Kit

Spec Kit está instalado bajo `functional/` para mantener la organización. Ejecutar los scripts siempre desde la **raíz del repo**; las rutas en los comandos ya apuntan a `functional/.specify/` y `functional/specs/`.
