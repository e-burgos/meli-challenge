# Deploy del frontend en GitHub Pages

El frontend (React/Vite) se despliega en **GitHub Pages** mediante el workflow `.github/workflows/deploy-gh-pages.yml`.

## Requisitos

- Repo en GitHub (público o con Pages habilitado).
- En el repo: **Settings → Pages → Build and deployment → Source** = **GitHub Actions**.

## Cómo se despliega

1. **Automático:** cada push a la rama **main** ejecuta el workflow: build del frontend con `VITE_BASE_PATH=/meli-challenge/` y deploy a GitHub Pages.
2. **Manual:** en la pestaña **Actions** del repo, elige el workflow "Deploy frontend to GitHub Pages" y **Run workflow**.

## URL del sitio

Con el repo `meli-challenge`:

- **URL base:** `https://<usuario>.github.io/meli-challenge/`
- **Home:** `https://<usuario>.github.io/meli-challenge/`
- **Detalle:** `https://<usuario>.github.io/meli-challenge/product/<id>`

Sustituye `<usuario>` por tu usuario u organización de GitHub.

## Si el nombre del repo es otro

Si el repo no se llama `meli-challenge`, hay que usar ese nombre como subruta:

1. En `.github/workflows/deploy-gh-pages.yml`, cambia:
   ```yaml
   env:
     VITE_BASE_PATH: '/<nombre-repo>/'
   ```
2. El frontend ya usa `import.meta.env.BASE_URL` para el router, así que con ese `VITE_BASE_PATH` las rutas funcionan bajo `/<nombre-repo>/`.

## Build local para probar como en GH Pages

```bash
VITE_BASE_PATH=/meli-challenge/ pnpm run build:frontend
pnpm exec vite preview --outDir dist/frontend --port 4200
```

Abre `http://localhost:4200/meli-challenge/` para simular la base de GitHub Pages.

## Notas

- El workflow copia `index.html` a `404.html` para que las rutas del SPA (p. ej. `/meli-challenge/product/1`) funcionen al recargar o abrir enlace directo.
- El frontend en producción usa la API del backend configurada en `apps/frontend/.env.production` (`VITE_API_BASE_URL`). Asegúrate de que apunte al backend desplegado (p. ej. Render).
