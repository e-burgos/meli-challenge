export interface ProductReviewsDistribution {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

export interface ProductReviewsCharacteristicRating {
  name: string;
  value: number;
}

export interface ProductReviewItem {
  rating: number;
  text: string;
  date: string;
  helpfulCount: number;
}

export interface ProductReviewsProps {
  averageRating: number;
  reviewCount: number;
  /** Bar lengths 0–1 or counts; used to show distribution. */
  distribution?: ProductReviewsDistribution | null;
  /** e.g. Calidad de la cámara, Relación precio-calidad. */
  characteristicRatings?: ProductReviewsCharacteristicRating[] | null;
  /** AI-generated summary text. */
  featuredSummary?: string | null;
  /** List of individual reviews. */
  reviews?: ProductReviewItem[] | null;
}

const starPath =
  'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z';

function StarRating({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <div className="flex gap-0.5" aria-label={`${value} de 5 estrellas`}>
      {Array.from({ length: full }, (_, i) => (
        <svg key={`f-${i}`} className="w-4 h-4 text-meli-blue" fill="currentColor" viewBox="0 0 20 20">
          <path d={starPath} />
        </svg>
      ))}
      {half > 0 && (
        <svg key="half" className="w-4 h-4 text-meli-blue opacity-50" fill="currentColor" viewBox="0 0 20 20">
          <path d={starPath} />
        </svg>
      )}
      {Array.from({ length: empty }, (_, i) => (
        <svg key={`e-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d={starPath} />
        </svg>
      ))}
    </div>
  );
}

/**
 * "Opiniones del producto" section: left column (rating summary, distribution,
 * characteristic ratings), right column (featured summary, sort/filter, reviews).
 */
export function ProductReviews({
  averageRating,
  reviewCount,
  distribution,
  characteristicRatings,
  featuredSummary,
  reviews = [],
}: ProductReviewsProps) {
  const totalDist =
    distribution != null
      ? distribution[5] + distribution[4] + distribution[3] + distribution[2] + distribution[1]
      : 0;
  const maxDist =
    distribution != null && totalDist > 0
      ? Math.max(
        distribution[5],
        distribution[4],
        distribution[3],
        distribution[2],
        distribution[1]
      )
      : 1;

  return (
    <section id="opiniones" className="bg-white py-4 lg:py-6 scroll-mt-4">
      <h2 className="text-2xl font-normal text-gray-800 mb-4">
        Opiniones del producto
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        {/* Left: rating summary, distribution, characteristic ratings */}
        <div className="space-y-6">
          <div>
            <p className="text-3xl font-semibold text-meli-blue mb-1">
              {averageRating.toFixed(1)}
            </p>
            <StarRating value={averageRating} />
            <p className="text-sm text-gray-500 mt-1">
              {reviewCount.toLocaleString('es-AR')} calificaciones
            </p>
          </div>

          {distribution != null && totalDist > 0 && (
            <div className="space-y-2">
              {([5, 4, 3, 2, 1] as const).map((stars) => {
                const count = distribution[stars];
                const width = maxDist > 0 ? (count / maxDist) * 100 : 0;
                return (
                  <div
                    key={stars}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <span className="w-8">{stars}★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-400 rounded-full"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                    <span className="w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          )}

          {characteristicRatings != null &&
            characteristicRatings.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  Calificación de características
                </h3>
                <ul className="space-y-2">
                  {characteristicRatings.map((cr) => (
                    <li
                      key={cr.name}
                      className="flex items-center justify-between gap-4 text-sm"
                    >
                      <span className="text-gray-600">{cr.name}</span>
                      <StarRating value={cr.value} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>

        {/* Right: featured summary, sort/filter, reviews */}
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 bg-white hover:bg-gray-50"
            >
              Ordenar
            </button>
            <button
              type="button"
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 bg-white hover:bg-gray-50"
            >
              Calificación
            </button>
          </div>

          {featuredSummary != null && featuredSummary !== '' && (
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-1">
                Opiniones destacadas
              </h3>
              <p className="text-sm text-gray-600 mb-2">{featuredSummary}</p>
              <p className="text-xs text-meli-blue flex items-center gap-1">
                <span aria-hidden>⚡</span>
                Resumen de opiniones generado por IA
              </p>
            </div>
          )}

          <ul className="space-y-4">
            {(reviews ?? []).map((rev, i) => (
              <li
                key={i}
                className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <StarRating value={rev.rating} />
                  <span className="text-xs text-gray-500">{rev.date}</span>
                </div>
                <p className="text-sm text-gray-800 mb-2">{rev.text}</p>
                <button
                  type="button"
                  className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  <span aria-hidden>👍</span> Es útil ({rev.helpfulCount})
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
