/**
 * Field catalog for the VaR drilldown page.
 *
 * Dimensions are the attributes a user can drag into the drilldown hierarchy;
 * measures are the aggregated numeric columns. Everything the grid and the
 * right-hand panel render is derived from these two lists, so adding an
 * attribute is a one-line change here.
 */

export interface DrilldownRow {
  id: string;
  portfolio: string;
  entity: string;
  businessUnit: string;
  desk: string;
  strategy: string;
  book: string;
  categoryNm: string;
  productLevel1: string;
  productLevel2: string;
  currency: string;
  rfClass: string;
  rfSubclass: string;
  rfType: string;
  tenor: string;
  curve: string;
  marketValue: number;
  delta: number;
  gamma: number;
  varUsd: number;
  svarUsd: number;
}

export type AttributeCategoryId = 'portfolio' | 'product' | 'riskFactor';

export interface AttributeCategory {
  id: AttributeCategoryId;
  label: string;
}

export const attributeCategories: AttributeCategory[] = [
  { id: 'portfolio', label: 'Portfolio & Entity' },
  { id: 'product', label: 'Product' },
  { id: 'riskFactor', label: 'Risk Factor' },
];

export type DimensionFieldId =
  | 'portfolio'
  | 'entity'
  | 'desk'
  | 'strategy'
  | 'book'
  | 'categoryNm'
  | 'productLevel1'
  | 'productLevel2'
  | 'currency'
  | 'rfClass'
  | 'rfSubclass'
  | 'rfType'
  | 'tenor'
  | 'curve';

export type AttributeIconKey =
  | 'folder'
  | 'entity'
  | 'desk'
  | 'strategy'
  | 'book'
  | 'diamond'
  | 'currency'
  | 'tenor'
  | 'curve';

export interface DimensionField {
  id: DimensionFieldId;
  /** Label shown in the right-hand attribute panel. */
  label: string;
  /** Column header shown in the grid, mirroring the warehouse column name. */
  columnHeader: string;
  category: AttributeCategoryId;
  icon: AttributeIconKey;
  /** Width used when the field acts as a group column. */
  width: number;
}

export const dimensionFields: DimensionField[] = [
  {
    id: 'portfolio',
    label: 'Portfolio',
    columnHeader: 'PORTFOLIO_NM',
    category: 'portfolio',
    icon: 'folder',
    width: 190,
  },
  {
    id: 'entity',
    label: 'Entity',
    columnHeader: 'ENTITY_NM',
    category: 'portfolio',
    icon: 'entity',
    width: 250,
  },
  {
    id: 'desk',
    label: 'Desk',
    columnHeader: 'DESK_NM',
    category: 'portfolio',
    icon: 'desk',
    width: 170,
  },
  {
    id: 'strategy',
    label: 'Strategy',
    columnHeader: 'STRATEGY_NM',
    category: 'portfolio',
    icon: 'strategy',
    width: 175,
  },
  {
    id: 'book',
    label: 'Book',
    columnHeader: 'BOOK_CD',
    category: 'portfolio',
    icon: 'book',
    width: 130,
  },
  {
    id: 'categoryNm',
    label: 'Category',
    columnHeader: 'CATEGORY_NM',
    category: 'product',
    icon: 'folder',
    width: 140,
  },
  {
    id: 'productLevel1',
    label: 'Product Level 1',
    columnHeader: 'ProductLevel1_NM',
    category: 'product',
    icon: 'folder',
    width: 175,
  },
  {
    id: 'productLevel2',
    label: 'Product Level 2',
    columnHeader: 'ProductLevel2_NM',
    category: 'product',
    icon: 'folder',
    width: 245,
  },
  {
    id: 'currency',
    label: 'Currency',
    columnHeader: 'EFFECT_CURRENCY_CD',
    category: 'riskFactor',
    icon: 'currency',
    width: 155,
  },
  {
    id: 'rfClass',
    label: 'Risk Factor Class',
    columnHeader: 'RF_CLASS_CD',
    category: 'riskFactor',
    icon: 'diamond',
    width: 130,
  },
  {
    id: 'rfSubclass',
    label: 'Risk Factor Subclass',
    columnHeader: 'RF_SUBCLASS_CD',
    category: 'riskFactor',
    icon: 'diamond',
    width: 155,
  },
  {
    id: 'rfType',
    label: 'Risk Factor Type',
    columnHeader: 'RF_TYPE_CD',
    category: 'riskFactor',
    icon: 'diamond',
    width: 140,
  },
  {
    id: 'tenor',
    label: 'Tenor',
    columnHeader: 'TENOR_CD',
    category: 'riskFactor',
    icon: 'tenor',
    width: 110,
  },
  {
    id: 'curve',
    label: 'Curve',
    columnHeader: 'CURVE_NM',
    category: 'riskFactor',
    icon: 'curve',
    width: 175,
  },
];

export const dimensionFieldById = new Map(
  dimensionFields.map((field) => [field.id, field])
);

export type MeasureFieldId =
  'marketValue' | 'delta' | 'gamma' | 'varUsd' | 'svarUsd';

export interface MeasureField {
  id: MeasureFieldId;
  label: string;
  columnHeader: string;
  /**
   * `sum` measures are additive across the hierarchy. `none` measures are not —
   * VaR and SVaR are sub-additive, so summing child values overstates the parent
   * and the grid renders an em dash on group rows instead.
   */
  aggregation: 'sum' | 'none';
  width: number;
}

export const measureFields: MeasureField[] = [
  {
    id: 'marketValue',
    label: 'Market Value (USD)',
    columnHeader: 'Market Value (USD)',
    aggregation: 'sum',
    width: 180,
  },
  {
    id: 'delta',
    label: 'Delta',
    columnHeader: 'Sum of agg_delta',
    aggregation: 'sum',
    width: 170,
  },
  {
    id: 'gamma',
    label: 'Gamma',
    columnHeader: 'Sum of agg_gamma',
    aggregation: 'sum',
    width: 175,
  },
  {
    id: 'varUsd',
    label: 'VaR (99%, 1D) (USD)',
    columnHeader: 'VaR (99%, 1D) (USD)',
    aggregation: 'none',
    width: 180,
  },
  {
    id: 'svarUsd',
    label: 'SVaR (99%, 1D) (USD)',
    columnHeader: 'SVaR (99%, 1D) (USD)',
    aggregation: 'none',
    width: 185,
  },
];

/** Default drilldown sequence, mirroring the mock design. */
export const defaultHierarchy: DimensionFieldId[] = [
  'categoryNm',
  'productLevel1',
  'productLevel2',
];
