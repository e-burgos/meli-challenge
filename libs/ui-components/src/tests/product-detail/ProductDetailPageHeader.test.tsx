import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { ProductDetailPageHeader } from '../../lib/product-detail/ProductDetailPageHeader';
import { renderWithRouter } from '../test-utils';

describe('ProductDetailPageHeader', () => {
  it('renders title and breadcrumbs', () => {
    renderWithRouter(
      <ProductDetailPageHeader
        breadcrumbItems={[
          { label: 'Volver', to: '/' },
          { label: 'Producto', to: '#' },
          { label: 'iPhone 13', to: '#' },
        ]}
      />
    );
    expect(screen.getByText('También puede interesarte:')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Volver' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Volver' }).getAttribute('href')).toBe('/');
    expect(screen.getByText('Producto')).toBeTruthy();
    expect(screen.getByText('iPhone 13')).toBeTruthy();
  });

  it('renders suggested terms when provided', () => {
    renderWithRouter(
      <ProductDetailPageHeader
        breadcrumbItems={[{ label: 'Home', to: '/' }]}
        suggestedTerms={['samsung a52', 'samsung a55']}
      />
    );
    expect(screen.getByText(/samsung a52 - samsung a55/)).toBeTruthy();
  });

  it('renders Compartir button', () => {
    renderWithRouter(
      <ProductDetailPageHeader breadcrumbItems={[{ label: 'A', to: '/' }]} />
    );
    expect(screen.getByRole('button', { name: /Compartir/i })).toBeTruthy();
  });
});
