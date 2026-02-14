import { useState } from 'react';

export interface ProductRatings {
  average: number;
  count: number;
}

export interface VariantOption {
  value: string;
  thumbnail_url?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  selected: string;
  options: VariantOption[];
}

export interface ProductInfoProps {
  title: string;
  condition?: string | null;
  sold_quantity?: number | null;
  ratings?: ProductRatings | null;
  price: number;
  original_price?: number | null;
  price_without_taxes?: number | null;
  installments?: { quantity: number; amount: number } | null;
  variants?: ProductVariant[] | null;
  highlights?: string[] | null;
  other_offers_count?: number | null;
  other_offers_min_price?: number | null;
  characteristicsHref?: string;
}

/**
 * Product info block: title, rating, price, installments, variants, highlights, purchase options.
 * Meli-style per reference (Image 3).
 */
export function ProductInfo({
  title,
  condition,
  sold_quantity,
  ratings,
  price,
  original_price,
  price_without_taxes,
  installments,
  variants,
  highlights,
  other_offers_count,
  other_offers_min_price,
  characteristicsHref,
}: ProductInfoProps) {
  const [selectedVariant, setSelectedVariant] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    variants?.forEach((v) => {
      initial[v.id] = v.selected;
    });
    return initial;
  });

  const installmentsText =
    installments != null
      ? `Mismo precio en ${installments.quantity} cuotas de $ ${installments.amount.toLocaleString('es-AR')}`
      : null;

  return (
    <div className="bg-white rounded-lg w-full">
      {/* Status: Nuevo | +500 vendidos + heart */}
      <div className="flex items-center justify-between gap-2 mb-1">
        <p className="text-sm text-gray-500">
          {condition != null && condition !== '' ? condition : ''}
          {condition != null && condition !== '' && sold_quantity != null ? ' | ' : ''}
          {sold_quantity != null ? `+${sold_quantity} vendidos` : ''}
        </p>
        <button
          type="button"
          className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-red-500 transition-colors"
          aria-label="Agregar a favoritos"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Title */}
      <h1 className="text-xl font-semibold text-gray-800 md:text-2xl mb-2">{title}</h1>

      {/* Rating */}
      {ratings != null && (
        <div className="flex items-center gap-1.5 mb-3">
          <span className="text-sm font-medium text-gray-800">{ratings.average}</span>
          <div className="flex gap-0.5" aria-hidden>
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i <= Math.round(ratings.average) ? 'text-meli-blue' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-500">({ratings.count})</span>
        </div>
      )}

      {/* Price */}
      <p className="text-2xl font-semibold text-gray-900 mb-1">
        $ {price.toLocaleString('es-AR')}
      </p>
      {installmentsText != null && (
        <p className="text-sm text-meli-green mb-1">{installmentsText}</p>
      )}
      {price_without_taxes != null && (
        <p className="text-sm text-gray-500 mb-2">
          Precio sin impuestos nacionales: $ {price_without_taxes.toLocaleString('es-AR')}
        </p>
      )}
      <a href="#medios-pago" className="text-sm text-meli-blue hover:underline">
        Ver los medios de pago
      </a>

      {/* Variants: Color, Memory, etc. */}
      {variants != null && variants.length > 0 && (
        <div className="mt-6 space-y-4">
          {variants.map((variant) => (
            <div key={variant.id}>
              <p className="text-sm font-semibold text-gray-800 mb-2">
                {variant.name}: {selectedVariant[variant.id] ?? variant.selected}
              </p>
              <div className="flex flex-wrap gap-2">
                {variant.options.map((opt) => {
                  const isSelected = (selectedVariant[variant.id] ?? variant.selected) === opt.value;
                  const hasThumb = opt.thumbnail_url != null && opt.thumbnail_url !== '';
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setSelectedVariant((prev) => ({ ...prev, [variant.id]: opt.value }))}
                      className={`inline-flex items-center gap-1.5 rounded border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-meli-blue focus:ring-offset-1 ${isSelected ? 'border-meli-blue ring-2 ring-meli-blue' : 'border-gray-300 hover:border-gray-400'
                        }`}
                    >
                      {hasThumb ? (
                        <img src={opt.thumbnail_url} alt="" className="w-8 h-8 rounded object-cover shrink-0" />
                      ) : null}
                      <span>{opt.value}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lo que tenés que saber (highlights) */}
      {highlights != null && highlights.length > 0 && (
        <div className="mt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-2">
            Lo que tenés que saber de este producto
          </h2>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {highlights.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <a
            href={characteristicsHref ?? '#caracteristicas'}
            className="text-sm text-meli-blue hover:underline mt-2 inline-block"
          >
            Ver características
          </a>
        </div>
      )}

      {/* Opciones de compra */}
      {(other_offers_count != null && other_offers_count > 0) || other_offers_min_price != null ? (
        <div className="mt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-1">Opciones de compra:</h2>
          <a href="#otras-ofertas" className="text-sm text-meli-blue hover:underline">
            {other_offers_count != null && other_offers_min_price != null
              ? `${other_offers_count} productos nuevos desde $ ${other_offers_min_price.toLocaleString('es-AR')}`
              : 'Ver otras ofertas'}
          </a>
        </div>
      ) : null}
    </div>
  );
}
