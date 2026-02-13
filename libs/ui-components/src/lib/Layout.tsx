import type { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
}

/**
 * Layout with header and main content area. Children (e.g. Outlet from router) render in the content area.
 */
export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <a href="/" className="text-xl font-bold text-blue-600">
            Mercado Libre
          </a>
        </div>
      </header>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
