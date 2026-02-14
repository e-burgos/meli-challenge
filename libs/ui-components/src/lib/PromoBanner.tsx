import type { ReactNode } from 'react';

/**
 * Promotional banner for home (Meli-style). design-spec-meli §5.3.
 * Full width or constrained; uses asset URL or children.
 */
export interface PromoBannerProps {
  /** Banner image URL (e.g. from bannerPublicidadUrl). */
  imageUrl?: string | null;
  /** Optional alt for image. */
  alt?: string;
  /** Optional link URL for the whole banner. */
  href?: string | null;
  /** Optional class for the container. */
  className?: string;
  /** Optional children (e.g. overlay text). */
  children?: ReactNode;
}

export function PromoBanner({
  imageUrl,
  alt = 'Oferta',
  href,
  className = '',
  children,
}: PromoBannerProps) {
  const content = (
    <div className={`relative w-full overflow-hidden rounded-none bg-gray-200 min-h-[120px] ${className}`.trim()}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={alt}
          className="w-full h-full min-h-[120px] object-cover max-h-[280px] object-top"
        />
      ) : (
        <div className="w-full aspect-[2.5/1] max-h-[280px] bg-linear-to-r from-meli-blue to-indigo-800 flex items-center justify-center">
          <span className="text-white font-semibold text-lg px-4 text-center">
            Envíos más rápidos
          </span>
        </div>
      )}
      {children != null ? (
        <div className="absolute inset-0 flex items-center justify-start p-6">
          {children}
        </div>
      ) : null}
    </div>
  );

  if (href != null && href !== '') {
    return (
      <a href={href} className="block w-full">
        {content}
      </a>
    );
  }
  return content;
}
