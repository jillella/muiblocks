'use client';

import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';
import { Box, Card, CardContent, Dialog, IconButton, Typography } from '@mui/material';
import { AgCharts } from 'ag-charts-react';
import { useMemo, useState } from 'react';
import { registerAgModules } from '@/lib/ag-modules';
import type { RiskDriverSeries } from '@/lib/mock-data';

interface TopRiskDataDriversChartCardProps {
  series: RiskDriverSeries[];
}

registerAgModules();

const sparklineContainerSx = {
  width: '100%',
  height: 28,
  minWidth: 0,
  overflow: 'hidden',
  '& .ag-charts-wrapper': {
    marginLeft: '-36px',
    width: 'calc(100% + 36px) !important',
    maxWidth: 'none !important',
  },
} as const;

const hiddenSparklineAxis = {
  line: { enabled: false },
  tick: { enabled: false },
  label: { enabled: false },
  gridLine: { enabled: false },
  crosshair: { enabled: false },
  title: { enabled: false },
};

const sparklineAreaFill = {
  type: 'gradient' as const,
  rotation: 90,
  colorStops: [
    { color: 'rgba(131, 183, 157, 0.55)', stop: 0 },
    { color: 'rgba(168, 207, 183, 0.2)', stop: 0.45 },
    { color: 'rgba(255, 255, 255, 0)', stop: 1 },
  ],
};

function buildSparklineChartOptions(points: number[]) {
  const data = points.map((value, idx) => ({ point: `${idx + 1}`, value }));
  const min = Math.min(...points);
  const max = Math.max(...points);
  const pad = Math.max((max - min) * 0.15, 0.5);

  return {
    data,
    background: { fill: 'transparent' },
    title: { enabled: false },
    subtitle: { enabled: false },
    padding: { top: 2, right: 2, bottom: 2, left: 0 },
    axes: [
      { type: 'category', position: 'bottom', ...hiddenSparklineAxis },
      {
        type: 'number',
        position: 'left',
        min: min - pad,
        max: max + pad,
        nice: false,
        interval: { enabled: false },
        ...hiddenSparklineAxis,
      },
    ],
    series: [
      {
        type: 'area',
        xKey: 'point',
        yKey: 'value',
        stroke: '#83b79d',
        strokeWidth: 1.8,
        fill: sparklineAreaFill,
        marker: { enabled: false },
        tooltip: { enabled: false },
      },
    ],
    legend: { enabled: false },
  };
}

function RiskSparkline({ points }: { points: number[] }) {
  const options: any = useMemo(() => buildSparklineChartOptions(points), [points]);

  return <AgCharts options={options} style={{ width: '100%', height: 28 }} />;
}

export default function TopRiskDataDriversChartCard({ series }: TopRiskDataDriversChartCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderDrivers = () => (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, minmax(0, 1fr))' },
        gap: { xs: 1.5, sm: 2, lg: 2.5 },
      }}
    >
      {series.map((column) => (
        <Box key={`${column.title}-${column.subtitle}`} sx={{ minWidth: 0 }}>
          <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: '#445a74', lineHeight: 1.1 }}>
            {column.title}
          </Typography>
          <Typography sx={{ fontSize: '0.84rem', color: '#5f738b', mt: 0.2, mb: 1.25 }}>
            {column.subtitle}
          </Typography>

          <Box sx={{ display: 'grid', gap: 1.2 }}>
            {column.items.map((item) => {
              const isNegative = item.changePct.startsWith('-');
              return (
                <Box
                  key={item.name}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(64px, 80px) minmax(0, 1fr) minmax(36px, 44px)',
                    alignItems: 'center',
                    columnGap: { xs: 0.5, sm: 0.75 },
                    minWidth: 0,
                  }}
                >
                  <Typography sx={{ fontSize: '0.82rem', color: '#4d6178' }}>{item.name}</Typography>

                  <Box sx={sparklineContainerSx}>
                    <RiskSparkline points={item.points} />
                  </Box>

                  <Typography
                    sx={{
                      fontSize: '0.82rem',
                      color: isNegative ? '#2f8f8e' : '#2ea978',
                      fontWeight: 600,
                      textAlign: 'right',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.changePct}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      ))}
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
            <Typography sx={{ fontSize: '1.3rem', fontWeight: 500, color: '#3d516b' }}>
              Top Risk Data Drivers
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <IconButton size="small" sx={{ color: '#8b97a4' }} onClick={() => setIsExpanded(true)}>
                <OpenInFullRoundedIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: '#8b97a4' }}>
                <MoreVertRoundedIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {renderDrivers()}
        </CardContent>
      </Card>

      <Dialog fullScreen open={isExpanded} onClose={() => setIsExpanded(false)}>
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', p: 3 }}>
          <Card sx={{ borderRadius: 3, border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: 2.25, '&.MuiCardContent-root:last-child': { pb: 2.25 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography sx={{ fontSize: '1.3rem', fontWeight: 500, color: '#3d516b' }}>
                  Top Risk Data Drivers
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <IconButton size="small" sx={{ color: '#8b97a4' }} onClick={() => setIsExpanded(false)}>
                    <CloseFullscreenRoundedIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" sx={{ color: '#8b97a4' }}>
                    <MoreVertRoundedIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              {renderDrivers()}
            </CardContent>
          </Card>
        </Box>
      </Dialog>
    </>
  );
}
