'use client';

import { Box, Typography } from '@mui/material';
import { AgCharts } from 'ag-charts-react';
import { useMemo } from 'react';
import { registerAgModules } from '@/lib/ag-modules';
import { mockContributionVarProducts, type ContributionVarProductRow } from '@/lib/mock-data2';
import AnalysisPanel from '@/components/var-analysis2/AnalysisPanel';
import { useChartFontFamily } from '@/components/var-analysis2/useChartFontFamily';
import {
  arrowFor,
  AXIS_COLOR,
  formatMm,
  formatSigned,
  formatSignedMm,
  GRID_COLOR,
  mixHex,
  PRIOR_MARKER_COLOR,
} from '@/components/var-analysis2/varFormat';

registerAgModules();

const ROW_H = 52;
const TICK_STEP = 0.5;
/** Value labels sit outside the bar ends, so the domain has to reserve room for them. */
const DOMAIN_PADDING_MM = 0.45;

const POSITIVE_LIGHT = '#79bd8b';
const POSITIVE_DARK = '#2f7a4d';
const NEGATIVE_LIGHT = '#e0a49f';
const NEGATIVE_DARK = '#8f2019';

/** Prior week marker: a bare vertical tick, which none of the built-in marker shapes provide. */
const priorTickShape = ({ path, x, y }: { path: any; x: number; y: number }) => {
  path.rect(x - 1, y - 11, 2, 22);
};

const invisibleShape = () => {};

type ProductBarDatum = ContributionVarProductRow & {
  deltaMm: number;
  fill: string;
  /** Outer edge of the bar/tick pair, where the value label is anchored. */
  labelAnchorMm: number;
  valueLabel: string;
};

export type ContributionVarByProductTypeChartProps = {
  rows?: ContributionVarProductRow[];
};

export default function ContributionVarByProductTypeChart({
  rows: rowsProp,
}: ContributionVarByProductTypeChartProps) {
  const fontFamily = useChartFontFamily();
  const rows = useMemo(() => rowsProp ?? mockContributionVarProducts, [rowsProp]);

  const { chartOptions, chartHeight, currentNetMm, priorNetMm, grossAbsoluteMm } = useMemo(() => {
    const sorted = [...rows].sort((a, b) => b.currentMm - a.currentMm);
    const positives = sorted.filter((row) => row.currentMm >= 0);
    const negatives = sorted.filter((row) => row.currentMm < 0);

    // Shade by rank so the heaviest contributors read darkest within their sign.
    const fillFor = (row: ContributionVarProductRow) => {
      if (row.currentMm >= 0) {
        const rank = positives.indexOf(row);
        return mixHex(POSITIVE_LIGHT, POSITIVE_DARK, positives.length > 1 ? rank / (positives.length - 1) : 0);
      }
      const rank = negatives.indexOf(row);
      return mixHex(NEGATIVE_LIGHT, NEGATIVE_DARK, negatives.length > 1 ? rank / (negatives.length - 1) : 0);
    };

    const data: ProductBarDatum[] = sorted.map((row) => {
      const deltaMm = row.currentMm - row.priorMm;
      return {
        ...row,
        deltaMm,
        fill: fillFor(row),
        labelAnchorMm:
          row.currentMm >= 0 ? Math.max(row.currentMm, row.priorMm) : Math.min(row.currentMm, row.priorMm),
        valueLabel: `${formatSignedMm(row.currentMm)}   ${arrowFor(deltaMm)} ${formatSigned(deltaMm)}MM WoW`,
      };
    });

    const values = data.flatMap((row) => [row.currentMm, row.priorMm]);
    const domainMin = Math.floor((Math.min(...values) - DOMAIN_PADDING_MM) / TICK_STEP) * TICK_STEP;
    const domainMax = Math.ceil((Math.max(...values) + DOMAIN_PADDING_MM) / TICK_STEP) * TICK_STEP;

    const tooltipRenderer = ({ datum }: { datum: ProductBarDatum }) => ({
      title: datum.product,
      content: `Current ${formatSignedMm(datum.currentMm)} · Prior ${formatSignedMm(datum.priorMm)} · WoW ${formatSigned(datum.deltaMm)}MM`,
    });

    return {
      chartHeight: data.length * ROW_H + 78,
      currentNetMm: data.reduce((total, row) => total + row.currentMm, 0),
      priorNetMm: data.reduce((total, row) => total + row.priorMm, 0),
      grossAbsoluteMm: data.reduce((total, row) => total + Math.abs(row.currentMm), 0),
      chartOptions: {
        data,
        background: { fill: 'transparent' },
        padding: { top: 6, right: 18, bottom: 4, left: 16 },
        series: [
          {
            type: 'bar',
            direction: 'horizontal',
            xKey: 'product',
            yKey: 'currentMm',
            yName: 'Current week',
            cornerRadius: 2,
            itemStyler: ({ datum }: { datum: ProductBarDatum }) => ({ fill: datum.fill }),
            label: {
              enabled: true,
              placement: 'inside-center',
              fontFamily,
              fontSize: 12,
              fontWeight: 600,
              color: '#ffffff',
              formatter: ({ datum }: { datum: ProductBarDatum }) => datum.product,
            },
            tooltip: { renderer: tooltipRenderer },
          },
          {
            type: 'scatter',
            xKey: 'priorMm',
            yKey: 'product',
            yName: 'Prior week',
            shape: priorTickShape,
            size: 22,
            fill: PRIOR_MARKER_COLOR,
            strokeWidth: 0,
            tooltip: {
              renderer: ({ datum }: { datum: ProductBarDatum }) => ({
                title: `${datum.product} — prior week`,
                content: formatSignedMm(datum.priorMm),
              }),
            },
          },
          // Invisible anchors that exist only to hang the value labels off the outer
          // edge of each bar; a bar series can only carry one label of its own.
          ...(['right', 'left'] as const).map((placement) => ({
            type: 'scatter',
            data: data.filter((row) => (placement === 'right' ? row.currentMm >= 0 : row.currentMm < 0)),
            xKey: 'labelAnchorMm',
            yKey: 'product',
            shape: invisibleShape,
            size: 1,
            fillOpacity: 0,
            strokeWidth: 0,
            labelKey: 'valueLabel',
            label: {
              enabled: true,
              placement,
              fontFamily,
              fontSize: 12.5,
              fontWeight: 700,
              color: '#1f2937',
            },
            tooltip: { enabled: false },
          })),
        ],
        axes: [
          {
            type: 'category',
            position: 'left',
            line: { enabled: false },
            tick: { enabled: false },
            gridLine: { enabled: false },
            paddingInner: 0.34,
            // Product names are drawn inside the bars, so the axis only supplies the bands.
            label: { enabled: false },
          },
          {
            type: 'number',
            position: 'bottom',
            min: domainMin,
            max: domainMax,
            nice: false,
            interval: { step: TICK_STEP },
            line: { enabled: true, stroke: AXIS_COLOR },
            tick: { enabled: false },
            gridLine: { enabled: true, style: [{ stroke: GRID_COLOR }] },
            crossLines: [
              { type: 'line', value: 0, stroke: PRIOR_MARKER_COLOR, strokeWidth: 1.5, strokeOpacity: 1 },
            ],
            label: {
              color: '#6b7280',
              fontFamily,
              fontSize: 12,
              formatter: ({ value }: { value: number }) => value.toFixed(1),
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
      title="Contribution VaR by Product Type"
      info="Current week contribution VaR per product with the prior week marked for comparison"
      subtitle="Bar colour shows VaR sign: green = positive, red = negative  |  Label = current week contribution  |  Black tick = prior week"
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
          { label: 'Current Net Contribution VaR', value: formatSignedMm(currentNetMm) },
          { label: 'Prior Net', value: formatSignedMm(priorNetMm) },
          { label: 'Gross Absolute Contribution', value: formatMm(grossAbsoluteMm) },
        ].map((stat) => (
          <Typography
            key={stat.label}
            sx={{
              fontFamily: 'var(--font-roboto), Roboto, Helvetica, Arial, sans-serif',
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
