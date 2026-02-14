# Assets — Meli prototype

Placeholder images for the Meli prototype (design-spec-meli.md). Production may replace with official Mercado Libre assets where permitted.

| File | Use |
|------|-----|
| `favicon.svg` | Favicon oficial Meli (Mercado Libre). Origen: [mlstatic CDN](https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.22/mercadolibre/favicon.svg). |
| `logo.svg` | Header logo (yellow bar + icon + “Mercado Libre” placeholder). |
| `banner-publicidad.svg` | Ad banner placeholder (gray). |
| `banner-publicidad-2.svg` | Secondary ad banner placeholder (blue tint). |

**Usage from apps:** import URLs from `@meli-challenge/ui-components`:

```ts
import { faviconUrl, logoUrl, bannerPublicidadUrl } from '@meli-challenge/ui-components';
// faviconUrl, logoUrl, etc. are resolved URLs (string) at build time.
```

**Favicon in HTML:** set `<link rel="icon" href={faviconUrl} />` or copy `favicon.svg` to `apps/frontend/public/favicon.ico` / `favicon.svg` and use `/favicon.ico` or `/favicon.svg`.
