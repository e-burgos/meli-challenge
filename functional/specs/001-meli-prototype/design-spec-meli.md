# Design Spec — Mercado Libre Argentina (Meli)

**Referencia principal (objetivo: prototipo idéntico a Meli)**: [Página de producto Meli — Samsung Galaxy A55](https://www.mercadolibre.com.ar/celular-samsung-galaxy-a55-5g-2568gb-black-knox-color-negro/p/MLA46689590)  
**Otras referencias**: [Home Meli](https://www.mercadolibre.com.ar/)  
**Objetivo**: Especificación en Tailwind v4 para que @senior-frontend implemente Home (T021), ProductDetail (T029), DesignSystem.tsx y Prototype.tsx. Extraer de la página de referencia imágenes, iconos y vectores para un prototipo lo más idéntico posible.

---

## 0. Referencia, logo y favicon (no negociable)

### 0.1 Página de referencia

- **URL**: https://www.mercadolibre.com.ar/celular-samsung-galaxy-a55-5g-2568gb-black-knox-color-negro/p/MLA46689590
- **Uso**: Analizar cada sección de esta página; identificar todos los componentes (por pequeños que sean) e implementarlos en design-spec, DesignSystem.tsx y Prototype.tsx.
- **Assets**: Extraer de esta página (o del dominio Meli) imágenes, iconos y vectores necesarios para el prototipo. Usar favicon y logo oficiales según apartado siguiente.

### 0.2 Logo y favicon

- **Favicon**: Usar el favicon oficial de Mercado Libre Argentina. Referencia: `https://www.mercadolibre.com.ar/favicon.ico` (o el que sirva el dominio en el header `<link rel="icon">`). Copiar a `apps/frontend/public/favicon.ico` o referenciar para uso en el sitio.
- **Logo header**: Logo "Mercado Libre" (texto + ícono de mano/estrella) usado en la cabecera amarilla. Referencia: inspeccionar el header de la [página de producto](https://www.mercadolibre.com.ar/celular-samsung-galaxy-a55-5g-2568gb-black-knox-color-negro/p/MLA46689590) o del [home](https://www.mercadolibre.com.ar/) y obtener la URL del SVG/PNG del logo desde el CDN de Meli, o usar recurso oficial de marca. En el proyecto: mostrar en Layout (`apps/frontend`) como `<img src="..." alt="Mercado Libre" />` o componente que apunte al asset.
- **Uso en el sitio**: Logo en header (izquierda); favicon en `index.html` como `<link rel="icon" href="/favicon.ico" />`.

**Assets en el repo:** Favicon, logo y banners de publicidad están en `libs/ui-components/src/assets/` y se exportan desde `@meli-challenge/ui-components`:

- `favicon.svg` — favicon oficial Meli (origen: [mlstatic CDN](https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.22/mercadolibre/favicon.svg)).
- `logo.svg` — logo header placeholder (fondo amarillo + ícono + texto).
- `banner-publicidad.svg`, `banner-publicidad-2.svg` — banners publicitarios placeholder.

Uso en apps: `import { faviconUrl, logoUrl, bannerPublicidadUrl } from '@meli-challenge/ui-components';` (son URLs resueltas en build). Ver `libs/ui-components/src/assets/README.md`.

---

## 1. Design tokens (Tailwind v4)

Definir en CSS (Tailwind v4 `@theme` o variables) y usar vía clases o `var()`.

### 1.1 Colores

| Token | Valor | Uso | Clases Tailwind (equivalente) |
|-------|--------|-----|-------------------------------|
| **Meli Yellow** | `#FFE600` | Header, CTA primario, acentos | `bg-[#FFE600]`, `--color-meli-yellow` en @theme |
| **Meli Blue** | `#3483FA` | Links, íconos, acciones secundarias | `text-[#3483FA]`, `--color-meli-blue` |
| **Meli Blue Dark** | `#2968C8` | Hover links, botón secundario hover | `hover:bg-[#2968C8]` |
| **Background page** | `#EDEDED` o `gray-100` | Fondo del main (listado) | `bg-gray-100` |
| **Background card** | `#FFFFFF` | Cards, bloques, header | `bg-white` |
| **Text primary** | `#333333` o `gray-800` | Títulos, precio | `text-gray-800` |
| **Text secondary** | `#666666` o `gray-600` | Subtítulos, cuerpo | `text-gray-600` |
| **Text muted** | `#999999` o `gray-500` | Envío, badges, metadata | `text-gray-500` |
| **Price green** (opcional Meli) | `#00A650` | Precio destacado en listado | `text-[#00A650]` o `text-green-600` |
| **Border** | `#E5E5E5` o `gray-200` | Bordes, divisores | `border-gray-200` |

**En `apps/frontend/src/styles/index.css`** (o en `@theme`):

```css
@theme {
  --color-meli-yellow: #FFE600;
  --color-meli-blue: #3483FA;
  --color-meli-blue-dark: #2968C8;
  --color-meli-green: #00A650;
}
```

Uso: `bg-[var(--color-meli-yellow)]`, `text-[var(--color-meli-blue)]`, etc.

### 1.2 Tipografía

| Uso | Tamaño | Peso | Clases Tailwind |
|-----|--------|------|-----------------|
| **Logo / marca** | 1.25rem–1.5rem | bold | `text-xl font-bold` |
| **Título página** | 1.5rem–1.875rem | semibold | `text-2xl font-semibold` |
| **Título card producto** | 0.875rem–1rem | normal | `text-sm` o `text-base` |
| **Precio** | 1.25rem–1.5rem | bold/semibold | `text-xl font-semibold` |
| **Precio listado** (Meli verde) | 1rem–1.25rem | semibold | `text-lg font-semibold text-[var(--color-meli-green)]` |
| **Cuerpo** | 0.875rem | normal | `text-sm text-gray-600` |
| **Metadata / badges** | 0.75rem | normal | `text-xs text-gray-500` |

**Tipografía exacta (Meli) — no negociable**:  
Mercado Libre utiliza una fuente sans-serif geométrica. Para máxima fidelidad usar **Proxima Nova** (o equivalente: **Source Sans 3**, **Nunito Sans** como fallback libre).  
**Font stack** (Tailwind / CSS):

```css
font-family: 'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

- **Proxima Nova**: cargar vía Adobe Fonts, Google Fonts (si hay versión), o self-host. Pesos: 400 (regular), 600 (semibold), 700 (bold).
- **Fallback**: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` si no se carga Proxima Nova.
- En Tailwind v4: definir en `@theme` o en CSS global: `--font-sans: 'Proxima Nova', ui-sans-serif, system-ui, sans-serif;` y usar `font-sans` en el body.

### 1.3 Espaciado

| Uso | Valor | Clases |
|-----|--------|--------|
| **Container padding** | 1rem–1.5rem | `px-4` `md:px-6` |
| **Sección vertical** | 1rem–1.5rem | `py-4` `md:py-6` |
| **Gap entre cards** | 1rem | `gap-4` |
| **Gap header items** | 0.5rem–1rem | `gap-2` `gap-4` |
| **Gap interno card** | 0.5rem–0.75rem | `p-2` `p-3` |
| **Gap galería ↔ bloque compra** | 1.5rem–2rem | `gap-6` `lg:gap-8` |

Escala estándar Tailwind: `1` = 0.25rem, `2` = 0.5rem, `3` = 0.75rem, `4` = 1rem, `6` = 1.5rem, `8` = 2rem.

### 1.4 Bordes y sombras

- **Card**: `rounded-none` o `rounded-sm`, `border border-gray-200`, `shadow-sm` o `shadow`.
- **Botón**: `rounded` o `rounded-md`.
- **Input búsqueda**: `rounded-md`, `border border-gray-300`.

---

## 2. Componentes base

### 2.1 Botón primario (CTA Meli)

- **Fondo**: Meli yellow `bg-[#FFE600]` o `bg-[var(--color-meli-yellow)]`.
- **Texto**: oscuro `text-gray-900` o `text-black`, `font-semibold`.
- **Tamaño**: altura ~40px, padding horizontal 1rem: `px-4 py-2.5`, `text-base`.
- **Hover**: ligera sombra o opacidad: `hover:opacity-95` o `hover:shadow-md`.
- **Clases**: `rounded-md px-4 py-2.5 text-base font-semibold text-gray-900 bg-[#FFE600] hover:opacity-95 transition-opacity`.

### 2.2 Botón secundario (outline)

- **Borde**: Meli blue `border-2 border-[#3483FA]`.
- **Texto**: `text-[#3483FA]`, `font-semibold`.
- **Hover**: fondo suave `hover:bg-blue-50`.
- **Clases**: `rounded-md px-4 py-2.5 text-base font-semibold text-[#3483FA] border-2 border-[#3483FA] hover:bg-blue-50 transition-colors`.

### 2.3 Input búsqueda (header)

- **Contenedor**: flex, flex-1, max-width ~600px: `flex-1 max-w-xl`.
- **Input**: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-[#3483FA] focus:outline-none focus:ring-1 focus:ring-[#3483FA]`.
- **Placeholder**: "Buscar productos, marcas y más…".

### 2.4 Card de producto (listado)

- **Contenedor**: `bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow`. Enlace que envuelve todo el card (`<Link>`).
- **Imagen**: aspect-ratio 1:1, object-cover: `aspect-square w-full object-cover`.
- **Cuerpo**: padding `p-3`.
- **Título**: `text-sm text-gray-800 line-clamp-2` (máx. 2 líneas).
- **Precio**: `text-lg font-semibold text-[var(--color-meli-green)]` o `text-green-600`.
- **Envío** (opcional): `text-xs text-[#00A650]` "Envío gratis" o similar.
- **Responsive**: mismo card en todos los breakpoints; grid controla columnas.

### 2.5 Layout (app shell)

- **Header**: `bg-[#FFE600]`, altura fija ~52px, `flex items-center`, padding horizontal `px-4`, contenido en contenedor max-width (ej. `max-w-7xl mx-auto`) con logo, búsqueda y acciones.
- **Main**: `flex-1 bg-gray-100`, contenido en contenedor `max-w-7xl mx-auto px-4 py-6`.
- **Footer** (opcional): `bg-white border-t border-gray-200 py-6`, texto pequeño `text-xs text-gray-500`, centrado o en grid de enlaces.

---

## 3. Layout — Home

- **Estructura**: `<Layout>` (header + main). Dentro de main: contenedor `max-w-7xl mx-auto px-4 py-6`.
- **Header**:
  - Logo a la izquierda (texto "Mercado Libre" o imagen).
  - Barra de búsqueda centrada: input + botón "Buscar" (opcional en prototipo).
  - Derecha: íconos o enlaces (carrito, usuario) — en prototipo pueden ser placeholders.
- **Contenido**:
  - Si hay breadcrumb: `text-sm text-gray-500 mb-4`.
  - Grid de productos: `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4`.
  - Cada ítem: Card de producto (imagen, título, precio, envío).
- **Estado vacío**: mensaje centrado `text-gray-600`, "No hay productos.".
- **Loading**: skeleton o mensaje "Cargando productos…".

---

## 4. Layout — Página de detalle de producto

- **Estructura**: contenedor `max-w-7xl mx-auto px-4 py-6`. Grid de 2 columnas en desktop; en móvil una columna (galería arriba, bloque compra abajo).

### 4.1 Grid principal

- **Desktop** (`lg:`): `grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 lg:gap-8`.
- **Móvil**: una columna, orden: galería → título/precio/CTA → vendedor → descripción.

### 4.2 Columna izquierda — Galería

- **Imagen principal**: `aspect-square w-full max-w-lg rounded-lg border border-gray-200 overflow-hidden bg-white`. `object-contain` o `object-cover` según preferencia.
- **Miniaturas** (si hay varias imágenes): fila horizontal `flex gap-2 mt-2`, cada miniatura `w-16 h-16 rounded border border-gray-200 object-cover cursor-pointer`.
- Si solo hay una imagen: mostrar solo la principal.

### 4.3 Columna derecha — Bloque de compra

- **Contenedor**: `bg-white border border-gray-200 rounded-lg p-6` (o sin borde si el fondo ya es blanco).
- **Condición** (opcional): `text-sm text-gray-500` (ej. "Nuevo" / "Usado").
- **Título**: `text-xl font-semibold text-gray-800` o `text-2xl`.
- **Precio**: `text-2xl font-semibold text-gray-900` (o verde `text-[#00A650]`).
- **CTA**: botón primario "Comprar" ancho completo: `w-full` + clases del botón primario.
- **Envío**: `text-sm text-[#00A650]` "Envío gratis" o "Envío a todo el país".
- **Vendedor**: bloque con `text-sm text-gray-600`, label "Vendido por" + `nickname` (link o texto). Opcional: `border-t border-gray-200 mt-4 pt-4`.
- **Métodos de pago** (opcional): texto pequeño "Medios de pago", íconos o lista; en prototipo puede ser texto plano.

### 4.4 Descripción

- Debajo del grid de 2 columnas, ancho completo: `mt-8 border-t border-gray-200 pt-6`.
- **Título**: "Descripción del producto" `text-lg font-semibold text-gray-800`.
- **Cuerpo**: `text-sm text-gray-600 whitespace-pre-wrap` para el campo `description`.

### 4.5 Estados

- **Loading**: skeleton o mensaje "Cargando…".
- **Error / 404**: mensaje claro, botón o enlace "Volver al inicio" (`text-[#3483FA]`).

### 4.6 Navegación

- Enlace "Volver al inicio" arriba del contenido: `text-sm text-[#3483FA] hover:underline`.

---

## 4.7 Inventario de secciones y componentes (página de producto — no negociable)

Analizar la [página de producto Meli](https://www.mercadolibre.com.ar/celular-samsung-galaxy-a55-5g-2568gb-black-knox-color-negro/p/MLA46689590) e implementar **todos** los siguientes componentes (por pequeños que sean):

| Sección / componente | Descripción | Clases / espec Tailwind |
|----------------------|-------------|--------------------------|
| **Header** | Logo, búsqueda, ubicación, carrito, usuario | `bg-meli-yellow`, logo, input búsqueda, nav |
| **Breadcrumb** | Navegación tipo "Tecnología > Celulares > Samsung" | `text-sm text-gray-500`, links `text-meli-blue` |
| **Galería principal** | Imagen principal del producto | `aspect-square max-w-lg rounded-lg border border-gray-200` |
| **Miniaturas galería** | Fila de thumbnails bajo la imagen principal | `flex gap-2 mt-2`, cada una `w-16 h-16 rounded border object-cover cursor-pointer` |
| **Bloque de compra** | Condición, título, precio, CTA, cuotas, envío, vendedor, medios de pago | Ver 4.3; contenedor `bg-white border rounded-lg p-6` |
| **Condición** | Badge "Nuevo" / "Usado" | `text-sm text-gray-500` |
| **Título producto** | H1 del producto | `text-xl font-semibold text-gray-800` o `text-2xl` |
| **Precio** | Precio principal | `text-2xl font-semibold text-gray-900` |
| **CTA Comprar** | Botón amarillo "Comprar" | Botón primario Meli, `w-full` |
| **Envío** | "Envío gratis" / "Envío a todo el país" | `text-sm text-meli-green` |
| **Vendedor** | "Vendido por" + nickname | `text-sm text-gray-600`, `border-t border-gray-200 mt-4 pt-4` |
| **Medios de pago** | Íconos o texto de tarjetas/cuotas | `text-xs text-gray-500` |
| **Descripción** | Título "Descripción del producto" + cuerpo | `text-lg font-semibold`, cuerpo `text-sm text-gray-600 whitespace-pre-wrap` |
| **Productos relacionados** | Carrusel o grid de cards de producto (compactas) | Card producto relacionado (ver 5.x) |
| **Productos del vendedor** | Grid/carrusel de productos del mismo vendedor | Card producto vendedor (ver 5.x) |
| **Opiniones con fotos** | Cards de reseña (estrella, texto, foto opcional) | Card opinión (ver 5.x) |
| **Cards de sidebar** | "Compra protegida", "Envío", "Devolución", etc. | Card sidebar (ver 5.x) |
| **Cards publicitarias** | Banners / promos | Card publicitaria (ver 5.x) |

Todos estos componentes deben aparecer en **Prototype.tsx** con ejemplos de uso.

---

## 5. Tipos de card (todos — no negociable)

### 5.1 Card de producto (listado home)

- Ya definida en 2.4. Contenedor blanco, imagen 1:1, título, precio verde, envío. Enlace a `/product/:id`.

### 5.2 Card de producto relacionado / compacta

- **Uso**: "Productos relacionados", "Vistos recientemente". Más compacta que la del listado.
- **Contenedor**: `bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow`. Enlace a `/product/:id`.
- **Imagen**: `aspect-square w-full object-cover`, tamaño reducido (ej. altura fija `h-24` o `h-32`).
- **Cuerpo**: `p-2`. **Título**: `text-xs text-gray-800 line-clamp-2`. **Precio**: `text-sm font-semibold text-meli-green`.
- **Clases resumen**: mismo estilo que card listado pero `p-2`, `text-xs` título, `text-sm` precio.

### 5.3 Card publicitaria (banner)

- **Uso**: Banners promocionales en home o detalle.
- **Contenedor**: `bg-white border border-gray-200 rounded-lg overflow-hidden`. Ratio ej. 16:9 o ancho completo; puede llevar imagen de fondo o imagen + texto.
- **Estructura**: bloque con `aspect-video` o altura fija, `bg-gray-100` o imagen; opcional texto superpuesto `absolute inset-0 flex items-center justify-center`, título `text-lg font-semibold text-white` con sombra de texto.
- **Clases**: `relative rounded-lg overflow-hidden`, imagen `w-full h-full object-cover`, overlay opcional.

### 5.4 Card productos del vendedor

- **Uso**: "Más vendidos del vendedor" en página de detalle.
- **Estructura**: igual que card de producto (listado) o ligeramente más compacta; mismo patrón: imagen 1:1, título, precio, enlace a `/product/:id`.
- **Contenedor**: puede ir dentro de un carrusel o grid `grid grid-cols-2 sm:grid-cols-4 gap-4`.

### 5.5 Card opiniones (con foto)

- **Uso**: Opiniones y calificaciones del producto; puede incluir foto del usuario o del producto en la reseña.
- **Contenedor**: `bg-white border border-gray-200 rounded-lg p-4`.
- **Estrellas**: fila de 5 íconos (estrella llena/vacía). Clases: `flex gap-0.5`, estrella `text-yellow-500` o `text-gray-300`.
- **Título reseña** (opcional): `text-sm font-semibold text-gray-800`.
- **Cuerpo**: `text-sm text-gray-600`.
- **Foto** (opcional): miniatura a la derecha o abajo: `w-16 h-16 rounded object-cover`.
- **Metadata**: fecha, usuario: `text-xs text-gray-500`.

### 5.6 Card sidebar (Compra protegida, Envío, etc.)

- **Uso**: Sidebar en detalle o en listado; "Compra protegida", "Envío gratis", "Devolución gratis".
- **Contenedor**: `bg-white border border-gray-200 rounded-lg p-4` (o `p-3`).
- **Estructura**: ícono (izq) + texto (derecha). `flex items-start gap-3`.
- **Ícono**: cuadrado pequeño ej. `w-10 h-10 rounded flex items-center justify-center bg-meli-blue text-white` o SVG.
- **Título**: `text-sm font-semibold text-gray-800`.
- **Descripción**: `text-xs text-gray-500`.
- **Clases resumen**: `flex gap-3 p-4`, ícono `shrink-0`, bloque texto `min-w-0`.

---

## 6. Responsive (breakpoints Tailwind)

- **Default** (&lt; 640px): 2 columnas en grid de productos; detalle en 1 columna.
- **sm** (640px): 3 columnas en grid.
- **md** (768px): 4 columnas en grid.
- **lg** (1024px): 5 columnas en grid; detalle en 2 columnas (galería | bloque compra).
- **xl** (1280px): mismo que lg; `max-w-7xl` ya limita el ancho.

Clases: `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5` (home). Detalle: `grid-cols-1 lg:grid-cols-[1fr_400px]`.

---

## 7. Resumen para implementación

| Área | Archivo / componente | Acción |
|------|----------------------|--------|
| Tokens | `apps/frontend/src/styles/index.css` o `@theme` | Añadir `--color-meli-*` y usar en clases |
| Layout | `libs/ui-components` Layout.tsx | Header amarillo, main gris, contenedor max-w-7xl |
| Home | `apps/frontend/src/pages/Home.tsx` | Grid de Card, según sección 3 |
| ProductDetail | `apps/frontend/src/pages/ProductDetail.tsx` | Galería + bloque compra + descripción, según sección 4 |
| Button | `libs/ui-components` Button.tsx | Variantes primary (yellow) y secondary (blue outline) |
| Card | `libs/ui-components` Card.tsx | Imagen 1:1, título, precio verde, envío; enlace envolvente |
| DesignSystem.tsx | `apps/frontend/src/pages/DesignSystem.tsx` | Mostrar tokens, tipografía, colores, espaciado y ejemplos de Button/Card |
| Prototype.tsx | `apps/frontend/src/pages/Prototype.tsx` | Ejemplos de uso de cada componente (variantes, estados) |

---

## 8. Referencias rápidas Meli

- **Amarillo**: `#FFE600` — header, CTA "Comprar".
- **Azul**: `#3483FA` — links, "Volver", íconos.
- **Verde**: `#00A650` — precio en listado, "Envío gratis".
- **Contenedor**: `max-w-7xl mx-auto px-4` (o `px-4 md:px-6`).
- **Card listado**: blanco, borde sutil, imagen cuadrada, título 2 líneas, precio destacado.

Con esta spec, @senior-frontend puede implementar T021 (Home), T029 (ProductDetail), DesignSystem.tsx y Prototype.tsx sin ambigüedad.
