'use client';

import { useEffect, useState } from 'react';

const FALLBACK = 'Roboto, Helvetica, Arial, sans-serif';

/**
 * AG Charts draws to a canvas, so it needs a real font-family string and
 * cannot resolve a CSS custom property. `next/font` exposes Roboto under a
 * hashed family name via `--font-roboto`, so read that value once on mount
 * and fall back to the plain family name during SSR / before hydration.
 */
export function useChartFontFamily() {
  const [fontFamily, setFontFamily] = useState(FALLBACK);

  useEffect(() => {
    const resolved = getComputedStyle(document.documentElement)
      .getPropertyValue('--font-roboto')
      .trim();
    if (resolved) setFontFamily(`${resolved}, ${FALLBACK}`);
  }, []);

  return fontFamily;
}
