export interface OtherPurchaseOptionsProps {
  /** Number of other options (e.g. 5). */
  count: number;
  /** Minimum price among options (e.g. 1109999). */
  minPrice: number;
  /** Link href. When omitted, uses #ofertas. */
  href?: string;
}

function formatPrice(value: number): string {
  return value.toLocaleString('es-AR');
}

/**
 * "Otras opciones de compra" card: title, divider, link "Ver N opciones desde $ X".
 */
export function OtherPurchaseOptions({
  count,
  minPrice,
  href = '#ofertas',
}: OtherPurchaseOptionsProps) {
  return (
    <section className="bg-white rounded-lg border border-gray-200 p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Otras opciones de compra
      </h2>
      <div className="border-t border-gray-200 pt-3">
        <a
          href={href}
          className="text-sm text-meli-blue hover:underline font-medium"
        >
          Ver {count} opciones desde $ {formatPrice(minPrice)}
        </a>
      </div>
    </section>
  );
}
