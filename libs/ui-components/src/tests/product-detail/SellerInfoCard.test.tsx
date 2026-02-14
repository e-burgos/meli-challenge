import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { SellerInfoCard } from '../../lib/product-detail/SellerInfoCard';
import { render } from '@testing-library/react';

describe('SellerInfoCard', () => {
  it('renders seller nickname', () => {
    render(
      <SellerInfoCard
        seller={{
          id: 'SELLER1',
          nickname: 'Tienda Oficial',
        }}
      />
    );
    expect(screen.getByText('Tienda Oficial')).toBeTruthy();
  });

  it('renders link to seller page', () => {
    render(
      <SellerInfoCard
        seller={{ id: 'S1', nickname: 'Vendedor' }}
        sellerPageHref="/seller/S1"
      />
    );
    const link = screen.getByRole('link', { name: /Ir a la página del vendedor/i });
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/seller/S1');
  });

  it('shows initials when no logo_url', () => {
    render(
      <SellerInfoCard seller={{ id: 'S2', nickname: 'Juan Perez' }} />
    );
    expect(screen.getByText('JP')).toBeTruthy();
  });
});
