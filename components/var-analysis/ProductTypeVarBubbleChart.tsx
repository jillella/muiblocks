'use client';

import { Box, Typography } from '@mui/material';
import { AgCharts } from 'ag-charts-react';
import { useMemo } from 'react';
import { registerAgModules } from '@/lib/ag-modules';
import { mockProductTypeVarBubbles, type ProductTypeVarBubblePoint } from '@/lib/mock-data';
import AnalysisPanel from '@/components/var-analysis/AnalysisPanel';
import { useChartFontFamily } from '@/components/var-analysis/useChartFontFamily';
import { formatSignedMm, NEGATIVE_COLOR, POSITIVE_COLOR } from '@/components/var-analysis2/varFormat';

registerAgModules();

const PRIOR_COLOR = '#c9b07a';
const CURRENT_POSITIVE_COLOR = POSITIVE_COLOR;
const CURRENT_NEGATIVE_COLOR = NEGATIVE_COLOR;

const Y_TICK = 0.2;
const MIN_DIAMETER = 16;
const MAX_DIAMETER = 56;

const SERIES = [
  {
    kind: 'currentPositive' as const,
    yName: 'Current',
    fill: CURRENT_POSITIVE_COLOR,
  },
  {
    kind: 'currentNegative' as const,
    yName: 'Current Negative VaR',
    fill: CURRENT_NEGATIVE_COLOR,
  },
  {
    kind: 'prior' as const,
    yName: 'Prior Week Value',
    fill: PRIOR_COLOR,
  },
];

type BubbleDatum = ProductTypeVarBubblePoint & {
  x: number;
  size: number;
};

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
      <Box
        aria-hidden
        sx={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: color,
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
        stroke: series.fill,
        strokeWidth: 0,
        fillOpacity: 0.72,
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
          crossLines: [{ type: 'line', value: 0, stroke: '#1f2937', strokeWidth: 1.5, strokeOpacity: 1 }],
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
      info="Green is current positive VaR, red is current negative VaR, gold is prior week"
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
          {SERIES.map((series) => (
            <Box component="li" key={series.kind}>
              <LegendItem color={series.fill} label={series.yName} />
            </Box>
          ))}
        </Box>
      </Box>
    </AnalysisPanel>
  );
}
