# Prompt: Implementación de GitHub Spec Kit bajo functional/

Este archivo documenta el prompt para instalar [GitHub Spec Kit](https://github.com/github/spec-kit) con **toda la estructura y scripts bajo la carpeta `functional/`** (`.specify/`, `specs/`, plantillas y referencias en comandos Cursor). Sirve para reproducir la misma configuración en otro repo o recordar los pasos tras un `specify init` estándar.

---

## Prompt

```
Implementa GitHub Spec Kit en este repositorio con la siguiente condición obligatoria: **todo lo que genera Spec Kit (carpetas y documentos) debe quedar dentro de la carpeta `functional/`** para mantener la organización del proyecto.

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
   - Esto crea `.specify/`, `.cursor/commands/speckit.*.md` y, al usarlo, `specs/`. No tocar `.cursor/commands/` de ubicación (Cursor espera `.cursor` en la raíz).

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

6. **Documentación**
   - En el README raíz: en la sección de estructura, añadir `functional/` con subcarpetas `.specify/`, `specs/` y `prompts/`.
   - Crear o actualizar `functional/README.md` explicando que Spec Kit está bajo `functional/` (`.specify/`, `specs/`) y que los comandos Cursor y scripts deben ejecutarse desde la raíz del repo; las rutas ya apuntan a `functional/.specify/` y `functional/specs/`.

7. **Comprobación**
   - Desde la raíz: ejecutar `./functional/.specify/scripts/bash/create-new-feature.sh --json --short-name "test-setup" "Test Spec Kit under functional"` y verificar que se crea la rama y `functional/specs/<rama>/spec.md`.
   - Ejecutar `./functional/.specify/scripts/bash/setup-plan.sh --json` y verificar que se crea `functional/specs/<rama>/plan.md`.
```

## Resultado esperado

- **`functional/.specify/`** con `scripts/bash/`, `templates/` y `memory/constitution.md`.
- **`functional/specs/`** donde se crean las carpetas por feature (ej. `001-feature-name/` con `spec.md`, `plan.md`, `tasks.md`, etc.).
- **`.cursor/commands/speckit.*.md`** en la raíz, con todas las referencias apuntando a `functional/.specify/scripts/`, `functional/.specify/memory/` y `functional/.specify/templates/`.
- Scripts que usan `REPO_ROOT/functional/specs` y `REPO_ROOT/functional/.specify/...`; ejecutados desde la raíz del repo, crean y leen todo bajo `functional/`.
- README raíz y `functional/README.md` actualizados describiendo que Spec Kit vive bajo `functional/`.

## Variantes del prompt

- **Sin uv**: Si no se usa uv, se puede clonar el repo de [spec-kit](https://github.com/github/spec-kit), copiar manualmente `scripts/`, `templates/` y la estructura de comandos bajo `functional/.specify/` y `.cursor/commands/`, y luego aplicar los mismos cambios de rutas (pasos 4 y 5).
- **Solo documentar**: Si Spec Kit ya está instalado en la raíz y solo se quiere documentar cómo sería la migración a `functional/`, usar únicamente los pasos 3–6 como guía de refactor.
- **Otro agente**: Cambiar `--ai cursor-agent` por el agente que use el proyecto (ver documentación de Spec Kit).
