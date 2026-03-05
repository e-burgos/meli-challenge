import type { QuickAccessCardData } from './carousel.types';

export type QuickAccessCardProps = QuickAccessCardData;

/**
 * Tarjeta de acceso rápido para el BenefitsCarousel.
 * Muestra ícono SVG inline, título, descripción y CTA.
 */
export function QuickAccessCard({
  title,
  description,
  ctaLabel,
  ctaHref,
  icon,
}: QuickAccessCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col items-center text-center gap-2 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 min-w-0">
      {/* Ícono SVG inline */}
      <div className="w-8 h-8 text-gray-600 flex items-center justify-center shrink-0">
        {icon}
      </div>

      {/* Título */}
      <p className="text-xs font-semibold text-gray-800 leading-tight">
        {title}
      </p>

      {/* Descripción */}
      <p className="text-xs text-gray-500 leading-tight line-clamp-2">
        {description}
      </p>

      {/* CTA */}
      <a
        href={ctaHref}
        className="mt-auto text-xs font-medium text-blue-600 hover:underline"
      >
        {ctaLabel}
      </a>
    </div>
  );
}
