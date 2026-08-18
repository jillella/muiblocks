'use client';

import { Box } from '@mui/material';
import { AgCharts } from 'ag-charts-react';
import { useMemo } from 'react';
import { registerAgModules } from '@/lib/ag-modules';
import { mockProductTypeAttribution, type ProductTypeAttributionRow } from '@/lib/mock-data';
import AnalysisPanel from '@/components/var-analysis/AnalysisPanel';
import { useChartFontFamily } from '@/components/var-analysis/useChartFontFamily';

registerAgModules();

export type ProductTypeAttributionChartProps = {
  rows?: ProductTypeAttributionRow[];
  height?: number;
};

export default function ProductTypeAttributionChart({
  rows: rowsProp,
  height = 300,
}: ProductTypeAttributionChartProps) {
  const rows = useMemo(() => rowsProp ?? mockProductTypeAttribution, [rowsProp]);
  const fontFamily = useChartFontFamily();

  const chartOptions = useMemo<any>(
    () => ({
      data: rows,
      background: { fill: 'transparent' },
      padding: { top: 6, right: 26, bottom: 6, left: 2 },
      series: rows.map((row) => ({
        type: 'bar',
        direction: 'horizontal',
        xKey: 'product',
        yKey: 'value',
        yName: 'Attribution',
        data: [row],
        fill: row.color,
        stroke: row.color,
        strokeWidth: 0,
        grouped: false,
        cornerRadius: 100,
        tooltip: {
          renderer: () => ({
            title: row.product,
            content: row.value.toLocaleString('en-US'),
          }),
        },
      })),
      axes: [
        {
          type: 'category',
          position: 'left',
          line: { enabled: false },
          tick: { enabled: false },
          gridLine: { enabled: false },
          paddingInner: 0.55,
          label: {
            color: '#000',
            fontFamily,
            fontSize: 13,
            fontWeight: 400,
            avoidCollisions: false,
          },
        },
        {
          type: 'number',
          position: 'bottom',
          min: -60000,
          max: 60000,
          nice: false,
          interval: { step: 20000 },
          line: { enabled: false },
          tick: { enabled: false },
          gridLine: { enabled: false },
          crossLines: [
            {
              type: 'line',
              value: 0,
              stroke: '#c9ced6',
              strokeWidth: 1,
              strokeOpacity: 1,
            },
          ],
          label: {
            color: '#000',
            fontFamily,
            fontSize: 12,
            fontWeight: 400,
            avoidCollisions: false,
            formatter: ({ value }: { value: number }) => value.toLocaleString('en-US'),
          },
        },
      ],
      legend: { enabled: false },
    }),
    [rows, fontFamily],
  );

  return (
    <AnalysisPanel
      title="Risk Attribution - By Product Type"
      info="VaR attribution by product type"
      showDivider
    >
      <Box sx={{ width: '100%', minWidth: 0, overflowX: 'auto' }}>
        <Box sx={{ height, minWidth: 480 }}>
          <AgCharts options={chartOptions} style={{ width: '100%', height: '100%' }} />
        </Box>
      </Box>
    </AnalysisPanel>
  );
}
