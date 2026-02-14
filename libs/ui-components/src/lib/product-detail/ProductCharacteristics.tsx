export interface ProductCharacteristicAttribute {
  name: string;
  value: string;
  category?: string;
}

export interface ProductCharacteristicsHighlights {
  screen_size?: string;
  internal_memory?: string;
  main_camera?: string;
}

export interface ProductCharacteristicsProps {
  attributes: ProductCharacteristicAttribute[];
  /** Optional top-level highlights (screen size, memory, camera). */
  highlights?: ProductCharacteristicsHighlights | null;
}

function groupByCategory(
  attributes: ProductCharacteristicAttribute[]
): Map<string | undefined, ProductCharacteristicAttribute[]> {
  const map = new Map<string | undefined, ProductCharacteristicAttribute[]>();
  for (const a of attributes) {
    const key = a.category ?? undefined;
    const list = map.get(key) ?? [];
    list.push(a);
    map.set(key, list);
  }
  return map;
}

function IconPhone() {
  return (
    <svg className="w-5 h-5 text-gray-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function IconChip() {
  return (
    <svg className="w-5 h-5 text-gray-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  );
}

function IconCamera() {
  return (
    <svg className="w-5 h-5 text-gray-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7" />
    </svg>
  );
}

/**
 * "Características del producto" section: optional visual highlights (screen size with slider, memory, camera),
 * then section blocks with table-like rows (alternating background, thin dividers) per category.
 */
export function ProductCharacteristics({
  attributes,
  highlights,
}: ProductCharacteristicsProps) {
  if (attributes.length === 0 && !highlights) return null;

  const groups = groupByCategory(attributes);
  const categoryOrder = Array.from(groups.keys()).sort((a, b) => {
    if (a == null) return 1;
    if (b == null) return -1;
    return a.localeCompare(b);
  });

  return (
    <section id="caracteristicas" className="bg-white py-4 lg:py-6 scroll-mt-4">
      <h2 className="text-2xl font-normal text-gray-900 mb-6">
        Características del producto
      </h2>

      {/* Top-level highlights: screen size (with slider), internal memory, main camera */}
      {highlights != null && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            {highlights.screen_size != null && highlights.screen_size !== '' && (
              <div>
                <p className="text-sm text-gray-800 flex items-start gap-2">
                  <IconPhone />
                  <span>
                    Tamaño de la pantalla: <strong className="font-semibold text-gray-900">{highlights.screen_size}</strong>
                  </span>
                </p>
                <div className="mt-2 pl-7">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                    <span>PEQUEÑO</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-meli-blue rounded-full"
                        style={{ width: '70%' }}
                      />
                    </div>
                    <span>GRANDE</span>
                  </div>
                </div>
              </div>
            )}
            {highlights.internal_memory != null &&
              highlights.internal_memory !== '' && (
                <p className="text-sm text-gray-800 flex items-center gap-2">
                  <IconChip />
                  Memoria interna: <strong className="font-semibold text-gray-900">{highlights.internal_memory}</strong>
                </p>
              )}
          </div>
          {highlights.main_camera != null && highlights.main_camera !== '' && (
            <div className="flex items-start md:items-center">
              <p className="text-sm text-gray-800 flex items-center gap-2">
                <IconCamera />
                Cámara trasera principal:{' '}
                <strong className="font-semibold text-gray-900">{highlights.main_camera}</strong>
              </p>
            </div>
          )}
        </div>
      )}

      {/* Section blocks by category: bold title (~18px), table-like rows with alternating bg and dividers */}
      <div className="flex flex-col md:flex-row flex-wrap gap-4">
        {categoryOrder.map((category) => {
          const list = groups.get(category) ?? [];
          if (list.length === 0) return null;
          const title = category ?? 'Otros';
          return (
            <div key={title} className="w-full md:w-[calc(50%-8px)]">
              <h3 className="text-lg font-normal text-gray-900 mb-3">
                {title}
              </h3>
              <div className="border border-gray-200 rounded-sm overflow-hidden">
                {list.map((attr, index) => (
                  <div
                    key={attr.name}
                    className={`flex justify-between items-center gap-4 px-3 py-2.5 text-sm border-b border-gray-100 last:border-b-0 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                      }`}
                  >
                    <span className="text-gray-800 shrink-0">{attr.name}</span>
                    <span className="text-gray-900 text-right min-w-0 font-medium">
                      {attr.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
