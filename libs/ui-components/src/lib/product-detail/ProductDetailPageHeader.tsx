import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  to: string;
}

export interface ProductDetailPageHeaderProps {
  /** Breadcrumb links (e.g. "Celulares y Teléfonos" > "Celulares y Smartphones" > "Celular Samsung"). */
  breadcrumbItems: BreadcrumbItem[];
  /** Optional suggested terms shown below title (e.g. "samsung a52 - samsung a55"). */
  suggestedTerms?: string[];
}

/**
 * Page header for product detail: "También puede interesarte", breadcrumbs (left),
 * and "Vender uno igual | Compartir" (right) at same height as breadcrumbs.
 * Meli-style per reference image.
 */
export function ProductDetailPageHeader({
  breadcrumbItems,
  suggestedTerms = [],
}: ProductDetailPageHeaderProps) {
  return (
    <div className="mb-4">
      {/* Title + suggested terms */}
      <div className="flex flex-wrap items-center gap-1 mb-2">
        <h2 className="text-sm font-semibold text-gray-800 ">
          También puede interesarte:
        </h2>
        {suggestedTerms.length > 0 ? (
          <p className="text-xs text-gray-500">
            {suggestedTerms.join(' - ')}
          </p>
        ) : (
          <p className="text-xs text-gray-500">
            No hay sugerencias de productos
          </p>
        )}
      </div>
      {/* Breadcrumbs (left) and actions (right) — same row */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm">
          {breadcrumbItems.map((item, index) => (
            <span key={`${item.to}-${index}`} className="flex items-center gap-3">

              {index === 1 && (
                <span className="text-gray-400 font-light ml-1" aria-hidden>
                  |
                </span>
              )}
              {index > 1 && (
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2" width="6" height="8"><path fill="none" stroke="#666" d="M1 0l4 4-4 4"></path></svg>
              )}
              {index < breadcrumbItems.length - 1 ? (
                <Link
                  to={item.to}
                  className="text-meli-blue font-light hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-600">{item.label}</span>
              )}
            </span>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-sm">
          <Link to="#" className="text-meli-blue font-light hover:underline">
            Vender uno igual
          </Link>
          <span className="text-gray-400" aria-hidden>
            |
          </span>
          <button type="button" className="text-meli-blue font-light hover:underline hober:cursor-pointer">
            Compartir
          </button>
        </div>
      </div>
    </div>
  );
}
