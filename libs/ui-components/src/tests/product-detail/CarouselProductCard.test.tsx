import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { CarouselProductCard } from '../../lib/product-detail/CarouselProductCard';
import { renderWithRouter } from '../test-utils';

describe('CarouselProductCard', () => {
  it('renders title and price', () => {
    renderWithRouter(
      <CarouselProductCard
        item={{
          id: 'MLA1',
          title: 'Product One',
          price: 99999,
        }}
      />
    );
    expect(screen.getByText('Product One')).toBeTruthy();
    expect(screen.getByText(/99\.999/)).toBeTruthy();
  });

  it('renders original price and discount when applicable', () => {
    renderWithRouter(
      <CarouselProductCard
        item={{
          id: 'MLA2',
          title: 'Product Two',
          price: 80000,
          original_price: 100000,
        }}
      />
    );
    expect(screen.getByText(/100\.000/)).toBeTruthy();
    expect(screen.getByText(/20% OFF/)).toBeTruthy();
  });

  it('shows "Sin imagen" when no thumbnail', () => {
    renderWithRouter(
      <CarouselProductCard
        item={{ id: 'MLA3', title: 'No thumb', price: 50000 }}
      />
    );
    expect(screen.getByText('Sin imagen')).toBeTruthy();
  });

  it('renders link to product', () => {
    renderWithRouter(
      <CarouselProductCard
        item={{ id: 'MLA4', title: 'Linked', price: 100 }}
      />
    );
    const link = screen.getByRole('link', { name: /Linked/ });
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/product/MLA4');
  });
});
