/**
 * Mock data for VaR > Risk Analysis (`/var/risk-analysis`).
 *
 * `drilldown-rows.json` is a captured-shape copy of the consolidated
 * sensitivity API: same `{ status, message, data }` envelope and the same key
 * names, so swapping in the live endpoint means replacing this import with a
 * fetch and nothing else. `data` holds flat leaf rows keyed on every dimension
 * in the field catalog, so AG Grid can aggregate any permutation of the
 * drilldown hierarchy without pre-built parents.
 *
 * Regenerate with `node scripts/gen-drilldown-mock.mjs`.
 */

import type {
  ConsolidatedSensitivityResponse,
  DrilldownRow,
} from '@/components/risk-analysis/drilldownFields';
import response from './drilldown-rows.json';

export const mockDrilldownResponse =
  response as ConsolidatedSensitivityResponse;

export const mockDrilldownRows = mockDrilldownResponse.data;

/**
 * Stand-in for the diversification benefit the risk engine reports. VaR is
 * sub-additive, so a portfolio number is always below the sum of its parts;
 * the summary cards apply this factor rather than pretending VaR adds up.
 */
export const DIVERSIFICATION_FACTOR = 0.62;

export interface DrilldownTotals {
  rowCount: number;
  riskFactorCount: number;
  marketValue: number;
  delta: number;
  gamma: number;
  closeAm: number;
  varUsd: number;
  svarUsd: number;
}

/** A risk factor is a distinct curve x risk-factor-type pairing. */
export function computeTotals(source: DrilldownRow[]): DrilldownTotals {
  const riskFactors = new Set<string>();
  let marketValue = 0;
  let delta = 0;
  let gamma = 0;
  let closeAm = 0;
  let varSum = 0;
  let svarSum = 0;

  for (const row of source) {
    riskFactors.add(`${row.CURVE_NM}|${row.RF_TYPE_CD}`);
    marketValue += row.agg_market_value;
    delta += row.agg_delta;
    gamma += row.agg_gamma;
    closeAm += row.agg_close_am;
    varSum += row.agg_var;
    svarSum += row.agg_svar;
  }

  return {
    rowCount: source.length,
    riskFactorCount: riskFactors.size,
    marketValue,
    delta,
    gamma,
    closeAm,
    varUsd: varSum * DIVERSIFICATION_FACTOR,
    svarUsd: svarSum * DIVERSIFICATION_FACTOR,
  };
}
