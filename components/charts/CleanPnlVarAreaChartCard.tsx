'use client';

import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { AgCharts } from 'ag-charts-react';
import { useMemo } from 'react';
import { registerAgModules } from '@/lib/ag-modules';
import type { CleanPnlVarPoint } from '@/lib/mock-data';

interface CleanPnlVarAreaChartCardProps {
  data: CleanPnlVarPoint[];
}

registerAgModules();

export default function CleanPnlVarAreaChartCard({ data }: CleanPnlVarAreaChartCardProps) {
  const options: any = useMemo(
    () => ({
      data,
      background: { fill: 'transparent' },
      padding: { top: 10, right: 8, bottom: 8, left: 8 },
      series: [
        {
          type: 'line',
          xKey: 'period',
          yKey: 'cleanPnl',
          yName: 'Clean PnL',
          stroke: '#8b949d',
          strokeWidth: 2,
          lineDash: [3, 4],
          marker: { enabled: false },
        },
        {
          type: 'area',
          xKey: 'period',
          yKey: 'var',
          yName: 'VaR',
          stroke: '#6f8f9b',
          strokeWidth: 3,
          fill: '#6f8f9b',
          fillOpacity: 0.22,
          marker: { enabled: false },
        },
      ],
      axes: {
        x: {
          type: 'category',
          position: 'bottom',
          line: { enabled: false },
          tick: { enabled: false },
          label: { color: '#6b7280', fontSize: 12 },
          gridLine: { enabled: false },
        },
        y: {
          type: 'number',
          position: 'left',
          min: 0,
          line: { enabled: false },
          tick: { enabled: false },
          label: {
            color: '#6b7280',
            fontSize: 12,
            formatter: ({ value }: { value: number }) => `${value}M`,
          },
          gridLine: {
            enabled: true,
            style: [{ stroke: '#e6ecf2', lineDash: [2, 5] }],
          },
        },
      },
      legend: {
        enabled: true,
        position: 'top',
        item: {
          label: { color: '#6b7280', fontSize: 12 },
        },
      },
    }),
    [data],
  );

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: '1px solid #e0e0e0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        height: '100%',
      }}
    >
      <CardContent sx={{ p: 2.25, '&.MuiCardContent-root:last-child': { pb: 2.25 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.25 }}>
          <Typography sx={{ fontSize: '1.3rem', fontWeight: 500, color: '#3d516b' }}>
            CM Inc VaR / SVaR
          </Typography>
          <Box
            sx={{
              p: 0.2,
              borderRadius: 999,
              backgroundColor: '#eef4f8',
              display: 'flex',
              alignItems: 'center',
              gap: 0.25,
            }}
          >
            <IconButton size="small" sx={{ width: 26, height: 26, color: '#6d8098' }}>
              <BarChartRoundedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ width: 26, height: 26, color: '#6d8098' }}>
              <FormatListBulletedRoundedIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ width: '100%', height: 248 }}>
          <AgCharts options={options} style={{ width: '100%', height: 248 }} />
        </Box>
      </CardContent>
    </Card>
  );
}
