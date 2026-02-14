import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { Header } from '../lib/Header';
import { renderWithRouter } from './test-utils';

describe('Header', () => {
  it('renders logo link to home', () => {
    renderWithRouter(<Header />);
    const logoLink = screen.getByRole('link', { name: /Mercado Libre - Ir al inicio/i });
    expect(logoLink).toBeTruthy();
    expect(logoLink.getAttribute('href')).toBe('/');
  });

  it('renders search input', () => {
    renderWithRouter(<Header />);
    const search = screen.getByRole('searchbox', { name: /Buscar productos/ });
    expect(search).toBeTruthy();
    expect(search.getAttribute('placeholder')).toContain('Buscar productos');
  });

  it('renders nav links', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('Categorías')).toBeTruthy();
    expect(screen.getByText('Ofertas')).toBeTruthy();
    expect(screen.getByText('Vender')).toBeTruthy();
  });
});
