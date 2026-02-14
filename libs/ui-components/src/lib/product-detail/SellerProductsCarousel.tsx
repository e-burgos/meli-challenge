import { useRef } from 'react';
import type { CarouselProductCardItem } from './CarouselProductCard';
import { CarouselProductCard } from './CarouselProductCard';

export interface SellerProductsCarouselProps {
  products: CarouselProductCardItem[];
  /** Link for "Ir a la página del vendedor". When omitted, link is #vendedor. */
  sellerPageHref?: string;
}

const SCROLL_AMOUNT = 240;

interface ScrollableElement {
  scrollLeft: number;
  scrollTo(options: { left: number; behavior: 'smooth' | 'auto' }): void;
}

/**
 * "Productos del vendedor" section: horizontal carousel + link to seller page.
 * Scroll is controlled by left/right floating arrow buttons (same as RelatedProductsCarousel).
 */
export function SellerProductsCarousel({
  products,
  sellerPageHref = '#vendedor',
}: SellerProductsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current as ScrollableElement | null;
    if (el == null) return;
    const delta = direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT;
    const target = el.scrollLeft + delta;
    el.scrollTo({ left: target, behavior: 'smooth' });
  };

  return (
    <section id="vendedor" className="bg-white py-4 lg:py-6">
      <h2 className="text-2xl font-normal text-gray-800 mb-4">
        Productos del vendedor
      </h2>
      {products.length > 0 ? (
        <>
          <div className="relative">
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto overflow-y-hidden pb-2 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {products.map((item) => (
                <div key={item.id} className="snap-start shrink-0">
                  <CarouselProductCard item={item} />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-gray-200 bg-white/90 hover:bg-white text-meli-blue flex items-center justify-center transition-colors shadow-md"
              aria-label="Anterior"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-gray-200 bg-white/90 hover:bg-white text-meli-blue flex items-center justify-center transition-colors shadow-md"
              aria-label="Siguiente"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <a
            href={sellerPageHref}
            className="inline-block mt-4 text-sm text-meli-blue hover:underline"
          >
            Ir a la página del vendedor
          </a>
        </>
      ) : (
        <p className="text-sm text-gray-500 mb-4">
          Este vendedor no tiene más productos publicados.
        </p>
      )}
    </section>
  );
}
