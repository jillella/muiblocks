'use client';

import { Box, Typography } from '@mui/material';
import { AgCharts } from 'ag-charts-react';
import { useMemo } from 'react';
import { registerAgModules } from '@/lib/ag-modules';
import { mockRiskFactorAttribution, type RiskFactorAttributionSlice } from '@/lib/mock-data';
import AnalysisPanel from '@/components/var-analysis/AnalysisPanel';

registerAgModules();

export type RiskFactorAttributionChartProps = {
  slices?: RiskFactorAttributionSlice[];
  height?: number;
};

export default function RiskFactorAttributionChart({
  slices: slicesProp,
  height = 300,
}: RiskFactorAttributionChartProps) {
  const slices = useMemo(() => slicesProp ?? mockRiskFactorAttribution, [slicesProp]);

  const chartOptions = useMemo<any>(
    () => ({
      data: slices,
      background: { fill: 'transparent' },
      padding: { top: 4, right: 4, bottom: 4, left: 4 },
      series: [
        {
          type: 'donut',
          angleKey: 'value',
          calloutLabelKey: 'factor',
          innerRadiusRatio: 0.62,
          calloutLabel: { enabled: false },
          sectorLabel: { enabled: false },
          strokeWidth: 0,
          sectorSpacing: 0,
          fills: slices.map((slice) => slice.color),
          strokes: slices.map((slice) => slice.color),
          tooltip: {
            renderer: ({ datum }: { datum: RiskFactorAttributionSlice }) => ({
              title: datum.factor,
              content: `${datum.value.toFixed(1)}%`,
            }),
          },
        },
      ],
      legend: { enabled: false },
    }),
    [slices],
  );

  return (
    <AnalysisPanel title="Risk Attribution - By Risk Factor" info="VaR contribution split by risk factor" showDivider>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          gap: { xs: 2, sm: 5 },
          minHeight: height,
        }}
      >
        <Box sx={{ width: { xs: '100%', sm: '46%' }, height, minWidth: 0 }}>
          <AgCharts options={chartOptions} style={{ width: '100%', height: '100%' }} />
        </Box>

        <Box
          component="ul"
          aria-label="Risk factor legend"
          sx={{
            width: { xs: '100%', sm: 'auto' },
            flex: { sm: '1 1 0' },
            minWidth: 0,
            m: 0,
            p: 0,
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          {slices.map((slice) => (
            <Box component="li" key={slice.factor} sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
              <Box
                aria-hidden
                sx={{
                  width: 11,
                  height: 11,
                  borderRadius: '50%',
                  backgroundColor: slice.color,
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
                {slice.factor}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </AnalysisPanel>
  );
}
