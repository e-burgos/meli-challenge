# Quickstart: 001-meli-prototype

**Feature**: Prototipo Meli — Home y detalle de ítem  
**Date**: 2025-02-12

## Prerrequisitos

- **Node.js** 18+
- **pnpm** 9+
- Repositorio clonado y dependencias instaladas: `pnpm install`

## Cómo ejecutar el proyecto

Una vez implementado el feature, el proyecto se ejecutará según las instrucciones del archivo **`run.md`** en la raíz del repositorio. Este quickstart resume el flujo esperado.

### 1. Backend (API)

```bash
pnpm nx serve backend
```

- La API REST estará disponible en la URL configurada (ej. `http://localhost:3333`).
- Endpoints: `GET /api/products` (listado), `GET /api/products/:id` (detalle).
- Los datos se leen desde archivos JSON o CSV en el backend (ver plan.md y data-model.md).

### 2. Frontend (app web)

```bash
pnpm nx serve frontend
```

- La app estará disponible en la URL del dev server (ej. `http://localhost:4200`).
- Configurar proxy hacia el backend si es necesario (Vite/Nx) para evitar CORS en desarrollo.
- Rutas esperadas: home (listado de productos), detalle de producto (ej. `/product/:id`).

### 3. Orden recomendado

1. Iniciar el backend primero.
2. Iniciar el frontend.
3. Abrir el navegador en la URL del frontend; el home cargará el listado desde el API; al hacer clic en un producto se navega al detalle.

## Cómo probar el feature

### User Story 1 (P1) — Listado en el home

- Navegar al home.
- Comprobar que se muestran productos en un layout tipo Mercado Libre (referencia: mercadolibre.com.ar).
- Comprobar que la página es responsive (redimensionar ventana).
- Comprobar estado vacío si no hay productos (mensaje o UI adecuada).

### User Story 2 (P2) — Detalle de producto

- Desde el home, hacer clic en un producto (o navegar a `/product/:id`).
- Comprobar que se muestran: imágenes, título, descripción, precio, métodos de pago, vendedor, detalles adicionales.
- Comprobar diseño de referencia tipo página de producto Meli.
- Probar con un id inexistente: el backend debe responder 404 y el frontend mostrar estado de error.

### Contrato de API

- Los esquemas y endpoints están en `functional/specs/001-meli-prototype/contracts/openapi.yaml`.
- El backend debe cumplir el contrato; el frontend consume esos endpoints (axios + react-query).

## Datos de prueba

- El backend debe incluir al menos un archivo de datos (JSON o CSV) con productos de ejemplo para poder probar el home y el detalle sin dependencias externas.
- Estructura de producto y vendedor según `data-model.md`.

## Referencias

- **Spec**: [spec.md](./spec.md)  
- **Plan**: [plan.md](./plan.md)  
- **Data model**: [data-model.md](./data-model.md)  
- **API contract**: [contracts/openapi.yaml](./contracts/openapi.yaml)  
- **Source of truth**: `functional/context/source-of-truth.md`  
- **Constitución**: `functional/.specify/memory/constitution.md`
