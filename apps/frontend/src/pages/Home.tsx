import { useSearchParams, Link } from 'react-router-dom';
import { useProducts } from '../queries/useProducts';
import {
  Button,
  Card,
  HeroBannerCarousel,
  BenefitsCarousel,
  bannerElectronicaUrl,
  bannerEnvioGratisUrl,
  bannerNeumaticosUrl,
} from '@meli-challenge/ui-components';
import type {
  BannerSlide,
  QuickAccessCardData,
} from '@meli-challenge/ui-components';

const SEARCH_PARAM = 'q';

const BANNER_SLIDES: BannerSlide[] = [
  {
    imageUrl: bannerElectronicaUrl,
    title: 'Hasta 50% en electrónica',
    subtitle: 'Solo por hoy',
    badge: 'OFERTA DEL DÍA',
    href: '#',
  },
  {
    imageUrl: bannerEnvioGratisUrl,
    title: 'Envío gratis en miles de productos',
    subtitle: 'Comprando desde la app',
    badge: 'ENVÍO GRATIS',
    href: '#',
  },
  {
    imageUrl: bannerNeumaticosUrl,
    title: 'Neumáticos al mejor precio',
    subtitle: 'Con cuotas sin interés',
    badge: 'NUEVO',
    href: '#',
  },
];

// ─── Íconos SVG inline monocromáticos ────────────────────────────────────────
const TruckIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="1" y="3" width="15" height="13" rx="1" />
    <path d="M16 8h4l3 5v4h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);
const UserIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);
const CardIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20" />
    <path d="M6 15h4" />
  </svg>
);
const TagIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20.59 13.41L13.42 20.59a2 2 0 01-2.83 0L3 13V3h10l7.59 7.59a2 2 0 010 2.82z" />
    <circle cx="7" cy="7" r="1" fill="currentColor" />
  </svg>
);
const StarIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const ShieldIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const QUICK_ACCESS_CARDS: QuickAccessCardData[] = [
  {
    title: 'Envío gratis',
    description: 'Beneficio por ser tu primera compra',
    ctaLabel: 'Mostrar productos',
    ctaHref: '#',
    icon: <TruckIcon />,
  },
  {
    title: 'Ingresá a tu cuenta',
    description: 'Accedé a tus compras y favoritos',
    ctaLabel: 'Ingresar',
    ctaHref: '#',
    icon: <UserIcon />,
  },
  {
    title: 'Medios de pago',
    description: 'Tarjetas, efectivo y más',
    ctaLabel: 'Ver medios',
    ctaHref: '#',
    icon: <CardIcon />,
  },
  {
    title: 'Menos de $20.000',
    description: 'Productos al mejor precio',
    ctaLabel: 'Ver ofertas',
    ctaHref: '#',
    icon: <TagIcon />,
  },
  {
    title: 'Más vendidos',
    description: 'Los favoritos de la comunidad',
    ctaLabel: 'Ver productos',
    ctaHref: '#',
    icon: <StarIcon />,
  },
  {
    title: 'Compra protegida',
    description: 'Tu dinero siempre protegido',
    ctaLabel: 'Saber más',
    ctaHref: '#',
    icon: <ShieldIcon />,
  },
];

function filterBySearchQuery<T extends { title: string }>(
  items: T[],
  query: string,
): T[] {
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
  const filteredProducts =
    products != null ? filterBySearchQuery(products, searchQuery) : [];

  if (isPending) {
    return (
      <main className="flex flex-col bg-page-bg">
        <HeroBannerCarousel slides={BANNER_SLIDES} />
        <BenefitsCarousel cards={QUICK_ACCESS_CARDS} />
        <div className="max-w-7xl w-full mx-auto px-4 py-6">
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
      error != null && error instanceof Error
        ? error.message
        : 'Error desconocido';
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
              Ocurrió un error al obtener el listado. Podés intentar de nuevo o
              volver al inicio.
            </p>
            <p
              className="text-sm text-gray-500 mt-3 font-mono truncate"
              title={errorMessage}
            >
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
            <h2 className="text-lg font-semibold text-gray-800">
              No hay productos
            </h2>
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
      <HeroBannerCarousel slides={BANNER_SLIDES} />
      <BenefitsCarousel cards={QUICK_ACCESS_CARDS} />
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-6">
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
