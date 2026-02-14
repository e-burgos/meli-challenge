# Frontend app — estructura de `src/`

## Carpetas

| Carpeta   | Uso |
|----------|-----|
| `api/`   | Cliente HTTP (p. ej. axios), funciones de llamadas a la API del backend. |
| `app/`   | Componente raíz (`App`) y shell de la aplicación. |
| `hooks/` | Hooks de React reutilizables (estado, side effects, etc.). |
| `pages/` | Componentes de página por ruta (Home, detalle de producto, etc.). |
| `queries/` | Configuración y hooks de React Query (o similar) para datos del servidor. |
| `router/` | Configuración del enrutado (React Router). |
| `store/` | Estado global (p. ej. Zustand) si se usa. |
| `styles/` | Estilos adicionales o módulos CSS; el global está en `src/styles/index.css`. |
| `tests/` | Tests de integración o E2E de la app. |

## Componentes reutilizables

**Regla:** Todo componente reutilizable se implementa en la lib **`libs/ui-components`** y se consume desde esta app vía:

```ts
import { ComponentName } from '@meli-challenge/ui-components';
```

No colocar componentes reutilizables en `apps/frontend/src/`. Las páginas y el `App` importan desde `@meli-challenge/ui-components`.
