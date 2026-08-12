/** Shared palette + number formatting for the Analysis 2 contribution VaR panels. */

/** Sign of the contribution itself: a positive / negative VaR contribution. */
export const POSITIVE_COLOR = '#2e8b52';
export const NEGATIVE_COLOR = '#b8332a';

/** Week-over-week movement, used by the product panels. */
export const INCREASE_COLOR = '#2f6fb5';
export const DECREASE_COLOR = '#e08a1e';

export const NEUTRAL_COLOR = '#6b7280';
export const AXIS_COLOR = '#98a2b3';
export const GRID_COLOR = '#e8ecf1';
export const PRIOR_MARKER_COLOR = '#1f2937';

export const formatMm = (value: number, digits = 2) => `$${value.toFixed(digits)}MM`;

export const formatSignedMm = (value: number, digits = 2) =>
  `$${value < 0 ? '-' : '+'}${Math.abs(value).toFixed(digits)}MM`;

export const formatSigned = (value: number, digits = 2) =>
  `${value < 0 ? '-' : '+'}${Math.abs(value).toFixed(digits)}`;

export const formatSignedPp = (value: number, digits = 1) =>
  `${value < 0 ? '-' : '+'}${Math.abs(value).toFixed(digits)}pp`;

export const arrowFor = (delta: number) => (delta > 0 ? '▲' : delta < 0 ? '▼' : '■');

/** Green up / red down — used where the reader cares whether risk grew. */
export const directionColor = (delta: number) =>
  delta > 0 ? POSITIVE_COLOR : delta < 0 ? NEGATIVE_COLOR : NEUTRAL_COLOR;

/** Blue up / amber down — used where the bar itself already carries the sign colour. */
export const movementColor = (delta: number) =>
  delta > 0 ? INCREASE_COLOR : delta < 0 ? DECREASE_COLOR : NEUTRAL_COLOR;

const clampChannel = (value: number) => Math.max(0, Math.min(255, Math.round(value)));

const parseHex = (hex: string): [number, number, number] => {
  const value = hex.replace('#', '');
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
  ];
};

/** Linear blend between two hex colours; `t` of 0 returns `from`, 1 returns `to`. */
export function mixHex(from: string, to: string, t: number): string {
  const [r1, g1, b1] = parseHex(from);
  const [r2, g2, b2] = parseHex(to);
  const ratio = Math.max(0, Math.min(1, t));
  const channel = (a: number, b: number) => clampChannel(a + (b - a) * ratio).toString(16).padStart(2, '0');
  return `#${channel(r1, r2)}${channel(g1, g2)}${channel(b1, b2)}`;
}
