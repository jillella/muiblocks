/**
 * Mock data for VaR > Analysis Drilldown (`/var/analysis-drilldown`).
 *
 * `drilldown-rows.json` holds flat leaf rows keyed on every dimension in the
 * field catalog, so AG Grid can aggregate any permutation of the drilldown
 * hierarchy without the mock needing pre-built parents.
 *
 * Regenerate with `node scripts/gen-drilldown-mock.mjs`.
 */

import type { DrilldownRow } from '@/components/var-drilldown/drilldownFields';
import rows from './drilldown-rows.json';

export const mockDrilldownRows = rows as DrilldownRow[];

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
  varUsd: number;
  svarUsd: number;
}

/** A risk factor is a distinct curve x risk-factor-type pairing. */
export function computeTotals(source: DrilldownRow[]): DrilldownTotals {
  const riskFactors = new Set<string>();
  let marketValue = 0;
  let delta = 0;
  let gamma = 0;
  let varSum = 0;
  let svarSum = 0;

  for (const row of source) {
    riskFactors.add(`${row.curve}|${row.rfType}`);
    marketValue += row.marketValue;
    delta += row.delta;
    gamma += row.gamma;
    varSum += row.varUsd;
    svarSum += row.svarUsd;
  }

  return {
    rowCount: source.length,
    riskFactorCount: riskFactors.size,
    marketValue,
    delta,
    gamma,
    varUsd: varSum * DIVERSIFICATION_FACTOR,
    svarUsd: svarSum * DIVERSIFICATION_FACTOR,
  };
}
