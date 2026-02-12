# Nx configuration reference

## Configuration merge order

1. Inferred from plugins (e.g. from package.json scripts).
2. `nx.json` → `targetDefaults`, `namedInputs`, `plugins`, etc.
3. Project-level `project.json` or `package.json` "nx" / scripts.

Project-level overrides workspace; workspace overrides inferred.

## Common targetDefaults (nx.json)

```json
{
  "targetDefaults": {
    "build": {
      "inputs": ["production", "^production"],
      "outputs": ["{projectRoot}/dist"],
      "cache": true,
      "outputsCapture": "always"
    },
    "test": {
      "inputs": ["default", "^production"],
      "outputs": ["{projectRoot}/coverage"],
      "cache": true
    },
    "lint": {
      "inputs": ["default", "^production"],
      "cache": true
    }
  }
}
```

- **inputs**: `"production"` = project’s production files; `"^production"` = same for dependencies. Use `namedInputs` for custom sets.
- **outputs**: Paths (relative to project root) where the task writes; use for cache restore.

## workspaceLayout (nx.json)

```json
{
  "workspaceLayout": {
    "appsDir": "apps",
    "libsDir": "libs"
  }
}
```

Generators use these to place new apps and libs.

## project.json (project-level)

- **targets**: `build`, `serve`, `test`, `lint` with `executor`, `options`, `configurations`, `inputs`, `outputs`.
- **tags**: Array of strings for boundary rules (e.g. `["scope:api"]`).
- **implicitDependencies** / **ignoredDependencies**: Override graph inference when needed.

## Commands quick reference

| Goal | Command |
|------|---------|
| Run target for one project | `nx run <project>:<target>` or `nx <target> <project>` |
| Run target for all projects | `nx run-many -t <target>` |
| Run target for affected projects | `nx affected -t <target> --base=origin/main` |
| Show project graph | `nx graph` |
| Show affected graph | `nx affected:graph --base=origin/main` |
| Clear local cache | `nx reset` |

## Plugins (common)

- `@nx/node` — Node apps, libs.
- `@nx/express` — Express apps.
- `@nx/react` — React apps (Vite, Webpack).
- `@nx/js` — JS/TS libs, no framework.
- `@nx/vite` — Vite build/dev.

Add with `nx add @nx/node` (or equivalent); generators then appear in `nx g` and infer targets.
