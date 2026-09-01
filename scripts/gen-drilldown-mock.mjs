/**
 * One-off generator for components/risk-analysis/drilldown-rows.json.
 *
 * Mirrors the consolidated sensitivity API response: same envelope, same key
 * names, same value conventions (empty-string codes, -1 strike sentinel,
 * ticker string formats). `agg_market_value`, `agg_var` and `agg_svar` are not
 * in that endpoint and stand in for the VaR feed.
 *
 * Seeded so the committed mock is stable across regenerations.
 *   node scripts/gen-drilldown-mock.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const ROW_TARGET = 400;

function mulberry32(seed) {
  return function rand() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20260901);
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const between = (lo, hi) => lo + rand() * (hi - lo);
const round = (v, d = 2) => Number(v.toFixed(d));

const books = [
  {
    PRDM_ENTITY_NM: 'SMBC CAPITAL MARKETS INC',
    ELF_ENTITY_NM: 'SBCM',
    cuso_indicator: 'CUSO ENTITY',
    bhc_indicator: 'BHC',
    group_nm: 'A1',
    strategies: ['NY XVA Hedging', 'NY Linear Trading'],
  },
  {
    PRDM_ENTITY_NM: 'SMBC CAPITAL MARKETS INC',
    ELF_ENTITY_NM: 'SBCM',
    cuso_indicator: 'CUSO ENTITY',
    bhc_indicator: 'BHC',
    group_nm: 'A21',
    strategies: ['NY Rates Options', 'NY Linear Trading'],
  },
  {
    PRDM_ENTITY_NM: 'SMBC DERIVATIVE PRODUCTS LTD',
    ELF_ENTITY_NM: 'SBDP',
    cuso_indicator: 'CUSO ENTITY',
    bhc_indicator: 'BHC',
    group_nm: 'A7',
    strategies: ['NY XVA Hedging'],
  },
  {
    PRDM_ENTITY_NM: 'SMBC NIKKO SECURITIES AMERICA INC',
    ELF_ENTITY_NM: 'SNAI',
    cuso_indicator: 'NON-CUSO',
    bhc_indicator: 'NON-BHC',
    group_nm: 'A21',
    strategies: ['NY Credit Flow'],
  },
];

/**
 * `legs` mirror the RF_SUBCLASS_CD / RF_TYPE_CD / CURVE_NM triples seen in the
 * API sample. `option` legs are the only ones carrying an option time, a real
 * strike and an underlying tenor.
 */
const products = [
  {
    CATEGORY_NM: 'CCS',
    ProductLevel1_NM: 'Cross Currency Swap',
    ProductLevel2_NM: 'Cross Currency Swap',
    RF_CLASS_CD: 'IR',
    query_name: 'Q1_IR_NON_FUTURES',
    legs: [
      { RF_SUBCLASS_CD: 'Basis', RF_TYPE_CD: 'Xccy Basis', CURVE_NM: 'FX_Basis' },
      { RF_SUBCLASS_CD: 'Base', RF_TYPE_CD: 'OTC', CURVE_NM: 'Swap' },
    ],
  },
  {
    CATEGORY_NM: 'IRS',
    ProductLevel1_NM: 'Interest Rate Swap',
    ProductLevel2_NM: 'Interest Rate Swap',
    RF_CLASS_CD: 'IR',
    query_name: 'Q1_IR_NON_FUTURES',
    legs: [
      { RF_SUBCLASS_CD: 'Base', RF_TYPE_CD: 'OTC', CURVE_NM: 'Swap' },
      {
        RF_SUBCLASS_CD: 'Basis',
        RF_TYPE_CD: 'Index Basis',
        CURVE_NM: 'USDOIS_Basis',
      },
    ],
  },
  {
    CATEGORY_NM: 'BIRO',
    ProductLevel1_NM: 'Swaption',
    ProductLevel2_NM: 'Bermudan Interest Rate Option (Swaption)',
    RF_CLASS_CD: 'IR',
    query_name: 'Q1_IR_NON_FUTURES',
    legs: [
      { RF_SUBCLASS_CD: 'Base', RF_TYPE_CD: 'OTC', CURVE_NM: 'Swap' },
      {
        RF_SUBCLASS_CD: 'Vol',
        RF_TYPE_CD: 'Swaption',
        CURVE_NM: 'Swaption_Vol',
        option: true,
      },
    ],
  },
  {
    CATEGORY_NM: 'LDO',
    ProductLevel1_NM: 'Listed Derivative Option',
    ProductLevel2_NM: 'Listed Derivative Option',
    RF_CLASS_CD: 'IR',
    query_name: 'Q1_IR_FUTURES',
    legs: [
      { RF_SUBCLASS_CD: 'Base', RF_TYPE_CD: 'Exchange', CURVE_NM: 'Swap' },
      {
        RF_SUBCLASS_CD: 'Vol',
        RF_TYPE_CD: 'Exchange',
        CURVE_NM: 'Future_Vol',
        option: true,
      },
    ],
  },
  {
    CATEGORY_NM: 'FRA',
    ProductLevel1_NM: 'Forward Rate Agreement',
    ProductLevel2_NM: 'Forward Rate Agreement',
    RF_CLASS_CD: 'IR',
    query_name: 'Q1_IR_FUTURES',
    legs: [
      { RF_SUBCLASS_CD: 'Base', RF_TYPE_CD: 'OTC', CURVE_NM: 'Swap' },
    ],
  },
  {
    CATEGORY_NM: 'IndexFX',
    ProductLevel1_NM: 'FX Index Option',
    ProductLevel2_NM: 'FX Index Option',
    RF_CLASS_CD: 'FX',
    query_name: 'Q1_FX_NON_FUTURES',
    legs: [
      { RF_SUBCLASS_CD: 'Spot', RF_TYPE_CD: 'FX Spot', CURVE_NM: 'FX_Basis' },
      {
        RF_SUBCLASS_CD: 'Vol',
        RF_TYPE_CD: 'OTC',
        CURVE_NM: 'FX_Vol',
        option: true,
      },
    ],
  },
  {
    CATEGORY_NM: 'TRS',
    ProductLevel1_NM: 'Total Return Swap',
    ProductLevel2_NM: 'Total Return Swap',
    RF_CLASS_CD: 'CR',
    query_name: 'Q1_CR_NON_FUTURES',
    legs: [
      {
        RF_SUBCLASS_CD: 'Base',
        RF_TYPE_CD: 'Index Basis',
        CURVE_NM: 'CDX_Curve',
      },
    ],
  },
];

const currencies = ['USD', 'CAD', 'EUR', 'GBP', 'JPY'];

/** Overnight index per currency, used by the US SPARC ticker for base legs. */
const rfrByCurrency = {
  USD: 'SOFR',
  CAD: 'CORRA',
  EUR: 'ESTR',
  GBP: 'SONIA',
  JPY: 'TONA',
};

/** REFERENCE_NM values, with the MARX day count the ticker suffix uses. */
const references = [
  { REFERENCE_NM: '1D', days: 1 },
  { REFERENCE_NM: '1W', days: 7 },
  { REFERENCE_NM: '1M', days: 30 },
  { REFERENCE_NM: '2M', days: 60 },
  { REFERENCE_NM: '3M', days: 90 },
  { REFERENCE_NM: '6M', days: 180 },
  { REFERENCE_NM: '1Y', days: 365 },
  { REFERENCE_NM: '2Y', days: 730 },
  { REFERENCE_NM: '5Y', days: 1825 },
  { REFERENCE_NM: '10Y', days: 3650 },
  { REFERENCE_NM: '12Y', days: 4380 },
  { REFERENCE_NM: '15Y', days: 5475 },
  { REFERENCE_NM: '30Y', days: 10950 },
  { REFERENCE_NM: '3MonthIMMFuture', days: 100003 },
];

const optionTimes = ['1M', '3M', '6M', '1Y', '2Y'];
const underlyingTenors = ['2Y', '5Y', '10Y', '30Y'];

const marxCurveToken = {
  FX_Basis: 'FXBASIS',
  Swap: 'OTC',
  USDOIS_Basis: 'OIS',
  Swaption_Vol: 'SWAPTIONVOL',
  Future_Vol: 'FUTVOL',
  FX_Vol: 'FXVOL',
  CDX_Curve: 'CDX',
};

const usSparcTicker = (leg, product, currency, reference) =>
  leg.RF_SUBCLASS_CD === 'Base'
    ? `USSTS.${product.RF_CLASS_CD}_${currency}_${rfrByCurrency[currency]}.${reference}`
    : `USSTS.${product.RF_CLASS_CD}_${currency}_${currency} ${leg.RF_TYPE_CD}.${reference}`;

const marxTicker = (leg, currency, days) =>
  `MR_CM_${marxCurveToken[leg.CURVE_NM]}_CM${currency}(T${days})`;

/**
 * The API repeats one close amount across every sensitivity row of a book, so
 * it is keyed per book+strategy+currency here rather than per row.
 */
const closeAmounts = new Map();
const closeAmountFor = (key) => {
  if (!closeAmounts.has(key)) {
    closeAmounts.set(key, between(-4_800_000, 2_600_000));
  }
  return closeAmounts.get(key);
};

const candidates = [];

for (const book of books) {
  for (const strategy of book.strategies) {
    const coveredFlag = rand() < 0.25;
    const revalLocation = rand() < 0.8 ? 'Reval' : 'Reval_EOD';

    for (const product of products) {
      // Not every book trades every product.
      if (rand() < 0.2) continue;

      for (const leg of product.legs) {
        for (const currency of currencies) {
          if (rand() < 0.35) continue;

          for (const { REFERENCE_NM, days } of references) {
            if (rand() < 0.55) continue;

            const isOption = leg.option === true;
            const isFxSpot = leg.RF_TYPE_CD === 'FX Spot';
            const scale = between(0.3, 3.4);

            const marketValue = round(between(-4_200_000, 6_800_000) * scale);
            const delta = isOption
              ? round(between(-820, 940) * scale)
              : round(between(-760, 1_180) * scale);
            const gamma = isOption || isFxSpot ? round(between(0, 0.9), 2) : 0;
            const varUsd = round(Math.abs(marketValue) * between(0.012, 0.085));

            candidates.push({
              PRDM_ENTITY_NM: book.PRDM_ENTITY_NM,
              enterprise_trade_book_covered_position_flag: coveredFlag,
              enterprise_trade_book_strategy_name: strategy,
              cuso_indicator: book.cuso_indicator,
              bhc_indicator: book.bhc_indicator,
              CATEGORY_NM: product.CATEGORY_NM,
              ProductLevel1_NM: product.ProductLevel1_NM,
              ProductLevel2_NM: product.ProductLevel2_NM,
              EFFECT_CURRENCY_CD: currency,
              REFERENCE_NM,
              CURRENCY_CD: currency,
              CURVE_NM: leg.CURVE_NM,
              OPTION_TIME_CD: isOption ? pick(optionTimes) : '',
              TENOR_CD: isOption ? pick(underlyingTenors) : '',
              STRIKE_AM: isOption ? round(between(0.5, 5.5), 2) : -1,
              RF_CLASS_CD: product.RF_CLASS_CD,
              RF_SUBCLASS_CD: leg.RF_SUBCLASS_CD,
              RF_TYPE_CD: leg.RF_TYPE_CD,
              agg_market_value: marketValue,
              agg_delta: delta,
              agg_gamma: gamma,
              agg_close_am: closeAmountFor(
                `${book.group_nm}|${strategy}|${currency}`
              ),
              agg_var: varUsd,
              agg_svar: round(varUsd * between(1.25, 1.95)),
              TS_TICKER_USSPARC: usSparcTicker(
                leg,
                product,
                currency,
                REFERENCE_NM
              ),
              TS_TICKER_MARX: marxTicker(leg, currency, days),
              REVAL_LOCATION_NM: revalLocation,
              group_nm: book.group_nm,
              ELF_ENTITY_NM: book.ELF_ENTITY_NM,
              query_name: product.query_name,
            });
          }
        }
      }
    }
  }
}

/** Even stride keeps every book and product represented in the trimmed set. */
const stride = candidates.length / ROW_TARGET;
const rows =
  candidates.length <= ROW_TARGET
    ? candidates
    : Array.from(
        { length: ROW_TARGET },
        (_, index) => candidates[Math.floor(index * stride)]
      );

rows.forEach((row) => {
  row.agg_close_am = round(row.agg_close_am);
});

const payload = {
  status: 'success',
  message: 'Consolidated sensitivity view obtained successfully.',
  data: rows,
};

const out = 'components/risk-analysis/drilldown-rows.json';
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, `${JSON.stringify(payload, null, 4)}\n`);
console.log(
  `wrote ${rows.length} of ${candidates.length} candidate rows to ${out}`
);
