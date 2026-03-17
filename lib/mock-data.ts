export interface Product {
  name: string;
  varValue: string;
  svarValue: string;
}

export interface RiskFactor {
  name: string;
  varValue: string;
  svarValue: string;
}

export interface EntityMetric {
  label: string;
  value: string;
  change: string;
}

export const mockProducts: Product[] = [
  { name: 'Interest Rate Swaps', varValue: '$4.21M', svarValue: '$5.87M' },
  { name: 'Credit Default Swaps', varValue: '$3.19M', svarValue: '$4.49M' },
  { name: 'FX Options', varValue: '$2.74M', svarValue: '$3.92M' },
  { name: 'Equity Derivatives', varValue: '$1.93M', svarValue: '$2.61M' },
];

export const mockRiskFactors: RiskFactor[] = [
  { name: 'IR Curve USD 10Y', varValue: '$3.82M', svarValue: '$5.24M' },
  { name: 'Credit Spread IG CDX', varValue: '$2.41M', svarValue: '$3.73M' },
  { name: 'EUR/USD Spot', varValue: '$1.58M', svarValue: '$2.14M' },
  { name: 'S&P 500 Implied Vol', varValue: '$1.24M', svarValue: '$1.81M' },
];

export const mockEntityMetrics: EntityMetric[] = [
  { label: 'VaR (99%, 1-Day)', value: '$22.4M', change: '+$1.2M' },
  { label: 'SVaR (99%, 1-Day)', value: '$31.8M', change: '+$2.1M' },
];
