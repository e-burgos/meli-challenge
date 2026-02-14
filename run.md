# Cómo ejecutar el proyecto

Instrucciones para instalar dependencias, levantar backend y frontend, y ejecutar tests del prototipo Meli (home + detalle de producto).

## Prerrequisitos

- **Node.js** 18 o superior
- **pnpm** 9 o superior

Comprobar versiones:

```bash
node -v   # v18.x o superior
pnpm -v   # 9.x o superior
```

Si no tienes pnpm: `npm install -g pnpm`

## Instalación de dependencias

En la raíz del repositorio:

```bash
pnpm install
```

## Ejecutar el backend

API REST (Express) en el puerto **3333**. Sirve productos y vendedores desde `apps/backend/src/data/*.json`.

```bash
pnpm nx serve backend
```

O desde la raíz:

```bash
pnpm dev:backend
```

- API base: **http://localhost:3333/api**
- Documentación Swagger: **http://localhost:3333/api-docs**
- Rutas: `GET /api/products`, `GET /api/products/:id`, `GET /api/sellers`, etc.

## Ejecutar el frontend

App React (Vite) en el puerto **3000**. En desarrollo hace proxy de `/api` al backend (localhost:3333).

```bash
pnpm nx serve frontend
```

O desde la raíz:

```bash
pnpm dev:frontend
```

- App: **http://localhost:3000**
- Home: **http://localhost:3000/**
- Detalle de producto: **http://localhost:3000/product/:id** (ej. `/product/MLA2009168328`)

**Importante:** El backend debe estar en marcha para que el home y el detalle carguen datos.

## Orden recomendado

1. `pnpm install`
2. En una terminal: `pnpm nx serve backend`
3. En otra terminal: `pnpm nx serve frontend`
4. Abrir **http://localhost:3000** en el navegador

## Build y tests

- **Build de todo:** `pnpm run build`
- **Tests de todo:** `pnpm run test`
- **Solo backend:** `pnpm nx build backend` / `pnpm nx test backend`
- **Solo frontend:** `pnpm nx build frontend` / `pnpm nx test frontend`
- **Solo ui-components:** `pnpm nx build ui-components` / `pnpm nx test ui-components`

## Variables de entorno

- **Backend:** `PORT` — puerto del servidor (por defecto `3333`).
- **Frontend:** `VITE_API_BASE_URL` — URL base del API. Definida en:
  - **Dev:** `apps/frontend/.env.development` → `/api` (proxy a localhost:3333).
  - **Build:** `apps/frontend/.env.production` → `/api` (mismo origen); en despliegue puedes cambiarla por la URL real del API.
