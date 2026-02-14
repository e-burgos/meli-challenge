import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

/**
 * Section card for home sections (Envío gratis, Ingresá a tu cuenta, etc.). Meli design-spec §4.7.
 */
export interface SectionCardProps {
  /** Card title (e.g. "Envío gratis"). */
  title: string;
  /** Optional icon (SVG or emoji). */
  icon?: ReactNode;
  /** Optional description text. */
  description?: string;
  /** Optional link. */
  href?: string;
  /** Optional class for container. */
  className?: string;
}

export function SectionCard({
  title,
  icon,
  description,
  href,
  className = '',
}: SectionCardProps) {
  const content = (
    <div className={`bg-white rounded border border-gray-200 p-4 hover:shadow-sm transition-all hover:border-gray-300 ${className}`.trim()}>
      {icon != null ? (
        <div className="mb-2 flex justify-center">
          <div className="text-3xl">{icon}</div>
        </div>
      ) : null}
      <h3 className="text-sm font-medium text-gray-900 text-center">
        {title}
      </h3>
      {description != null ? (
        <p className="text-xs text-gray-600 text-center mt-1">{description}</p>
      ) : null}
    </div>
  );

  if (href != null && href !== '') {
    return (
      <Link to={href} className="block">
        {content}
      </Link>
    );
  }
  return content;
}
