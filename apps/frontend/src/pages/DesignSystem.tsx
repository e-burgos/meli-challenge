/**
 * Design System — Visual documentation for developers (T015b).
 * Tokens, typography, colors, spacing, and component specs from design-spec-meli.md.
 * Assets from @meli-challenge/ui-components (libs/ui-components/src/assets).
 * Route: /design-system
 */
import {
  faviconUrl,
  logoUrl,
  bannerPublicidadUrl,
  bannerPublicidad2Url,
} from '@meli-challenge/ui-components';

export function DesignSystem() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-10">
        <header>
          <h1 className="text-2xl font-semibold text-gray-800">Design System — Meli</h1>
          <p className="text-sm text-gray-600 mt-1">
            Documentación visual según <code className="text-xs bg-white px-1 rounded">design-spec-meli.md</code>. Referencia principal: <a href="https://www.mercadolibre.com.ar/celular-samsung-galaxy-a55-5g-2568gb-black-knox-color-negro/p/MLA46689590" target="_blank" rel="noopener noreferrer" className="text-meli-blue hover:underline">página de producto Meli</a>.
          </p>
        </header>

        {/* Logo y favicon — recursos desde libs/ui-components/src/assets */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Logo y favicon</h2>
          <p className="text-sm text-gray-600 mb-3">
            Recursos en <code className="text-xs bg-gray-100 px-1 rounded">libs/ui-components/src/assets</code>. El favicon es el oficial de Mercado Libre (CDN mlstatic). Logo header: placeholder; producción puede usar asset oficial de Meli.
          </p>
          <div className="flex flex-wrap items-end gap-8">
            <div>
              <p className="text-xs text-gray-500 mb-2">Favicon (oficial Meli)</p>
              <img src={faviconUrl} alt="" className="w-12 h-12 rounded" width={48} height={48} />
              <p className="text-xs text-gray-500 mt-1">
                <a href="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.22/mercadolibre/favicon.svg" target="_blank" rel="noopener noreferrer" className="text-meli-blue hover:underline">Origen: mlstatic CDN</a>
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-2">Logo header</p>
              <img src={logoUrl} alt="Mercado Libre (placeholder)" className="h-10 w-auto" width={134} height={34} />
            </div>
          </div>
        </section>

        {/* Banners publicidad — recursos desde libs/ui-components/src/assets */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Banners publicidad</h2>
          <p className="text-sm text-gray-600 mb-3">
            Placeholders para cards publicitarias (design-spec §5.3). Uso: <code className="text-xs bg-gray-100 px-1 rounded">bannerPublicidadUrl</code>, <code className="text-xs bg-gray-100 px-1 rounded">bannerPublicidad2Url</code> desde <code className="text-xs bg-gray-100 px-1 rounded">@meli-challenge/ui-components</code>.
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 mb-2">Banner publicidad (principal)</p>
              <img src={bannerPublicidadUrl} alt="" className="w-full max-w-2xl rounded-lg border border-gray-200" width={728} height={90} />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-2">Banner publicidad (secundario)</p>
              <img src={bannerPublicidad2Url} alt="" className="w-full max-w-2xl rounded-lg border border-gray-200" width={728} height={90} />
            </div>
          </div>
        </section>

        {/* Colors */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Colores</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <div className="aspect-square rounded-md border border-gray-200 bg-meli-yellow" />
              <p className="text-xs text-gray-600 mt-1">Meli Yellow #FFE600</p>
              <p className="text-xs text-gray-500">Header, CTA</p>
            </div>
            <div>
              <div className="aspect-square rounded-md border border-gray-200 bg-meli-blue" />
              <p className="text-xs text-gray-600 mt-1">Meli Blue #3483FA</p>
              <p className="text-xs text-gray-500">Links, acciones</p>
            </div>
            <div>
              <div className="aspect-square rounded-md border border-gray-200 bg-meli-green" />
              <p className="text-xs text-gray-600 mt-1">Meli Green #00A650</p>
              <p className="text-xs text-gray-500">Precio, envío gratis</p>
            </div>
            <div>
              <div className="aspect-square rounded-md border border-gray-200 bg-gray-800" />
              <p className="text-xs text-gray-600 mt-1">Text primary gray-800</p>
            </div>
            <div>
              <div className="aspect-square rounded-md border border-gray-200 bg-gray-100" />
              <p className="text-xs text-gray-600 mt-1">Background page gray-100</p>
            </div>
            <div>
              <div className="aspect-square rounded-md border border-gray-200 bg-white" />
              <p className="text-xs text-gray-600 mt-1">Background card white</p>
            </div>
          </div>
        </section>

        {/* Typography — exact Meli (Proxima Nova + fallbacks) */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Tipografía (Meli)</h2>
          <p className="text-sm text-gray-600 mb-3">
            Font stack: <code className="text-xs bg-gray-100 px-1 rounded">&#39;Proxima Nova&#39;, -apple-system, BlinkMacSystemFont, &#39;Segoe UI&#39;, Roboto, sans-serif</code>. Pesos: 400 (regular), 600 (semibold), 700 (bold).
          </p>
          <div className="space-y-3">
            <p className="text-xl font-bold text-gray-800">Logo / marca — text-xl font-bold</p>
            <p className="text-2xl font-semibold text-gray-800">Título página — text-2xl font-semibold</p>
            <p className="text-base text-gray-800">Título card — text-sm o text-base</p>
            <p className="text-xl font-semibold text-meli-green">Precio listado — text-lg font-semibold text-meli-green</p>
            <p className="text-sm text-gray-600">Cuerpo — text-sm text-gray-600</p>
            <p className="text-xs text-gray-500">Metadata / badges — text-xs text-gray-500</p>
          </div>
        </section>

        {/* Spacing */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Espaciado</h2>
          <p className="text-sm text-gray-600 mb-3">Escala Tailwind: px-4 (1rem), py-6 (1.5rem), gap-4 (1rem). Container: max-w-7xl mx-auto px-4 md:px-6.</p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-block w-4 h-4 bg-gray-300 rounded" title="4" />
            <span className="inline-block w-8 h-4 bg-gray-300 rounded" title="8" />
            <span className="inline-block w-12 h-4 bg-gray-300 rounded" title="12" />
            <span className="inline-block w-16 h-4 bg-gray-300 rounded" title="16" />
            <span className="inline-block w-24 h-4 bg-gray-300 rounded" title="24" />
          </div>
          <p className="text-xs text-gray-500 mt-2">gap-1, gap-2, gap-3, gap-4, gap-6</p>
        </section>

        {/* Buttons (Meli spec) */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Botones (Meli)</h2>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              className="rounded-md px-4 py-2.5 text-base font-semibold text-gray-900 bg-meli-yellow hover:opacity-95 transition-opacity"
            >
              Primario (Comprar)
            </button>
            <button
              type="button"
              className="rounded-md px-4 py-2.5 text-base font-semibold text-meli-blue border-2 border-meli-blue hover:bg-blue-50 transition-colors"
            >
              Secundario (outline)
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Primario: bg-[#FFE600], text-gray-900. Secundario: border-2 border-[#3483FA], text-[#3483FA].
          </p>
        </section>

        {/* Card spec — producto listado */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Card de producto (listado)</h2>
          <p className="text-sm text-gray-600 mb-3">Contenedor: bg-white border border-gray-200 rounded-sm shadow-sm hover:shadow-md. Imagen: aspect-square object-cover. Título: text-sm line-clamp-2. Precio: text-lg font-semibold text-[#00A650].</p>
          <div className="w-40 border border-gray-200 rounded-sm overflow-hidden shadow-sm bg-white">
            <div className="aspect-square w-full bg-gray-100" />
            <div className="p-3">
              <p className="text-sm text-gray-800 line-clamp-2">Ejemplo título producto</p>
              <p className="text-lg font-semibold text-meli-green">$ 12.345</p>
              <p className="text-xs text-meli-green">Envío gratis</p>
            </div>
          </div>
        </section>

        {/* Card — producto relacionado / compacta */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Card producto relacionado (compacta)</h2>
          <p className="text-sm text-gray-600 mb-3">Productos relacionados / vistos. p-2, título text-xs line-clamp-2, precio text-sm font-semibold text-meli-green.</p>
          <div className="w-28 border border-gray-200 rounded-sm overflow-hidden shadow-sm bg-white">
            <div className="aspect-square w-full h-24 bg-gray-100 object-cover" />
            <div className="p-2">
              <p className="text-xs text-gray-800 line-clamp-2">Título corto</p>
              <p className="text-sm font-semibold text-meli-green">$ 8.999</p>
            </div>
          </div>
        </section>

        {/* Card publicitaria */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Card publicitaria (banner)</h2>
          <p className="text-sm text-gray-600 mb-3">Banners promocionales. relative rounded-lg overflow-hidden, imagen aspect-video o altura fija, overlay opcional.</p>
          <div className="relative rounded-lg overflow-hidden border border-gray-200 aspect-video bg-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-600">Banner promo</span>
            </div>
          </div>
        </section>

        {/* Card opiniones con foto */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Card opiniones (con foto)</h2>
          <p className="text-sm text-gray-600 mb-3">Reseñas: estrellas, título opcional, cuerpo, foto opcional, metadata (fecha, usuario).</p>
          <div className="max-w-md border border-gray-200 rounded-lg p-4 bg-white">
            <div className="flex gap-0.5 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="text-yellow-500" aria-hidden>★</span>
              ))}
            </div>
            <p className="text-sm font-semibold text-gray-800 mb-1">Muy bueno</p>
            <p className="text-sm text-gray-600">Descripción de la opinión del usuario.</p>
            <p className="text-xs text-gray-500 mt-2">Usuario · 12 ene 2025</p>
          </div>
        </section>

        {/* Card sidebar */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Card sidebar (Compra protegida, Envío)</h2>
          <p className="text-sm text-gray-600 mb-3">Ícono + título + descripción. flex gap-3 p-4, ícono shrink-0.</p>
          <div className="max-w-xs border border-gray-200 rounded-lg p-4 bg-white flex items-start gap-3">
            <div className="w-10 h-10 rounded flex items-center justify-center bg-meli-blue text-white shrink-0">✓</div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800">Compra protegida</p>
              <p className="text-xs text-gray-500">Te reembolsamos si no recibís tu producto.</p>
            </div>
          </div>
        </section>

        {/* Inventario componentes página producto */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Inventario — componentes página de producto</h2>
          <p className="text-sm text-gray-600 mb-3">Todos los componentes de la <a href="https://www.mercadolibre.com.ar/celular-samsung-galaxy-a55-5g-2568gb-black-knox-color-negro/p/MLA46689590" target="_blank" rel="noopener noreferrer" className="text-meli-blue hover:underline">página de producto Meli</a>:</p>
          <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
            <li>Header (logo, búsqueda, nav)</li>
            <li>Breadcrumb</li>
            <li>Galería principal + miniaturas</li>
            <li>Bloque de compra (condición, título, precio, CTA, envío, vendedor, medios de pago)</li>
            <li>Descripción</li>
            <li>Productos relacionados (card compacta)</li>
            <li>Productos del vendedor</li>
            <li>Opiniones con fotos</li>
            <li>Cards de sidebar (Compra protegida, Envío, etc.)</li>
            <li>Cards publicitarias</li>
          </ul>
        </section>

        {/* Layout spec */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Layout (app shell)</h2>
          <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
            <li>Header: bg-[#FFE600], ~52px, logo + búsqueda + acciones, max-w-7xl mx-auto</li>
            <li>Main: flex-1 bg-gray-100, contenido en max-w-7xl mx-auto px-4 py-6</li>
            <li>Footer (opcional): bg-white border-t border-gray-200, text-xs text-gray-500</li>
          </ul>
        </section>

        {/* Responsive */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Responsive</h2>
          <p className="text-sm text-gray-600">
            Home grid: <code className="text-xs bg-gray-100 px-1 rounded">grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4</code>. Detalle: <code className="text-xs bg-gray-100 px-1 rounded">grid-cols-1 lg:grid-cols-[1fr_400px]</code>.
          </p>
        </section>
      </div>
    </main>
  );
}
