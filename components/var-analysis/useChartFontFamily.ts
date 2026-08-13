'use client';

import { ROBOTO_FONT_FAMILY } from '@/lib/theme';

/** AG Charts draws to canvas and needs a real family name, not a CSS variable. */
export function useChartFontFamily() {
  return ROBOTO_FONT_FAMILY;
}
