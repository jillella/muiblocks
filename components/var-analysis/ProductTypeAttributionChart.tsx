'use client';

import { Box } from '@mui/material';
import { AgCharts } from 'ag-charts-react';
import { useMemo } from 'react';
import { registerAgModules } from '@/lib/ag-modules';
import { mockProductTypeAttribution, type ProductTypeAttributionRow } from '@/lib/mock-data';
import AnalysisPanel from '@/components/var-analysis/AnalysisPanel';

registerAgModules();

const POSITIVE_FILL = '#387f97';
const NEGATIVE_FILL = '#A81008';

export type ProductTypeAttributionChartProps = {
  rows?: ProductTypeAttributionRow[];
  height?: number;
};

export default function ProductTypeAttributionChart({
  rows: rowsProp,
  height = 300,
}: ProductTypeAttributionChartProps) {
  const rows = useMemo(() => rowsProp ?? mockProductTypeAttribution, [rowsProp]);

  const chartOptions = useMemo<any>(
    () => ({
      data: rows,
      background: { fill: 'transparent' },
      padding: { top: 6, right: 14, bottom: 6, left: 2 },
      series: [
        {
          type: 'bar',
          direction: 'horizontal',
          xKey: 'product',
          yKey: 'value',
          yName: 'Attribution',
          // Large radius is clamped to half the bar thickness, giving a full
          // pill cap on the outer end only (the end at zero stays square).
          cornerRadius: 100,
          itemStyler: ({ datum }: { datum: ProductTypeAttributionRow }) => ({
            fill: datum.value < 0 ? NEGATIVE_FILL : POSITIVE_FILL,
          }),
          tooltip: {
            renderer: ({ datum }: { datum: ProductTypeAttributionRow }) => ({
              title: datum.product,
              content: datum.value.toLocaleString('en-US'),
            }),
          },
        },
      ],
      axes: [
        {
          type: 'category',
          position: 'left',
          line: { enabled: false },
          tick: { enabled: false },
          gridLine: { enabled: false },
          paddingInner: 0.55,
          label: { color: '#374151', fontSize: 12, avoidCollisions: false },
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
          label: {
            color: '#6b7280',
            fontSize: 11,
            formatter: ({ value }: { value: number }) => value.toLocaleString('en-US'),
          },
        },
      ],
      legend: { enabled: false },
    }),
    [rows],
  );

  return (
    <AnalysisPanel
      title="Risk Attribution - By Product Type"
      info="Positive and negative VaR attribution by product type"
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
