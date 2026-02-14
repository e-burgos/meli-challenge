/**
 * Prototype — All components from design-spec-meli.md (T015b).
 * Reference: https://www.mercadolibre.com.ar/celular-samsung-galaxy-a55-5g-2568gb-black-knox-color-negro/p/MLA46689590
 * Route: /prototype
 */
import { Link } from 'react-router-dom';
import { Button, Card } from '@meli-challenge/ui-components';

export function Prototype() {
  return (
    <main className="min-h-screen bg-page-bg">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-10">
        <header>
          <h1 className="text-2xl font-semibold text-gray-800">Prototype — Todos los componentes</h1>
          <p className="text-sm text-gray-600 mt-1">
            Referencia: <a href="https://www.mercadolibre.com.ar/celular-samsung-galaxy-a55-5g-2568gb-black-knox-color-negro/p/MLA46689590" target="_blank" rel="noopener noreferrer" className="text-meli-blue hover:underline">página de producto Meli</a>. Todos los componentes listados en design-spec-meli.md.
          </p>
        </header>

        {/* Header (logo + search + nav) */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Header (logo, búsqueda, nav)</h2>
          <div className="bg-meli-yellow rounded-lg px-4 py-3 flex items-center gap-4">
            <Link to="/" className="text-xl font-bold text-gray-900 shrink-0">
              Mercado Libre
            </Link>
            <input
              type="search"
              placeholder="Buscar productos, marcas y más…"
              className="flex-1 max-w-xl rounded-md border border-gray-300 px-3 py-2 text-sm"
              aria-label="Buscar"
            />
            <span className="text-xs text-gray-600 shrink-0">Ubicación · Carrito</span>
          </div>
        </section>

        {/* Breadcrumb */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Breadcrumb</h2>
          <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
            <Link to="/" className="text-meli-blue hover:underline">Tecnología</Link>
            <span className="mx-1">›</span>
            <Link to="/" className="text-meli-blue hover:underline">Celulares</Link>
            <span className="mx-1">›</span>
            <span className="text-gray-700">Samsung Galaxy A55</span>
          </nav>
        </section>

        {/* Button — all variants */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Button (todas las variantes)</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            <button
              type="button"
              className="rounded-md px-4 py-2.5 text-base font-semibold text-gray-900 bg-meli-yellow hover:opacity-95 transition-opacity"
            >
              Meli primario (Comprar)
            </button>
            <button
              type="button"
              className="rounded-md px-4 py-2.5 text-base font-semibold text-meli-blue border-2 border-meli-blue hover:bg-blue-50 transition-colors"
            >
              Meli secundario
            </button>
          </div>
        </section>

        {/* Input búsqueda */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Input búsqueda</h2>
          <input
            type="search"
            placeholder="Buscar productos, marcas y más…"
            className="w-full max-w-md rounded-md border border-gray-300 px-3 py-2 text-sm"
            aria-label="Buscar"
          />
        </section>

        {/* Card producto listado */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Card producto (listado home)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Card title="Card con enlace a detalle" price={19999} thumbnail="" productId="MLA1" />
            <Card title="Card sin enlace (solo visual)" price={8500} thumbnail="" />
            <Card title="Otro producto con título más largo en dos líneas" price={123456} thumbnail="" productId="MLA2" />
          </div>
        </section>

        {/* Card producto relacionado (compacta) */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Card producto relacionado (compacta)</h2>
          <div className="flex gap-4 flex-wrap">
            {[1, 2, 3, 4].map((i) => (
              <Link key={i} to="/" className="block w-28 border border-gray-200 rounded-sm overflow-hidden shadow-sm bg-white hover:shadow-md transition-shadow">
                <div className="aspect-square w-full h-24 bg-gray-100 object-cover" />
                <div className="p-2">
                  <p className="text-xs text-gray-800 line-clamp-2">Producto relacionado {i}</p>
                  <p className="text-sm font-semibold text-meli-green">$ 8.999</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Card publicitaria */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Card publicitaria (banner)</h2>
          <div className="relative rounded-lg overflow-hidden border border-gray-200 aspect-video bg-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-600">Banner promocional</span>
            </div>
          </div>
        </section>

        {/* Card productos del vendedor */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Card productos del vendedor</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card title="Más del vendedor 1" price={15999} thumbnail="" productId="MLA1" />
            <Card title="Más del vendedor 2" price={22999} thumbnail="" productId="MLA2" />
            <Card title="Más del vendedor 3" price={8999} thumbnail="" />
            <Card title="Más del vendedor 4" price={18999} thumbnail="" productId="MLA3" />
          </div>
        </section>

        {/* Card opiniones con foto */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Card opiniones (con foto)</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="flex gap-0.5 mb-2" aria-hidden>
                {[1, 2, 3, 4, 5].map((j) => (
                  <span key={j} className="text-yellow-500">★</span>
                ))}
              </div>
              <p className="text-sm font-semibold text-gray-800 mb-1">Muy bueno</p>
              <p className="text-sm text-gray-600">Descripción de la opinión del usuario.</p>
              <p className="text-xs text-gray-500 mt-2">Usuario · 12 ene 2025</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 bg-white flex gap-3">
              <div className="shrink-0">
                <div className="w-16 h-16 rounded bg-gray-100" />
              </div>
              <div>
                <div className="flex gap-0.5 mb-2" aria-hidden>
                  {[1, 2, 3, 4].map((j) => (
                    <span key={j} className="text-yellow-500">★</span>
                  ))}
                  <span className="text-gray-300">★</span>
                </div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Buen producto</p>
                <p className="text-sm text-gray-600">Opinión con foto adjunta.</p>
                <p className="text-xs text-gray-500 mt-2">Otro usuario · 10 ene 2025</p>
              </div>
            </div>
          </div>
        </section>

        {/* Card sidebar */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Card sidebar (Compra protegida, Envío)</h2>
          <div className="flex flex-wrap gap-4">
            <div className="max-w-xs border border-gray-200 rounded-lg p-4 bg-white flex items-start gap-3">
              <div className="w-10 h-10 rounded flex items-center justify-center bg-meli-blue text-white shrink-0">✓</div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-800">Compra protegida</p>
                <p className="text-xs text-gray-500">Te reembolsamos si no recibís tu producto.</p>
              </div>
            </div>
            <div className="max-w-xs border border-gray-200 rounded-lg p-4 bg-white flex items-start gap-3">
              <div className="w-10 h-10 rounded flex items-center justify-center bg-meli-green text-white shrink-0">🚚</div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-800">Envío gratis</p>
                <p className="text-xs text-gray-500">Envío a todo el país.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Galería (imagen principal + miniaturas) */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Galería (imagen principal + miniaturas)</h2>
          <div className="max-w-sm">
            <div className="aspect-square max-w-lg rounded-lg border border-gray-200 bg-gray-100" />
            <div className="flex gap-2 mt-2">
              {[1, 2, 3, 4].map((i) => (
                <button key={i} type="button" className="w-16 h-16 rounded border border-gray-200 bg-gray-100 object-cover cursor-pointer hover:border-meli-blue" aria-label={`Miniatura ${i}`} />
              ))}
            </div>
          </div>
        </section>

        {/* Bloque de compra */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Bloque de compra</h2>
          <div className="max-w-md border border-gray-200 rounded-lg p-6 bg-white">
            <p className="text-sm text-gray-500 mb-1">Nuevo</p>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Celular Samsung Galaxy A55 5G 256GB</h3>
            <p className="text-2xl font-semibold text-gray-900 mb-4">$ 899.999</p>
            <button type="button" className="w-full rounded-md py-2.5 text-base font-semibold text-gray-900 bg-meli-yellow hover:opacity-95 transition-opacity">
              Comprar
            </button>
            <p className="text-sm text-meli-green mt-2">Envío gratis a todo el país</p>
            <p className="text-sm text-gray-600 mt-4 pt-4 border-t border-gray-200">Vendido por <span className="font-medium">vendedor_oficial</span></p>
          </div>
        </section>

        {/* Bloque descripción */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Bloque descripción</h2>
          <div className="max-w-2xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Descripción del producto</h3>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {`Características del producto.
Pantalla, cámara, batería, etc.
Texto de ejemplo para el prototipo.`}
            </p>
          </div>
        </section>

        {/* Layout y Home grid */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Layout y Grid Home</h2>
          <p className="text-sm text-gray-600 mb-2">
            Layout envuelve la app con header (logo) y contenido. Grid: <code className="text-xs bg-gray-100 px-1 rounded">grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4</code>.
          </p>
          <Link to="/" className="inline-block mt-4 text-sm text-meli-blue hover:underline">
            Ver Layout en Home →
          </Link>
        </section>
      </div>
    </main>
  );
}
