# Análisis de brecha: datos para pantalla de detalle de producto

**Objetivo:** Comparar los datos mostrados en las pantallas de detalle tipo Mercado Libre (referencia en imágenes) con el modelo actual de Product/Seller y el mock en `apps/backend/src/data/products.json`.

**Fecha:** 2025-02-13

---

## 1. Bloque principal (imagen 1: galería + título, precio, variantes)

| Dato en UI | En modelo actual | En mock | Notas |
|------------|------------------|---------|--------|
| Imágenes (principal + miniaturas) | ✅ `images[]` | ✅ | Cubierto |
| Condición ("Nuevo") | ✅ `condition` | ✅ | Cubierto |
| **+N vendidos** | ❌ | ❌ | Falta `sold_quantity` o equivalente |
| Título | ✅ `title` | ✅ | Cubierto |
| **Rating (valor + cantidad reseñas)** | ⚠️ `ratings` (objeto libre) | ✅ usamos `{ average, count }` | Schema no define estructura; mock sí la tiene |
| Precio principal | ✅ `price` | ✅ | Cubierto |
| **Cuotas (ej. 12 cuotas de $ X)** | ❌ | ❌ | Falta `installments` (cantidad, monto_cuota) |
| **Precio sin impuestos** | ❌ | ❌ | Falta `price_without_taxes` o similar |
| Medios de pago (link "Ver medios de pago") | ✅ `payment_methods[]` | ✅ | Cubierto |
| **Variante: color** (opciones + imagen por color) | ❌ | ❌ | Falta modelo de variantes (attributes/variations) |
| **Variante: memoria interna** (128 GB / 256 GB) | ❌ | ❌ | Idem variantes |
| **"Lo que tenés que saber"** (bullets) | ❌ | ❌ | Podría ser lista `highlights[]` o derivar de atributos |
| **"Ver características"** (link a specs) | ❌ | ❌ | Requiere atributos estructurados (ver sección 2) |
| **Otras opciones de compra** ("5 desde $ X") | ❌ | ❌ | Falta `other_offers_count`, `other_offers_min_price` o lógica por listing |

---

## 2. Características del producto (imagen 2: especificaciones técnicas)

Todo este bloque son **atributos estructurados** (clave–valor por categoría). El modelo actual solo tiene `description` (texto libre).

| Categoría / Dato | En modelo actual | Recomendación |
|------------------|------------------|---------------|
| Resumen (tamaño pantalla, memoria, cámara) | ❌ | Objeto `specs_summary` o atributos nombrados |
| Marca, línea, modelo, color | ❌ | `attributes.brand`, `attributes.model`, etc. o array `attributes[]` |
| Origen, sistema operativo, procesador, cámara, SIM, memoria, conectividad, pantalla | ❌ | Mismo esquema de atributos (lista de pares nombre/valor o objeto por sección) |

**Conclusión:** No tenemos **ningún** dato estructurado para "Características del producto". Solo `description` de texto. Para replicar la pantalla haría falta algo como:

- `attributes: { general: [...], specifications: [...], camera: [...], memory: [...], connectivity: [...], display: [...] }`  
- o un array plano `attributes: [ { name, value }, ... ]` que el frontend agrupe por categoría.

---

## 3. Productos relacionados / Productos del vendedor (imagen 3)

| Dato en UI | En modelo actual | Notas |
|------------|------------------|--------|
| Imagen, título, precio actual | ✅ ProductSummary / Product | Cubierto para listado |
| **Precio original** (tachado) | ❌ | Falta `original_price` en ProductSummary/Product |
| **Descuento %** | ❌ | Falta `discount_percentage` o derivable de original_price + price |
| **Cuotas en card** ("6 cuotas de $ X") | ❌ | Falta info de cuotas en listado/detalle |
| **Envío** ("Envío gratis por primera compra") | ❌ | Falta modelo de shipping (free_shipping, shipping_label, etc.) |
| "Productos del vendedor" | ✅ | Tenemos `seller.id`; el frontend puede filtrar por seller o necesitamos GET por seller |

---

## 4. Envío, vendedor, garantías (imagen 4)

| Dato en UI | En modelo actual | Notas |
|------------|------------------|--------|
| "Llega gratis hoy", countdown, "Retirá gratis a partir del miércoles" | ❌ | Falta modelo de envío/entrega (shipping_options, pickup, plazos) |
| "Última disponible" | ⚠️ | Tenemos `stock`; si `stock === 1` la UI puede mostrar el mensaje |
| "Almacenado y enviado por FULL" | ❌ | Falta `fulfillment_type` o similar |
| Vendido por [nombre] | ✅ `seller.nickname` | Cubierto |
| **Badge vendedor** (MercadoLíder, Platinum) | ❌ | Falta `seller.badge` o `seller.badge_level` |
| **+N ventas** | ❌ | Falta `seller.sales_count` |
| **Hace Factura A** | ❌ | Falta `seller.invoice_type` |
| Devolución gratis 30 días | ❌ | Falta `return_policy` (a nivel producto o seller) |
| Compra Protegida | — | Copy/UI |
| **Garantía 12 meses** | ❌ | Falta `warranty` (texto o meses) |
| **Seguidores, cantidad de productos del vendedor** | ❌ | Falta `seller.followers_count`, `seller.product_count` |
| **Rendimiento** (buena atención, entrega a tiempo) | ❌ | Solo tenemos `seller.reputation` (string); faltan métricas desglosadas |
| "Ver 5 opciones desde $ X" | ❌ | Mismo que sección 1 |

---

## 5. Resumen: qué tenemos vs qué falta

### Cubierto hoy

- Product: id, title, description, price, currency_id, images, payment_methods, seller (id, nickname, reputation), condition, stock, ratings (en mock: average, count).
- Listado: thumbnail (primera imagen), título, precio, condición.
- Stock numérico (para derivar "Última disponible" si stock === 1).

### Faltante para acercarse a las pantallas de referencia

1. **Producto**
   - Vendidos: `sold_quantity` (o similar).
   - Cuotas: `installments` (cantidad, monto_cuota).
   - Precio sin impuestos: `price_without_taxes` (opcional).
   - Precio original y descuento: `original_price`, y/o `discount_percentage` (para cards y detalle).
   - Variantes: modelo de variantes (color, memoria, etc.) con opciones e imágenes.
   - Highlights: "Lo que tenés que saber" como lista (`highlights[]`).
   - Atributos/características: estructura para "Características del producto" (atributos por categoría o lista plana).
   - Otras ofertas: `other_offers_count`, `other_offers_min_price` (o lógica por listing).

2. **Vendedor**
   - Badge: `seller.badge` o `seller.badge_level`.
   - Ventas: `seller.sales_count`.
   - Facturación: `seller.invoice_type`.
   - Seguidores: `seller.followers_count`.
   - Cantidad de productos: `seller.product_count`.
   - Métricas de rendimiento (atención, entrega a tiempo) si se quieren mostrar.

3. **Envío / logística**
   - Opciones de envío (gratis, plazo, "llega hoy", retiro).
   - Fulfillment: quién almacena/envía (ej. FULL).

4. **Garantías y políticas**
   - `warranty` (texto o meses).
   - `return_policy` (ej. 30 días, gratis).

---

## 6. Recomendación para el prototipo

- **Mínimo viable para detalle rico (sin implementar toda la UI):**
  - Añadir a **Product**: `sold_quantity` (opcional), `installments` (opcional), `original_price` (opcional), `highlights` (array de strings), `attributes` (array de { name, value } o por categoría).
  - Añadir a **Seller**: `sales_count` (opcional), `badge` (opcional).
  - Dejar para una siguiente iteración: variantes, envío, garantía, otras opciones de compra, precio sin impuestos.

- **Si se prioriza solo “verse como Meli” en lo ya construido:**
  - Mantener el modelo actual y que el frontend use solo los campos existentes; opcionalmente añadir `highlights` y un `attributes` simple para la sección "Características" sin tocar mucho el backend.

Este documento se puede usar para decidir qué campos agregar al `data-model.md`, a los tipos en `apps/backend/src/types/`, al OpenAPI y al `products.json`.
