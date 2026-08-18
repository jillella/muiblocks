'use client';

import { Box } from '@mui/material';
import { AgCharts } from 'ag-charts-react';
import { useMemo } from 'react';
import { registerAgModules } from '@/lib/ag-modules';
import type { ContributionVarFactorRow } from '@/lib/mock-data2';
import { useChartFontFamily } from '@/components/var-analysis2/useChartFontFamily';
import { arrowFor, formatSigned, mixHex } from '@/components/var-analysis2/varFormat';

registerAgModules();

/** Thick inner (prior) ring, thin outer (current) ring, white gap between them. */
const CURRENT_RING = { outerRadiusRatio: 1, innerRadiusRatio: 0.88 };
const PRIOR_RING = { outerRadiusRatio: 0.82, innerRadiusRatio: 0.42 };

export type ContributionVarDonutProps = {
  rows: ContributionVarFactorRow[];
  currentTotalMm: number;
  priorTotalMm: number;
  height?: number;
};

export default function ContributionVarDonut({
  rows,
  currentTotalMm,
  priorTotalMm,
  height = 380,
}: ContributionVarDonutProps) {
  const fontFamily = useChartFontFamily();

  const chartOptions = useMemo<any>(() => {
    const fills = rows.map((row) => row.color);
    const priorFills = rows.map((row) => mixHex(row.color, '#FFFFFF', 0.55));

    return {
      background: { fill: 'transparent' },
      padding: { top: 8, right: 8, bottom: 8, left: 8 },
      series: [
        {
          type: 'donut',
          data: rows,
          angleKey: 'priorMm',
          angleName: 'Prior week',
          ...PRIOR_RING,
          fills: priorFills,
          strokes: priorFills,
          strokeWidth: 0,
          sectorSpacing: 0,
          calloutLabel: { enabled: false },
          sectorLabel: { enabled: false },
          tooltip: {
            renderer: ({ datum }: { datum: ContributionVarFactorRow }) => ({
              title: `${datum.factor} — prior week`,
              content: `$${datum.priorMm.toFixed(1)}MM`,
            }),
          },
        },
        {
          type: 'donut',
          data: rows,
          angleKey: 'currentMm',
          angleName: 'Current week',
          calloutLabelKey: 'factor',
          ...CURRENT_RING,
          fills,
          strokes: fills,
          strokeWidth: 0,
          sectorSpacing: 0,
          calloutLabel: {
            enabled: true,
            fontFamily,
            fontSize: 12,
            color: '#374151',
            offset: 6,
            minAngle: 0,
            avoidCollisions: true,
            formatter: ({ datum }: { datum: ContributionVarFactorRow }) => {
              const delta = datum.currentMm - datum.priorMm;
              return `${datum.factor}  ${datum.currentMm.toFixed(1)}MM ${arrowFor(delta)}${formatSigned(delta, 1)}MM`;
            },
          },
          calloutLine: { colors: fills, length: 12, strokeWidth: 1.5 },
          sectorLabel: { enabled: false },
          innerLabels: [
            { text: 'Contribution VaR', fontFamily, fontSize: 19, fontWeight: 'bold', color: '#1f2937', spacing: 6 },
            { text: 'Current Total', fontFamily, fontSize: 13, color: '#6b7280', spacing: 4 },
            {
              text: `$${currentTotalMm.toFixed(1)}MM`,
              fontFamily,
              fontSize: 18,
              fontWeight: 'bold',
              color: '#1f2937',
              spacing: 4,
            },
            { text: `Prior: $${priorTotalMm.toFixed(1)}MM`, fontFamily, fontSize: 12, color: '#9aa3ad' },
          ],
          tooltip: {
            renderer: ({ datum }: { datum: ContributionVarFactorRow }) => {
              const delta = datum.currentMm - datum.priorMm;
              return {
                title: datum.factor,
                content: `Current $${datum.currentMm.toFixed(1)}MM · Prior $${datum.priorMm.toFixed(1)}MM · WoW ${formatSigned(delta, 1)}MM`,
              };
            },
          },
        },
      ],
      legend: { enabled: false },
    };
  }, [rows, currentTotalMm, priorTotalMm, fontFamily]);

  return (
    <Box sx={{ width: '100%', height, minWidth: 0 }}>
      <AgCharts options={chartOptions} style={{ width: '100%', height: '100%' }} />
    </Box>
  );
}
