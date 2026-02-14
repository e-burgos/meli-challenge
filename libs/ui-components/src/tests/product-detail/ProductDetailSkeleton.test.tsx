import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { ProductDetailSkeleton } from '../../lib/product-detail/ProductDetailSkeleton';
import { render } from '@testing-library/react';

describe('ProductDetailSkeleton', () => {
  it('renders main element', () => {
    render(<ProductDetailSkeleton />);
    expect(screen.getByRole('main')).toBeTruthy();
  });

  it('renders skeleton placeholders (animate-pulse)', () => {
    render(<ProductDetailSkeleton />);
    const placeholders = document.querySelectorAll('.animate-pulse');
    expect(placeholders.length).toBeGreaterThan(0);
  });
});
