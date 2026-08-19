'use client';

import { Box, Typography } from '@mui/material';
import { AgCharts } from 'ag-charts-react';
import { useMemo } from 'react';
import { registerAgModules } from '@/lib/ag-modules';
import { mockProductTypeVarBubbles, type ProductTypeVarBubblePoint } from '@/lib/mock-data';
import AnalysisPanel from '@/components/var-analysis/AnalysisPanel';
import { useChartFontFamily } from '@/components/var-analysis/useChartFontFamily';
import { formatSignedMm } from '@/components/var-analysis2/varFormat';

registerAgModules();

/** Figma bubble fills are linear, not radial. Alpha lives in the stops; series opacity is 0.8. */
const linearFill = (
  rotation: number,
  from: string,
  fromStop: number,
  to: string,
  toStop: number,
) => ({
  type: 'gradient' as const,
  gradient: 'linear' as const,
  bounds: 'item' as const,
  rotation,
  colorStops: [
    { color: from, stop: 0 },
    { color: from, stop: fromStop },
    { color: to, stop: toStop },
    { color: to, stop: 1 },
  ],
});

const SERIES = [
  {
    kind: 'prior' as const,
    yName: 'Prior Value',
    fill: linearFill(132, 'rgba(214, 167, 71, 0.60)', 0.2617, 'rgba(112, 87, 37, 0.60)', 0.8127),
  },
  {
    kind: 'currentPositive' as const,
    yName: 'Current VaR',
    fill: linearFill(113, 'rgba(122, 152, 141, 0.60)', 0.2445, 'rgba(0, 72, 49, 0.60)', 0.6777),
  },
  {
    kind: 'currentNegative' as const,
    yName: 'Current Negative VaR',
    // Figma snippet for red was a paste of the green fill; same 113deg structure, coral stops.
    fill: linearFill(113, 'rgba(232, 120, 110, 0.60)', 0.2445, 'rgba(140, 36, 32, 0.60)', 0.6777),
  },
];

const LEGEND = [
  {
    kind: 'currentPositive' as const,
    yName: 'Current VaR',
    swatch: 'linear-gradient(113deg, rgba(122, 152, 141, 0.60) 24.45%, rgba(0, 72, 49, 0.60) 67.77%)',
  },
  {
    kind: 'currentNegative' as const,
    yName: 'Current Negative VaR',
    swatch: 'linear-gradient(113deg, rgba(232, 120, 110, 0.60) 24.45%, rgba(140, 36, 32, 0.60) 67.77%)',
  },
  {
    kind: 'prior' as const,
    yName: 'Prior Value',
    swatch: 'linear-gradient(132deg, rgba(214, 167, 71, 0.60) 26.17%, rgba(112, 87, 37, 0.60) 81.27%)',
  },
];

const Y_TICK = 0.2;
const MIN_DIAMETER = 22;
const MAX_DIAMETER = 72;

type BubbleDatum = ProductTypeVarBubblePoint & {
  x: number;
  size: number;
};

function LegendItem({ swatch, label }: { swatch: string; label: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
      <Box
        aria-hidden
        sx={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: swatch,
          opacity: 0.8,
          flexShrink: 0,
        }}
      />
      <Typography
        sx={{
          fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
          fontSize: '13px',
          fontWeight: 400,
          color: '#181d1f',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

export type ProductTypeVarBubbleChartProps = {
  points?: ProductTypeVarBubblePoint[];
  height?: number;
};

export default function ProductTypeVarBubbleChart({
  points: pointsProp,
  height = 420,
}: ProductTypeVarBubbleChartProps) {
  const points = useMemo(() => pointsProp ?? mockProductTypeVarBubbles, [pointsProp]);
  const fontFamily = useChartFontFamily();

  const chartOptions = useMemo<any>(() => {
    const products: string[] = [];
    points.forEach((point) => {
      if (!products.includes(point.product)) products.push(point.product);
    });

    const data: BubbleDatum[] = points.map((point) => ({
      ...point,
      x: products.indexOf(point.product),
      size: Math.abs(point.value),
    }));

    const maxAbs = Math.max(...data.map((point) => point.size), Y_TICK);
    const domain = Math.ceil(maxAbs / Y_TICK) * Y_TICK;
    const sizing = { domain: [0, maxAbs] as [number, number], size: MIN_DIAMETER, maxSize: MAX_DIAMETER };

    return {
      background: { fill: 'transparent' },
      padding: { top: 8, right: 8, bottom: 8, left: 8 },
      series: SERIES.map((series) => ({
        type: 'bubble',
        data: data.filter((point) => point.kind === series.kind),
        xKey: 'x',
        yKey: 'value',
        sizeKey: 'size',
        yName: series.yName,
        fill: series.fill,
        strokeWidth: 0,
        fillOpacity: 0.8,
        ...sizing,
        tooltip: {
          renderer: ({ datum }: { datum: BubbleDatum }) => ({
            title: datum.product,
            content: `${series.yName}  ${formatSignedMm(datum.value)}`,
          }),
        },
      })),
      axes: [
        {
          type: 'number',
          position: 'bottom',
          min: -0.55,
          max: products.length - 0.45,
          nice: false,
          interval: { values: products.map((_, index) => index) },
          line: { enabled: true, stroke: '#c9d3de' },
          tick: { enabled: true, size: 5, stroke: '#c9d3de' },
          gridLine: { enabled: true, style: [{ stroke: '#eceff3' }] },
          label: {
            color: '#374151',
            fontFamily,
            fontSize: 12,
            rotation: -45,
            avoidCollisions: false,
            formatter: ({ value }: { value: number }) => products[value] ?? '',
          },
        },
        {
          type: 'number',
          position: 'left',
          min: -domain,
          max: domain,
          nice: false,
          interval: { step: Y_TICK },
          line: { enabled: true, stroke: '#c9d3de' },
          tick: { enabled: false },
          gridLine: { enabled: true, style: [{ stroke: '#eceff3' }] },
          crossLines: [{ type: 'line', value: 0, stroke: '#111827', strokeWidth: 1.6, strokeOpacity: 1 }],
          label: {
            color: '#6b7280',
            fontFamily,
            fontSize: 12,
            formatter: ({ value }: { value: number }) => value.toFixed(1),
          },
        },
      ],
      legend: { enabled: false },
    };
  }, [points, fontFamily]);

  return (
    <AnalysisPanel
      title="Risk Attribution By Product Type"
      info="Green is current VaR, red is current negative VaR, gold is prior value"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: { xs: 2, sm: 3 },
          minWidth: 0,
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0, height, width: '100%' }}>
          <AgCharts options={chartOptions} style={{ width: '100%', height: '100%' }} />
        </Box>
        <Box
          component="ul"
          aria-label="VaR bubble legend"
          sx={{
            flex: '0 0 auto',
            m: 0,
            p: 0,
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.25,
            alignSelf: { xs: 'flex-start', sm: 'center' },
          }}
        >
          {LEGEND.map((item) => (
            <Box component="li" key={item.kind}>
              <LegendItem swatch={item.swatch} label={item.yName} />
            </Box>
          ))}
        </Box>
      </Box>
    </AnalysisPanel>
  );
}
