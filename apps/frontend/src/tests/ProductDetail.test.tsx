import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Routes, Route } from 'react-router-dom';
import { screen } from '@testing-library/react';
import { ProductDetail } from '../pages/ProductDetail';
import { renderWithProviders } from './test-utils';
import { useProductById } from '../queries/useProductById';
import { useProducts, useSellerProducts } from '../queries/useProducts';
import type { ProductDetail as ProductDetailType } from '../api/types';

vi.mock('../queries/useProductById', () => ({
  useProductById: vi.fn(),
}));
vi.mock('../queries/useProducts', () => ({
  useProducts: vi.fn(),
  useSellerProducts: vi.fn(),
}));

const useProductByIdMock = vi.mocked(useProductById);
const useProductsMock = vi.mocked(useProducts);
const useSellerProductsMock = vi.mocked(useSellerProducts);

const mockProduct: ProductDetailType = {
  id: 'MLA2009168328',
  title: 'iPhone 13 128 GB Medianoche',
  description: 'Pantalla Super Retina XDR de 6.1 pulgadas.',
  price: 899999,
  images: ['https://example.com/img1.jpg'],
  condition: 'Nuevo',
  sold_quantity: 520,
  seller: {
    id: 'SELLER001',
    nickname: 'Tienda Oficial',
  },
};

function renderProductDetailRoute(initialEntries: string[] = ['/product/MLA2009168328']): void {
  renderWithProviders(
    <Routes>
      <Route path="/product/:productId" element={<ProductDetail />} />
    </Routes>,
    { initialEntries }
  );
}

describe('ProductDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useProductsMock.mockReturnValue({
      data: [],
      isPending: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    } as ReturnType<typeof useProductsMock>);
    useSellerProductsMock.mockReturnValue({
      data: [],
      isPending: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    } as ReturnType<typeof useSellerProductsMock>);
  });

  it('shows loading state (skeleton)', () => {
    useProductByIdMock.mockReturnValue({
      data: undefined,
      isPending: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
    } as ReturnType<typeof useProductByIdMock>);

    renderProductDetailRoute();

    expect(screen.getByRole('main')).toBeTruthy();
    // ProductDetailSkeleton is shown when isPending; no product title yet
    expect(screen.queryByText('iPhone 13 128 GB Medianoche')).toBeNull();
  });

  it('shows error state when query fails', () => {
    useProductByIdMock.mockReturnValue({
      data: undefined,
      isPending: false,
      isError: true,
      error: new Error('Network error'),
      refetch: vi.fn(),
    } as ReturnType<typeof useProductByIdMock>);

    renderProductDetailRoute();

    expect(screen.getByRole('alert')).toBeTruthy();
    expect(screen.getByText('No pudimos cargar el producto')).toBeTruthy();
    expect(screen.getByText(/Ocurrió un error al obtener la información/)).toBeTruthy();
    expect(screen.getByText('Network error')).toBeTruthy();
    expect(screen.getByRole('link', { name: /Volver al inicio/i })).toBeTruthy();
  });

  it('shows 404 state when product is not found', () => {
    const err = new Error('Request failed with status code 404') as Error & { response?: { status?: number } };
    err.response = { status: 404 };
    useProductByIdMock.mockReturnValue({
      data: undefined,
      isPending: false,
      isError: true,
      error: err,
      refetch: vi.fn(),
    } as ReturnType<typeof useProductByIdMock>);

    renderProductDetailRoute();

    expect(screen.getByRole('alert')).toBeTruthy();
    expect(screen.getByText('Producto no encontrado')).toBeTruthy();
    expect(screen.getByText(/No encontramos el producto que buscás/)).toBeTruthy();
    expect(screen.getByRole('link', { name: /Volver al inicio/i })).toBeTruthy();
  });

  it('renders product detail with mock data and content assertions', () => {
    useProductByIdMock.mockReturnValue({
      data: mockProduct,
      isPending: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    } as ReturnType<typeof useProductByIdMock>);

    renderProductDetailRoute();

    expect(screen.getAllByText('iPhone 13 128 GB Medianoche').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Pantalla Super Retina XDR de 6.1 pulgadas.').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Tienda Oficial').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('main')).toBeTruthy();
  });

  it('shows invalid product id message when productId is missing', () => {
    useProductByIdMock.mockReturnValue({
      data: undefined,
      isPending: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    } as ReturnType<typeof useProductByIdMock>);

    renderWithProviders(
      <Routes>
        <Route path="/product" element={<ProductDetail />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
      </Routes>,
      { initialEntries: ['/product'] }
    );

    expect(screen.getByText(/ID de producto no válido/)).toBeTruthy();
  });
});
