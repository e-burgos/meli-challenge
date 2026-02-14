# Deploy del backend en Cyclic

Guía para desplegar solo el **backend** (API Express) del monorepo en [Cyclic](https://www.cyclic.sh/).

## Requisitos

- Repositorio en GitHub (público o acceso autorizado por Cyclic)
- Cuenta en [Cyclic](https://www.cyclic.sh/) (login con GitHub)

## Pasos en Cyclic

1. **Iniciar sesión** en [app.cyclic.sh](https://app.cyclic.sh) con GitHub.

2. **Crear app** → “Deploy from GitHub” y elegir el repo `meli-challenge`.

3. **Root directory**  
   Dejar vacío (raíz del repo). El build y el start se ejecutan desde la raíz.

4. **Build (Advanced → Build)**  
   - **Install command:**  
     `pnpm install`  
     (Si Cyclic no reconoce pnpm: `npm install`)
   - **Build command:**  
     `pnpm run build:backend`  
     (Equivalente: `npx nx build backend`)

5. **Start**  
   Cyclic usa el script `start` del `package.json` de la raíz:  
   `node dist/backend/main.js`  
   No hace falta configurar nada más para el start.

6. **Variables de entorno**  
   - `PORT`: lo asigna Cyclic; no hace falta definirlo.
   - Añade aquí cualquier otra variable que use el backend (p. ej. URLs del frontend si las usas en CORS).

7. **Deploy**  
   Guardar y dejar que Cyclic haga el build. Tras el deploy, Cyclic te dará una URL base (ej. `https://tu-app.cyclic.app`).

## Rutas de la API

Tras el deploy, la API queda en:

- Base: `https://<tu-app>.cyclic.app`
- Health/API: `https://<tu-app>.cyclic.app/api`
- OpenAPI: `https://<tu-app>.cyclic.app/api/openapi.yaml`
- Swagger UI: `https://<tu-app>.cyclic.app/api/docs`

## Frontend apuntando al backend en Cyclic

En el frontend (por ejemplo en `apps/frontend/.env.production`), define la URL del backend:

```env
VITE_API_BASE_URL=https://<tu-app>.cyclic.app/api
```

Sustituye `<tu-app>` por la subdominio que te asigne Cyclic.

## Notas

- El backend usa datos estáticos en `apps/backend/src/data/*.json`; no hay base de datos.
- CORS está habilitado en el backend; si restringes orígenes, añade la URL de producción del frontend.
- Cada push a la rama conectada en Cyclic puede disparar un nuevo deploy (según la configuración del proyecto en Cyclic).
