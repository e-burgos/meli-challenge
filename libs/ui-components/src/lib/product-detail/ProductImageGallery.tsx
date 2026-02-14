import { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

export interface ProductImageGalleryProps {
  /** List of image URLs; first is used as main when none selected. */
  images: string[];
  /** When provided, zoom panel is rendered into this element (e.g. document.body) and centered on screen. */
  zoomPortalTarget?: HTMLElement | null;
}

const ZOOM_SCALE = 2.5;

/**
 * Product image gallery: vertical thumbnails on the left, main image on the right.
 * On hover over main image: magnifying cursor and zoomed view beside it (Meli-style).
 * Sticky: gallery stays visible while scrolling until the section ends.
 */
export function ProductImageGallery({ images, zoomPortalTarget }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomPosition, setZoomPosition] = useState<{ x: number; y: number } | null>(null);
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const mainUrl = images[selectedIndex] ?? images[0];

  const handleMainImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget as unknown as { naturalWidth: number; naturalHeight: number };
    setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
  }, []);

  useEffect(() => {
    setImageSize(null);
  }, [mainUrl]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = mainContainerRef.current;
      if (el == null || mainUrl == null) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rect = (el as any).getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      setZoomPosition({ x, y });
    },
    [mainUrl]
  );

  const handleMouseLeave = useCallback(() => {
    setZoomPosition(null);
  }, []);

  if (images.length === 0) {
    return (
      <div className="flex gap-3 xl:sticky xl:top-6">
        <div className="aspect-square w-full max-w-lg rounded-lg border border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
          Sin imagen
        </div>
      </div>
    );
  }

  const showZoom = zoomPosition != null && mainUrl != null;
  const zoomBgStyle =
    showZoom && zoomPosition
      ? (() => {
          const { x, y } = zoomPosition;
          const denom = ZOOM_SCALE - 1;
          const isLandscape = imageSize == null || imageSize.width >= imageSize.height;
          let backgroundSize: string;
          let px: number;
          let py: number;
          if (isLandscape) {
            backgroundSize = `${ZOOM_SCALE * 100}% auto`;
            px = ((ZOOM_SCALE * x - 0.5) / denom) * 100;
            const r = imageSize != null ? imageSize.height / imageSize.width : 1;
            const scaleY = ZOOM_SCALE * r;
            py = scaleY !== 1 ? ((scaleY * y - 0.5) / (scaleY - 1)) * 100 : 50;
          } else {
            backgroundSize = `auto ${ZOOM_SCALE * 100}%`;
            const r = imageSize != null ? imageSize.width / imageSize.height : 1;
            const scaleX = ZOOM_SCALE * r;
            px = scaleX !== 1 ? ((scaleX * x - 0.5) / (scaleX - 1)) * 100 : 50;
            py = ((ZOOM_SCALE * y - 0.5) / denom) * 100;
          }
          return {
            backgroundImage: `url(${mainUrl})`,
            backgroundSize,
            backgroundPosition: `${px}% ${py}%`,
            backgroundRepeat: 'no-repeat',
          };
        })()
      : undefined;

  const usePortal = zoomPortalTarget != null;
  const zoomPortal =
    usePortal && showZoom && zoomBgStyle
      ? createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            aria-hidden
          >
            <div
              className="hidden sm:block w-[min(90vw,28rem)] aspect-square rounded-lg border border-gray-200 overflow-hidden bg-gray-100 shadow-lg"
              style={zoomBgStyle}
            />
          </div>,
          zoomPortalTarget
        )
      : null;

  return (
    <div className="flex flex-row gap-3 w-full xl:sticky xl:top-6 xl:self-start">
      {/* Vertical thumbnails on the left */}
      {images.length > 1 && (
        <div className="flex flex-col gap-2 shrink-0">
          {images.map((url, index) => (
            <button
              key={`${url}-${index}`}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded border shrink-0 overflow-hidden focus:outline-none focus:ring-2 focus:ring-meli-blue focus:ring-offset-1 ${selectedIndex === index
                ? 'border-meli-blue ring-2 ring-meli-blue'
                : 'border-gray-200 hover:border-gray-300'
                }`}
              aria-label={`Ver imagen ${index + 1}`}
            >
              <img src={url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
      {/* Main image — hover shows zoom cursor; zoom via portal (centered) or inline */}
      <div
        className={`shrink min-w-0 ${!usePortal && showZoom ? 'grid grid-cols-[1fr_1fr] gap-2' : 'block'}`}
        style={!usePortal && showZoom ? { maxWidth: 'min(100%, 64rem)' } : undefined}
      >
        <div
          ref={mainContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`aspect-square w-full max-w-lg rounded-lg border border-gray-200 overflow-hidden bg-white relative ${mainUrl != null ? 'cursor-zoom-in' : ''} ${!usePortal && showZoom ? 'max-w-none' : ''}`}
        >
          {mainUrl != null ? (
            <img
              src={mainUrl}
              alt=""
              className="w-full h-full object-cover pointer-events-none"
              onLoad={handleMainImageLoad}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              Sin imagen
            </div>
          )}
        </div>
        {!usePortal && showZoom && zoomBgStyle && (
          <div
            className="hidden sm:block aspect-square w-full rounded-lg border border-gray-200 overflow-hidden bg-gray-100 min-w-0"
            style={zoomBgStyle}
            aria-hidden
          />
        )}
      </div>
      {zoomPortal}
    </div>
  );
}
