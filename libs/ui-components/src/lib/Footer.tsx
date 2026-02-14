/**
 * Footer Meli-style: links, legal, copyright. design-spec-meli §2.5.
 */
export interface FooterProps {
  className?: string;
}

const FOOTER_LINKS = [
  { label: 'Trabajá con nosotros', href: '#' },
  { label: 'Términos y condiciones', href: '#' },
  { label: 'Cómo cuidamos tu privacidad', href: '#' },
  { label: 'Ayuda', href: '#' },
  { label: 'Defensa del Consumidor', href: '#' },
] as const;

export function Footer({ className = '' }: FooterProps) {
  return (
    <footer
      className={`bg-white border-t border-gray-200 py-6 mt-auto ${className}`.trim()}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500 mb-4" aria-label="Footer">
          {FOOTER_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="hover:text-meli-blue transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
        <p className="text-xs text-gray-500">
          Copyright © 1999-2026 MercadoLibre S.R.L.
        </p>
      </div>
    </footer>
  );
}
