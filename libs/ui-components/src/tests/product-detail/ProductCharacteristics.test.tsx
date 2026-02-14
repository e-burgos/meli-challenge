import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { ProductCharacteristics } from '../../lib/product-detail/ProductCharacteristics';
import { render } from '@testing-library/react';

describe('ProductCharacteristics', () => {
  it('renders attributes', () => {
    render(
      <ProductCharacteristics
        attributes={[
          { name: 'Marca', value: 'Samsung', category: 'general' },
          { name: 'Modelo', value: 'Galaxy S24', category: 'general' },
        ]}
      />
    );
    expect(screen.getByText('Marca')).toBeTruthy();
    expect(screen.getByText('Samsung')).toBeTruthy();
    expect(screen.getByText('Modelo')).toBeTruthy();
    expect(screen.getByText('Galaxy S24')).toBeTruthy();
  });

  it('renders section title', () => {
    render(
      <ProductCharacteristics
        attributes={[{ name: 'A', value: 'B' }]}
      />
    );
    expect(screen.getByText('Características del producto')).toBeTruthy();
  });
});
