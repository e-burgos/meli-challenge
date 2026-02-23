import { useMemo } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useProductById } from '../queries/useProductById';
import { useProducts, useSellerProducts } from '../queries/useProducts';
import type { ProductSummary } from '../api/types';
import {
  Button,
  ProductDetailPageHeader,
  ProductDetailSkeleton,
  ProductImageGallery,
  ProductInfo,
  PurchaseInfo,
  RelatedProductsCarousel,
  SellerProductsCarousel,
  SellerInfoCard,
  ProductCharacteristics,
  ProductReviews,
  OtherPurchaseOptions,
} from '@meli-challenge/ui-components';
import type { CarouselProductCardItem } from '@meli-challenge/ui-components';

function summaryToCarouselItem(p: ProductSummary): CarouselProductCardItem {
  return {
    id: p.id,
    title: p.title,
    price: p.price,
    thumbnail: p.thumbnail ?? null,
    original_price: p.original_price ?? null,
    installments: p.installments ?? null,
    free_shipping: p.free_shipping ?? null,
  };
}

function shuffleSlice<T>(arr: T[], excludeId: string, max: number): T[] {
  const filtered = arr.filter((x) => (x as { id: string }).id !== excludeId);
  const copy = [...filtered];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, max);
}

export function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();
  const { data: product, isPending, isError, error, refetch } = useProductById(productId);
  const { data: allProducts } = useProducts();
  const { data: sellerProducts } = useSellerProducts(product?.seller?.id);

  const currentProductId = product?.id ?? '';
  const currentProductAttributes = product?.attributes ?? [];
  const relatedProducts: CarouselProductCardItem[] = useMemo(() => {
    if (currentProductId === '') return [];
    const list = allProducts ?? [];
    return shuffleSlice(list, currentProductId, 8).map(summaryToCarouselItem);
  }, [allProducts, currentProductId]);

  const sellerProductsList: CarouselProductCardItem[] = useMemo(() => {
    if (currentProductId === '') return [];
    const list = sellerProducts ?? [];
    return list
      .filter((p) => p.id !== currentProductId)
      .slice(0, 8)
      .map(summaryToCarouselItem);
  }, [sellerProducts, currentProductId]);

  const characteristicsHighlights = useMemo(() => {
    const h: {
      screen_size?: string;
      internal_memory?: string;
      main_camera?: string;
    } = {};
    for (const a of currentProductAttributes) {
      if (a.name.toLowerCase().includes('tamaño') && a.name.toLowerCase().includes('pantalla')) {
        h.screen_size = a.value;
      } else if (a.name.toLowerCase().includes('memoria interna')) {
        h.internal_memory = a.value;
      } else if (a.name.toLowerCase().includes('cámara') && a.name.toLowerCase().includes('trasera')) {
        h.main_camera = a.value;
      }
    }
    return Object.keys(h).length > 0 ? h : undefined;
  }, [currentProductAttributes]);

  const reviewsDistribution = useMemo(() => {
    const count = product?.ratings?.count ?? 0;
    if (count <= 0) return undefined;
    const v5 = Math.floor(count * 0.7);
    const v4 = Math.floor(count * 0.2);
    const v3 = Math.floor(count * 0.06);
    const v2 = Math.floor(count * 0.03);
    const v1 = Math.max(0, count - v5 - v4 - v3 - v2);
    return { 5: v5, 4: v4, 3: v3, 2: v2, 1: v1 };
  }, [product?.ratings?.count]);

  const is404 =
    isError &&
    error != null &&
    typeof error === 'object' &&
    'response' in error &&
    (error as { response?: { status?: number } }).response?.status === 404;

  if (productId == null || productId.trim() === '') {
    return (
      <main className="flex-1 bg-page-bg">
        <div className="max-w-7xl mx-auto px-4 xl:px-0 py-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center max-w-md mx-auto">
            <p className="text-gray-700 font-medium">ID de producto no válido.</p>
            <p className="text-sm text-gray-500 mt-2">
              Revisá la dirección o volvé al inicio para seguir navegando.
            </p>
            <Link to="/" className="inline-block mt-6">
              <Button variant="primary">Volver al inicio</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (isPending) {
    return <ProductDetailSkeleton />;
  }

  if (isError || product === null) {
    const notFound = is404 || product === null;
    const errorMessage =
      error != null && error instanceof Error ? error.message : 'Error desconocido';
    return (
      <main className="flex-1 bg-page-bg">
        <div className="max-w-7xl mx-auto px-4 xl:px-0 py-6">
          <div
            className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center max-w-md mx-auto"
            role="alert"
            aria-live="polite"
          >
            {notFound ? (
              <>
                <h1 className="text-xl font-semibold text-gray-800">
                  Producto no encontrado
                </h1>
                <p className="text-gray-600 mt-2">
                  No encontramos el producto que buscás. Puede que el enlace sea incorrecto o que
                  ya no esté disponible.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-xl font-semibold text-gray-800">
                  No pudimos cargar el producto
                </h1>
                <p className="text-gray-600 mt-2">
                  Ocurrió un error al obtener la información. Podés intentar de nuevo o volver al
                  inicio.
                </p>
                <p className="text-sm text-gray-500 mt-3 font-mono truncate" title={errorMessage}>
                  {errorMessage}
                </p>
              </>
            )}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              {!notFound && (
                <Button variant="primary" onClick={() => refetch()}>
                  Reintentar
                </Button>
              )}
              <Link to="/">
                <Button variant={notFound ? 'primary' : 'outline'}>
                  Volver al inicio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const images = product.images != null && product.images.length > 0 ? product.images : [];
  const titleShort =
    product.title.length > 50 ? `${product.title.slice(0, 50)}…` : product.title;
  const breadcrumbItems = [
    { label: 'Volver', to: '/' },
    { label: 'Producto', to: '#' },
    { label: titleShort, to: '#' },
  ];

  const characteristicRatings = [
    { name: 'Calidad de la cámara', value: product.ratings?.average ?? 5 },
    { name: 'Relación precio-calidad', value: product.ratings?.average ?? 4.5 },
    { name: 'Duración de la batería', value: 4 },
    { name: 'Durabilidad', value: product.ratings?.average ?? 4.5 },
  ];
  const featuredSummary =
    product.description != null && product.description.length > 80
      ? `${product.description.slice(0, 120)}…`
      : product.description ?? undefined;
  const mockReviews = [
    {
      rating: product.ratings?.average ?? 5,
      text: 'Muy buen producto, tal como se describe.',
      date: '26 may. 2025',
      helpfulCount: 6,
    },
  ];

  return (
    <main className="flex-1 bg-page-bg">
      <div className="max-w-7xl mx-auto px-4 xl:px-0 py-6">
        {/* Page header: "También puede interesarte", breadcrumbs (left), Vender uno igual | Compartir (right) */}
        <ProductDetailPageHeader breadcrumbItems={breadcrumbItems} suggestedTerms={product.suggested_terms ?? []} />

        {/* White container: gallery | product info | purchase info */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 lg:p-6">
          <div className="grid grid-cols-1 xl:grid-cols-[auto_340px_310px] gap-6 xl:gap-5 items-start">
            <ProductImageGallery images={images} zoomPortalTarget={document.body} />

            <ProductInfo
              title={product.title}
              condition={product.condition}
              sold_quantity={product.sold_quantity}
              ratings={product.ratings ?? undefined}
              price={product.price}
              original_price={product.original_price ?? undefined}
              price_without_taxes={product.price_without_taxes ?? undefined}
              installments={product.installments ?? undefined}
              variants={product.variants ?? undefined}
              highlights={product.highlights ?? undefined}
              other_offers_count={product.other_offers_count ?? undefined}
              other_offers_min_price={product.other_offers_min_price ?? undefined}
              characteristicsHref={`${location.pathname}#caracteristicas`}
            />

            <PurchaseInfo
              shipping={product.shipping ?? undefined}
              stock={product.stock ?? undefined}
              fulfillment_type={product.fulfillment_type ?? undefined}
              seller={product.seller}
              return_policy={product.return_policy ?? undefined}
              warranty={product.warranty ?? undefined}
            />
          </div>

          {/* Two-column: left = carousels + characteristics + reviews, right = seller info + other options (ref. Imagen 6) */}
          <div className="mt-8 grid grid-cols-1 xl:grid-cols-[1fr_310px] gap-6 xl:gap-8">
            <div className="space-y-6 min-w-0">
              {product.description != null && product.description !== '' && (
                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Descripción del producto
                  </h2>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap mt-2">
                    {product.description}
                  </p>
                </div>
              )}
              <div className="border-t border-gray-200" />
              <RelatedProductsCarousel products={relatedProducts} showAd />
              <div className="border-t border-gray-200" />
              <SellerProductsCarousel
                products={sellerProductsList}
                sellerPageHref={`#vendedor-${product.seller.id}`}
              />
              {(currentProductAttributes.length > 0 || characteristicsHighlights != null) && (
                <>
                  <div className="border-t border-gray-200" />
                  <ProductCharacteristics
                    attributes={currentProductAttributes.map((a) => ({
                      name: a.name,
                      value: a.value,
                      category: a.category ?? undefined,
                    }))}
                    highlights={characteristicsHighlights}
                  />
                </>
              )}
              <div className="border-t border-gray-200" />
              <ProductReviews
                averageRating={product.ratings?.average ?? 0}
                reviewCount={product.ratings?.count ?? 0}
                distribution={reviewsDistribution}
                characteristicRatings={characteristicRatings}
                featuredSummary={featuredSummary}
                reviews={mockReviews}
              />
            </div>
            <div className="space-y-6 xl:sticky xl:top-6 xl:self-start">
              <SellerInfoCard
                seller={{
                  id: product.seller.id,
                  nickname: product.seller.nickname,
                  badge: product.seller.badge ?? undefined,
                  sales_count: product.seller.sales_count ?? undefined,
                  followers_count: product.seller.followers_count ?? undefined,
                  product_count: product.seller.product_count ?? undefined,
                  attention_rating: product.seller.attention_rating ?? undefined,
                  delivery_rating: product.seller.delivery_rating ?? undefined,
                }}
                sellerPageHref={`#vendedor-${product.seller.id}`}
              />
              {product.other_offers_count != null &&
                product.other_offers_count > 0 &&
                product.other_offers_min_price != null && (
                  <OtherPurchaseOptions
                    count={product.other_offers_count}
                    minPrice={product.other_offers_min_price}
                    href="#ofertas"
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
