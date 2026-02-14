import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { PurchaseInfo } from '../../lib/product-detail/PurchaseInfo';
import { render } from '@testing-library/react';

describe('PurchaseInfo', () => {
  it('renders seller nickname', () => {
    render(
      <PurchaseInfo
        seller={{ id: 'S1', nickname: 'Tienda Oficial' }}
      />
    );
    expect(screen.getByText('Tienda Oficial')).toBeTruthy();
  });

  it('renders delivery text', () => {
    render(
      <PurchaseInfo
        seller={{ id: 'S1', nickname: 'Vendedor' }}
        shipping={{ free_shipping: true, label: 'Llega gratis' }}
      />
    );
    expect(screen.getByText(/Llega gratis/)).toBeTruthy();
  });

  it('renders link to seller', () => {
    render(
      <PurchaseInfo
        seller={{ id: 'S1', nickname: 'Vendedor' }}
      />
    );
    const link = screen.getByRole('link', { name: 'Vendedor' });
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('#vendedor');
  });
});
