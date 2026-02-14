import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { Layout } from '../lib/Layout';
import { renderWithRouter } from './test-utils';

describe('Layout', () => {
  it('renders children', () => {
    renderWithRouter(
      <Layout>
        <main>Page content</main>
      </Layout>
    );
    expect(screen.getByText('Page content')).toBeTruthy();
  });

  it('renders header (logo link)', () => {
    renderWithRouter(<Layout><span>Content</span></Layout>);
    expect(screen.getByRole('link', { name: /Mercado Libre - Ir al inicio/i })).toBeTruthy();
  });

  it('renders footer', () => {
    renderWithRouter(<Layout><span>Content</span></Layout>);
    expect(screen.getByRole('contentinfo')).toBeTruthy();
  });
});
