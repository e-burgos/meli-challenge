import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { Footer } from '../lib/Footer';
import { render } from '@testing-library/react';

describe('Footer', () => {
  it('renders with contentinfo role', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeTruthy();
  });

  it('renders footer links', () => {
    render(<Footer />);
    expect(screen.getByText('Trabajá con nosotros')).toBeTruthy();
    expect(screen.getByText('Términos y condiciones')).toBeTruthy();
    expect(screen.getByText('Ayuda')).toBeTruthy();
  });

  it('renders copyright', () => {
    render(<Footer />);
    expect(screen.getByText(/Copyright © 1999-2026 MercadoLibre/)).toBeTruthy();
  });
});
