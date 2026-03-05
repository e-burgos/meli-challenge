import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseAutoplayReturn {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  pause: () => void;
  resume: () => void;
  skipTransition: boolean;
}

/**
 * Hook reutilizable para carousels con autoplay.
 *
 * @param length   - Número total de slides/ítems.
 * @param interval - Intervalo en ms entre avances automáticos. Default: 3000.
 * @param enabled  - Si false, el autoplay arranca desactivado (ej. length === 1).
 */
export function useAutoplay(
  length: number,
  interval = 3000,
  enabled = true,
): UseAutoplayReturn {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [skipTransition, setSkipTransition] = useState(false);

  // Detecta prefers-reduced-motion una sola vez al montar
  const reducedMotion = useRef(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      reducedMotion.current = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      if (reducedMotion.current) {
        setSkipTransition(true);
      }
    }
  }, []);

  // Autoplay principal
  useEffect(() => {
    // Sin autoplay si: desactivado, pausado, o solo 1 slide
    if (!enabled || isPaused || length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % length);
    }, interval);

    return () => clearInterval(timer);
  }, [enabled, isPaused, length, interval]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  return { activeIndex, setActiveIndex, pause, resume, skipTransition };
}
