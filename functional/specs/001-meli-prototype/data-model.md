# Data Model: 001-meli-prototype

**Feature**: Prototipo Meli — Home y detalle de ítem  
**Phase**: 1  
**Date**: 2025-02-12

## Entities

### Producto

Representa un ítem listado en el home y mostrado en la página de detalle.

| Attribute        | Type     | Description |
|------------------|----------|-------------|
| id               | string   | Identificador único (ej. MLA2009168328) |
| title            | string   | Título del producto |
| description      | string   | Descripción (puede ser larga) |
| price            | number   | Precio (ej. en pesos) |
| currency_id      | string   | Moneda (ej. "ARS") |
| images           | string[] | URLs o rutas de imágenes del producto |
| payment_methods  | string[] | Métodos de pago (ej. "Tarjeta de crédito", "Mercado Pago") |
| seller           | Seller   | Información del vendedor (objeto anidado) |
| condition        | string   | Ej. "Nuevo", "Bueno reacondicionado" |
| stock            | number?  | Cantidad disponible (opcional) |
| ratings          | object?  | Valoraciones/reseñas (opcional; estructura libre para prototipo) |

**Validation**: id y title obligatorios; price ≥ 0; images array no vacío si hay galería.

**Storage**: En backend, un archivo JSON (ej. `products.json`) con array de productos, o CSV equivalente. El backend lee este archivo para GET listado y GET detalle por id.

---

### Seller (Vendedor)

Información del vendedor asociada a un producto. Para el prototipo se modela como objeto anidado dentro de Producto.

| Attribute   | Type   | Description |
|-------------|--------|-------------|
| id          | string | Identificador del vendedor |
| nickname    | string | Nombre o alias del vendedor |
| reputation  | string?| Reputación (ej. "Muy buena") — opcional |

**Validation**: id y nickname obligatorios si se expone seller.

---

## Relationships

- **Producto** → **Seller**: 1:1 (cada producto tiene un seller). Embedding en el mismo documento/objeto para este prototipo; no hay tabla separada de vendedores.

## State / Lifecycle

- Productos son de solo lectura desde el frontend (no hay flujo de alta/baja en este feature).
- Los datos se editan fuera de la app (archivo JSON/CSV) o en futuras extensiones; no hay transacciones ni versionado en este alcance.

## API Mapping

- **GET listado**: Devuelve array de productos (campos reducidos para listado si se quiere: id, title, price, thumbnail, condition).
- **GET detalle por id**: Devuelve un producto completo (todos los campos incluyendo seller, images, payment_methods, etc.).

Los esquemas concretos (request/response) se definen en `contracts/` (OpenAPI).
