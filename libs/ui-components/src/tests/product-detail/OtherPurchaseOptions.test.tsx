import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { OtherPurchaseOptions } from '../../lib/product-detail/OtherPurchaseOptions';
import { render } from '@testing-library/react';

describe('OtherPurchaseOptions', () => {
  it('renders title and link with count and min price', () => {
    render(
      <OtherPurchaseOptions count={5} minPrice={899999} />
    );
    expect(screen.getByText('Otras opciones de compra')).toBeTruthy();
    expect(screen.getByRole('link', { name: /Ver 5 opciones desde \$ 899\.999/i })).toBeTruthy();
  });

  it('uses custom href when provided', () => {
    render(
      <OtherPurchaseOptions count={3} minPrice={100000} href="#ofertas" />
    );
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('#ofertas');
  });
});
