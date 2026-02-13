# Rediseño del modelo de datos — 001-meli-prototype

**Objetivo:** Modelo más detallado y entidades separadas para soportar todas las pantallas de detalle tipo Mercado Libre (listado, detalle, características, vendedor, envío, garantías).  
**Fecha:** 2025-02-13  
**Referencia:** `product-detail-data-gap-analysis.md`

---

## 1. Principios del rediseño

- **Entidades separadas:** Seller como entidad propia (archivo/datos independientes); Product referencia `seller_id`. Permite reutilizar vendedor, "productos del vendedor" y enriquecer datos del vendedor sin duplicar.
- **Producto rico:** Product con todos los campos necesarios para el detalle (precio, cuotas, highlights, atributos, variantes opcionales, políticas).
- **Vista listado:** ProductSummary con los campos que muestran las cards (incl. precio original, descuento, cuotas, envío gratis).
- **Un solo lugar de verdad:** Seller en `sellers.json`; productos en `products.json` con `seller_id`. El backend puede servir GET /sellers/:id y al dar detalle de producto puede inyectar el seller cargado por id.

---

## 2. Entidades

### 2.1 Seller (Vendedor) — entidad independiente

Ya no va embebido dentro de cada producto; tiene su propio recurso y se referencia por id.

| Atributo           | Tipo    | Obligatorio | Descripción |
|--------------------|---------|-------------|-------------|
| id                 | string  | Sí          | Identificador único (ej. SELLER001) |
| nickname           | string  | Sí          | Nombre o alias (ej. "TecnoStore Oficial") |
| reputation         | string? | No          | Ej. "Muy buena" |
| badge              | string? | No          | Ej. "MercadoLíder", "MercadoLíder Platinum" |
| sales_count        | number? | No          | Cantidad de ventas (ej. 1000) — para "+N ventas" |
| followers_count    | number? | No          | Seguidores — para "+N Seguidores" |
| product_count      | number? | No          | Cantidad de productos — para "+N Productos" |
| invoice_type       | string? | No          | Ej. "Factura A" |
| attention_rating   | string? | No          | Ej. "Buena atención" (o código) |
| delivery_rating    | string? | No          | Ej. "Entrega a tiempo" |

**Storage:** `apps/backend/src/data/sellers.json` — array de objetos Seller.

**API:** GET /api/sellers (listado opcional), GET /api/sellers/:id (detalle para "Ir a la página del vendedor"). Para el detalle de producto, la respuesta puede incluir el objeto seller completo resuelto por seller_id.

---

### 2.2 Product (Producto) — entidad principal

Un producto referencia a un seller por `seller_id` y contiene todo lo necesario para detalle y listado.

| Atributo               | Tipo     | Obligatorio | Descripción |
|------------------------|----------|-------------|-------------|
| id                     | string   | Sí          | Identificador único (ej. MLA2009168328) |
| seller_id              | string   | Sí          | Referencia al vendedor (FK a Seller.id) |
| title                  | string   | Sí          | Título del producto |
| description            | string?  | No          | Descripción en texto libre |
| price                  | number   | Sí          | Precio actual (precio principal) |
| currency_id            | string?  | No          | Ej. "ARS" |
| original_price         | number?  | No          | Precio antes de descuento (para tachado y % OFF) |
| price_without_taxes    | number?  | No          | Precio sin impuestos nacionales |
| images                 | string[] | Sí*         | URLs de imágenes (*al menos una si hay galería) |
| payment_methods        | string[]?| No          | Ej. ["Tarjeta de crédito", "Mercado Pago"] |
| condition              | string?  | No          | "Nuevo", "Bueno reacondicionado", etc. |
| stock                  | number?  | No          | Cantidad disponible (null = no mostrado) |
| sold_quantity          | number?  | No          | Para "+N vendidos" |
| ratings                | object?  | No          | Ej. `{ "average": 4.9, "count": 46 }` — estructura fija recomendada |
| installments           | object?  | No          | Ej. `{ "quantity": 12, "amount": 92499.92 }` — "Mismo precio en 12 cuotas de $ X" |
| highlights             | string[]?| No          | Bullets "Lo que tenés que saber de este producto" |
| attributes             | array?   | No          | Especificaciones para "Características"; ver abajo |
| variants               | array?   | No          | Variantes (color, memoria, etc.); ver abajo |
| warranty               | string?  | No          | Ej. "12 meses de garantía de fábrica" |
| return_policy          | string?  | No          | Ej. "Devolución gratis. 30 días desde que lo recibís." |
| fulfillment_type       | string?  | No          | Ej. "FULL" — "Almacenado y enviado por FULL" |
| shipping               | object?  | No          | Opcional; ver abajo |
| other_offers_count     | number?  | No          | Para "Ver N opciones desde $ X" (si aplica) |
| other_offers_min_price | number?  | No          | Precio mínimo de otras opciones |

**Estructura de `attributes` (Características del producto):**  
Permite mostrar la sección "Características del producto" por categorías. Opción recomendada para el prototipo:

- **Opción A — array plano:** `attributes: [ { "name": "Marca", "value": "Samsung" }, { "name": "Memoria RAM", "value": "8 GB" }, ... ]`. El frontend puede agrupar por categoría si se añade opcionalmente `category` (ej. "general", "memoria", "pantalla").
- **Opción B — por categoría:** `attributes: { "general": [ { "name": "Marca", "value": "Samsung" } ], "memory": [ ... ] }`.

Para simplicidad se recomienda **Opción A** con `{ name, value }` y opcionalmente `category: string` para agrupar en UI.

**Estructura de `variants`:**  
Para selector de color, memoria, etc. Ejemplo:

```json
"variants": [
  { "id": "color", "name": "Color", "selected": "Negro", "options": [
      { "value": "Negro", "thumbnail_url": "https://..." },
      { "value": "Violeta", "thumbnail_url": "https://..." }
  ]},
  { "id": "memory", "name": "Memoria interna", "selected": "256 GB", "options": [
      { "value": "128 GB" },
      { "value": "256 GB" }
  ]}
]
```

**Estructura de `shipping` (opcional):**  
Objeto único por producto para mensajes de envío. Ejemplo mínimo:

```json
"shipping": {
  "free_shipping": true,
  "label": "Envío gratis por ser tu primera compra",
  "same_day_delivery": true,
  "pickup_available": true,
  "pickup_available_day": "miércoles"
}
```

**Storage:** `apps/backend/src/data/products.json` — array de Product. Cada item tiene `seller_id`; el backend al servir detalle (y opcionalmente listado) resuelve el seller desde `sellers.json`.

---

### 2.3 ProductSummary — vista para listado (home y carruseles)

Vista derivada de Product para cards (home, "Productos relacionados", "Productos del vendedor"). No es un almacenamiento nuevo; el backend la construye a partir de Product.

| Campo               | Tipo    | Origen / Notas |
|---------------------|---------|----------------|
| id                  | string  | Product.id |
| title               | string  | Product.title |
| price               | number  | Product.price |
| currency_id         | string? | Product.currency_id |
| original_price      | number? | Product.original_price (para tachado y % OFF) |
| thumbnail           | string? | Primera imagen de Product.images |
| condition           | string? | Product.condition |
| seller_id           | string? | Product.seller_id (para filtrar "productos del vendedor") |
| installments        | object? | Product.installments (para "6 cuotas de $ X" en card) |
| free_shipping       | boolean?| Product.shipping?.free_shipping |
| shipping_label      | string? | Product.shipping?.label (opcional, para texto en card) |

El listado GET /api/products sigue devolviendo un array de ProductSummary (construido desde Product). Los carruseles "productos del vendedor" pueden ser GET /api/products?seller_id=SELLER001 devolviendo ProductSummary[].

---

## 3. Relaciones

- **Product** → **Seller:** N:1 (muchos productos por seller). Product.seller_id → Seller.id.
- **ProductSummary:** vista sobre Product (y seller resuelto si se quiere mostrar nombre en card).

No hay entidad "Offer" ni "Listing" en este prototipo; "otras opciones de compra" se modelan con `other_offers_count` y `other_offers_min_price` a nivel producto (o se dejan para una iteración posterior).

---

## 4. API sugerida después del rediseño

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/products | Listado ProductSummary[] (desde products.json, resolviendo seller si hace falta solo id/nickname) |
| GET | /api/products?seller_id=:id | Listado filtrado por vendedor (ProductSummary[]) |
| GET | /api/products/:id | Detalle Product completo con objeto seller resuelto (Seller completo por seller_id) |
| GET | /api/sellers | (Opcional) Listado de sellers |
| GET | /api/sellers/:id | Detalle Seller (para "Ir a la página del vendedor") |

El contrato OpenAPI se actualiza con los nuevos schemas (Seller extendido, Product extendido, ProductSummary extendido).

---

## 5. Validación resumida

- **Seller:** id y nickname obligatorios.
- **Product:** id, seller_id, title, price obligatorios; price ≥ 0; images no vacío si hay galería; seller_id debe existir en sellers.json (validación en backend al cargar).
- **ProductSummary:** generado por backend; no se persiste.

---

## 6. Migración desde el modelo actual

1. Crear `sellers.json` extrayendo sellers únicos de los productos actuales y añadiendo badge, sales_count, etc. (valores mock).
2. En `products.json` reemplazar el objeto `seller` por `seller_id` y añadir los nuevos campos (opcionales al principio: installments, highlights, attributes, original_price, sold_quantity, warranty, return_policy, shipping, fulfillment_type, variants).
3. Actualizar tipos TypeScript en backend (Product, Seller, ProductSummary) y OpenAPI.
4. Ajustar products.service para cargar sellers, resolver seller por id al armar detalle y armar ProductSummary con los nuevos campos.

---

## 7. Resumen de ventajas

- **Mejor manejo de datos:** Seller en un solo lugar; cambios en el vendedor no requieren tocar todos los productos.
- **UI completa:** Con este modelo se pueden mostrar todos los bloques de las pantallas de referencia (detalle principal, características, vendedor, envío, garantías, listados con precio/cuotas/envío).
- **Escalable:** Variantes y atributos permiten crecer sin cambiar de modelo; endpoints por seller permiten "productos del vendedor" y página del vendedor.

Si estás de acuerdo con este rediseño, el siguiente paso es implementarlo en el backend (tipos, OpenAPI, sellers.json, migración de products.json y servicio/rutas).
