import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { Card } from '../lib/Card';
import { renderWithRouter } from './test-utils';

describe('Card', () => {
  it('renders title and price', () => {
    renderWithRouter(<Card title="iPhone 13" price={899999} />);
    expect(screen.getByText('iPhone 13')).toBeTruthy();
    expect(screen.getByText(/899\.999/)).toBeTruthy();
  });

  it('renders installments when provided', () => {
    renderWithRouter(
      <Card
        title="Product"
        price={100000}
        installments={{ quantity: 12, amount: 8333.33 }}
      />
    );
    expect(screen.getByText(/12 cuotas de \$/)).toBeTruthy();
  });

  it('shows "Sin imagen" when no thumbnail', () => {
    renderWithRouter(<Card title="No thumb" price={50000} />);
    expect(screen.getByText('Sin imagen')).toBeTruthy();
  });

  it('shows skeleton when isLoading', () => {
    renderWithRouter(
      <Card title="" price={0} isLoading={true} />
    );
    const main = document.querySelector('.animate-pulse');
    expect(main).toBeTruthy();
  });

  it('renders link to product when productId is set', () => {
    renderWithRouter(
      <Card title="Linked" price={100} productId="MLA123" />
    );
    const link = screen.getByRole('link', { name: /Linked/ });
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/product/MLA123');
  });
});
