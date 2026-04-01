'use client';

import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import { Box, Card, CardContent, Dialog, IconButton, Typography } from '@mui/material';
import { AgCharts } from 'ag-charts-react';
import { useMemo, useState } from 'react';
import { registerAgModules } from '@/lib/ag-modules';
import type { PerformancePoint } from '@/components/charts-enhanced';

registerAgModules();

interface StressMaxLossChartProps {
  data: PerformancePoint[];
}

export default function StressMaxLossChart({ data }: StressMaxLossChartProps) {
  const [isExpanded, setIsExpanded] = useState(false);

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
          showInLegend: false,
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
          max: 300,
          reverse: true,
          line: { enabled: false },
          tick: { enabled: false },
          label: {
            color: '#687687',
            fontSize: 11,
            formatter: ({ value }: { value: number }) => `${value}M`,
          },
          title: {
            enabled: true,
            text: 'VaR / Clean PnL',
            color: '#6c7888',
            fontSize: 11,
          },
          gridLine: {
            enabled: true,
            style: [{ stroke: '#d5dee8', lineDash: [3, 4] }],
          },
        },
      },
      legend: {
        enabled: true,
        position: 'bottom',
        spacing: 8,
        item: {
          marker: { shape: 'circle', size: 7 },
          label: { color: '#64748b', fontSize: 11 },
        },
      },
    }),
    [data],
  );

  const renderActions = ({ expanded }: { expanded: boolean }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box
        sx={{
          py: 0.2,
          px: 0.5,
          borderRadius: 999,
          backgroundColor: '#eef5ff',
          border: '1px solid #deebf8',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55)',
          display: 'flex',
          alignItems: 'center',
          gap: 0.2,
        }}
      >
        <IconButton
          size="small"
          sx={{
            width: 52,
            height: 32,
            borderRadius: 999,
            backgroundColor: '#ffffff',
            color: '#2f8fe8',
            boxShadow: '0 1px 3px rgba(35,94,165,0.18)',
            '&:hover': {
              backgroundColor: '#ffffff',
            },
          }}
        >
          <EqualizerRoundedIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          sx={{
            width: 52,
            height: 32,
            borderRadius: 999,
            color: '#6d6d6d',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.5)',
            },
          }}
        >
          <FormatListBulletedRoundedIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
        <IconButton
          size="small"
          sx={{ color: '#8b97a4' }}
          onClick={() => setIsExpanded((current) => !current)}
        >
          {expanded ? (
            <CloseFullscreenRoundedIcon fontSize="small" />
          ) : (
            <OpenInFullRoundedIcon fontSize="small" />
          )}
        </IconButton>
        <IconButton size="small" sx={{ color: '#8b97a4' }}>
          <MoreVertRoundedIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <>
      <Card
        sx={{
          borderRadius: 2.5,
          border: '1px solid #d9e1e8',
          boxShadow: '0 2px 6px rgba(15, 23, 42, 0.08)',
          height: '100%',
        }}
      >
        <CardContent sx={{ p: 1.6, '&.MuiCardContent-root:last-child': { pb: 1.6 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.75 }}>
            <Typography sx={{ fontSize: '1.12rem', fontWeight: 600, color: '#5b6a7f' }}>
              Stress Max Loss
            </Typography>
            {renderActions({ expanded: false })}
          </Box>

          <Box sx={{ width: '100%', height: 172 }}>
            <AgCharts options={options} style={{ width: '100%', height: 172 }} />
          </Box>
        </CardContent>
      </Card>

      <Dialog fullScreen open={isExpanded} onClose={() => setIsExpanded(false)}>
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', p: 3 }}>
          <Card sx={{ borderRadius: 2.5, border: '1px solid #d9e1e8', boxShadow: '0 2px 6px rgba(15, 23, 42, 0.08)' }}>
            <CardContent sx={{ p: 2.25, '&.MuiCardContent-root:last-child': { pb: 2.25 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.25 }}>
                <Typography sx={{ fontSize: '1.12rem', fontWeight: 600, color: '#5b6a7f' }}>
                  Stress Max Loss
                </Typography>
                {renderActions({ expanded: true })}
              </Box>

              <Box sx={{ width: '100%', height: 'calc(100vh - 180px)' }}>
                <AgCharts options={options} style={{ width: '100%', height: '100%' }} />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Dialog>
    </>
  );
}
