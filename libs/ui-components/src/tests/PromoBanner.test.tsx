import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { PromoBanner } from '../lib/PromoBanner';
import { render } from '@testing-library/react';

describe('PromoBanner', () => {
  it('renders image when imageUrl is provided', () => {
    render(<PromoBanner imageUrl="https://example.com/banner.jpg" alt="Promo" />);
    const img = document.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toBe('https://example.com/banner.jpg');
    expect(img?.getAttribute('alt')).toBe('Promo');
  });

  it('renders placeholder when no imageUrl', () => {
    render(<PromoBanner />);
    expect(screen.getByText('Envíos más rápidos')).toBeTruthy();
  });

  it('renders children when provided', () => {
    render(
      <PromoBanner>
        <span>Custom overlay</span>
      </PromoBanner>
    );
    expect(screen.getByText('Custom overlay')).toBeTruthy();
  });

  it('renders link when href is provided', () => {
    render(<PromoBanner href="https://example.com" />);
    const link = document.querySelector('a[href="https://example.com"]');
    expect(link).toBeTruthy();
  });
});
