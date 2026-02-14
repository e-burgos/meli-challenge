export interface SellerInfoCardSeller {
  id: string;
  nickname: string;
  /** Optional logo URL; when absent, show initials in a circle. */
  logo_url?: string | null;
  badge?: string | null;
  sales_count?: number | null;
  followers_count?: number | null;
  product_count?: number | null;
  /** e.g. "Buena atención" */
  attention_rating?: string | null;
  /** e.g. "Entrega a tiempo" */
  delivery_rating?: string | null;
}

export interface SellerInfoCardProps {
  seller: SellerInfoCardSeller;
  /** Link for "Ir a la página del vendedor". When omitted, uses #vendedor. */
  sellerPageHref?: string;
}

function initials(nickname: string): string {
  const parts = nickname.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] ?? '').toUpperCase() + (parts[1][0] ?? '').toUpperCase();
  }
  return nickname.slice(0, 2).toUpperCase();
}

/**
 * "Info del vendedor" card: logo, name, Seguir, stats, MercadoLíder badge,
 * reputation bar, KPIs (Ventas, Buena atención, Entrega a tiempo), CTA.
 */
export function SellerInfoCard({
  seller,
  sellerPageHref = '#vendedor',
}: SellerInfoCardProps) {
  const badge = seller.badge ?? 'MercadoLíder';
  const salesCount = seller.sales_count ?? 0;
  const followersCount = seller.followers_count ?? 0;
  const productCount = seller.product_count ?? 0;

  return (
    <section className="bg-white rounded-lg border border-gray-200 p-4">
      {/* Header: logo, name, Seguir */}
      <div className="flex items-start gap-3 mb-4">
        {seller.logo_url != null && seller.logo_url !== '' ? (
          <img
            src={seller.logo_url}
            alt=""
            className="w-12 h-12 rounded-full object-cover shrink-0"
          />
        ) : (
          <div
            className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-semibold shrink-0"
            aria-hidden
          >
            {initials(seller.nickname)}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 truncate">{seller.nickname}</p>
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
            {followersCount > 0 && (
              <span>+{followersCount.toLocaleString('es-AR')} Seguidores</span>
            )}
            {productCount > 0 && (
              <span>+{productCount.toLocaleString('es-AR')} Productos</span>
            )}
          </div>
        </div>
        <button
          type="button"
          className="shrink-0 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          Seguir
        </button>
      </div>

      {/* MercadoLíder badge */}
      <div className="flex items-center gap-2 mb-3">
        <svg
          className="w-5 h-5 text-meli-green shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span className="text-sm font-semibold text-meli-green">{badge}</span>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        ¡Uno de los mejores del sitio!
      </p>

      {/* Reputation bar: 5 segments (placeholder colors) */}
      <div className="flex gap-0.5 mb-4" aria-hidden>
        <div className="h-2 flex-1 rounded-l bg-red-200" />
        <div className="h-2 flex-1 bg-red-200" />
        <div className="h-2 flex-1 bg-yellow-200" />
        <div className="h-2 flex-1 bg-green-200" />
        <div className="h-2 flex-1 rounded-r bg-green-500" />
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
        <div>
          <p className="text-sm font-semibold text-gray-900">
            +{salesCount.toLocaleString('es-AR')}
          </p>
          <p className="text-xs text-gray-500">Ventas</p>
        </div>
        <div className="flex flex-col items-center">
          <svg
            className="w-5 h-5 text-gray-700 mb-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <p className="text-xs text-gray-500">
            {seller.attention_rating ?? 'Buena atención'}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <svg
            className="w-5 h-5 text-gray-700 mb-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-xs text-gray-500">
            {seller.delivery_rating ?? 'Entrega a tiempo'}
          </p>
        </div>
      </div>

      {/* CTA */}
      <a
        href={sellerPageHref}
        className="block w-full text-center rounded-md py-3 text-sm font-semibold text-meli-blue bg-blue-50 hover:bg-blue-100 transition-colors border border-meli-blue"
      >
        Ir a la página del vendedor
      </a>
    </section>
  );
}
