import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { ProductImageGallery } from '../../lib/product-detail/ProductImageGallery';
import { render } from '@testing-library/react';

describe('ProductImageGallery', () => {
  it('renders "Sin imagen" when images array is empty', () => {
    render(<ProductImageGallery images={[]} />);
    expect(screen.getByText('Sin imagen')).toBeTruthy();
  });

  it('renders main image when images provided', () => {
    render(
      <ProductImageGallery
        images={['https://example.com/img1.jpg', 'https://example.com/img2.jpg']}
      />
    );
    const img = document.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toBe('https://example.com/img1.jpg');
  });
});
