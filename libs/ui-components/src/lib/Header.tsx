import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { logoUrl } from '../assets/urls';

const SEARCH_PARAM = 'q';

interface NavLink {
  label: string;
  to: string;
  badge?: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Categorías', to: '#' },
  { label: 'Ofertas', to: '#' },
  { label: 'Cupones', to: '#' },
  { label: 'Supermercado', to: '#' },
  { label: 'Moda', to: '#' },
  { label: 'Mercado Play', to: '#', badge: 'Gratis' },
  { label: 'Vender', to: 'design-system' },
  { label: 'Ayuda', to: '/prototype' },
];

/**
 * Header Meli: two rows (logo/search/promo/user | nav). design-spec-meli §2.5.
 * Search: submits to home with ?q= for product list filtering (app reads searchParams).
 */
export function Header() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const qFromUrl = searchParams.get(SEARCH_PARAM) ?? '';
  const [inputValue, setInputValue] = useState(qFromUrl);

  useEffect(() => {
    setInputValue(qFromUrl);
  }, [qFromUrl]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    navigate(trimmed !== '' ? `/?${SEARCH_PARAM}=${encodeURIComponent(trimmed)}` : '/');
  };

  return (
    <header className="bg-meli-yellow shrink-0 xl:h-[100px] h-[60px] xl:px-0 px-4 flex items-center justify-center w-full">
      {/* Row 1: Logo/Location | Search | Promo banner | User/Favorites/Cart */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3">
        {/* Logo + Location (vertical stack) */}
        <div className=" flex flex-col min-w-[139px]">
          <Link to="/" className="flex items-center mb-0.5" aria-label="Mercado Libre - Ir al inicio">
            <img src={logoUrl} alt="Mercado Libre" className="min-h-[39px] h-[39px] w-auto" />
          </Link>
          <button
            type="button"
            className="hidden xl:flex items-center max-h-[40px] gap-1 text-[11px] px-2 py-1 text-gray-800 hover:text-gray-900 hover:border border-gray-400 rounded"
            aria-label="Enviar a Capital Federal"
          >
            <svg className="w-6 h-10 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <div className="flex flex-col text-left">
              <span className="text-gray-700 absolute text-[11px] font-light">Enviar a</span>
              <span className="text-gray-800 hover:text-gray-900 relative mt-2 text-[14px]">Capital Federal 1405</span>
            </div>
          </button>
        </div>

        {/* Search bar - submits ?q= to home for product list filtering */}
        <div className="flex flex-col gap-4 max-w-2xl w-full">
          <form role="search" onSubmit={handleSearchSubmit} className="relative">
            <input
              type="search"
              value={inputValue}
              onChange={(e) => setInputValue((e.currentTarget as unknown as { value: string }).value)}
              placeholder="Buscar productos, marcas y más..."
              className="w-full rounded shadow-sm border border-gray-300 bg-white px-4 py-2 pr-10 text-sm placeholder-gray-500 focus:border-meli-blue focus:outline-none focus:ring-2 focus:ring-meli-blue/20"
              aria-label="Buscar productos, marcas y más"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-gray-50 rounded"
              aria-label="Buscar"
            >
              <svg className="w-[18px] h-[18px] text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
          <div className="hidden xl:flex mx-auto w-full items-center justify-between gap-4 flex-wrap text-gray-800 hover:text-gray-900 text-xs">
            {NAV_LINKS.map(({ label, to, badge }) => (
              <Link
                key={label}
                to={to}
                className="text-gray-800 relative flex-col hover:text-gray-900 text-[14px] transition-colors inline-flex items-center gap-1"
              >
                {badge != null ? (
                  <span className="text-[9px] border border-gray-300 rounded-full px-1 absolute -top-3 left-6 bg-meli-green text-white font-semibold uppercase">{badge}</span>
                ) : null}
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 shrink-0 items-end">
          {/* Promo banner (Disney+) */}
          <div className="hidden xl:flex mb-1">
            <img src="https://http2.mlstatic.com/D_NQ_871042-MLA96631608403_102025-OO.webp" alt="Disney+" className="h-[39px] w-auto" />
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {/* User section */}
            <div className="hidden lg:flex items-center gap-5 shrink-0">
              <nav className="flex items-center gap-4 text-xs" aria-label="Usuario">
                <Link to="#" className="text-gray-800 hover:text-gray-900 text-[14px]">Creá tu cuenta</Link>
                <Link to="#" className="text-gray-800 hover:text-gray-900 text-[14px]">Ingresá</Link>
                <Link to="#" className="text-gray-800 hover:text-gray-900 text-[14px]">Mis compras</Link>
                <Link to="#" className="text-gray-600 hover:text-gray-900 relative" aria-label="Carrito">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </Link>
              </nav>
            </div>


          </div>
        </div>

      </div>
    </header>
  );
}
