import { useProducts } from '../queries/useProducts';
import { Card } from '@meli-challenge/ui-components';

export function Home() {
  const { data: products, isPending, isError, error } = useProducts();

  if (isPending) {
    return (
      <main className="p-6">
        <p className="text-gray-600">Cargando productos…</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="p-6">
        <p className="text-red-600">
          Error al cargar: {error instanceof Error ? error.message : 'Error desconocido'}
        </p>
      </main>
    );
  }

  if (products == null || products.length === 0) {
    return (
      <main className="p-6">
        <p className="text-gray-600">No hay productos.</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <Card
            key={product.id}
            title={product.title}
            price={product.price}
            thumbnail={product.thumbnail}
            productId={product.id}
          />
        ))}
      </div>
    </main>
  );
}
