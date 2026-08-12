'use client';

import { useEffect, useState } from 'react';

const FALLBACK = 'Roboto, Helvetica, Arial, sans-serif';

/**
 * `next/font` exposes Roboto under a hashed family name via `--font-roboto`,
 * which SVG `font-family` cannot resolve from a CSS variable at paint time in
 * every browser, so read the resolved value once on mount and fall back to the
 * plain family during SSR / before hydration.
 */
export function useChartFontFamily() {
  const [fontFamily, setFontFamily] = useState(FALLBACK);

  useEffect(() => {
    const resolved = getComputedStyle(document.documentElement).getPropertyValue('--font-roboto').trim();
    if (resolved) setFontFamily(`${resolved}, ${FALLBACK}`);
  }, []);

  return fontFamily;
}
