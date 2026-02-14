# Cómo obtener imágenes de Mercado Libre para productos

La API pública de Mercado Libre (`GET https://api.mercadolibre.com/items/{id}`) puede devolver **403** desde algunos entornos (CI, ciertas IPs). Desde tu máquina local a veces sí responde.

## Opción 1: Probar desde tu máquina (sin credenciales)

```bash
# Obtener JSON del ítem (incluye array "pictures" con secure_url)
curl -s "https://api.mercadolibre.com/items/MLA2009168328" | jq '.pictures[]?.secure_url'
```

Si obtienes URLs, cópialas y actualiza `apps/backend/src/data/products.json` en el array `images` del producto correspondiente.

## Opción 2: Copiar URLs manualmente desde la web

1. Abre la ficha del producto en Mercado Libre (ej. buscar "MLA2009168328" o el título del producto).
2. En la galería de fotos, clic derecho en cada imagen → **Abrir imagen en una pestaña nueva** (o **Copiar dirección de imagen**).
3. Copia esas URLs y pégalas en `products.json` en el array `images` del producto.

## Opción 3: API con credenciales (desarrolladores ML)

Si tienes **App ID** y **Secret** de [developers.mercadolibre.com.ar](https://developers.mercadolibre.com.ar), puedes usar OAuth y llamar a `/items/{id}` con un access token; la respuesta incluye `pictures[].secure_url`. Con eso puedes automatizar la actualización de imágenes en `products.json`.

---

## Imágenes tipo producto (como el iPhone): Unsplash

El producto **iPhone 13 128 GB Medianoche** (MLA2009168328) usa 3 imágenes de Unsplash (búsqueda por descripción, URLs CDN en `images`). El resto de productos en `products.json` tiene **al menos 3 imágenes por producto** usando picsum con semillas distintas (p. ej. `galaxys24-1`, `galaxys24-2`, `galaxys24-3`).

Para reemplazar por fotos reales de producto (como el iPhone):

1. **Script con Unsplash API** (recomendado): Obtén un Access Key en [unsplash.com/developers](https://unsplash.com/developers) (gratis, registro rápido). Luego, desde la raíz del repo:

   ```bash
   UNSPLASH_ACCESS_KEY=tu_access_key node apps/backend/scripts/fetch-unsplash-product-images.mjs 1
   ```

   El script busca en Unsplash por el **título** del producto (ej. "Samsung Galaxy S24 256 GB Negro"), toma hasta 3 fotos y actualiza el array `images` de ese producto en `products.json`. El argumento `1` es el índice del producto (0 = iPhone, 1 = Samsung Galaxy S24, 2 = Lenovo, etc.). Sin argumento usa índice 1 (item 2).

2. **Manual**: En [unsplash.com](https://unsplash.com) busca por título del producto, abre una foto → Descargar → copia la URL de la imagen, y pégalas en `images` (mínimo 3 por producto).

**Producto de ejemplo:** MLA2009168328 (iPhone 13 128 GB Medianoche) usa imágenes de Unsplash; si consigues URLs de ML, reemplaza el array `images` por las URLs de Mercado Libre.
