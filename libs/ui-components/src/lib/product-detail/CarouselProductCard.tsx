import { Link } from 'react-router-dom';

export interface CarouselProductCardItem {
  id: string;
  title: string;
  price: number;
  thumbnail?: string | null;
  original_price?: number | null;
  installments?: { quantity: number; amount: number } | null;
  free_shipping?: boolean | null;
}

export interface CarouselProductCardProps {
  item: CarouselProductCardItem;
}

function formatPrice(value: number): string {
  return value.toLocaleString('es-AR');
}

function discountPercent(original: number, current: number): number {
  if (original <= 0 || current >= original) return 0;
  return Math.round(((original - current) / original) * 100);
}

/**
 * Compact product card for horizontal carousels (related products, seller products).
 * Shows image, title, original/current price, discount %, installments, free shipping.
 */
export function CarouselProductCard({ item }: CarouselProductCardProps) {
  const discount =
    item.original_price != null &&
      item.original_price > 0 &&
      item.price < item.original_price
      ? discountPercent(item.original_price, item.price)
      : 0;
  const installmentsText =
    item.installments != null
      ? item.installments.quantity === 1
        ? `$ ${formatPrice(item.installments.amount)}`
        : `${item.installments.quantity} cuotas de $ ${formatPrice(item.installments.amount)}`
      : null;

  const content = (
    <>
      <div className="aspect-square bg-white rounded-t-sm overflow-hidden shrink-0 border-b border-gray-100">
        {item.thumbnail != null && item.thumbnail !== '' ? (
          <img
            src={item.thumbnail}
            alt=""
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm bg-gray-50">
            Sin imagen
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col gap-1">
        <h3 className="text-sm text-gray-800 line-clamp-3 leading-snug">
          {item.title}
        </h3>
        {item.original_price != null && item.original_price > item.price && (
          <p className="text-xs text-gray-500 line-through">
            $ {formatPrice(item.original_price)}
          </p>
        )}
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-lg font-normal text-gray-900">
            $ {formatPrice(item.price)}
          </p>
          {discount > 0 && (
            <span className="text-xs font-medium text-meli-green">
              {discount}% OFF
            </span>
          )}
        </div>
        {installmentsText != null && (
          <p className="text-xs text-meli-green">{installmentsText}</p>
        )}
        {(item.free_shipping === true || item.free_shipping == null) && (
          <p className="text-xs text-meli-green">
            Envío gratis <span className="text-gray-500">por ser tu primera compra</span>
          </p>
        )}
      </div>
    </>
  );

  return (
    <Link
      to={`/product/${item.id}`}
      className="flex flex-col w-[200px] sm:w-[235px] h-full shrink-0 border border-gray-200 rounded-sm overflow-hidden bg-white hover:shadow-md transition-shadow"
    >
      {content}
    </Link>
  );
}
