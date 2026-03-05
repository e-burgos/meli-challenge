import type { ReactNode } from 'react';

/**
 * Representa un slide del carousel de banners publicitarios (HeroBannerCarousel).
 */
export interface BannerSlide {
  /** URL de la imagen de fondo del slide. Puede ser SVG, PNG o URL externa. */
  imageUrl: string;
  /** Texto principal del slide (ej. "Hasta 50% de descuento"). Requerido. */
  title: string;
  /** Texto secundario/subtítulo. Opcional. */
  subtitle?: string;
  /** Etiqueta de badge/oferta (ej. "OFERTA DEL DÍA"). Opcional. */
  badge?: string;
  /** URL de destino al hacer clic en el slide. Sin link si omitido. Opcional. */
  href?: string;
}

/**
 * Representa una tarjeta de acceso rápido del carousel BenefitsCarousel.
 * Todos los campos son requeridos.
 */
export interface QuickAccessCardData {
  /** Título de la tarjeta (ej. "Envío gratis"). */
  title: string;
  /** Descripción corta (ej. "Beneficio por ser tu primera compra"). */
  description: string;
  /** Texto del botón/enlace de acción (ej. "Mostrar productos"). */
  ctaLabel: string;
  /** URL de destino del CTA (ruta interna o ancla "#"). */
  ctaHref: string;
  /** Ícono SVG inline como ReactNode — creado ad-hoc, monocromático. */
  icon: ReactNode;
}
