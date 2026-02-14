export interface ProductShipping {
  free_shipping?: boolean;
  label?: string;
  same_day_delivery?: boolean;
  pickup_available?: boolean;
  pickup_available_day?: string;
}

export interface Seller {
  id: string;
  nickname: string;
  badge?: string | null;
  sales_count?: number | null;
  invoice_type?: string | null;
}

export interface PurchaseInfoProps {
  shipping?: ProductShipping | null;
  stock?: number | null;
  fulfillment_type?: string | null;
  seller: Seller;
  return_policy?: string | null;
  warranty?: string | null;
}

/**
 * Purchase info block: delivery, stock, CTA buttons, seller, guarantees.
 * Meli-style per reference (Image 4).
 */
export function PurchaseInfo({
  shipping,
  stock,
  fulfillment_type,
  seller,
  return_policy,
  warranty,
}: PurchaseInfoProps) {
  const deliveryMainText =
    shipping?.label ??
    (shipping?.free_shipping === true ? 'Llega gratis' : 'Envío a todo el país');
  const pickupLabel =
    shipping?.pickup_available === true && shipping?.pickup_available_day != null
      ? `Retirá gratis a partir de ${shipping.pickup_available_day} en correos y otros puntos`
      : shipping?.pickup_available === true
        ? 'Retirá gratis en correos y otros puntos'
        : null;

  return (
    <div className="xl:border w-full border-gray-200 rounded-lg xl:p-4 xl:py-6 flex flex-col gap-4 shrink-0">
      {/* Delivery */}
      <div>
        <p className="text-base font-semibold text-meli-green">
          {deliveryMainText}
          <span className="font-normal text-gray-700"> por ser tu primera compra</span>
        </p>
        <a href="#envio" className="text-sm text-meli-blue hover:underline mt-0.5 inline-block">
          Más detalles y formas de entrega
        </a>
      </div>
      {pickupLabel != null && (
        <p className="text-sm font-semibold text-meli-green">
          {pickupLabel}
        </p>
      )}
      <p className="text-xs text-gray-500">
        Comprando dentro de las próximas <span className="font-medium text-gray-700">5 h 37 min</span>
      </p>
      <a href="#mapa" className="text-sm text-meli-blue hover:underline">
        Ver en el mapa
      </a>

      {/* Stock */}
      {stock != null && stock > 0 && stock <= 3 && (
        <p className="text-sm font-semibold text-gray-800">¡Última disponible!</p>
      )}
      {fulfillment_type != null && fulfillment_type !== '' && (
        <p className="text-sm text-gray-600">
          Almacenado y enviado por <span className="font-semibold text-meli-green">⚡ FULL</span>
        </p>
      )}

      {/* CTA buttons */}
      <div className="flex flex-col gap-2">
        <button
          type="button"
          className="w-full rounded-md px-4 py-3 text-base font-semibold text-white bg-meli-blue hover:opacity-95 transition-opacity"
        >
          Comprar ahora
        </button>
        <button
          type="button"
          className="w-full rounded-md px-4 py-3 text-base font-semibold text-meli-blue border-2 border-meli-blue hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Agregar al carrito
        </button>
      </div>

      {/* First purchase promo */}
      <div className="rounded-lg border border-gray-200 p-4 bg-gray-50">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-meli-green flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Tenés envío gratis por ser tu primera compra
            </p>
            <p className="text-xs text-gray-600 mt-0.5">
              ¡Aprovechalo agregando más productos Full a tu carrito!
            </p>
          </div>
        </div>
      </div>

      {/* Seller */}
      <div className="border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-600">
          Vendido por{' '}
          <a href="#vendedor" className="text-meli-blue hover:underline font-medium">
            {seller.nickname}
          </a>
        </p>
        {seller.badge != null && seller.badge !== '' && (
          <p className="text-sm text-gray-700 mt-0.5">
            <span className="font-medium">{seller.badge}</span>
            {seller.sales_count != null ? ` | +${seller.sales_count} ventas` : ''}
          </p>
        )}
        {seller.invoice_type != null && seller.invoice_type !== '' && (
          <p className="text-xs text-gray-500 mt-0.5">Hace Factura {seller.invoice_type}</p>
        )}
      </div>

      {/* Guarantees */}
      <div className="border-t border-gray-200 pt-4 space-y-3">
        {return_policy != null && return_policy !== '' && (
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <p className="text-sm text-gray-600">
              <a href="#devolucion" className="text-meli-blue hover:underline font-medium">Devolución gratis.</a>{' '}
              {return_policy}
            </p>
          </div>
        )}
        <div className="flex items-start gap-2">
          <svg className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <p className="text-sm text-gray-600">
            <a href="#protegida" className="text-meli-blue hover:underline font-medium">Compra Protegida.</a>{' '}
            Recibí el producto que esperabas o te devolvemos tu dinero.
          </p>
        </div>
        {warranty != null && warranty !== '' && (
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-gray-600">{warranty}</p>
          </div>
        )}
      </div>
    </div>
  );
}
