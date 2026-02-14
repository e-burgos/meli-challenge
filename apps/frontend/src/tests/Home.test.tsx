import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { Home } from '../pages/Home';
import { renderWithProviders } from './test-utils';
import { useProducts } from '../queries/useProducts';
import type { ProductSummary } from '../api/types';

vi.mock('../queries/useProducts', () => ({
  useProducts: vi.fn(),
}));

const useProductsMock = vi.mocked(useProducts);

const mockProducts: ProductSummary[] = [
  {
    id: 'MLA2009168328',
    title: 'iPhone 13 128 GB Medianoche',
    price: 899999,
    thumbnail: 'https://example.com/thumb.jpg',
    installments: { quantity: 12, amount: 74999.92 },
  },
  {
    id: 'MLA3012345678',
    title: 'Samsung Galaxy S24 256 GB Negro',
    price: 1249999,
  },
];

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state with section cards and skeleton grid', () => {
    useProductsMock.mockReturnValue({
      data: undefined,
      isPending: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
    } as ReturnType<typeof useProductsMock>);

    renderWithProviders(<Home />);

    expect(screen.getByText('Envío gratis')).toBeTruthy();
    expect(screen.getByText('Medios de pago')).toBeTruthy();
    expect(screen.getByRole('main')).toBeTruthy();
  });

  it('shows error state with message and retry action', () => {
    useProductsMock.mockReturnValue({
      data: undefined,
      isPending: false,
      isError: true,
      error: new Error('Network error'),
      refetch: vi.fn(),
    } as ReturnType<typeof useProductsMock>);

    renderWithProviders(<Home />);

    expect(screen.getByRole('alert')).toBeTruthy();
    expect(screen.getByText('No pudimos cargar los productos')).toBeTruthy();
    expect(screen.getByText(/Ocurrió un error al obtener el listado/)).toBeTruthy();
    expect(screen.getByText('Network error')).toBeTruthy();
    expect(screen.getByRole('button', { name: /Reintentar/i })).toBeTruthy();
    expect(screen.getByRole('link', { name: /Volver al inicio/i })).toBeTruthy();
  });

  it('renders product list with mock data and content assertions', () => {
    useProductsMock.mockReturnValue({
      data: mockProducts,
      isPending: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    } as ReturnType<typeof useProductsMock>);

    renderWithProviders(<Home />);

    expect(screen.getAllByText('iPhone 13 128 GB Medianoche').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Samsung Galaxy S24 256 GB Negro').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('main')).toBeTruthy();
  });

  it('shows empty state when products array is empty', () => {
    useProductsMock.mockReturnValue({
      data: [],
      isPending: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    } as ReturnType<typeof useProductsMock>);

    renderWithProviders(<Home />);

    expect(screen.getByText('No hay productos')).toBeTruthy();
    expect(screen.getByText(/El catálogo está vacío por el momento/)).toBeTruthy();
  });
});
