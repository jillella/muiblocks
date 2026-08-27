/**
 * One-off generator for lib/var-drilldown/drilldown-rows.json.
 * Seeded so the committed mock is stable across regenerations.
 *   node scripts/gen-drilldown-mock.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

function mulberry32(seed) {
  return function rand() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20260827);
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const between = (lo, hi) => lo + rand() * (hi - lo);
const round = (v, d = 2) => Number(v.toFixed(d));

const products = [
  {
    categoryNm: 'BIRO',
    productLevel1: 'Swaption',
    productLevel2: 'Bermudan Interest Rate Option (Swaption)',
    rfClass: 'IR',
    legs: [
      { rfSubclass: 'Base', rfType: 'OTC', curves: ['USD-SOFR', 'EUR-ESTR'] },
      { rfSubclass: 'Basis', rfType: 'Index Basis', curves: ['USD-LIBOR-3M'] },
      { rfSubclass: 'Basis', rfType: 'Xccy Basis', curves: ['USD-EUR-XCCY'] },
      { rfSubclass: 'Vol', rfType: 'Swaption', curves: ['USD-SWAPTION-VOL'] },
    ],
  },
  {
    categoryNm: 'EIRONL',
    productLevel1: 'Swaption',
    productLevel2: 'European Swaption Non-Libor',
    rfClass: 'IR',
    legs: [
      { rfSubclass: 'Base', rfType: 'OTC', curves: ['EUR-ESTR', 'GBP-SONIA'] },
      { rfSubclass: 'Vol', rfType: 'Swaption', curves: ['EUR-SWAPTION-VOL'] },
    ],
  },
  {
    categoryNm: 'BondFutOpt',
    productLevel1: 'BondFutureOption',
    productLevel2: 'BondFutureOption',
    rfClass: 'IR',
    legs: [
      { rfSubclass: 'Base', rfType: 'Exchange', curves: ['USD-SOFR'] },
      { rfSubclass: 'Vol', rfType: 'Exchange', curves: ['UST-FUT-VOL'] },
    ],
  },
  {
    categoryNm: 'BondFuture',
    productLevel1: 'BondFuture',
    productLevel2: 'BondFuture',
    rfClass: 'IR',
    legs: [{ rfSubclass: 'Base', rfType: 'Exchange', curves: ['USD-SOFR'] }],
  },
  {
    categoryNm: 'Cap1M',
    productLevel1: 'Capfloor',
    productLevel2: 'Monthly Cap (1Month Tenor)',
    rfClass: 'IR',
    legs: [
      { rfSubclass: 'Base', rfType: 'OTC', curves: ['USD-SOFR'] },
      { rfSubclass: 'Vol', rfType: 'Cap/Floor', curves: ['USD-CAP-VOL'] },
    ],
  },
  {
    categoryNm: 'Cap1M_Muni',
    productLevel1: 'Capfloor',
    productLevel2: 'Monthly PSA Cap',
    rfClass: 'IR',
    legs: [{ rfSubclass: 'Base', rfType: 'OTC', curves: ['USD-MUNI-AAA'] }],
  },
  {
    categoryNm: 'CapNL',
    productLevel1: 'Capfloor',
    productLevel2: 'Cap Non-Libor (SOFR etc.)',
    rfClass: 'IR',
    legs: [
      { rfSubclass: 'Base', rfType: 'OTC', curves: ['USD-SOFR', 'GBP-SONIA'] },
      { rfSubclass: 'Vol', rfType: 'Cap/Floor', curves: ['USD-CAP-VOL'] },
    ],
  },
  {
    categoryNm: 'IRS',
    productLevel1: 'Interest Rate Swap',
    productLevel2: 'Interest Rate Swap',
    rfClass: 'IR',
    legs: [
      {
        rfSubclass: 'Base',
        rfType: 'OTC',
        curves: ['USD-SOFR', 'EUR-ESTR', 'JPY-TONA'],
      },
      { rfSubclass: 'Basis', rfType: 'Index Basis', curves: ['USD-LIBOR-3M'] },
    ],
  },
  {
    categoryNm: 'Muni',
    productLevel1: 'Interest Rate Swap',
    productLevel2: 'PSA Interest Rate Swap (Muni)',
    rfClass: 'IR',
    legs: [{ rfSubclass: 'Base', rfType: 'OTC', curves: ['USD-MUNI-AAA'] }],
  },
  {
    categoryNm: 'OIS',
    productLevel1: 'Interest Rate Swap',
    productLevel2: 'Interest Rate Swap (OIS index)',
    rfClass: 'IR',
    legs: [
      { rfSubclass: 'Base', rfType: 'OTC', curves: ['USD-SOFR', 'GBP-SONIA'] },
    ],
  },
  {
    categoryNm: 'SFRO',
    productLevel1: 'SOFRFUTUREOption',
    productLevel2: 'SOFRFUTUREOption',
    rfClass: 'IR',
    legs: [
      { rfSubclass: 'Base', rfType: 'Exchange', curves: ['USD-SOFR'] },
      { rfSubclass: 'Vol', rfType: 'Exchange', curves: ['SOFR-FUT-VOL'] },
    ],
  },
  {
    categoryNm: 'FXFWD',
    productLevel1: 'FX Forward',
    productLevel2: 'FX Outright Forward',
    rfClass: 'FX',
    legs: [
      {
        rfSubclass: 'Spot',
        rfType: 'FX Spot',
        curves: ['FX-EURUSD', 'FX-USDJPY'],
      },
      { rfSubclass: 'Basis', rfType: 'Xccy Basis', curves: ['USD-EUR-XCCY'] },
    ],
  },
  {
    categoryNm: 'FXOPT',
    productLevel1: 'FX Option',
    productLevel2: 'FX Vanilla Option',
    rfClass: 'FX',
    legs: [
      {
        rfSubclass: 'Spot',
        rfType: 'FX Spot',
        curves: ['FX-EURUSD', 'FX-GBPUSD'],
      },
      { rfSubclass: 'Vol', rfType: 'OTC', curves: ['FX-EURUSD-VOL'] },
    ],
  },
  {
    categoryNm: 'CDXIG',
    productLevel1: 'Credit Index',
    productLevel2: 'CDX IG Index Swap',
    rfClass: 'CR',
    legs: [
      { rfSubclass: 'Base', rfType: 'Index Basis', curves: ['CDX-IG-5Y'] },
      { rfSubclass: 'Curve', rfType: 'OTC', curves: ['CDX-IG-CURVE'] },
    ],
  },
  {
    categoryNm: 'CDSSN',
    productLevel1: 'Credit Default Swap',
    productLevel2: 'Single Name CDS',
    rfClass: 'CR',
    legs: [{ rfSubclass: 'Base', rfType: 'OTC', curves: ['CDS-SN-CURVE'] }],
  },
];

const portfolios = [
  {
    portfolio: 'US Rates Trading',
    businessUnit: 'CM-DPG',
    entity: 'SMBC CAPITAL MARKETS INC',
    desks: ['Linear Rates', 'Rates Options'],
  },
  {
    portfolio: 'Structured Rates',
    businessUnit: 'CM-DPG',
    entity: 'SMBC DERIVATIVES PRODUCTS LTD',
    desks: ['Rates Options', 'Futures & Listed'],
  },
  {
    portfolio: 'Municipal Products',
    businessUnit: 'Non-DPG',
    entity: 'SMBC NIKKO SECURITIES AMERICA INC',
    desks: ['Muni Desk'],
  },
  {
    portfolio: 'Global Credit',
    businessUnit: 'CM-DPG',
    entity: 'SMBC CAPITAL MARKETS INC',
    desks: ['Credit Flow'],
  },
  {
    portfolio: 'FX & EM',
    businessUnit: 'Non-DPG',
    entity: 'SMBC NY BRANCH',
    desks: ['FX Options', 'Linear Rates'],
  },
];

const strategies = [
  'Directional',
  'Relative Value',
  'Client Facilitation',
  'Hedge Overlay',
  'Basis',
];

const tenors = ['1M', '3M', '6M', '1Y', '2Y', '5Y', '10Y', '30Y'];

const currencyForCurve = (curve) => {
  if (
    curve.startsWith('EUR') ||
    curve === 'FX-EURUSD' ||
    curve === 'FX-EURUSD-VOL'
  )
    return 'EUR';
  if (curve.startsWith('GBP') || curve === 'FX-GBPUSD') return 'GBP';
  if (curve.startsWith('JPY') || curve === 'FX-USDJPY') return 'JPY';
  return 'USD';
};

const rows = [];
let seq = 0;

for (const pf of portfolios) {
  for (const desk of pf.desks) {
    const bookCount = 3 + Math.floor(rand() * 3);
    for (let b = 0; b < bookCount; b += 1) {
      const book = `BK-${1000 + ((seq * 7) % 400)}`;
      const strategy = pick(strategies);

      for (const product of products) {
        // Not every book trades every product.
        if (rand() < 0.28) continue;

        for (const leg of product.legs) {
          for (const curve of leg.curves) {
            if (rand() < 0.16) continue;

            const isVol = leg.rfSubclass === 'Vol';
            const isFxSpot = leg.rfType === 'FX Spot';
            const scale = between(0.4, 3.2);

            const marketValue = round(between(-4_200_000, 6_800_000) * scale);
            const delta = isVol
              ? round(between(-180_000, 240_000) * scale)
              : round(marketValue * between(0.55, 1.05));
            const gamma =
              isVol || isFxSpot ? round(between(-9_000, 62_000) * scale) : 0;
            const varUsd = round(Math.abs(marketValue) * between(0.012, 0.085));
            const svarUsd = round(varUsd * between(1.25, 1.95));

            rows.push({
              id: `R${String(seq).padStart(5, '0')}`,
              portfolio: pf.portfolio,
              entity: pf.entity,
              businessUnit: pf.businessUnit,
              desk,
              strategy,
              book,
              categoryNm: product.categoryNm,
              productLevel1: product.productLevel1,
              productLevel2: product.productLevel2,
              currency: currencyForCurve(curve),
              rfClass: product.rfClass,
              rfSubclass: leg.rfSubclass,
              rfType: leg.rfType,
              tenor: isFxSpot ? 'Spot' : pick(tenors),
              curve,
              marketValue,
              delta,
              gamma,
              varUsd,
              svarUsd,
            });
            seq += 1;
          }
        }
      }
    }
  }
}

const out = 'lib/var-drilldown/drilldown-rows.json';
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, `${JSON.stringify(rows, null, 0)}\n`);
console.log(`wrote ${rows.length} rows to ${out}`);
