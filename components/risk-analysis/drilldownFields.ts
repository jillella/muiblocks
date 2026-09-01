/**
 * Field catalog for the VaR > Risk Analysis page.
 *
 * Field ids are the *verbatim* keys from the consolidated sensitivity API
 * (`/consolidated-sensitivity`), so swapping the mock for the live endpoint is
 * a data-source change with no field mapping layer. Dimensions are the
 * attributes a user can drag into the drilldown hierarchy; measures are the
 * aggregated numeric columns. Everything the grid and the right-hand panel
 * render is derived from these two lists.
 */

/**
 * One leaf row of the API's `data` array.
 *
 * `agg_market_value`, `agg_var` and `agg_svar` are *not* in the consolidated
 * sensitivity response — that endpoint only carries sensitivities. They are
 * placeholders in the same `agg_` convention, standing in for the VaR feed
 * until its real column names are known.
 */
export interface DrilldownRow {
  PRDM_ENTITY_NM: string;
  enterprise_trade_book_covered_position_flag: boolean;
  enterprise_trade_book_strategy_name: string;
  cuso_indicator: string;
  bhc_indicator: string;
  CATEGORY_NM: string;
  ProductLevel1_NM: string;
  ProductLevel2_NM: string;
  EFFECT_CURRENCY_CD: string;
  REFERENCE_NM: string;
  CURRENCY_CD: string;
  CURVE_NM: string;
  OPTION_TIME_CD: string;
  TENOR_CD: string;
  STRIKE_AM: number;
  RF_CLASS_CD: string;
  RF_SUBCLASS_CD: string;
  RF_TYPE_CD: string;
  agg_market_value: number;
  agg_delta: number;
  agg_gamma: number;
  agg_close_am: number;
  agg_var: number;
  agg_svar: number;
  TS_TICKER_USSPARC: string;
  TS_TICKER_MARX: string;
  REVAL_LOCATION_NM: string;
  group_nm: string;
  ELF_ENTITY_NM: string;
  query_name: string;
}

/** Envelope the API wraps `data` in. */
export interface ConsolidatedSensitivityResponse {
  status: string;
  message: string;
  data: DrilldownRow[];
}

export type AttributeCategoryId =
  | 'entity'
  | 'product'
  | 'riskFactor'
  | 'ticker';

export interface AttributeCategory {
  id: AttributeCategoryId;
  label: string;
}

export const attributeCategories: AttributeCategory[] = [
  { id: 'entity', label: 'Entity & Book' },
  { id: 'product', label: 'Product' },
  { id: 'riskFactor', label: 'Risk Factor' },
  { id: 'ticker', label: 'Tickers & Lineage' },
];

export type DimensionFieldId =
  | 'PRDM_ENTITY_NM'
  | 'ELF_ENTITY_NM'
  | 'enterprise_trade_book_strategy_name'
  | 'enterprise_trade_book_covered_position_flag'
  | 'cuso_indicator'
  | 'bhc_indicator'
  | 'group_nm'
  | 'REVAL_LOCATION_NM'
  | 'CATEGORY_NM'
  | 'ProductLevel1_NM'
  | 'ProductLevel2_NM'
  | 'RF_CLASS_CD'
  | 'RF_SUBCLASS_CD'
  | 'RF_TYPE_CD'
  | 'CURVE_NM'
  | 'CURRENCY_CD'
  | 'EFFECT_CURRENCY_CD'
  | 'TENOR_CD'
  | 'OPTION_TIME_CD'
  | 'REFERENCE_NM'
  | 'STRIKE_AM'
  | 'TS_TICKER_USSPARC'
  | 'TS_TICKER_MARX'
  | 'query_name';

export type AttributeIconKey =
  | 'folder'
  | 'entity'
  | 'strategy'
  | 'flag'
  | 'indicator'
  | 'location'
  | 'query'
  | 'diamond'
  | 'currency'
  | 'tenor'
  | 'curve'
  | 'reference'
  | 'strike'
  | 'ticker';

/**
 * Drives the grid's filter type and cell formatting. The API sends
 * `STRIKE_AM` as a number and the covered-position flag as a boolean, so a set
 * filter over raw values would be wrong for both.
 */
export type DimensionValueType = 'text' | 'number' | 'boolean';

export interface DimensionField {
  id: DimensionFieldId;
  /** Label shown in the right-hand attribute panel. */
  label: string;
  /** Grid header, kept as the raw API key so the contract is visible. */
  columnHeader: string;
  category: AttributeCategoryId;
  icon: AttributeIconKey;
  valueType?: DimensionValueType;
  /** Width used when the field acts as a group column. */
  width: number;
}

export const dimensionFields: DimensionField[] = [
  {
    id: 'PRDM_ENTITY_NM',
    label: 'PRDM Entity',
    columnHeader: 'PRDM_ENTITY_NM',
    category: 'entity',
    icon: 'entity',
    width: 250,
  },
  {
    id: 'ELF_ENTITY_NM',
    label: 'ELF Entity',
    columnHeader: 'ELF_ENTITY_NM',
    category: 'entity',
    icon: 'entity',
    width: 145,
  },
  {
    id: 'enterprise_trade_book_strategy_name',
    label: 'Strategy Name',
    columnHeader: 'enterprise_trade_book_strategy_name',
    category: 'entity',
    icon: 'strategy',
    width: 195,
  },
  {
    id: 'enterprise_trade_book_covered_position_flag',
    label: 'Covered Position Flag',
    columnHeader: 'covered_position_flag',
    category: 'entity',
    icon: 'flag',
    valueType: 'boolean',
    width: 185,
  },
  {
    id: 'cuso_indicator',
    label: 'CUSO Indicator',
    columnHeader: 'cuso_indicator',
    category: 'entity',
    icon: 'indicator',
    width: 155,
  },
  {
    id: 'bhc_indicator',
    label: 'BHC Indicator',
    columnHeader: 'bhc_indicator',
    category: 'entity',
    icon: 'indicator',
    width: 145,
  },
  {
    id: 'group_nm',
    label: 'Group',
    columnHeader: 'group_nm',
    category: 'entity',
    icon: 'folder',
    width: 115,
  },
  {
    id: 'REVAL_LOCATION_NM',
    label: 'Reval Location',
    columnHeader: 'REVAL_LOCATION_NM',
    category: 'entity',
    icon: 'location',
    width: 155,
  },
  {
    id: 'CATEGORY_NM',
    label: 'Category',
    columnHeader: 'CATEGORY_NM',
    category: 'product',
    icon: 'folder',
    width: 140,
  },
  {
    id: 'ProductLevel1_NM',
    label: 'Product Level 1',
    columnHeader: 'ProductLevel1_NM',
    category: 'product',
    icon: 'folder',
    width: 195,
  },
  {
    id: 'ProductLevel2_NM',
    label: 'Product Level 2',
    columnHeader: 'ProductLevel2_NM',
    category: 'product',
    icon: 'folder',
    width: 260,
  },
  {
    id: 'RF_CLASS_CD',
    label: 'RF Class',
    columnHeader: 'RF_CLASS_CD',
    category: 'riskFactor',
    icon: 'diamond',
    width: 125,
  },
  {
    id: 'RF_SUBCLASS_CD',
    label: 'RF SubClass',
    columnHeader: 'RF_SUBCLASS_CD',
    category: 'riskFactor',
    icon: 'diamond',
    width: 145,
  },
  {
    id: 'RF_TYPE_CD',
    label: 'RF Type',
    columnHeader: 'RF_TYPE_CD',
    category: 'riskFactor',
    icon: 'diamond',
    width: 140,
  },
  {
    id: 'CURVE_NM',
    label: 'Curve',
    columnHeader: 'CURVE_NM',
    category: 'riskFactor',
    icon: 'curve',
    width: 165,
  },
  {
    id: 'CURRENCY_CD',
    label: 'Currency',
    columnHeader: 'CURRENCY_CD',
    category: 'riskFactor',
    icon: 'currency',
    width: 130,
  },
  {
    id: 'EFFECT_CURRENCY_CD',
    label: 'Effect Currency',
    columnHeader: 'EFFECT_CURRENCY_CD',
    category: 'riskFactor',
    icon: 'currency',
    width: 175,
  },
  {
    id: 'TENOR_CD',
    label: 'Tenor',
    columnHeader: 'TENOR_CD',
    category: 'riskFactor',
    icon: 'tenor',
    width: 115,
  },
  {
    id: 'OPTION_TIME_CD',
    label: 'Option Time',
    columnHeader: 'OPTION_TIME_CD',
    category: 'riskFactor',
    icon: 'tenor',
    width: 145,
  },
  {
    id: 'REFERENCE_NM',
    label: 'Reference',
    columnHeader: 'REFERENCE_NM',
    category: 'riskFactor',
    icon: 'reference',
    width: 180,
  },
  {
    id: 'STRIKE_AM',
    label: 'Strike',
    columnHeader: 'STRIKE_AM',
    category: 'riskFactor',
    icon: 'strike',
    valueType: 'number',
    width: 115,
  },
  {
    id: 'TS_TICKER_USSPARC',
    label: 'US SPARC Ticker',
    columnHeader: 'TS_TICKER_USSPARC',
    category: 'ticker',
    icon: 'ticker',
    width: 265,
  },
  {
    id: 'TS_TICKER_MARX',
    label: 'MARX Ticker',
    columnHeader: 'TS_TICKER_MARX',
    category: 'ticker',
    icon: 'ticker',
    width: 235,
  },
  {
    id: 'query_name',
    label: 'Query Name',
    columnHeader: 'query_name',
    category: 'ticker',
    icon: 'query',
    width: 185,
  },
];

export const dimensionFieldById = new Map(
  dimensionFields.map((field) => [field.id, field])
);

export type MeasureFieldId =
  | 'agg_market_value'
  | 'agg_delta'
  | 'agg_gamma'
  | 'agg_close_am'
  | 'agg_var'
  | 'agg_svar';

export interface MeasureField {
  id: MeasureFieldId;
  label: string;
  columnHeader: string;
  /**
   * `sum` measures are additive across the hierarchy. `none` is kept for
   * measures that are not — a VaR column would use it so group rows render an
   * em dash instead of an overstated total.
   */
  aggregation: 'sum' | 'none';
  width: number;
}

export const measureFields: MeasureField[] = [
  {
    id: 'agg_market_value',
    label: 'Market Value (USD)',
    columnHeader: 'agg_market_value',
    aggregation: 'sum',
    width: 180,
  },
  {
    id: 'agg_delta',
    label: 'Delta',
    columnHeader: 'agg_delta',
    aggregation: 'sum',
    width: 150,
  },
  {
    id: 'agg_gamma',
    label: 'Gamma',
    columnHeader: 'agg_gamma',
    aggregation: 'sum',
    width: 140,
  },
  {
    id: 'agg_close_am',
    label: 'Close AM',
    columnHeader: 'agg_close_am',
    aggregation: 'sum',
    width: 170,
  },
  {
    id: 'agg_var',
    label: 'VaR (99%, 1D) (USD)',
    columnHeader: 'agg_var',
    aggregation: 'none',
    width: 180,
  },
  {
    id: 'agg_svar',
    label: 'SVaR (99%, 1D) (USD)',
    columnHeader: 'agg_svar',
    aggregation: 'none',
    width: 185,
  },
];

/** Default drilldown sequence, mirroring the reference AG Grid rendering. */
export const defaultHierarchy: DimensionFieldId[] = [
  'CATEGORY_NM',
  'ProductLevel1_NM',
  'ProductLevel2_NM',
  'CURRENCY_CD',
];
