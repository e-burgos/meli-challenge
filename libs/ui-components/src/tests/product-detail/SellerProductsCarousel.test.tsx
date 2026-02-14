import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { SellerProductsCarousel } from '../../lib/product-detail/SellerProductsCarousel';
import { renderWithRouter } from '../test-utils';

describe('SellerProductsCarousel', () => {
  it('renders section title', () => {
    renderWithRouter(<SellerProductsCarousel products={[]} />);
    expect(screen.getByText('Productos del vendedor')).toBeTruthy();
  });

  it('renders product when products provided', () => {
    renderWithRouter(
      <SellerProductsCarousel
        products={[
          {
            id: 'MLA1',
            title: 'Seller Product',
            price: 75000,
          },
        ]}
      />
    );
    expect(screen.getByText('Seller Product')).toBeTruthy();
  });

  it('renders seller page link when products and sellerPageHref provided', () => {
    renderWithRouter(
      <SellerProductsCarousel
        products={[{ id: 'MLA1', title: 'P', price: 100 }]}
        sellerPageHref="/seller/S1"
      />
    );
    const link = screen.getByRole('link', { name: /Ir a la página del vendedor/i });
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/seller/S1');
  });
});
