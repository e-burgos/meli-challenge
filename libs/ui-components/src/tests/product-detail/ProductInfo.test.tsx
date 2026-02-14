import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { ProductInfo } from '../../lib/product-detail/ProductInfo';
import { render } from '@testing-library/react';

describe('ProductInfo', () => {
  it('renders title and price', () => {
    render(
      <ProductInfo title="iPhone 13 128 GB" price={899999} />
    );
    expect(screen.getByText('iPhone 13 128 GB')).toBeTruthy();
    expect(screen.getByText(/899\.999/)).toBeTruthy();
  });

  it('renders condition and sold_quantity when provided', () => {
    render(
      <ProductInfo
        title="Product"
        price={100}
        condition="Nuevo"
        sold_quantity={500}
      />
    );
    expect(screen.getByText(/Nuevo/)).toBeTruthy();
    expect(screen.getByText(/\+500 vendidos/)).toBeTruthy();
  });

  it('renders add to favorites button', () => {
    render(<ProductInfo title="P" price={100} />);
    expect(screen.getByRole('button', { name: /Agregar a favoritos/i })).toBeTruthy();
  });
});
