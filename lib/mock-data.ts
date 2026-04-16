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
