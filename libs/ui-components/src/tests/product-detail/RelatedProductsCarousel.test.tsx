import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { RelatedProductsCarousel } from '../../lib/product-detail/RelatedProductsCarousel';
import { renderWithRouter } from '../test-utils';

describe('RelatedProductsCarousel', () => {
  it('returns null when products is empty', () => {
    const { container } = renderWithRouter(<RelatedProductsCarousel products={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders section title and product when products provided', () => {
    renderWithRouter(
      <RelatedProductsCarousel
        products={[
          {
            id: 'MLA1',
            title: 'Related Product',
            price: 50000,
          },
        ]}
      />
    );
    expect(screen.getByText('Productos relacionados')).toBeTruthy();
    expect(screen.getByText('Related Product')).toBeTruthy();
  });

  it('shows Ad label when showAd is true', () => {
    renderWithRouter(
      <RelatedProductsCarousel
        products={[{ id: 'MLA1', title: 'P', price: 100 }]}
        showAd={true}
      />
    );
    expect(screen.getByText('Ad')).toBeTruthy();
  });
});
