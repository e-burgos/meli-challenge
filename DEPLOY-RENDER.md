# Deploy del backend en Render

Guía para desplegar solo el **backend** (API Express) del monorepo en [Render](https://render.com/).

## Requisitos

- Repositorio en GitHub (público o acceso autorizado por Render)
- Cuenta en [Render](https://render.com/) (login con GitHub)

**Alternativa con Blueprint:** el repo incluye un `render.yaml` en la raíz. En Render: “New” → “Blueprint” y conectar el repo; Render creará el Web Service según ese archivo. Puedes editar después en el dashboard si hace falta.

## Pasos en Render (dashboard)

1. **Iniciar sesión** en [dashboard.render.com](https://dashboard.render.com) con GitHub.

2. **Nuevo Web Service** → “New” → “Web Service” y conectar el repo `meli-challenge`.

3. **Configuración del servicio**
   - **Name:** por ejemplo `meli-backend`.
   - **Region:** elegir la más cercana a tus usuarios.
   - **Branch:** la rama a desplegar (ej. `main` o `feat/001-implementation`).

4. **Root Directory**  
   Dejar **vacío**. El build y el start se ejecutan desde la raíz del repo.

5. **Runtime:** `Node`.

6. **Build & Deploy**
   - **Build Command:**
     ```bash
     pnpm install && pnpm run build:backend
     ```
     Si Render no usa pnpm por defecto, probar:
     ```bash
     npm install && npm run build:backend
     ```
   - **Start Command:**
     ```bash
     node dist/backend/main.js
     ```
     O simplemente: `npm start` (usa el script `start` del `package.json`).

7. **Plan**  
   Elegir “Free” (el servicio se duerme tras ~15 min sin tráfico) o un plan de pago si quieres que esté siempre activo.

8. **Variables de entorno (opcional)**  
   - `PORT`: Render lo asigna; no hace falta definirlo.
   - Añade aquí cualquier otra variable que use el backend.

9. **Create Web Service**  
   Render hará el primer build y deploy. La URL quedará tipo `https://meli-backend.onrender.com`.

**Ejemplo en este repo:** backend desplegado en `https://meli-challenge-bh6a.onrender.com` (API en `/api`, docs en `/api/docs`).

## Rutas de la API

Tras el deploy:

- Base: `https://<tu-service>.onrender.com`
- API: `https://<tu-service>.onrender.com/api`
- OpenAPI: `https://<tu-service>.onrender.com/api/openapi.yaml`
- Swagger UI: `https://<tu-service>.onrender.com/api/docs`

## Build filters (opcional)

Para que solo los cambios del backend disparen un nuevo deploy:

- **Build & Deploy** → **Build Filters** → **Add Included Path**
- Añadir: `apps/backend/**`, `package.json`, `pnpm-lock.yaml`, `nx.json`, `dist/backend` (si aplica).

## Frontend apuntando al backend en Render

En el frontend (ej. `apps/frontend/.env.production`):

```env
VITE_API_BASE_URL=https://<tu-service>.onrender.com/api
```

Sustituye `<tu-service>` por el nombre/URL que te asigne Render.

## Notas

- **Plan Free:** el servicio se “duerme” tras inactividad; la primera petición puede tardar 30–60 s en despertar.
- El backend usa datos estáticos en `apps/backend/src/data/*.json`; no hay base de datos.
- CORS está habilitado; si restringes orígenes, añade la URL de producción del frontend.
- Cada push a la rama conectada puede disparar un nuevo deploy (según la configuración del servicio).
