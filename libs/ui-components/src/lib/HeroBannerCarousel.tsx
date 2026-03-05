import { useState } from 'react';
import type { BannerSlide } from './carousel.types';
import { useAutoplay } from './hooks/useAutoplay';

export interface HeroBannerCarouselProps {
  /** Arreglo de slides a mostrar. Mínimo 1. */
  slides: BannerSlide[];
  /** Intervalo de autoplay en ms. Default: 3000. */
  autoplayInterval?: number;
  /** Clase CSS adicional para el contenedor raíz. */
  className?: string;
}

/**
 * Carousel fullscreen de banners publicitarios con autoplay.
 * - Fullscreen horizontal (sin max-w ni padding).
 * - Aspect-ratio 4/3 en móvil, 16/5 en escritorio (md:).
 * - Transición translateX; instantánea si prefers-reduced-motion: reduce.
 * - Pausa en hover/focus; retoma en mouseleave/blur.
 * - Dots de navegación con aria-label descriptivo.
 * - Fallback por imagen rota.
 */
export function HeroBannerCarousel({
  slides,
  autoplayInterval = 3000,
  className = '',
}: HeroBannerCarouselProps) {
  // slides vacío → no renderizar nada
  if (slides.length === 0) return null;

  const { activeIndex, setActiveIndex, pause, resume, skipTransition } =
    useAutoplay(slides.length, autoplayInterval, slides.length > 1);

  const showControls = slides.length > 1;

  return (
    <section
      role="region"
      aria-label="Banner publicitario"
      className={`w-full overflow-hidden ${className}`.trim()}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      {/* Anuncio accesible para lectores de pantalla */}
      <span aria-live="polite" aria-atomic="true" className="sr-only">
        {`Slide ${activeIndex + 1} de ${slides.length}: ${slides[activeIndex]?.title}`}
      </span>

      {/* Contenedor con aspect-ratio responsive */}
      <div className="w-full aspect-4/3 md:aspect-16/5 relative">
        {/* Track de slides */}
        <div
          className={`flex h-full ${skipTransition ? '' : 'transition-transform duration-500 ease-in-out'}`}
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          aria-roledescription="carousel"
        >
          {slides.map((slide, index) => (
            <SlideItem
              key={index}
              slide={slide}
              isActive={index === activeIndex}
            />
          ))}
        </div>

        {/* Dot indicators */}
        {showControls && (
          <div
            className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10"
            role="tablist"
            aria-label="Navegación de slides"
          >
            {slides.map((slide, index) => (
              <button
                key={index}
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Ir al slide ${index + 1}: ${slide.title}`}
                onClick={() => setActiveIndex(index)}
                className={[
                  'rounded-full border-0 cursor-pointer transition-all duration-200',
                  index === activeIndex
                    ? 'w-2.5 h-2.5 bg-meli-yellow'
                    : 'w-1.5 h-1.5 bg-white opacity-60 hover:opacity-100',
                ].join(' ')}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Subcomponente de slide individual ───────────────────────────────────────

interface SlideItemProps {
  slide: BannerSlide;
  isActive: boolean;
}

function SlideItem({ slide, isActive }: SlideItemProps) {
  const [imgError, setImgError] = useState(false);

  const inner = (
    <div
      className="w-full h-full shrink-0 relative overflow-hidden"
      style={{ minWidth: '100%' }}
      aria-hidden={!isActive}
    >
      {/* Imagen o fallback */}
      {!imgError ? (
        <img
          src={slide.imageUrl}
          alt={slide.title}
          className="w-full h-full object-cover object-center"
          draggable={false}
          onError={() => setImgError(true)}
        />
      ) : (
        /* Fallback: fondo sólido con texto */
        <div className="w-full h-full bg-linear-to-br from-blue-600 to-blue-800 flex flex-col items-center justify-center gap-2 px-8">
          {slide.badge && (
            <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded">
              {slide.badge}
            </span>
          )}
          <p className="text-white text-2xl md:text-4xl font-bold text-center drop-shadow">
            {slide.title}
          </p>
          {slide.subtitle && (
            <p className="text-blue-100 text-base md:text-lg text-center">
              {slide.subtitle}
            </p>
          )}
        </div>
      )}

      {/* Overlay de texto sobre la imagen (cuando carga correctamente) */}
      {!imgError && (
        <div className="absolute inset-0 flex flex-col justify-end pb-8 pl-8 pointer-events-none">
          {slide.badge && (
            <span className="mb-2 self-start bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded">
              {slide.badge}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (slide.href) {
    return (
      <a
        href={slide.href}
        tabIndex={isActive ? 0 : -1}
        aria-label={slide.title}
        className="block w-full h-full shrink-0"
        style={{ minWidth: '100%' }}
      >
        {inner}
      </a>
    );
  }

  return <>{inner}</>;
}
