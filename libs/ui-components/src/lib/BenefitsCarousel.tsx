import { useRef } from 'react';
import type { QuickAccessCardData } from './carousel.types';
import { QuickAccessCard } from './QuickAccessCard';

export interface BenefitsCarouselProps {
  /** Arreglo de tarjetas de acceso rápido. */
  cards: QuickAccessCardData[];
  /** Clase CSS adicional para el contenedor raíz. */
  className?: string;
}

/**
 * Carousel horizontal de tarjetas de acceso rápido.
 *
 * - Flota sobre el borde inferior del HeroBannerCarousel con margin-top negativo.
 * - Scroll nativo con scroll-snap (swipe táctil y trackpad sin JS adicional).
 * - Flechas prev/next sólo en escritorio (≥768px).
 * - Retorna null si cards está vacío.
 */
export function BenefitsCarousel({
  cards,
  className = '',
}: BenefitsCarouselProps) {
  if (cards.length === 0) return null;

  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const cardWidth =
      trackRef.current.querySelector('[data-card]')?.clientWidth ?? 200;
    trackRef.current.scrollBy({
      left: direction === 'right' ? cardWidth + 12 : -(cardWidth + 12),
      behavior: 'smooth',
    });
  };

  // Ocultar flechas cuando hay pocas tarjetas (5 es el threshold de "desktop visible")
  const hideArrows = cards.length <= 5;

  return (
    <div
      className={`relative z-10 -mt-12 w-full ${className}`.trim()}
      style={{ isolation: 'isolate' }}
    >
      {/* Flecha izquierda */}
      {!hideArrows && (
        <button
          type="button"
          aria-label="Tarjeta anterior"
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white border border-gray-200 shadow-md rounded-full w-9 h-9 items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M10 3L5 8L10 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* Track con scroll-snap */}
      <div
        ref={trackRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-3 px-4 md:px-10 pb-2 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            data-card
            className="snap-start shrink-0 w-[45%] sm:w-[30%] md:w-[19%]"
          >
            <QuickAccessCard {...card} />
          </div>
        ))}
      </div>

      {/* Flecha derecha */}
      {!hideArrows && (
        <button
          type="button"
          aria-label="Tarjeta siguiente"
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white border border-gray-200 shadow-md rounded-full w-9 h-9 items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 3L11 8L6 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
