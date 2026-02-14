/**
 * Skeleton loading state for the product detail page.
 * Mirrors the layout: header, gallery | product info | purchase info, then
 * left column (description, carousels, characteristics, reviews) and right column (seller, other options).
 */
export function ProductDetailSkeleton() {
  return (
    <main className="flex-1 bg-page-bg">
      <div className="max-w-7xl mx-auto py-6">
        {/* Header skeleton: title + breadcrumbs row + actions */}
        <div className="mb-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-48 mb-2" />
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-4" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-4" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-40" />
            </div>
            <div className="flex gap-3">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
            </div>
          </div>
        </div>

        {/* White container */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 lg:p-6">
          {/* Top row: gallery | product info | purchase info */}
          <div className="grid grid-cols-1 xl:grid-cols-[auto_340px_310px] gap-6 xl:gap-5 items-start">
            {/* Gallery skeleton: thumbnails + main image */}
            <div className="flex gap-3 w-full xl:w-auto">
              <div className="flex flex-col gap-2 shrink-0">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded border border-gray-200 bg-gray-100 animate-pulse"
                  />
                ))}
              </div>
              <div className="aspect-square w-full max-w-lg rounded-lg border border-gray-200 bg-gray-100 animate-pulse shrink min-w-0" />
            </div>

            {/* Product info skeleton */}
            <div className="space-y-4 min-w-0">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-full max-w-[95%]" />
              <div className="h-5 bg-gray-200 rounded animate-pulse w-4/5" />
              <div className="flex gap-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
              </div>
              <div className="h-10 bg-gray-200 rounded animate-pulse w-32" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-28" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-36" />
              <div className="border-t border-gray-100 pt-3 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5" />
              </div>
            </div>

            {/* Purchase info skeleton */}
            <div className="space-y-4 border border-gray-200 rounded-lg p-4 bg-gray-50/50">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-10 bg-gray-200 rounded animate-pulse w-full" />
              <div className="space-y-2 pt-2">
                <div className="h-3 bg-gray-200 rounded animate-pulse w-full" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-5/6" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-4/5" />
              </div>
            </div>
          </div>

          {/* Bottom row: left column | right column */}
          <div className="mt-8 grid grid-cols-1 xl:grid-cols-[1fr_310px] gap-6 xl:gap-8">
            <div className="space-y-6 min-w-0">
              {/* Description block skeleton */}
              <div className="border-t border-gray-200 pt-6">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-48 mb-3" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                </div>
              </div>

              <div className="border-t border-gray-200" />

              {/* Related carousel skeleton */}
              <div>
                <div className="h-7 bg-gray-200 rounded animate-pulse w-56 mb-4" />
                <div className="flex gap-3 overflow-hidden">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="shrink-0 w-[180px] border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <div className="aspect-square bg-gray-100 animate-pulse" />
                      <div className="p-3 space-y-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                        <div className="h-5 bg-gray-200 rounded animate-pulse w-2/3" />
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200" />

              {/* Seller carousel skeleton */}
              <div>
                <div className="h-7 bg-gray-200 rounded animate-pulse w-48 mb-4" />
                <div className="flex gap-3 overflow-hidden">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="shrink-0 w-[180px] border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <div className="aspect-square bg-gray-100 animate-pulse" />
                      <div className="p-3 space-y-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                        <div className="h-5 bg-gray-200 rounded animate-pulse w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200" />

              {/* Characteristics skeleton */}
              <div>
                <div className="h-7 bg-gray-200 rounded animate-pulse w-40 mb-4" />
                <div className="grid gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex gap-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-32 shrink-0" />
                      <div className="h-4 bg-gray-200 rounded animate-pulse flex-1 max-w-[60%]" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200" />

              {/* Reviews skeleton */}
              <div>
                <div className="h-7 bg-gray-200 rounded animate-pulse w-36 mb-4" />
                <div className="flex gap-6 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-full" />
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5" />
                </div>
              </div>
            </div>

            {/* Right column: seller card + other options */}
            <div className="space-y-6 xl:sticky xl:top-6 xl:self-start">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-28 mb-2" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
                  </div>
                </div>
                <div className="h-9 bg-gray-200 rounded animate-pulse w-full mb-4" />
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-full" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-4/5" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-44 mb-3" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
