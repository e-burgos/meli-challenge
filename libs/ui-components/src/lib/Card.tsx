import { Link } from 'react-router-dom';

export interface CardProps {
  title: string;
  price: number;
  thumbnail?: string | null;
  /** Optional installments (e.g. "6 cuotas de $ 98.350"). When omitted, installment line is not shown. */
  installments?: { quantity: number; amount: number } | null;
  /** When set, the card wraps content in a Link to /product/:productId */
  productId?: string;
  /** Show skeleton loading state */
  isLoading?: boolean;
}

function formatPrice(value: number): string {
  return value.toLocaleString('es-AR');
}

export function Card({
  title,
  price,
  thumbnail,
  installments,
  productId,
  isLoading = false,
}: CardProps) {
  // Skeleton loading state - same structure as real card
  if (isLoading) {
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white flex flex-col">
        <div className="aspect-square bg-gray-100 overflow-hidden flex items-center justify-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse" />
        </div>
        <div className="border-t border-gray-100 p-4">
          <div className="h-5 bg-gray-200 rounded animate-pulse w-full max-w-[90%]" />
          <div className="mt-2 h-5 bg-gray-200 rounded w-4/5 animate-pulse" />
          <div className="mt-3 h-8 bg-gray-200 rounded w-1/2 animate-pulse" />
          <div className="mt-2 h-4 bg-gray-200 rounded w-2/5 animate-pulse" />
          <div className="mt-1.5 h-4 bg-gray-200 rounded w-3/5 animate-pulse" />
        </div>
      </div>
    );
  }

  const installmentsText =
    installments != null
      ? installments.quantity === 1
        ? `$ ${formatPrice(installments.amount)}`
        : `${installments.quantity} cuotas de $ ${formatPrice(installments.amount)}`
      : null;

  const content = (
    <>
      <div className="aspect-square bg-white overflow-hidden flex items-center justify-center">
        {thumbnail != null && thumbnail !== '' ? (
          <img
            src={thumbnail}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm bg-gray-50">
            Sin imagen
          </div>
        )}
      </div>
      <div className="border-t border-gray-100 p-4 text-left flex flex-col">
        <h2 className="text-base text-gray-800 line-clamp-2 font-medium leading-snug">
          {title}
        </h2>
        <p className="mt-2 text-2xl font-normal text-gray-900">
          $ {formatPrice(price)}
        </p>
        {installmentsText != null && (
          <p className="mt-1 text-sm text-gray-600">{installmentsText}</p>
        )}
        <p className="mt-1.5 text-sm">
          <span className="font-semibold text-meli-green">Envío gratis</span>
          <span className="text-gray-500"> por ser tu primera compra</span>
        </p>
      </div>
    </>
  );

  const cardClassName =
    'rounded-lg overflow-hidden shadow-sm bg-white flex flex-col hover:shadow-md transition-shadow border border-gray-100';

  if (productId != null && productId !== '') {
    return <Link to={`/product/${productId}`} className={cardClassName}>{content}</Link>;
  }

  return <div className={cardClassName}>{content}</div>;
}
