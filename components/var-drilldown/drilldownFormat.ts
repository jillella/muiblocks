/** Shared palette + number formatting for the VaR drilldown page. */

export const POSITIVE_COLOR = '#1f7a4d';
export const NEGATIVE_COLOR = '#c0392b';
export const NEUTRAL_COLOR = '#5b6b7c';

export const PANEL_BORDER = '#e2e7ec';
export const PANEL_HEADING = '#7b8794';
export const TEXT_PRIMARY = '#26313d';
export const TEXT_SECONDARY = '#5f6f85';

const currencyFormat = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const integerFormat = new Intl.NumberFormat('en-US');

export const formatAmount = (value: number | null | undefined) =>
  value === null || value === undefined || Number.isNaN(value)
    ? ''
    : currencyFormat.format(value);

const compactTiers = [
  { limit: 1e12, suffix: 'T' },
  { limit: 1e9, suffix: 'B' },
  { limit: 1e6, suffix: 'MM' },
  { limit: 1e3, suffix: 'K' },
] as const;

/**
 * Hand-rolled rather than `Intl` compact notation: Node and Chrome ship
 * different ICU builds, so `notation: 'compact'` produces a hydration mismatch
 * between the server-rendered tile and the client render.
 */
export const formatCompact = (value: number | null | undefined) => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return '—';
  }

  const sign = value < 0 ? '-' : '';
  const magnitude = Math.abs(value);
  const tier = compactTiers.find(({ limit }) => magnitude >= limit);

  return tier
    ? `${sign}${(magnitude / tier.limit).toFixed(2)}${tier.suffix}`
    : `${sign}${magnitude.toFixed(2)}`;
};

export const formatCount = (value: number) => integerFormat.format(value);

/** Red for negative exposures, matching the mock's delta / gamma columns. */
export const amountColor = (value: number | null | undefined) =>
  value === null || value === undefined || value === 0
    ? TEXT_SECONDARY
    : value < 0
      ? NEGATIVE_COLOR
      : POSITIVE_COLOR;
