/**
 * Mock data for the VaR > Analysis 2 page (`/var/analysis2`).
 *
 * Every figure is Contribution VaR in USD millions. The three panels share one
 * consistent story: the risk-factor totals, the product-type totals and the
 * product x risk-factor breakdown all reconcile to the same current/prior week.
 */

// --- Contribution VaR by risk factor: week-over-week (nested donut + table)

export interface ContributionVarFactorRow {
  factor: string;
  /** Prior week contribution VaR, USD MM. */
  priorMm: number;
  /** Current week contribution VaR, USD MM. */
  currentMm: number;
  color: string;
}

/** Prior total $80.5MM, current total $83.0MM. */
export const mockContributionVarFactors: ContributionVarFactorRow[] = [
  { factor: 'Interest Rate', priorMm: 28.0, currentMm: 25.0, color: '#39609D' },
  { factor: 'Interest Rate Vol', priorMm: 9.5, currentMm: 12.5, color: '#B5A881' },
  { factor: 'FX Spot', priorMm: 14.0, currentMm: 13.0, color: '#929E4E' },
  { factor: 'FX Vol', priorMm: 7.0, currentMm: 8.5, color: '#7FC98A' },
  { factor: 'Credit Spread', priorMm: 22.0, currentMm: 24.0, color: '#D0342C' },
];

// --- Contribution VaR by product type (diverging bars)

export interface ContributionVarProductRow {
  product: string;
  /** Current week contribution VaR, USD MM (signed). */
  currentMm: number;
  /** Prior week contribution VaR, USD MM (signed). */
  priorMm: number;
}

export const mockContributionVarProducts: ContributionVarProductRow[] = [
  { product: 'IR Swap', currentMm: 0.95, priorMm: 1.05 },
  { product: 'IR Swaption', currentMm: 0.58, priorMm: 0.52 },
  { product: 'CapFloor', currentMm: 0.42, priorMm: 0.5 },
  { product: 'FX Forward', currentMm: 0.31, priorMm: 0.26 },
  { product: 'TIPs', currentMm: -0.28, priorMm: -0.2 },
  { product: 'CDS', currentMm: -0.36, priorMm: -0.44 },
  { product: 'Corporate Bonds', currentMm: -0.48, priorMm: -0.42 },
  { product: 'FX Option', currentMm: -0.62, priorMm: -0.55 },
  { product: 'Treasury Bond & Futures', currentMm: -0.72, priorMm: -0.8 },
];

// --- Contribution VaR by product type and risk factor (bubbles)

export interface ContributionVarProductFactorPoint {
  product: string;
  /** Short risk factor label drawn inside the bubble, e.g. "IR Vol". */
  factor: string;
  currentMm: number;
  priorMm: number;
}

/** Ordered by product as it appears on the category axis. Each product's points sum to its row in `mockContributionVarProducts`. */
export const mockContributionVarProductFactors: ContributionVarProductFactorPoint[] = [
  { product: 'CapFloor', factor: 'IR Vol', currentMm: 0.28, priorMm: 0.32 },
  { product: 'CapFloor', factor: 'IR', currentMm: 0.16, priorMm: 0.2 },
  { product: 'CapFloor', factor: 'CS', currentMm: -0.02, priorMm: -0.02 },

  { product: 'IR Swaption', factor: 'IR Vol', currentMm: 0.34, priorMm: 0.3 },
  { product: 'IR Swaption', factor: 'IR', currentMm: 0.26, priorMm: 0.24 },
  { product: 'IR Swaption', factor: 'CS', currentMm: -0.02, priorMm: -0.02 },

  { product: 'IR Swap', factor: 'IR', currentMm: 0.62, priorMm: 0.7 },
  { product: 'IR Swap', factor: 'IR Vol', currentMm: 0.29, priorMm: 0.31 },
  { product: 'IR Swap', factor: 'FX Spot', currentMm: 0.04, priorMm: 0.04 },

  { product: 'Corporate Bonds', factor: 'CS', currentMm: -0.43, priorMm: -0.38 },
  { product: 'Corporate Bonds', factor: 'IR', currentMm: -0.1, priorMm: -0.09 },
  { product: 'Corporate Bonds', factor: 'IR Vol', currentMm: 0.05, priorMm: 0.05 },

  { product: 'Treasury Bond & Futures', factor: 'IR', currentMm: -0.4, priorMm: -0.46 },
  { product: 'Treasury Bond & Futures', factor: 'CS', currentMm: -0.35, priorMm: -0.37 },
  { product: 'Treasury Bond & Futures', factor: 'IR Vol', currentMm: 0.03, priorMm: 0.03 },

  { product: 'CDS', factor: 'CS', currentMm: -0.37, priorMm: -0.44 },
  { product: 'CDS', factor: 'IR', currentMm: 0.01, priorMm: 0.0 },

  { product: 'TIPs', factor: 'IR', currentMm: -0.16, priorMm: -0.12 },
  { product: 'TIPs', factor: 'CS', currentMm: -0.14, priorMm: -0.1 },
  { product: 'TIPs', factor: 'IR Vol', currentMm: 0.02, priorMm: 0.02 },

  { product: 'FX Forward', factor: 'FX Spot', currentMm: 0.31, priorMm: 0.25 },
  { product: 'FX Forward', factor: 'IR', currentMm: 0.04, priorMm: 0.05 },
  { product: 'FX Forward', factor: 'CS', currentMm: -0.04, priorMm: -0.04 },

  { product: 'FX Option', factor: 'FX Vol', currentMm: -0.44, priorMm: -0.4 },
  { product: 'FX Option', factor: 'FX Spot', currentMm: -0.14, priorMm: -0.12 },
  { product: 'FX Option', factor: 'IR', currentMm: -0.04, priorMm: -0.03 },
];
