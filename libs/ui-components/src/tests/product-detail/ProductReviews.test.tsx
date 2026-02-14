import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { ProductReviews } from '../../lib/product-detail/ProductReviews';
import { render } from '@testing-library/react';

describe('ProductReviews', () => {
  it('renders average rating and review count', () => {
    render(
      <ProductReviews averageRating={4.5} reviewCount={120} />
    );
    expect(screen.getByLabelText(/4\.5 de 5 estrellas/i)).toBeTruthy();
    expect(screen.getByText(/120/)).toBeTruthy();
  });

  it('renders section title', () => {
    render(<ProductReviews averageRating={5} reviewCount={0} />);
    expect(screen.getByText('Opiniones del producto')).toBeTruthy();
  });

  it('renders reviews when provided', () => {
    render(
      <ProductReviews
        averageRating={5}
        reviewCount={1}
        reviews={[
          {
            rating: 5,
            text: 'Excelente producto',
            date: '26 may. 2025',
            helpfulCount: 3,
          },
        ]}
      />
    );
    expect(screen.getByText('Excelente producto')).toBeTruthy();
  });
});
