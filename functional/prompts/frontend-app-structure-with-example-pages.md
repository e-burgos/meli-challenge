# Prompt: Estructura de app frontend con carpetas predefinidas y 2 páginas de ejemplo

Prompt para generar exactamente la estructura de la app frontend del proyecto: carpetas predefinidas (`api/`, `hooks/`, `pages/`, `queries/`, `router/`, `store/`, `styles/`, `tests/`), archivos de entrada y configuración, y dos páginas de ejemplo (Home e ítem por id) siguiendo los mismos patrones que `apps/frontend`.

---

## Prompt

```
Crea la estructura de una app frontend React (TypeScript) que coincida con esta especificación.

## Estructura de carpetas en src/

- api/        — Cliente HTTP y funciones de llamadas al backend.
- hooks/      — Hooks de React reutilizables (puede quedar vacío al inicio).
- pages/      — Un componente por ruta (páginas de la app).
- queries/    — Hooks de TanStack Query para datos del servidor.
- router/     — Configuración de React Router (createBrowserRouter).
- store/      — Estado global con Zustand (opcional pero con archivo inicial).
- styles/     — CSS global; incluir index.css con Tailwind (@import 'tailwindcss' y @theme si aplica).
- tests/      — Tests (Vitest + React Testing Library); incluir test-utils.tsx con wrapper de providers.

En la raíz de src/ debe haber:
- main.tsx   — Punto de entrada: createRoot, StrictMode, render de App.
- app.tsx    — Componente raíz: QueryClientProvider (TanStack Query), ReactQueryDevtools en DEV, y AppRouter.

## Archivos obligatorios

1. src/main.tsx
   - Importar App desde './app'.
   - createRoot(document.getElementById('root')), root.render(<StrictMode><App /></StrictMode>).

2. src/app.tsx
   - Crear QueryClient con defaultOptions (queries: retry 1, refetchOnWindowFocus false).
   - Envolver en QueryClientProvider y renderizar AppRouter; en DEV añadir ReactQueryDevtools initialIsOpen={false}.
   - Importar './styles/index.css'.

3. src/router/index.tsx
   - Exportar componente AppRouter que renderiza <RouterProvider router={router} />.
   - Importar router desde './routes'.

4. src/router/routes.tsx
   - createBrowserRouter con basename derivado de import.meta.env.BASE_URL (sin trailing slash, por defecto '/').
   - Ruta raíz con Layout y <Outlet /> como element; children: index → Home, una ruta con parámetro (ej. item/:id → ItemDetail), y path '*' → <Navigate to="/" replace />.
   - Layout puede ser un componente simple (header + Outlet) o importado de una lib; si no hay lib, usar un div con <Outlet />.

5. src/store/useAppStore.ts
   - Zustand: create<AppStore> con al menos un campo (ej. sidebarOpen: boolean) y un setter (setSidebarOpen).
   - Interface AppStore con esos campos.

6. src/api/client.ts
   - Instancia axios (o fetch wrapper) con baseURL desde import.meta.env.VITE_API_BASE_URL o '/api', timeout 15000, headers Content-Type application/json.
   - Exportar como apiClient.

7. src/api/types.ts
   - Al menos una interfaz mínima (ej. Item o ProductSummary) para no dejar vacío.

8. src/styles/index.css
   - @import 'tailwindcss'.
   - Opcional: @theme con variables (ej. --color-page-bg, --font-sans).
   - body: font-family y background si usas @theme.

9. src/tests/test-utils.tsx
   - Función render que envuelve ui en QueryClientProvider + MemoryRouter (o BrowserRouter) para que los tests tengan Query y Router.

## Dos páginas de ejemplo

1. Home (src/pages/Home.tsx)
   - Componente exportado Home.
   - Contenido mínimo: <main> con título "Inicio" y un texto o lista placeholder (ej. "Listado de ítems").
   - Sin llamadas API obligatorias; si quieres mostrar datos, usar un useQuery a un endpoint ficticio o mock.

2. ItemDetail (src/pages/ItemDetail.tsx)
   - Componente exportado ItemDetail.
   - useParams<{ id: string }>() para leer el id de la ruta (ej. /item/:id).
   - Contenido mínimo: <main> con título "Detalle" y el id mostrado en pantalla; si no hay id, mostrar mensaje y enlace a "/".

Rutas resultantes:
- /         → Home
- /item/:id → ItemDetail
- *         → redirect a /

## Convenciones

- Un solo componente de página por archivo en pages/; export nombrado (ej. export function Home()).
- Router: createBrowserRouter + RouterProvider; rutas anidadas con Layout y Outlet.
- Tipado estricto: tipos para params, store y respuestas API.
- No poner componentes reutilizables en src/; si hay lib de UI, importar desde ahí en las páginas.
```

---

## Resultado esperado

- Carpeta `src/` con subcarpetas: `api/`, `hooks/`, `pages/`, `queries/`, `router/`, `store/`, `styles/`, `tests/`.
- Archivos en raíz de `src/`: `main.tsx`, `app.tsx`.
- Router configurado con Layout, Home (index), ItemDetail (/item/:id) y redirect de * a /.
- Store Zustand mínimo en `store/useAppStore.ts`.
- Cliente API en `api/client.ts` y tipos en `api/types.ts`.
- Estilos globales en `styles/index.css` con Tailwind.
- Utilidad de tests en `tests/test-utils.tsx` con providers (Query + Router).
- Dos páginas de ejemplo: Home (título + placeholder) e ItemDetail (muestra id de la URL).

---

## Variantes del prompt

- **Sin TanStack Query:** Quitar QueryClientProvider y ReactQueryDevtools de app.tsx; en test-utils no incluir QueryClientProvider. Las páginas de ejemplo no usan useQuery.
- **Sin Zustand:** Omitir carpeta `store/` o dejar un archivo vacío/placeholder.
- **Otra ruta param:** Cambiar `/item/:id` por `/product/:productId` y el componente ProductDetail; ajustar useParams en la página.
- **Con lib de UI:** Indicar en el prompt el alias (ej. `@meli-challenge/ui-components`) y que Layout y componentes de página importen desde esa lib cuando exista.
