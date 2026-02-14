import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { SectionCard } from '../lib/SectionCard';
import { renderWithRouter } from './test-utils';

describe('SectionCard', () => {
  it('renders title', () => {
    renderWithRouter(<SectionCard title="Envío gratis" />);
    expect(screen.getByText('Envío gratis')).toBeTruthy();
  });

  it('renders icon when provided', () => {
    renderWithRouter(<SectionCard title="Test" icon="🚚" />);
    expect(screen.getByText('Test')).toBeTruthy();
    expect(screen.getByText('🚚')).toBeTruthy();
  });

  it('renders description when provided', () => {
    renderWithRouter(
      <SectionCard title="Card" description="Extra text" />
    );
    expect(screen.getByText('Extra text')).toBeTruthy();
  });

  it('renders link when href is provided', () => {
    renderWithRouter(<SectionCard title="Link card" href="/offers" />);
    const link = screen.getByRole('link', { name: /Link card/ });
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/offers');
  });
});
