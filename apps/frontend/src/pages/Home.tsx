import { useSearchParams, Link } from 'react-router-dom';
import { useProducts } from '../queries/useProducts';
import {
  Button,
  Card,
  PromoBanner,
  SectionCard,
  bannerPublicidadUrl,
} from '@meli-challenge/ui-components';

const SEARCH_PARAM = 'q';

function filterBySearchQuery<T extends { title: string }>(items: T[], query: string): T[] {
  const q = query.trim().toLowerCase();
  if (q === '') return items;
  return items.filter((item) => item.title.toLowerCase().includes(q));
}

/**
 * Home — listado de productos (T021–T023). Design: design-spec-meli §3.
 * Layout: max-w-7xl mx-auto px-4 py-6; grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4.
 * Search: reads ?q= from URL (Header submits) and filters list by product title (client-side).
 */
export function Home() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get(SEARCH_PARAM) ?? '';
  const { data: products, isPending, isError, error, refetch } = useProducts();
  const filteredProducts = products != null ? filterBySearchQuery(products, searchQuery) : [];


  if (isPending) {
    return (
      <main className="flex flex-col bg-page-bg">
        <div className="max-w-7xl w-full mx-auto px-4 py-6">
          <PromoBanner imageUrl={bannerPublicidadUrl} alt="Oferta" className="mb-6 rounded overflow-hidden" />

          {/* Section cards - like Meli home */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
            <SectionCard title="Envío gratis" icon="🚚" href="#" />
            <SectionCard title="Ingresá a tu cuenta" icon="👤" href="#" />
            <SectionCard title="Medios de pago" icon="💳" href="#" />
            <SectionCard title="Menos de $20.000" icon="💰" href="#" />
            <SectionCard title="Más vendidos" icon="🛍️" href="#" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card
                key={`skeleton-${index}`}
                title=""
                price={0}
                isLoading={true}

              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    const errorMessage =
      error != null && error instanceof Error ? error.message : 'Error desconocido';
    return (
      <main className="flex-1 bg-page-bg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div
            className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center max-w-md mx-auto"
            role="alert"
            aria-live="polite"
          >
            <h1 className="text-xl font-semibold text-gray-800">
              No pudimos cargar los productos
            </h1>
            <p className="text-gray-600 mt-2">
              Ocurrió un error al obtener el listado. Podés intentar de nuevo o volver al inicio.
            </p>
            <p className="text-sm text-gray-500 mt-3 font-mono truncate" title={errorMessage}>
              {errorMessage}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="primary" onClick={() => refetch()}>
                Reintentar
              </Button>
              <Link to="/">
                <Button variant="outline">Volver al inicio</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (products == null) {
    return null;
  }

  if (products.length === 0) {
    return (
      <main className="flex-1 bg-page-bg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div
            className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center max-w-md mx-auto"
            role="status"
            aria-live="polite"
          >
            <h2 className="text-lg font-semibold text-gray-800">No hay productos</h2>
            <p className="text-gray-600 mt-2">
              El catálogo está vacío por el momento. Volvé más tarde.
            </p>
            <Link to="/" className="inline-block mt-6">
              <Button variant="primary">Volver al inicio</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col bg-page-bg">
      <div className="max-w-7xl mx-auto px-4 pt-4 pb-6">
        <PromoBanner imageUrl={bannerPublicidadUrl} alt="Oferta" className="mb-6 rounded overflow-hidden" />

        {/* Section cards - like Meli home */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
          <SectionCard title="Envío gratis" icon="🚚" href="#" />
          <SectionCard title="Ingresá a tu cuenta" icon="👤" href="#" />
          <SectionCard title="Medios de pago" icon="💳" href="#" />
          <SectionCard title="Menos de $20.000" icon="💰" href="#" />
          <SectionCard title="Más vendidos" icon="🛍️" href="#" />
        </div>
        {filteredProducts.length === 0 ? (
          <div
            className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center max-w-md mx-auto"
            role="status"
          >
            <p className="text-gray-700 font-medium">
              {searchQuery.trim() !== ''
                ? `No hay resultados para "${searchQuery.trim()}"`
                : 'No hay productos'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {searchQuery.trim() !== ''
                ? 'Probá con otros términos o revisá la ortografía.'
                : 'El catálogo está vacío por el momento.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                title={product.title}
                price={product.price}
                thumbnail={product.thumbnail ?? undefined}
                installments={product.installments ?? undefined}
                productId={product.id}
              />
            ))}
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                title={product.title}
                price={product.price}
                thumbnail={product.thumbnail ?? undefined}
                installments={product.installments ?? undefined}
                productId={product.id}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
