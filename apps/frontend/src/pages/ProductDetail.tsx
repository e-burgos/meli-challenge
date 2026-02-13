import { useParams, Link } from 'react-router-dom';
import { useProductById } from '../queries/useProductById';

export function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const { data: product, isPending, isError, error } = useProductById(productId);

  if (isPending) {
    return (
      <main className="p-6">
        <p className="text-gray-600">Cargando detalle…</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="p-6">
        <p className="text-red-600">
          Error: {error instanceof Error ? error.message : 'Error desconocido'}
        </p>
        <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
          Volver al inicio
        </Link>
      </main>
    );
  }

  if (product == null) {
    return (
      <main className="p-6">
        <p className="text-gray-600">Producto no encontrado.</p>
        <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
          Volver al inicio
        </Link>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Volver al inicio
      </Link>
      <article>
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p className="text-xl mt-2">$ {product.price.toLocaleString('es-AR')}</p>
        {product.seller != null && (
          <p className="text-gray-600 mt-2">Vendido por {product.seller.nickname}</p>
        )}
        {product.description != null && (
          <p className="mt-4 text-gray-700">{product.description}</p>
        )}
      </article>
    </main>
  );
}
