'use client';

import { Box, Typography } from '@mui/material';
import { AgCharts } from 'ag-charts-react';
import { useMemo } from 'react';
import { registerAgModules } from '@/lib/ag-modules';
import { mockContributionVarFactors, type ContributionVarFactorRow } from '@/lib/mock-data2';
import AnalysisPanel from '@/components/var-analysis2/AnalysisPanel';
import { useChartFontFamily } from '@/components/var-analysis2/useChartFontFamily';
import {
  arrowFor,
  AXIS_COLOR,
  formatMm,
  formatSigned,
  GRID_COLOR,
  PRIOR_MARKER_COLOR,
} from '@/components/var-analysis2/varFormat';

registerAgModules();

const ROW_H = 48;
const TICK_STEP = 5;
const DOMAIN_PADDING_MM = 8;

/** Prior week marker: a bare vertical tick. */
const priorTickShape = ({ path, x, y }: { path: any; x: number; y: number }) => {
  path.rect(x - 1.25, y - 12, 2.5, 24);
};

const invisibleShape = () => {};

type RankedBarDatum = ContributionVarFactorRow & {
  rankLabel: string;
  deltaMm: number;
  sharePct: number;
  labelAnchorMm: number;
  valueLabel: string;
};

export type ContributionVarRankedBarsProps = {
  rows?: ContributionVarFactorRow[];
};

export default function ContributionVarRankedBars({ rows: rowsProp }: ContributionVarRankedBarsProps) {
  const fontFamily = useChartFontFamily();
  const rows = useMemo(() => rowsProp ?? mockContributionVarFactors, [rowsProp]);

  const { chartOptions, chartHeight, currentTotalMm, priorTotalMm } = useMemo(() => {
    const currentTotal = rows.reduce((total, row) => total + row.currentMm, 0);
    const priorTotal = rows.reduce((total, row) => total + row.priorMm, 0);

    const sorted = [...rows].sort((a, b) => b.currentMm - a.currentMm);
    const data: RankedBarDatum[] = sorted.map((row) => {
      const deltaMm = row.currentMm - row.priorMm;
      return {
        ...row,
        rankLabel: row.factor,
        deltaMm,
        sharePct: currentTotal === 0 ? 0 : (row.currentMm / currentTotal) * 100,
        labelAnchorMm: Math.max(row.currentMm, row.priorMm),
        valueLabel: `${row.currentMm.toFixed(1)}MM   ${arrowFor(deltaMm)}${formatSigned(deltaMm, 1)}MM`,
      };
    });

    const values = data.flatMap((row) => [row.currentMm, row.priorMm]);
    const domainMax = Math.ceil((Math.max(...values) + DOMAIN_PADDING_MM) / TICK_STEP) * TICK_STEP;

    const tooltipRenderer = ({ datum }: { datum: RankedBarDatum }) => ({
      title: datum.factor,
      content: `Current $${datum.currentMm.toFixed(1)}MM · Prior $${datum.priorMm.toFixed(1)}MM · WoW ${formatSigned(datum.deltaMm, 1)}MM · Share ${datum.sharePct.toFixed(1)}%`,
    });

    return {
      currentTotalMm: currentTotal,
      priorTotalMm: priorTotal,
      chartHeight: data.length * ROW_H + 86,
      chartOptions: {
        data,
        background: { fill: 'transparent' },
        padding: { top: 8, right: 16, bottom: 4, left: 8 },
        series: [
          {
            type: 'bar',
            direction: 'horizontal',
            xKey: 'rankLabel',
            yKey: 'currentMm',
            yName: 'Current week',
            cornerRadius: 2,
            itemStyler: ({ datum }: { datum: RankedBarDatum }) => ({ fill: datum.color }),
            tooltip: { renderer: tooltipRenderer },
          },
          {
            type: 'scatter',
            xKey: 'priorMm',
            yKey: 'rankLabel',
            yName: 'Prior week',
            shape: priorTickShape,
            size: 24,
            fill: PRIOR_MARKER_COLOR,
            strokeWidth: 0,
            tooltip: {
              renderer: ({ datum }: { datum: RankedBarDatum }) => ({
                title: `${datum.factor} — prior week`,
                content: `$${datum.priorMm.toFixed(1)}MM`,
              }),
            },
          },
          {
            type: 'scatter',
            xKey: 'labelAnchorMm',
            yKey: 'rankLabel',
            shape: invisibleShape,
            size: 1,
            fillOpacity: 0,
            strokeWidth: 0,
            labelKey: 'valueLabel',
            label: {
              enabled: true,
              placement: 'right',
              fontFamily,
              fontSize: 12.5,
              fontWeight: 700,
              color: '#1f2937',
            },
            tooltip: { enabled: false },
          },
        ],
        axes: [
          {
            type: 'category',
            position: 'left',
            line: { enabled: false },
            tick: { enabled: false },
            gridLine: { enabled: false },
            paddingInner: 0.32,
            label: {
              fontFamily,
              fontSize: 12.5,
              fontWeight: 600,
              color: '#1f2937',
            },
          },
          {
            type: 'number',
            position: 'bottom',
            min: 0,
            max: domainMax,
            nice: false,
            interval: { step: TICK_STEP },
            line: { enabled: true, stroke: AXIS_COLOR },
            tick: { enabled: false },
            gridLine: { enabled: true, style: [{ stroke: GRID_COLOR }] },
            label: {
              color: '#6b7280',
              fontFamily,
              fontSize: 12,
              formatter: ({ value }: { value: number }) => value.toFixed(0),
            },
            title: {
              enabled: true,
              text: 'Contribution VaR Amount, USD MM',
              color: '#374151',
              fontFamily,
              fontSize: 13,
              spacing: 6,
            },
          },
        ],
        legend: { enabled: false },
      },
    };
  }, [rows, fontFamily]);

  return (
    <AnalysisPanel
      title="Contribution VaR by Risk Factor: Ranked Bars"
      info="Alternative to the nested donut. Bars ranked by current week contribution VaR; black tick is prior week."
      subtitle="Bar length = current week Contribution VaR  |  Black tick = prior week  |  Ranked largest → smallest"
      footnote="Same mock series as the donut. Bar length is absolute Contribution VaR in USD MM, not share of total."
    >
      <Box sx={{ width: '100%', height: chartHeight, minWidth: 0 }}>
        <AgCharts options={chartOptions} style={{ width: '100%', height: '100%' }} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          flexWrap: 'wrap',
          gap: { xs: 1.5, sm: 4 },
          mt: 1,
          pr: 1,
        }}
      >
        {[
          { label: 'Current Total', value: formatMm(currentTotalMm, 1) },
          { label: 'Prior Total', value: formatMm(priorTotalMm, 1) },
        ].map((stat) => (
          <Typography
            key={stat.label}
            sx={{
              fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
              fontSize: '12.5px',
              color: '#6b7280',
            }}
          >
            {`${stat.label}: `}
            <Box component="span" sx={{ fontWeight: 700, color: '#374151' }}>
              {stat.value}
            </Box>
          </Typography>
        ))}
      </Box>
    </AnalysisPanel>
  );
}
