# Source of truth — AI Challenge (Meli)

Documento de referencia único para lo que debe generarse en este proyecto. Basado en `functional/context/ai-challenge.pdf`.

---

## 1. Objetivo

Construir un **prototipo de página de detalle de ítem** inspirado en MercadoLibre y su **API de backend** de soporte. El ejercicio evalúa la capacidad de diseñar e implementar tanto la vista frontend como la funcionalidad backend bajo restricciones de tiempo.

---

## 2. Estructura del proyecto (Nx)

Para este proyecto es necesario generar:

- **App `frontend`** — Aplicación web (home + página de detalle de producto). Vive en `apps/frontend`.
- **App `backend`** — API REST que sirve datos al frontend. Vive en `apps/backend`.
- **Lib `ui-components`** — Biblioteca que engloba todos los componentes reutilizables utilizados por la app frontend (botones, cards, layouts, etc.). Vive en `libs/ui-components` con `importPath` `@meli-challenge/ui-components`.

El frontend consumirá los componentes desde `@meli-challenge/ui-components`.

---

## 3. Frontend

### 3.1 Home: listado de productos

- **Página de inicio (home)** que muestre un **listado de productos**.
- **Diseño de referencia**: [Mercado Libre Argentina — página principal](https://www.mercadolibre.com.ar/) (layout, cabecera, grid de productos, categorías, etc.).

### 3.2 Página de detalle de ítem

- **Página de detalle de ítem** que imite el look & feel de MercadoLibre.
- **Diseño de referencia**: [Página de producto en MercadoLibre (ej. Samsung Galaxy A55)](https://www.mercadolibre.com.ar/celular-samsung-galaxy-a55-5g-2568gb-black-knox-color-negro-bueno-reacondicionado/p/MLA2009168328) — tomar como referencia visual la estructura, galería de imágenes, bloque de precio, métodos de pago, datos del vendedor y detalles adicionales.

La página de detalle debe mostrar:

- Imágenes del producto
- Título y descripción
- Precio
- Métodos de pago
- Información del vendedor
- Detalles adicionales (ej.: valoraciones, reseñas, stock disponible)

### Fuera de alcance

- **Recomendaciones**: no requeridas.
- **Checkout**: no se requiere lógica de checkout.

### UX y stack

- Páginas **responsive** y **user-friendly**.
- **Stack** (tecnologías de este proyecto): **React**, **TypeScript**, **Tailwind CSS v4**, **Vite**, **Nx**, **pnpm**. Llamadas al backend: **axios** y **react-query** (TanStack Query); estado de cliente: **zustand**. Los componentes de UI se desarrollan en la lib `ui-components` y se consumen desde la app `frontend`.

---

## 4. Backend: API

### Endpoints

- API **REST** que alimente al frontend:
  - **Listado (home)**: endpoint para obtener **todos los productos** mostrados en el home.
  - **Detalle**: endpoint para obtener el **detalle de un producto** por identificador.

### Persistencia y stack

- **No usar bases de datos reales**: persistir todo en archivos locales **JSON** o **CSV**.
- **Stack** (tecnologías de este proyecto): **Node.js**, **Express**, **TypeScript**, **Swagger/OpenAPI**, **Nx**, **pnpm**. Llamadas HTTP salientes a otros servicios: **axios**.

---

## 5. Requisitos no funcionales

- Manejo de errores adecuado.
- Código **documentado**.
- **Cobertura de código** de al menos **80%**.

---

## 6. Herramientas permitidas

- Uso de herramientas **GenAI**, IDEs agenticos y otras herramientas de asistencia al código está permitido y alentado.
- El código entregado debe reflejar tu comprensión y tus modificaciones.
- Debes estar preparado para **explicar la solución**.

---

## 7. Documentación a entregar

Junto con el código, incluir un documento breve (1–2 páginas) que:

- Explique las **decisiones de diseño**.
- Describa **desafíos** encontrados y **cómo se abordaron**.

---

## 8. Entrega

- Enlace al repositorio o carpeta del proyecto comprimida (zip).
- El proyecto **debe incluir un `run.md`** que explique **cómo ejecutar el proyecto**.

---

## Resumen de artefactos a generar

| Área           | Entregable |
|----------------|------------|
| Estructura Nx  | App **frontend** (`apps/frontend`), app **backend** (`apps/backend`), lib **ui-components** (`libs/ui-components`, `@meli-challenge/ui-components`). |
| Frontend       | **Home**: listado de productos (referencia: [mercadolibre.com.ar](https://www.mercadolibre.com.ar/)). **Detalle de ítem**: imágenes, título, descripción, precio, métodos de pago, vendedor, detalles extra (referencia: [página de producto Meli](https://www.mercadolibre.com.ar/celular-samsung-galaxy-a55-5g-2568gb-black-knox-color-negro-bueno-reacondicionado/p/MLA2009168328)). Stack: React, TypeScript, Tailwind v4, Vite, Nx, pnpm; axios + react-query para API; zustand para estado de cliente. Componentes en `ui-components`. |
| Backend        | API REST: endpoint de **listado de productos** (home) y endpoint de **detalle de producto**; persistencia en JSON o CSV (sin DB real). Stack: Node.js, Express, TypeScript, Swagger/OpenAPI, Nx, pnpm; axios para llamadas HTTP salientes. |
| Calidad        | Error handling, documentación, ≥ 80% cobertura de tests. |
| Documentación  | 1–2 páginas: decisiones de diseño y desafíos + soluciones. |
| Ejecución      | `run.md` con instrucciones para correr el proyecto. |

Este documento es la **fuente de verdad** para validar alcance y requisitos del challenge.
