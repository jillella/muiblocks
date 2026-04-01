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

export interface VarSVarTableRow {
  scenarioName: string;
  id: number;
  currency: string;
  curve: string;
  action: string;
}

export interface TimeSeriesPoint {
  period: string;
  var: number;
  cleanPnl: number;
}

export interface CleanPnlVarPoint {
  period: string;
  cleanPnl: number;
  var: number;
}

export interface VarBacktestingChartPoint {
  month: string;
  var: number;
  cleanPnl: number;
  threshold: number;
}

export interface StressMaxLossChartPoint {
  month: string;
  var: number;
  cleanPnl: number;
  threshold: number;
}

export interface RiskDriverSeriesItem {
  name: string;
  changePct: string;
  points: number[];
}

export interface RiskDriverSeries {
  title: string;
  subtitle: string;
  items: RiskDriverSeriesItem[];
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

export const mockVarSVarTableRows: VarSVarTableRow[] = [
  { scenarioName: 'CCAR2025_Exp_SPARC', id: 32, currency: 'AUD', curve: 'FX Basis', action: 'A4204' },
  { scenarioName: 'CLCAR2025_Exp_SPARC', id: 44, currency: 'AUD', curve: 'FX Basis', action: 'A4204' },
  { scenarioName: 'CCAR2025_Exp_SPARC', id: 37, currency: 'AUD', curve: 'FX Basis', action: 'A4204' },
  { scenarioName: 'CCAR2025_Exp_SPARC', id: 21, currency: 'AUD', curve: 'FX Basis', action: 'A4204' },
];

export const mockVarSVarTrendData: TimeSeriesPoint[] = [
  { period: 'Jan-25', var: 3, cleanPnl: 15 },
  { period: 'Feb-25', var: 22, cleanPnl: 5 },
  { period: 'Mar-25', var: 3, cleanPnl: 17 },
  { period: 'Apr-25', var: 23, cleanPnl: 4 },
  { period: 'May-25', var: 6, cleanPnl: 20 },
  { period: 'Jun-25', var: 7, cleanPnl: 0 },
];

export const mockCleanPnlVarData: CleanPnlVarPoint[] = [
  { period: 'Jan', cleanPnl: 2, var: 1 },
  { period: 'Feb', cleanPnl: 18, var: 7 },
  { period: 'Mar', cleanPnl: 9, var: 15 },
  { period: 'Apr', cleanPnl: 10, var: 8 },
  { period: 'May', cleanPnl: 13, var: 14 },
  { period: 'Jun', cleanPnl: 7, var: 9 },
  { period: 'Jul', cleanPnl: 14, var: 16 },
];

export const mockVarBacktestingChartSeries: VarBacktestingChartPoint[] = [
  { month: 'Jan-25', var: 120, cleanPnl: 245, threshold: 250 },
  { month: 'Feb-25', var: 230, cleanPnl: 250, threshold: 250 },
  { month: 'Mar-25', var: 210, cleanPnl: 260, threshold: 250 },
  { month: 'Apr-25', var: 80, cleanPnl: 145, threshold: 250 },
  { month: 'May-25', var: 95, cleanPnl: 170, threshold: 250 },
  { month: 'Jun-25', var: 205, cleanPnl: 185, threshold: 250 },
  { month: 'Jul-25', var: 75, cleanPnl: 220, threshold: 250 },
  { month: 'Aug-25', var: 190, cleanPnl: 155, threshold: 250 },
  { month: 'Sep-25', var: 65, cleanPnl: 175, threshold: 250 },
  { month: 'Oct-25', var: 125, cleanPnl: 215, threshold: 250 },
  { month: 'Nov-25', var: 70, cleanPnl: 155, threshold: 250 },
  { month: 'Dec-25', var: 55, cleanPnl: 175, threshold: 250 },
  { month: 'Jan-26', var: 160, cleanPnl: 210, threshold: 250 },
  { month: 'Feb-26', var: 35, cleanPnl: 160, threshold: 250 },
  { month: 'Mar-26', var: 100, cleanPnl: 210, threshold: 250 },
];

export const mockStressMaxLossChartSeries: StressMaxLossChartPoint[] = [
  { month: 'Jan-25', var: 120, cleanPnl: 245, threshold: 250 },
  { month: 'Feb-25', var: 230, cleanPnl: 250, threshold: 250 },
  { month: 'Mar-25', var: 210, cleanPnl: 260, threshold: 250 },
  { month: 'Apr-25', var: 80, cleanPnl: 145, threshold: 250 },
  { month: 'May-25', var: 95, cleanPnl: 170, threshold: 250 },
  { month: 'Jun-25', var: 205, cleanPnl: 185, threshold: 250 },
  { month: 'Jul-25', var: 75, cleanPnl: 220, threshold: 250 },
  { month: 'Aug-25', var: 190, cleanPnl: 155, threshold: 250 },
  { month: 'Sep-25', var: 65, cleanPnl: 175, threshold: 250 },
  { month: 'Oct-25', var: 125, cleanPnl: 215, threshold: 250 },
  { month: 'Nov-25', var: 70, cleanPnl: 155, threshold: 250 },
  { month: 'Dec-25', var: 55, cleanPnl: 175, threshold: 250 },
  { month: 'Jan-26', var: 160, cleanPnl: 210, threshold: 250 },
  { month: 'Feb-26', var: 35, cleanPnl: 160, threshold: 250 },
  { month: 'Mar-26', var: 100, cleanPnl: 210, threshold: 250 },
];

export const mockRiskDriverSeries: RiskDriverSeries[] = [
  {
    title: 'Market Data Drivers',
    subtitle: 'DoD',
    items: [
      { name: 'ABC USD', changePct: '+3%', points: [4, 8, 6, 7, 5, 9] },
      { name: 'DEF USD', changePct: '+11%', points: [5, 7, 6, 7, 8, 12] },
      { name: 'HIJ USD', changePct: '-14%', points: [7, 9, 6, 8, 5, 7] },
    ],
  },
  {
    title: 'Market Data Drivers',
    subtitle: 'Scenario Day',
    items: [
      { name: 'KLM USD', changePct: '+5%', points: [6, 7, 11, 8, 9, 7] },
      { name: 'NOP USD', changePct: '+14%', points: [3, 5, 8, 7, 8, 9] },
      { name: 'QRS USD', changePct: '-11%', points: [8, 11, 9, 10, 8, 9] },
    ],
  },
];
