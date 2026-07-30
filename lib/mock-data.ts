import { addDays, format } from 'date-fns';

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

export interface VarBacktestingCobRow {
  COB_DATE: string;
  VAR_AM: string;
  CLEANPNL: string;
  limit: number;
}

export interface StressMaxLossCobRow {
  COB_DATE: string;
  MAXLOSS: string;
  CLEANPNL: number;
  limit: number;
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

export interface FxSpotPerformingItem {
  name: string;
  changePct: string;
  points: number[];
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

export const mockVarBacktestingChartSeries: VarBacktestingCobRow[] = [
  { COB_DATE: '2026-04-07', VAR_AM: '3756551.87', CLEANPNL: '1089884.18', limit: 250 },
  { COB_DATE: '2026-04-06', VAR_AM: '3529136.06', CLEANPNL: '-627690.8', limit: 250 },
  { COB_DATE: '2026-04-03', VAR_AM: '3559587.83', CLEANPNL: '-276687.87', limit: 250 },
  { COB_DATE: '2026-04-02', VAR_AM: '3583356.05', CLEANPNL: '5514471.51', limit: 250 },
  { COB_DATE: '2026-04-01', VAR_AM: '3301665.4', CLEANPNL: '-937976.6', limit: 250 },
  { COB_DATE: '2026-03-31', VAR_AM: '3922026.37', CLEANPNL: '-2578974.3', limit: 250 },
  { COB_DATE: '2026-03-30', VAR_AM: '4710327.81', CLEANPNL: '-5016843.8', limit: 250 },
  { COB_DATE: '2026-03-27', VAR_AM: '4132442.12', CLEANPNL: '2073122.4', limit: 250 },
  { COB_DATE: '2026-03-26', VAR_AM: '3640190.22', CLEANPNL: '1310033.1', limit: 250 },
  { COB_DATE: '2026-03-25', VAR_AM: '3981121.55', CLEANPNL: '1400000.0', limit: 250 },
  { COB_DATE: '2026-03-24', VAR_AM: '3487455.9', CLEANPNL: '-820991.4', limit: 250 },
  { COB_DATE: '2026-03-23', VAR_AM: '4011330.01', CLEANPNL: '224411.8', limit: 250 },
];

export const mockStressMaxLossChartSeries: StressMaxLossCobRow[] = [
  { COB_DATE: '2026-04-03', MAXLOSS: '189826871.90', CLEANPNL: -276687.87, limit: 250 },
  { COB_DATE: '2026-03-27', MAXLOSS: '260732942.80', CLEANPNL: -2805689.7, limit: 250 },
  { COB_DATE: '2026-03-20', MAXLOSS: '294280645.50', CLEANPNL: -2022666.2, limit: 250 },
  { COB_DATE: '2026-03-13', MAXLOSS: '153516767.70', CLEANPNL: 637673.26, limit: 250 },
  { COB_DATE: '2026-03-06', MAXLOSS: '146241305.80', CLEANPNL: -2171977.0, limit: 250 },
  { COB_DATE: '2026-02-27', MAXLOSS: '151353572.60', CLEANPNL: 3025456.68, limit: 250 },
  { COB_DATE: '2026-02-20', MAXLOSS: '127296728.70', CLEANPNL: -634089.82, limit: 250 },
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

export const mockFxSpotTopPerforming: FxSpotPerformingItem[] = [
  { name: 'ABC USD', changePct: '+5%', points: [4, 7, 5, 8, 6, 9, 7] },
  { name: 'HIJ USD', changePct: '+5%', points: [5, 6, 8, 7, 9, 8, 10] },
  { name: 'DEF USD', changePct: '+14', points: [3, 5, 7, 9, 8, 11, 12] },
  { name: 'KLM USD', changePct: '+14', points: [4, 6, 8, 10, 9, 12, 13] },
];

// --- CDX Index (grouped bar chart)
// API contract: pass the same shape to CdxIndexChartCard `data` (map response in the fetch layer if needed).

export interface CdxIndexRow {
  /** ISO date (YYYY-MM-DD), e.g. API period / COB */
  asOfDate: string;
  legendOne: number;
  legendTwo: number;
  legendThree: number;
  legendFour: number;
  legendFive: number;
}

export const mockCdxIndexData: CdxIndexRow[] = [
  { asOfDate: '2025-07-01', legendOne: 2, legendTwo: 11, legendThree: 3, legendFour: 8, legendFive: 2 },
  { asOfDate: '2025-08-01', legendOne: 3, legendTwo: 7, legendThree: 5, legendFour: 6, legendFive: 3 },
  { asOfDate: '2025-09-01', legendOne: 2, legendTwo: 6, legendThree: 3, legendFour: 10, legendFive: 4 },
  { asOfDate: '2025-10-01', legendOne: 4, legendTwo: 9, legendThree: 7, legendFour: 3, legendFive: 5 },
  { asOfDate: '2025-11-01', legendOne: 5, legendTwo: 3, legendThree: 9, legendFour: 8, legendFive: 2 },
  { asOfDate: '2025-12-01', legendOne: 3, legendTwo: 10, legendThree: 2, legendFour: 11, legendFive: 4 },
];

// --- SVaR Window Calibration (chart + calibration table)

export interface SvarWindowCalibrationPoint {
  date: string;
  label: string;
  svarBillions: number;
}

const SVAR_FRIDAY_START = new Date(2026, 2, 27);

export const mockSvarWindowCalibrationPoints: SvarWindowCalibrationPoint[] = (() => {
  const svar = [18.2, 21.4, 19.8, 24.5, 27.9, 32.1, 30.4, 28.0, 25.3, 22.6, 20.1, 18.5];
  return svar.map((value, i) => {
    const d = addDays(SVAR_FRIDAY_START, i * 7);
    return {
      date: d.toISOString(),
      label: format(d, 'MMM d yyyy'),
      svarBillions: value,
    };
  });
})();

export interface SvarWindowCalibrationTableRow {
  cobDate: string;
  varScenarioDate: string;
  windowStart: string;
  windowEnd: string;
  var: number;
}

const SVAR_TABLE_COB_DATE = new Date(2026, 3, 7);
const SVAR_WINDOW_START_BASE = new Date(2007, 0, 3);
const SVAR_VAR_SCENARIO_BASE = new Date(2007, 10, 26);

function formatDateIso(date: Date) {
  return format(date, 'yyyy-MM-dd');
}

/** Large mock grid (~4.6k rows) for SVaR Window calibration list view */
export function mockSvarWindowCalibrationTableRows(): SvarWindowCalibrationTableRow[] {
  return Array.from({ length: 4588 }, (_, idx) => {
    const windowStart = addDays(SVAR_WINDOW_START_BASE, idx);
    const windowEnd = addDays(windowStart, 364);
    const varScenarioDate = addDays(SVAR_VAR_SCENARIO_BASE, -Math.floor(idx / 220));
    return {
      cobDate: formatDateIso(SVAR_TABLE_COB_DATE),
      varScenarioDate: formatDateIso(varScenarioDate),
      windowStart: formatDateIso(windowStart),
      windowEnd: formatDateIso(windowEnd),
      var: idx === 0 ? 2_120_614_041.141 : 871_172_710.885 + ((idx % 17) - 8) * 125_000,
    };
  });
}

// --- Top Drivers (table + bar chart)

export interface TopDriverRow {
  calibrationDate: string;
  oneYearVarWorst: string;
  candidateWindow: string;
  svarProd: string;
  svarWindowProd: string;
  oneYrVarWorst: string;
  oneYearVarWorstMm: number;
}

export const mockTopDriverRows: TopDriverRow[] = [
  {
    calibrationDate: '17-Apr-2026',
    oneYearVarWorst: '15mm',
    candidateWindow: 'Aug-09',
    svarProd: '12mm',
    svarWindowProd: 'Dec-08',
    oneYrVarWorst: 'Dec-08',
    oneYearVarWorstMm: 15,
  },
  {
    calibrationDate: '10-Apr-2026',
    oneYearVarWorst: '12mm',
    candidateWindow: 'Jul-09',
    svarProd: '11mm',
    svarWindowProd: 'Nov-08',
    oneYrVarWorst: 'Nov-08',
    oneYearVarWorstMm: 12,
  },
  {
    calibrationDate: '03-Apr-2026',
    oneYearVarWorst: '11mm',
    candidateWindow: 'Jun-09',
    svarProd: '10mm',
    svarWindowProd: 'Oct-08',
    oneYrVarWorst: 'Oct-08',
    oneYearVarWorstMm: 11,
  },
  {
    calibrationDate: '27-Mar-2026',
    oneYearVarWorst: '9mm',
    candidateWindow: 'May-09',
    svarProd: '8mm',
    svarWindowProd: 'Sep-08',
    oneYrVarWorst: 'Sep-08',
    oneYearVarWorstMm: 9,
  },
  {
    calibrationDate: '20-Mar-2026',
    oneYearVarWorst: '6mm',
    candidateWindow: 'Apr-09',
    svarProd: '7mm',
    svarWindowProd: 'Aug-08',
    oneYrVarWorst: 'Aug-08',
    oneYearVarWorstMm: 6,
  },
];

export function buildMockTopDriverRows(): TopDriverRow[] {
  return mockTopDriverRows;
}

// --- Top Contributors (grouped bar chart + table)

export interface TopContributorRow {
  month: string;
  ir: number;
  fx: number;
  fxVol: number;
  irVol: number;
}

const TOP_CONTRIBUTOR_MONTHS = ['04-2025', '05-2025', '06-2025', '07-2025', '08-2025', '09-2025'];

export function buildMockTopContributorRows(): TopContributorRow[] {
  const seeds = [
    [3.2, 5.8, 4.1, 2.4],
    [4.5, 6.2, 5.0, 3.1],
    [5.1, 7.4, 6.2, 3.8],
    [6.0, 8.1, 7.0, 4.2],
    [7.2, 9.5, 8.4, 5.0],
    [8.0, 10.2, 9.1, 5.6],
  ];
  return TOP_CONTRIBUTOR_MONTHS.map((month, i) => {
    const [ir, fx, fxVol, irVol] = seeds[i] ?? seeds[0];
    return { month, ir, fx, fxVol, irVol };
  });
}

// --- VaR > Analysis : Risk attribution by risk factor (donut)

export interface RiskFactorAttributionSlice {
  factor: string;
  value: number;
  color: string;
}

export const mockRiskFactorAttribution: RiskFactorAttributionSlice[] = [
  { factor: 'IR Base Exchange', value: 34.5, color: '#a99168' },
  { factor: 'IR Vol Caplet', value: 20.4, color: '#d8c48c' },
  { factor: 'IR Vol Swaption', value: 8.6, color: '#7fa79b' },
  { factor: 'Credit Spread', value: 6.9, color: '#3d7f9d' },
  { factor: 'IR Base OTC', value: 7.8, color: '#d9dbd6' },
  { factor: 'IR Basis XCCY Basis', value: 5.2, color: '#8a9491' },
  { factor: 'IR Basis Index Basis', value: 5.6, color: '#5c3f74' },
  { factor: 'IR Basis Tenor Basis', value: 2.6, color: '#b0975f' },
  { factor: 'IR Base Inflation', value: 3.4, color: '#7ba7dc' },
];

// --- VaR > Analysis : Risk attribution by product type (diverging bar)

export interface ProductTypeAttributionRow {
  product: string;
  value: number;
}

export const mockProductTypeAttribution: ProductTypeAttributionRow[] = [
  { product: 'Treasury Bond Repo', value: 52000 },
  { product: 'FX Forward or Swap', value: 43000 },
  { product: 'Cross Currency Swap', value: -14000 },
  { product: 'Swaption', value: 61000 },
  { product: 'Treasury Bond Collateral', value: -35000 },
  { product: 'Treasury Bond', value: 14000 },
  { product: 'Bond Future', value: -44000 },
];

// --- VaR > Analysis : Risk attribution by product type (bubble / risk grade)

export interface RiskGradeBubblePoint {
  grade: number;
  exposure: number;
  size: number;
  product: string;
  color: string;
}

export const mockRiskGradeBubbles: RiskGradeBubblePoint[] = [
  { grade: 8.2, exposure: 74, size: 22, product: 'Treasury Bond Repo', color: '#e2cf9f' },
  { grade: 6.4, exposure: 66, size: 34, product: 'FX Forward or Swap', color: '#d8c9a6' },
  { grade: 11.8, exposure: 70, size: 30, product: 'Swaption', color: '#8fb8cf' },
  { grade: 21.4, exposure: 80, size: 42, product: 'Treasury Bond', color: '#9dc3d8' },
  { grade: 26.8, exposure: 88, size: 20, product: 'Bond Future', color: '#7fa8c4' },
  { grade: 45.2, exposure: 62, size: 28, product: 'Cross Currency Swap', color: '#6f4f8a' },
  { grade: 51.6, exposure: 74, size: 24, product: 'Treasury Bond Collateral', color: '#8aa9c2' },
  { grade: 55.4, exposure: 48, size: 58, product: 'IR Vol Caplet', color: '#e5d3a4' },
  { grade: 63.8, exposure: 40, size: 44, product: 'IR Base OTC', color: '#e0cd9c' },
  { grade: 66.2, exposure: 60, size: 26, product: 'IR Basis XCCY Basis', color: '#9cc0d5' },
  { grade: 71.4, exposure: 66, size: 32, product: 'IR Basis Index Basis', color: '#6f9ec0' },
  { grade: 74.8, exposure: 30, size: 22, product: 'IR Basis Tenor Basis', color: '#a8cfe0' },
  { grade: 82.6, exposure: 84, size: 40, product: 'Credit Spread', color: '#8b93b8' },
  { grade: 86.4, exposure: 78, size: 24, product: 'IR Base Inflation', color: '#dcc998' },
  { grade: 93.2, exposure: 90, size: 26, product: 'IR Vol Swaption', color: '#7e5f96' },
  { grade: 36.8, exposure: 44, size: 26, product: 'FX Vol', color: '#7fa8c4' },
  { grade: 15.4, exposure: 52, size: 24, product: 'Equity Option', color: '#9db4c9' },
  { grade: 4.6, exposure: 34, size: 36, product: 'Commodity Swap', color: '#7c5e94' },
];

// --- VaR > Analysis : Top risk contributor (grid)

export interface TopRiskContributorRow {
  riskClass: string;
  riskSubClass: string;
  subClassColor: string;
  riskType: string;
  product: string;
  productTwo: string;
  ticker: string;
  tickerValue: number;
}

export const mockTopRiskContributorRows: TopRiskContributorRow[] = [
  {
    riskClass: 'IR',
    riskSubClass: 'Base',
    subClassColor: '#2f3f7c',
    riskType: 'Exchange',
    product: 'Treasury Bond',
    productTwo: 'Treasury Bond',
    ticker: 'MR CM Exchange (T1)',
    tickerValue: 12772,
  },
  {
    riskClass: 'IR',
    riskSubClass: 'Base',
    subClassColor: '#2f9e6f',
    riskType: 'Exchange',
    product: 'Treasury Bond',
    productTwo: 'Treasury Bond',
    ticker: 'MR CM Exchange (T2)',
    tickerValue: 12772,
  },
  {
    riskClass: 'IR',
    riskSubClass: 'Base',
    subClassColor: '#3faa72',
    riskType: 'Exchange',
    product: 'Treasury Bond',
    productTwo: 'Treasury Bond',
    ticker: 'MR CM Exchange (T120)',
    tickerValue: 143127,
  },
  {
    riskClass: 'IR',
    riskSubClass: 'Base',
    subClassColor: '#ef8c2b',
    riskType: 'Exchange',
    product: 'Treasury Bond',
    productTwo: 'Treasury Bond',
    ticker: 'MR CM Exchange (T1800)',
    tickerValue: 123721,
  },
  {
    riskClass: 'IR',
    riskSubClass: 'Base',
    subClassColor: '#4bb3e8',
    riskType: 'Exchange',
    product: 'Treasury Bond',
    productTwo: 'Treasury Bond',
    ticker: 'MR CM Exchange (T12600)',
    tickerValue: 18467,
  },
];
