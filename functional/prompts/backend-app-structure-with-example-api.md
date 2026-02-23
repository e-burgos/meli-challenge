# Prompt: Estructura de app backend con carpetas predefinidas y API básica de ejemplo

Prompt para generar exactamente la estructura de la app backend del proyecto: carpetas predefinidas (`controllers/`, `services/`, `routes/`, `types/`, `data/`, `openapi/`, `lib/`), archivos de entrada y configuración, y una API básica de ejemplo (un recurso con listado y detalle por id) siguiendo los mismos patrones que `apps/backend`.

---

## Prompt

```
Crea la estructura de una app backend Node.js + Express (TypeScript) que coincida con esta especificación.

## Estructura de carpetas en apps/backend

En la raíz del backend:
- src/           — Código fuente.
- scripts/       — Scripts auxiliares (opcional; puede quedar vacío).
- project.json   — Configuración Nx (targets build, serve, test).
- package.json   — name "@meli-challenge/backend", version "0.0.1".
- tsconfig.json  — Extiende tsconfig.base.json; references a tsconfig.app.json y tsconfig.spec.json.
- tsconfig.app.json — Extiende base; outDir dist, rootDir src, include src/**/*.ts, exclude tests y configs.
- tsconfig.spec.json — Para tests (incluye *.spec.ts).
- eslint.config.mjs / jest.config.cts — Según el monorepo.

Dentro de src/:
- controllers/   — Controladores Express: reciben Request/Response, llaman a servicios, devuelven JSON o errores (next(err)).
- services/      — Lógica de negocio y acceso a datos (lectura de JSON, mapeos); sin dependencia de Express.
- routes/        — Routers de Express (Router()); definen verbos y path y delegan en controladores.
- types/         — Interfaces e tipos TypeScript (modelos de dominio y DTOs); index.ts reexporta.
- data/          — Archivos JSON estáticos (ej. products.json, items.json) usados por los servicios.
- openapi/       — openapi.yaml (OpenAPI 3.x) que documenta los endpoints; alineado con rutas reales.
- lib/           — Utilidades compartidas: logger (pino), request-logger (middleware de log por request).

Archivos en la raíz de src/:
- main.ts  — Punto de entrada: importa app desde './app', lee PORT (default 3333), app.listen(port), logger.info.
- app.ts   — Express app: express(), express.json(), cors(), requestLogger, rutas bajo /api, servir openapi.yaml en /api/openapi.yaml, Swagger UI en /api/docs, error handler final (500 con logger.error).

## Convenciones

- Rutas colgando de /api (ej. /api/items, /api/items/:id).
- Controladores: funciones (req, res, next) => void; validación mínima de params/query; llaman a un servicio y res.json(...) o res.status(...).json(...); en errores hacen next(err).
- Servicios: funciones puras o que leen de data/; devuelven tipos definidos en types/; no usan Request/Response.
- Tipos: interfaces en types/<recurso>.ts; types/index.ts reexporta todo.
- OpenAPI: mismo path y verbos que las rutas; components/schemas para los DTOs.

## API básica de ejemplo: recurso "items"

Implementar un recurso items con:
- GET /api/items       — Lista de ítems (resumen: id, name).
- GET /api/items/:id   — Detalle de un ítem por id; 404 si no existe; 400 si id vacío.

Estructura de archivos para este ejemplo:

1. src/types/item.ts
   - Interface Item: { id: string; name: string; description?: string } (como en data).
   - Interface ItemSummary: { id: string; name: string } (para el listado).
   - (Opcional) ItemDetail igual a Item si no hay enriquecimiento.

2. src/types/index.ts
   - Reexportar Item, ItemSummary (y ItemDetail si existe) desde './item'.

3. src/data/items.json
   - Array de objetos con al menos id, name y opcional description. Ejemplo: [{"id":"1","name":"Item A","description":"First item"},{"id":"2","name":"Item B"}].

4. src/services/items.service.ts
   - loadItems(): Item[] — lee items.json desde path.join(__dirname, 'data', 'items.json') (o desde process.cwd() en test).
   - listItems(): ItemSummary[] — devuelve loadItems() mapeado a { id, name }.
   - getItemById(id: string): Item | null — devuelve el ítem con ese id o null.

5. src/controllers/items.controller.ts
   - list(req, res, next): llama itemsService.listItems(), res.json(result).
   - getById(req, res, next): lee req.params.id; si vacío res.status(400).json({ message: 'Invalid id', code: 'INVALID_ID' }); si no, llama itemsService.getItemById(id); si null res.status(404).json({ message: 'Item not found', code: 'NOT_FOUND' }); si no res.json(item). En cualquier catch hacer next(err).

6. src/routes/items.routes.ts
   - import { Router } from 'express'; import * as itemsController from '../controllers/items.controller'; const router = Router(); router.get('/', itemsController.list); router.get('/:id', itemsController.getById); export const itemsRoutes = router;

7. src/app.ts
   - Import itemsRoutes desde './routes/items.routes'.
   - app.use('/api/items', itemsRoutes).
   - Mantener también GET /api que responde { message: 'Welcome to backend!' }.
   - Servir openapi.yaml en GET /api/openapi.yaml (res.type('application/x-yaml'), res.sendFile).
   - Middleware de delay opcional (ej. 2s) salvo en NODE_ENV=test.
   - Error handler al final: (err, req, res, next) => { logger.error(err); res.status(500).json({ message: err.message ?? 'Internal server error', code: 'INTERNAL_ERROR' }); }.

8. src/openapi/openapi.yaml
   - openapi: 3.0.3, info (title, version), servers url http://localhost:3333/api.
   - paths:
     - /items: get, summary "List items", responses 200 (array of ItemSummary), 500 (Error).
     - /items/{id}: get, summary "Get item by id", parameters path id required, responses 200 (Item), 400/404/500 (Error).
   - components/schemas: ItemSummary (id, name), Item (id, name, description?), Error (message, code).

## Archivos lib

9. src/lib/logger.ts
   - import pino; export const logger = pino({ level: process.env.LOG_LEVEL ?? 'info' }).

10. src/lib/request-logger.ts
    - Middleware: log al inicio (method, path, query); res.on('finish', ...) para log de status y durationMs. Usar logger.info / logger.warn / logger.error según statusCode. Llamar next().

## Punto de entrada

11. src/main.ts
    - import { app } from './app'; import { logger } from './lib/logger'; const port = process.env.PORT ?? 3333; app.listen(port, () => logger.info({ port }, \`Listening at http://localhost:${port}/api\`)); server.on('error', (err) => logger.error({ err }, 'Server error')).

## Resultado esperado

- Estructura de carpetas: src/controllers, src/services, src/routes, src/types, src/data, src/openapi, src/lib; opcional scripts.
- API funcional: GET /api/items (lista), GET /api/items/:id (detalle), GET /api (mensaje de bienvenida), GET /api/openapi.yaml (especificación), GET /api/docs (Swagger UI si está configurado).
- Tipado estricto: interfaces en types/, usadas en servicios y controladores.
- OpenAPI alineado con las rutas y schemas del ejemplo.
- Logging con pino y middleware de request; manejo de errores centralizado en app.ts.
```

## Resultado esperado

- Carpeta `apps/backend` con la estructura descrita: `src/controllers`, `src/services`, `src/routes`, `src/types`, `src/data`, `src/openapi`, `src/lib`.
- Punto de entrada `main.ts` y app Express en `app.ts` con CORS, JSON, request logger y rutas bajo `/api`.
- API de ejemplo del recurso **items**: listado (GET `/api/items`) y detalle por id (GET `/api/items/:id`) con códigos 200, 400, 404 y 500.
- Tipos en `types/item.ts` e `types/index.ts`; datos de ejemplo en `data/items.json`.
- Servicio que lee JSON y expone `listItems()` y `getItemById(id)`; controlador que valida params y delega en el servicio; rutas que montan el controlador.
- OpenAPI en `openapi/openapi.yaml` con paths `/items` y `/items/{id}` y schemas ItemSummary, Item y Error.
- Logger (pino) y middleware de request logging; manejo de errores global en `app.ts`.
- Configuración Nx: `project.json` con targets build/serve/test; `package.json` con nombre del paquete; `tsconfig.json` y `tsconfig.app.json` coherentes con el monorepo.

## Variantes del prompt

- **Cambiar el recurso**: sustituir "items" por otro nombre (ej. "products", "books"); mantener la misma estructura (types, data, service, controller, routes, openapi).
- **Añadir más recursos**: repetir el patrón (types, data, service, controller, routes) y registrar en `app.ts` y en `openapi.yaml`.
- **Sin Nx**: omitir `project.json` y ajustar `package.json` y scripts de build/serve según el proyecto.
- **Sin Swagger UI**: no montar `/api/docs` ni swagger-ui-express; mantener solo la ruta que sirve `openapi.yaml`.
- **Con validación**: añadir express-validator o Zod en controladores o en un middleware antes de llamar al servicio.