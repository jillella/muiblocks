'use client';

import { Box, Typography } from '@mui/material';
import { AgCharts } from 'ag-charts-react';
import { useMemo } from 'react';
import { registerAgModules } from '@/lib/ag-modules';
import { mockRiskGradeBubbles, type RiskGradeBubblePoint } from '@/lib/mock-data';
import AnalysisPanel from '@/components/var-analysis/AnalysisPanel';
import { useChartFontFamily } from '@/components/var-analysis/useChartFontFamily';

registerAgModules();

const GRADE_TICKS: Record<number, string> = {
  0: 'Pass',
  25: 'G7',
  50: 'G8',
  75: 'G9',
  100: '80',
};

export type RiskGradeBubbleChartProps = {
  points?: RiskGradeBubblePoint[];
  height?: number;
};

export default function RiskGradeBubbleChart({ points: pointsProp, height = 300 }: RiskGradeBubbleChartProps) {
  const points = useMemo(() => pointsProp ?? mockRiskGradeBubbles, [pointsProp]);
  const fontFamily = useChartFontFamily();

  const chartOptions = useMemo<any>(
    () => ({
      data: points,
      background: { fill: 'transparent' },
      padding: { top: 6, right: 12, bottom: 0, left: 16 },
      series: [
        {
          type: 'bubble',
          xKey: 'grade',
          yKey: 'exposure',
          sizeKey: 'size',
          labelKey: 'product',
          size: 14,
          maxSize: 62,
          fillOpacity: 0.7,
          strokeWidth: 0,
          itemStyler: ({ datum }: { datum: RiskGradeBubblePoint }) => ({
            fill: datum.color,
          }),
          tooltip: {
            renderer: ({ datum }: { datum: RiskGradeBubblePoint }) => ({
              title: datum.product,
              content: `Risk grade ${datum.grade.toFixed(0)} · utilization ${datum.exposure}%`,
            }),
          },
        },
      ],
      axes: [
        {
          type: 'number',
          position: 'bottom',
          min: 0,
          max: 100,
          nice: false,
          interval: { values: [0, 25, 50, 75, 100] },
          line: { enabled: true, stroke: '#c9d3de' },
          tick: { enabled: false },
          gridLine: { enabled: true, style: [{ stroke: '#eceff3' }] },
          label: {
            color: '#6b7280',
            fontSize: 11,
            formatter: ({ value }: { value: number }) => GRADE_TICKS[value] ?? '',
          },
          title: {
            enabled: true,
            text: 'Risk Grade',
            color: '#000',
            fontFamily,
            fontSize: 16,
            fontWeight: 400,
            spacing: 8,
          },
        },
        {
          type: 'number',
          position: 'left',
          min: 0,
          max: 110,
          nice: false,
          interval: { step: 27.5 },
          line: { enabled: true, stroke: '#c9d3de' },
          tick: { enabled: false },
          gridLine: { enabled: true, style: [{ stroke: '#eceff3' }] },
          label: { enabled: false },
        },
      ],
      legend: { enabled: false },
    }),
    [points, fontFamily],
  );

  return (
    <AnalysisPanel title="Risk Attribution By Product Type" info="Exposure concentration against risk grade">
      <Box sx={{ width: '100%', height, minWidth: 0 }}>
        <AgCharts options={chartOptions} style={{ width: '100%', height: '100%' }} />
      </Box>
      <Box sx={{ display: 'flex', gap: 1, mt: 1.5, pl: 0.5 }}>
        <Typography sx={{ fontSize: '0.82rem', color: '#8b96a5', flexShrink: 0 }}>Answers:</Typography>
        <Box>
          <Typography sx={{ fontSize: '0.82rem', color: '#8b96a5', lineHeight: 1.6 }}>
            Targets exposures - weakest grades -
          </Typography>
          <Typography sx={{ fontSize: '0.82rem', color: '#8b96a5', lineHeight: 1.6 }}>
            Highest utilization - concentration hot spots
          </Typography>
        </Box>
      </Box>
    </AnalysisPanel>
  );
}
