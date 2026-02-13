import { Link } from 'react-router-dom';

export interface CardProps {
  title: string;
  price: number;
  thumbnail?: string | null;
  /** When set, the card wraps content in a Link to /product/:productId */
  productId?: string;
}

export function Card({ title, price, thumbnail, productId }: CardProps) {
  const content = (
    <>
      <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
        {thumbnail != null && thumbnail !== '' ? (
          <img
            src={thumbnail}
            alt=""
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            Sin imagen
          </div>
        )}
      </div>
      <div className="p-3">
        <h2 className="font-medium text-gray-900 line-clamp-2">{title}</h2>
        <p className="mt-1 text-lg font-semibold">$ {price.toLocaleString('es-AR')}</p>
      </div>
    </>
  );

  if (productId != null && productId !== '') {
    return (
      <Link
        to={`/product/${productId}`}
        className="block border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="block border border-gray-200 rounded-lg bg-white">
      {content}
    </div>
  );
}
