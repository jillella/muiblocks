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
import type { CleanPnlVarPoint } from '@/lib/mock-data';

interface CleanPnlVarAreaChartCardProps {
  data: CleanPnlVarPoint[];
}

registerAgModules();

export default function CleanPnlVarAreaChartCard({ data }: CleanPnlVarAreaChartCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

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
        position: 'bottom',
        spacing: 18,
        item: {
          label: { color: '#6b7280', fontSize: 12 },
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
            {renderActions({ expanded: false })}
          </Box>

          <Box sx={{ width: '100%', height: 248 }}>
            <AgCharts options={options} style={{ width: '100%', height: 248 }} />
          </Box>
        </CardContent>
      </Card>

      <Dialog fullScreen open={isExpanded} onClose={() => setIsExpanded(false)}>
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', p: 3 }}>
          <Card sx={{ borderRadius: 3, border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: 2.25, '&.MuiCardContent-root:last-child': { pb: 2.25 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.25 }}>
                <Typography sx={{ fontSize: '1.3rem', fontWeight: 500, color: '#3d516b' }}>
                  CM Inc VaR / SVaR
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
