````markdown
# Prompt: Implementación de GitHub Spec Kit bajo functional/ (Cursor + GitHub Copilot)

Este archivo documenta el prompt para instalar [GitHub Spec Kit](https://github.com/github/spec-kit) con **toda la estructura y scripts bajo la carpeta `functional/`** (`.specify/`, `specs/`, plantillas y referencias en comandos de agente). Sirve para reproducir la misma configuración en otro repo o recordar los pasos tras un `specify init` estándar.

Soporta **dos asistentes de IA**:
- **Cursor** → comandos en `.cursor/commands/speckit.*.md`
- **GitHub Copilot** → instrucciones en `.github/copilot-instructions.md` y prompts en `.github/prompts/`

---

## Prompt

```
Implementa GitHub Spec Kit en este repositorio con las siguientes condiciones obligatorias:
1. **Todo lo que genera Spec Kit (carpetas y documentos) debe quedar dentro de la carpeta `functional/`** para mantener la organización del proyecto.
2. **Debe funcionar tanto con Cursor como con GitHub Copilot** (VS Code / GitHub Copilot Chat).

Pasos a seguir:

1. **Prerrequisitos**
   - Tener **uv** instalado a nivel global (o en el entorno que uses).
   - Si `uvx` falla al crear `~/.local/share/uv/tools`, arreglar permisos:
     - `mkdir -p ~/.local/share/uv/tools`
     - `chmod -R u+rwX ~/.local/share/uv`
     - Si hace falta: `sudo chown -R $(whoami) ~/.local` y luego `chmod -R u+rwX ~/.local`

2. **Inicializar Spec Kit desde la raíz del repo**
   - Ejecutar desde la raíz del repositorio:
     `uvx --from git+https://github.com/github/spec-kit.git specify init . --ai cursor-agent --force`
   - Esto crea `.specify/`, `.cursor/commands/speckit.*.md` y, al usarlo, `specs/`.
   - No cambiar la ubicación de `.cursor/commands/` (Cursor espera `.cursor` en la raíz).

3. **Mover Spec Kit bajo `functional/`**
   - Mover `.specify` a `functional/.specify`.
   - Crear `functional/specs` (vacía; se llenará al crear features).

4. **Ajustar scripts en `functional/.specify/scripts/bash/`**
   - **common.sh**
     - En `get_current_branch`: usar `specs_dir="$repo_root/functional/specs"` en lugar de `"$repo_root/specs"`.
     - En `find_feature_dir_by_prefix`: el primer argumento debe ser la base (ej. `functional`); usar `specs_dir="$specify_base/specs"` y que quien llame pase `repo_root/functional`.
     - En `get_feature_paths`: definir `specify_base="$repo_root/functional"` y llamar a `find_feature_dir_by_prefix "$specify_base" "$current_branch"` en lugar de pasar `repo_root`.
   - **create-new-feature.sh**
     - `SPECS_DIR="$REPO_ROOT/functional/specs"` y `TEMPLATE="$REPO_ROOT/functional/.specify/templates/spec-template.md"`.
     - En `find_repo_root`: cuando se encuentre `dir/.specify` y `basename "$dir"` sea `functional`, devolver el padre de `dir` (raíz del repo) en lugar de `dir`, para que REPO_ROOT siga siendo la raíz del repo.
   - **setup-plan.sh**: `TEMPLATE="$REPO_ROOT/functional/.specify/templates/plan-template.md"`.
   - **update-agent-context.sh**: `TEMPLATE_FILE="$REPO_ROOT/functional/.specify/templates/agent-file-template.md"`.

5. **Actualizar comandos Cursor en `.cursor/commands/`**
   - En todos los archivos `speckit.*.md`, reemplazar:
     - `.specify/scripts/bash/` → `functional/.specify/scripts/bash/`
     - `.specify/memory/` → `functional/.specify/memory/`
     - `.specify/templates/` → `functional/.specify/templates/`
   - Así los pasos que dicen "Run … from repo root" seguirán siendo desde la raíz, pero invocando scripts y leyendo plantillas/memoria bajo `functional/`.

6. **Añadir soporte para GitHub Copilot**
   - Crear la carpeta `.github/` en la raíz si no existe.
   - Crear `.github/copilot-instructions.md` con las instrucciones globales del workspace para Copilot:

     Contenido sugerido:

       # Copilot workspace instructions

       This project uses GitHub Spec Kit to manage feature specs.
       All specs live under `functional/specs/<branch-name>/` and follow the structure:
       - `spec.md` — Feature specification
       - `plan.md` — Implementation plan
       - `tasks.md` — Task breakdown
       - `contracts/` — API/data contracts

       Scripts are located in `functional/.specify/scripts/bash/` and must be run from the repo root.
       Templates are in `functional/.specify/templates/`.
       Agent memory/context lives in `functional/.specify/memory/constitution.md`.

       When asked to create a feature spec, plan, or tasks, follow these conventions and use the scripts above.

   - Crear la carpeta `.github/prompts/` y añadir un archivo por cada flujo Spec Kit.
     Cada archivo sigue el formato `speckit.<name>.prompt.md` con frontmatter `mode: agent` y `description`.

     Archivo `.github/prompts/speckit.create-feature.prompt.md`:
       ---
       mode: agent
       description: Create a new feature spec under functional/specs/ using Spec Kit.
       ---
       # Create new feature spec
       Run from repo root:
         ./functional/.specify/scripts/bash/create-new-feature.sh --json --short-name "<short-name>" "<Feature title>"
       This creates `functional/specs/<branch>/spec.md`.
       Template: `functional/.specify/templates/spec-template.md`.

     Archivo `.github/prompts/speckit.setup-plan.prompt.md`:
       ---
       mode: agent
       description: Generate an implementation plan for the current feature spec.
       ---
       # Setup feature plan
       Run from repo root:
         ./functional/.specify/scripts/bash/setup-plan.sh --json
       This creates `functional/specs/<branch>/plan.md`.
       Template: `functional/.specify/templates/plan-template.md`.

     Archivo `.github/prompts/speckit.update-context.prompt.md`:
       ---
       mode: agent
       description: Update the agent context file for the current feature.
       ---
       # Update agent context
       Run from repo root:
         ./functional/.specify/scripts/bash/update-agent-context.sh --json
       Template: `functional/.specify/templates/agent-file-template.md`.
       Memory: `functional/.specify/memory/constitution.md`.

7. **Documentación**
   - En el README raíz: añadir `functional/` con subcarpetas `.specify/`, `specs/` y `prompts/`.
   - Crear/actualizar `functional/README.md` explicando que Spec Kit está bajo `functional/` y que los comandos (Cursor y GitHub Copilot) y scripts se ejecutan desde la raíz del repo.
   - Añadir sección de compatibilidad con GitHub Copilot: prompts en `.github/prompts/speckit.*.prompt.md` e instrucciones globales en `.github/copilot-instructions.md`.

8. **Comprobación**
   - Desde la raíz: ejecutar `./functional/.specify/scripts/bash/create-new-feature.sh --json --short-name "test-setup" "Test Spec Kit under functional"` y verificar que se crea `functional/specs/<rama>/spec.md`.
   - Ejecutar `./functional/.specify/scripts/bash/setup-plan.sh --json` y verificar que se crea `functional/specs/<rama>/plan.md`.
   - En VS Code con GitHub Copilot Chat: abrir el panel de chat, seleccionar el prompt file `speckit.create-feature.prompt.md` y verificar que Copilot propone el comando correcto.
```

## Resultado esperado

- **`functional/.specify/`** con `scripts/bash/`, `templates/` y `memory/constitution.md`.
- **`functional/specs/`** donde se crean las carpetas por feature (`spec.md`, `plan.md`, `tasks.md`, `contracts/`).
- **`.cursor/commands/speckit.*.md`** en la raíz, con rutas apuntando a `functional/.specify/`. *(Soporte Cursor)*
- **`.github/copilot-instructions.md`** con contexto global del workspace para GitHub Copilot. *(Soporte Copilot)*
- **`.github/prompts/speckit.*.prompt.md`** con los flujos Spec Kit como prompts reutilizables desde Copilot Chat / VS Code. *(Soporte Copilot)*
- Scripts que usan `REPO_ROOT/functional/specs` y `REPO_ROOT/functional/.specify/...`; ejecutados desde la raíz del repo.
- README raíz y `functional/README.md` actualizados con compatibilidad Cursor + GitHub Copilot.

## Diferencias entre Cursor y GitHub Copilot

| Aspecto | Cursor | GitHub Copilot |
|---|---|---|
| Comandos de agente | `.cursor/commands/speckit.*.md` | `.github/prompts/speckit.*.prompt.md` |
| Instrucciones globales | `.cursor/rules/` o `.cursorrules` | `.github/copilot-instructions.md` |
| Formato de archivo | Markdown libre | Markdown con frontmatter `mode`/`description` |
| Invocación en chat | `/speckit.*` (comandos de barra) | Seleccionar prompt file en Copilot Chat (VS Code) |
| Memoria de agente | `.specify/memory/constitution.md` referenciada en comandos | `.github/copilot-instructions.md` + prompts individuales |

## Variantes del prompt

- **Sin uv**: Clonar [spec-kit](https://github.com/github/spec-kit), copiar `scripts/`, `templates/` bajo `functional/.specify/`, `.cursor/commands/` y `.github/prompts/`, y aplicar los cambios de rutas (pasos 4, 5 y 6).
- **Solo documentar**: Si Spec Kit ya está en la raíz, usar los pasos 3–7 como guía de refactor.
- **Solo GitHub Copilot** (sin Cursor): Omitir el paso 5 y centrarse en los pasos 6 y 7. Usar `--ai github-copilot` si spec-kit ofrece ese flag en versiones futuras.
- **Solo Cursor** (sin GitHub Copilot): Omitir el paso 6. Configuración idéntica a la versión anterior de este prompt.

````
