'use client';

import { Box, Typography } from '@mui/material';
import { AgCharts } from 'ag-charts-react';
import { useMemo } from 'react';
import type { ReactNode } from 'react';
import { registerAgModules } from '@/lib/ag-modules';
import { mockContributionVarProductFactors, type ContributionVarProductFactorPoint } from '@/lib/mock-data2';
import AnalysisPanel from '@/components/var-analysis2/AnalysisPanel';
import { useChartFontFamily } from '@/components/var-analysis2/useChartFontFamily';
import {
  arrowFor,
  AXIS_COLOR,
  DECREASE_COLOR,
  formatSigned,
  formatSignedMm,
  GRID_COLOR,
  INCREASE_COLOR,
  NEGATIVE_COLOR,
  POSITIVE_COLOR,
  PRIOR_MARKER_COLOR,
} from '@/components/var-analysis2/varFormat';

registerAgModules();

const CHART_HEIGHT = 520;
const TICK_STEP = 0.2;
const MIN_DIAMETER = 16;
const MAX_DIAMETER = 52;
/** Fraction of a category band the bubbles of that category are spread across. */
const BAND_SPREAD = 0.72;
/** Small contributions would collide with their neighbours, so they rely on their tooltip instead. */
const LABEL_THRESHOLD_MM = 0.2;

const invisibleShape = () => {};

type BubbleDatum = ContributionVarProductFactorPoint & {
  /** Category index plus in-band jitter, so several risk factors can share a product. */
  x: number;
  deltaMm: number;
  currentSize: number;
  priorSize: number;
  valueLabel: string;
  deltaLabel: string;
};

function LegendItem({ children, marker }: { children: string; marker: ReactNode }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
      {marker}
      <Typography
        sx={{
          fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
          fontSize: '12px',
          color: '#374151',
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}

const Dot = ({ color, hollow }: { color: string; hollow?: boolean }) => (
  <Box
    aria-hidden
    sx={{
      width: 12,
      height: 12,
      borderRadius: '50%',
      backgroundColor: hollow ? 'transparent' : color,
      border: hollow ? `1.5px solid ${color}` : 'none',
      flexShrink: 0,
    }}
  />
);

const Arrow = ({ color, up }: { color: string; up: boolean }) => (
  <Box aria-hidden component="span" sx={{ color, fontSize: 12, lineHeight: 1, flexShrink: 0 }}>
    {up ? '▲' : '▼'}
  </Box>
);

export type ContributionVarProductFactorBubbleChartProps = {
  points?: ContributionVarProductFactorPoint[];
};

export default function ContributionVarProductFactorBubbleChart({
  points: pointsProp,
}: ContributionVarProductFactorBubbleChartProps) {
  const fontFamily = useChartFontFamily();
  const points = useMemo(() => pointsProp ?? mockContributionVarProductFactors, [pointsProp]);

  const chartOptions = useMemo<any>(() => {
    const products: string[] = [];
    points.forEach((point) => {
      if (!products.includes(point.product)) products.push(point.product);
    });

    const maxAbs = Math.max(...points.flatMap((point) => [Math.abs(point.currentMm), Math.abs(point.priorMm)]));
    const domain = Math.ceil((maxAbs + 0.05) / TICK_STEP) * TICK_STEP;

    const data: BubbleDatum[] = products.flatMap((product) => {
      const members = points.filter((point) => point.product === product);
      const index = products.indexOf(product);

      return members.map((point, memberIndex) => {
        const deltaMm = point.currentMm - point.priorMm;
        return {
          ...point,
          x: index + ((memberIndex + 0.5) / members.length - 0.5) * BAND_SPREAD,
          deltaMm,
          currentSize: Math.abs(point.currentMm),
          priorSize: Math.abs(point.priorMm),
          valueLabel: `${point.factor}  ${formatSignedMm(point.currentMm)}`,
          deltaLabel: `${arrowFor(deltaMm)} ${formatSigned(deltaMm)}`,
        };
      });
    });

    /**
     * Every bubble series pins the same size domain so the hollow prior marker is
     * measured against the same scale as the bubble it sits behind, and so the
     * transparent label series offset their labels by the real marker radius.
     */
    const sizing = { domain: [0, maxAbs] as [number, number], size: MIN_DIAMETER, maxSize: MAX_DIAMETER };

    const shouldLabel = (datum: BubbleDatum) => Math.abs(datum.currentMm) >= LABEL_THRESHOLD_MM;

    /** Marker-sized but fully transparent, so its label clears the real bubble underneath. */
    const labelSeries = (
      labelKey: 'valueLabel' | 'deltaLabel',
      placement: 'top' | 'bottom',
      color: string,
      include: (datum: BubbleDatum) => boolean,
    ) => ({
      type: 'bubble',
      data,
      xKey: 'x',
      yKey: 'currentMm',
      sizeKey: 'currentSize',
      labelKey,
      ...sizing,
      fillOpacity: 0,
      strokeOpacity: 0,
      label: {
        enabled: true,
        placement,
        fontFamily,
        fontSize: 10.5,
        color,
        // Filtering here rather than by data keeps every series on one size scale.
        formatter: ({ datum }: { datum: BubbleDatum }) =>
          shouldLabel(datum) && include(datum) ? String(datum[labelKey]) : '',
      },
      tooltip: { enabled: false },
      showInLegend: false,
    });

    return {
      background: { fill: 'transparent' },
      padding: { top: 8, right: 20, bottom: 4, left: 4 },
      series: [
        {
          type: 'bubble',
          data,
          xKey: 'x',
          yKey: 'priorMm',
          sizeKey: 'priorSize',
          yName: 'Prior week',
          ...sizing,
          fillOpacity: 0,
          stroke: '#98a2b3',
          strokeWidth: 1.5,
          tooltip: {
            renderer: ({ datum }: { datum: BubbleDatum }) => ({
              title: `${datum.product} · ${datum.factor} — prior week`,
              content: formatSignedMm(datum.priorMm),
            }),
          },
        },
        {
          type: 'bubble',
          data,
          xKey: 'x',
          yKey: 'currentMm',
          sizeKey: 'currentSize',
          yName: 'Current week',
          ...sizing,
          fillOpacity: 0.85,
          strokeWidth: 0,
          itemStyler: ({ datum }: { datum: BubbleDatum }) => ({
            fill: datum.currentMm >= 0 ? POSITIVE_COLOR : NEGATIVE_COLOR,
          }),
          tooltip: {
            renderer: ({ datum }: { datum: BubbleDatum }) => ({
              title: `${datum.product} · ${datum.factor}`,
              content: `Current ${formatSignedMm(datum.currentMm)} · Prior ${formatSignedMm(datum.priorMm)} · WoW ${formatSigned(datum.deltaMm)}MM`,
            }),
          },
        },
        labelSeries('valueLabel', 'top', '#4b5563', () => true),
        labelSeries('deltaLabel', 'bottom', INCREASE_COLOR, (datum) => datum.deltaMm > 0),
        labelSeries('deltaLabel', 'bottom', DECREASE_COLOR, (datum) => datum.deltaMm < 0),
      ],
      axes: [
        {
          type: 'number',
          position: 'bottom',
          min: -0.6,
          max: products.length - 0.4,
          nice: false,
          interval: { values: products.map((_, index) => index) },
          line: { enabled: true, stroke: AXIS_COLOR },
          tick: { enabled: false },
          gridLine: { enabled: false },
          label: {
            color: '#374151',
            fontFamily,
            fontSize: 12,
            rotation: -28,
            avoidCollisions: false,
            formatter: ({ value }: { value: number }) => products[value] ?? '',
          },
          title: {
            enabled: true,
            text: 'Product Type',
            color: '#374151',
            fontFamily,
            fontSize: 13,
            spacing: 8,
          },
        },
        {
          type: 'number',
          position: 'left',
          min: -domain,
          max: domain,
          nice: false,
          interval: { step: TICK_STEP },
          line: { enabled: true, stroke: AXIS_COLOR },
          tick: { enabled: false },
          gridLine: { enabled: true, style: [{ stroke: GRID_COLOR }] },
          crossLines: [{ type: 'line', value: 0, stroke: PRIOR_MARKER_COLOR, strokeWidth: 1.2, strokeOpacity: 1 }],
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
            spacing: 8,
          },
        },
      ],
      legend: { enabled: false },
    };
  }, [points, fontFamily]);

  return (
    <AnalysisPanel
      title="Contribution VaR by Product Type and Risk Factor with Week-over-Week Change"
      info="Bubble area scales with the size of the contribution; the outline marks last week's value"
      headerRight={
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: 1.25, md: 2 },
            border: '1px solid #e6eaef',
            borderRadius: 1,
            px: 1.5,
            py: 1,
          }}
        >
          <LegendItem marker={<Dot color={POSITIVE_COLOR} />}>Current positive VaR</LegendItem>
          <LegendItem marker={<Dot color={NEGATIVE_COLOR} />}>Current negative VaR</LegendItem>
          <LegendItem marker={<Dot color="#98a2b3" hollow />}>Prior week value</LegendItem>
          <LegendItem marker={<Arrow color={INCREASE_COLOR} up />}>WoW increase</LegendItem>
          <LegendItem marker={<Arrow color={DECREASE_COLOR} up={false} />}>WoW decrease</LegendItem>
        </Box>
      }
      footnote="Illustrative values only. Each product's risk factor bubbles sum to that product's total contribution VaR."
    >
      <Box sx={{ width: '100%', height: CHART_HEIGHT, minWidth: 0 }}>
        <AgCharts options={chartOptions} style={{ width: '100%', height: '100%' }} />
      </Box>
    </AnalysisPanel>
  );
}
