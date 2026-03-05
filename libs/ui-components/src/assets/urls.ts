/**
 * Asset URLs for Meli prototype (favicon, logo, banners).
 * Placeholders aligned with design-spec-meli.md; production may use official Meli assets.
 */

import faviconUrl from './favicon.svg';
import logoUrl from './logo.svg';
import bannerPublicidadUrl from './banner-publicidad.svg';
import bannerPublicidad2Url from './banner-publicidad-2.svg';
import bannerPublicidad3Url from './banner-publicidad-3.svg';

/**
 * Banner CDN URLs — free-to-use photos (Unsplash License / Pexels License).
 * Dimensionadas automáticamente a 1440×450 (ratio 16:5) por el CDN con fit=crop.
 *
 * Banner 1 — Electrónica: "A MacBook with lines of code" by Christopher Gower (Unsplash)
 * Banner 2 — Envío Gratis: "Brown cardboard box" by Mediamodifier (Unsplash)
 * Banner 3 — Neumáticos: "Red sports car — Pexels" by svonhorst (Pexels)
 */
export const bannerElectronicaUrl =
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1440&h=450&fit=crop&auto=format&q=80';

export const bannerEnvioGratisUrl =
  'https://images.unsplash.com/photo-1631010231931-d2c396b444ec?w=1440&h=450&fit=crop&auto=format&q=80';

export const bannerNeumaticosUrl =
  'https://images.pexels.com/photos/2684219/pexels-photo-2684219.jpeg?auto=compress&cs=tinysrgb&w=1440&h=450&fit=crop';

export {
  faviconUrl,
  logoUrl,
  bannerPublicidadUrl,
  bannerPublicidad2Url,
  bannerPublicidad3Url,
};
