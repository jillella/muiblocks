'use client';

import { Box } from '@mui/material';
import { AgCharts } from 'ag-charts-react';
import { useMemo } from 'react';
import { registerAgModules } from '@/lib/ag-modules';
import { EnhancedCardFrame } from './shared';

registerAgModules();

export interface PerformancePoint {
  month: string;
  var: number;
  cleanPnl: number;
  threshold: number;
}

interface PerformanceComboChartCardProps {
  title: string;
  yAxisLabel: string;
  data: PerformancePoint[];
}

export default function PerformanceComboChartCard({
  title,
  yAxisLabel,
  data,
}: PerformanceComboChartCardProps) {
  const options: any = useMemo(
    () => ({
      data,
      background: { fill: 'transparent' },
      padding: { top: 12, right: 10, bottom: 16, left: 10 },
      series: [
        {
          type: 'bar',
          xKey: 'month',
          yKey: 'cleanPnl',
          yName: 'Clean PnL',
          fill: '#2f6f87',
          stroke: '#2f6f87',
          cornerRadius: 3,
          maxWidth: 24,
        },
        {
          type: 'line',
          xKey: 'month',
          yKey: 'var',
          yName: 'VaR',
          stroke: '#c8b26d',
          strokeWidth: 2,
          marker: {
            enabled: true,
            shape: 'circle',
            size: 4.5,
            fill: '#ffffff',
            stroke: '#c8b26d',
            strokeWidth: 2,
          },
        },
        {
          type: 'line',
          xKey: 'month',
          yKey: 'threshold',
          yName: 'Threshold',
          stroke: '#cf7d38',
          strokeWidth: 2,
          marker: { enabled: false },
          lineDash: [],
        },
      ],
      axes: {
        x: {
          type: 'category',
          position: 'bottom',
          line: { enabled: false },
          tick: { enabled: false },
          label: { color: '#687687', fontSize: 11, rotation: -52 },
          gridLine: { enabled: false },
        },
        y: {
          type: 'number',
          position: 'left',
          min: 0,
          line: { enabled: false },
          tick: { enabled: false },
          label: {
            color: '#687687',
            fontSize: 11,
            formatter: ({ value }: { value: number }) => `${value}M`,
          },
          title: {
            enabled: true,
            text: yAxisLabel,
            color: '#6c7888',
            fontSize: 11,
          },
          gridLine: {
            enabled: true,
            style: [{ stroke: '#e4ebf2', lineDash: [3, 6] }],
          },
        },
      },
      legend: {
        enabled: true,
        position: 'bottom',
        spacing: 12,
        item: {
          marker: { shape: 'circle', size: 8 },
          label: { color: '#64748b', fontSize: 12 },
        },
      },
    }),
    [data, yAxisLabel],
  );

  return (
    <EnhancedCardFrame title={title} withViewToggle>
      <Box sx={{ width: '100%', height: 235 }}>
        <AgCharts options={options} style={{ width: '100%', height: '100%' }} />
      </Box>
    </EnhancedCardFrame>
  );
}
