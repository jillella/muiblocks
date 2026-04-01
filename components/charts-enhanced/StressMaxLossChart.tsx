'use client';

import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import {
  Box,
  Card,
  CardContent,
  Dialog,
  IconButton,
  Typography,
} from '@mui/material';
import { AgCharts } from 'ag-charts-react';
import { useMemo, useState } from 'react';
import { registerAgModules } from '@/lib/ag-modules';
import type { StressMaxLossChartPoint } from '@/lib/mock-data';

registerAgModules();

interface StressMaxLossChartProps {
  data: StressMaxLossChartPoint[];
}

export default function StressMaxLossChart({ data }: StressMaxLossChartProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const chartData = useMemo(() => {
    const minMax = (values: number[]) => ({
      min: Math.min(...values),
      max: Math.max(...values),
    });
    const mapRange = (
      value: number,
      inMin: number,
      inMax: number,
      outMin: number,
      outMax: number
    ) => {
      if (inMin === inMax) return (outMin + outMax) / 2;
      return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
    };

    const clean = data.map((d) => d.cleanPnl);
    const varSeries = data.map((d) => d.var);
    const cleanBounds = minMax(clean);
    const varBounds = minMax(varSeries);

    return data.map((d) => {
      const cleanPnlDisplay = mapRange(
        d.cleanPnl,
        cleanBounds.min,
        cleanBounds.max,
        60,
        140
      );
      const varDisplay = mapRange(
        d.var,
        varBounds.min,
        varBounds.max,
        100,
        235
      );
      return {
        ...d,
        cleanPnlDisplay,
        varDisplay,
        thresholdDisplay: 250,
      };
    });
  }, [data]);

  const options: any = useMemo(
    () => ({
      data: chartData,
      background: { fill: 'transparent' },
      padding: { top: 8, right: 8, bottom: 10, left: 8 },
      series: [
        {
          type: 'bar',
          xKey: 'month',
          yKey: 'cleanPnlDisplay',
          yName: 'Clean PnL',
          fill: '#2f6f87',
          stroke: '#2f6f87',
          cornerRadius: 2,
        },
        {
          type: 'line',
          xKey: 'month',
          yKey: 'varDisplay',
          yName: 'VaR',
          stroke: '#c8b26d',
          strokeWidth: 2.4,
          marker: {
            enabled: true,
            shape: 'circle',
            size: 9,
            fill: '#ffffff',
            stroke: '#c8b26d',
            strokeWidth: 2.2,
          },
        },
        {
          type: 'line',
          xKey: 'month',
          yKey: 'thresholdDisplay',
          yName: 'Threshold',
          showInLegend: false,
          stroke: '#cf7d38',
          strokeWidth: 2.4,
          marker: { enabled: false },
          lineDash: [],
        },
      ],
      axes: [
        {
          type: 'category',
          position: 'bottom',
          line: { enabled: false },
          tick: { enabled: false },
          label: { color: '#687687', fontSize: 10, rotation: -52 },
          gridLine: { enabled: false },
        },
        {
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
            style: [{ stroke: '#dce4ed', lineDash: [] }],
          },
        },
      ],
      legend: {
        enabled: true,
        position: 'bottom',
        spacing: 6,
        item: {
          marker: { shape: 'circle', size: 6 },
          label: { color: '#64748b', fontSize: 11 },
        },
      },
    }),
    [chartData]
  );

  const renderActions = ({ expanded }: { expanded: boolean }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Box
        sx={{
          py: 0.15,
          px: 0.35,
          borderRadius: 999,
          backgroundColor: '#eff4fb',
          border: '1px solid #dce4ed',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55)',
          display: 'flex',
          alignItems: 'center',
          gap: 0.2,
        }}
      >
        <IconButton
          size="small"
          sx={{
            width: 36,
            height: 24,
            borderRadius: 999,
            backgroundColor: '#ffffff',
            color: '#2f87d9',
            boxShadow: '0 1px 3px rgba(35,94,165,0.18)',
            '&:hover': {
              backgroundColor: '#ffffff',
            },
          }}
        >
          <EqualizerRoundedIcon sx={{ fontSize: 16 }} />
        </IconButton>
        <IconButton
          size="small"
          sx={{
            width: 36,
            height: 24,
            borderRadius: 999,
            color: '#6d6d6d',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.5)',
            },
          }}
        >
          <FormatListBulletedRoundedIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
        <IconButton
          size="small"
          sx={{ color: '#8b97a4' }}
          onClick={() => setIsExpanded((current) => !current)}
        >
          {expanded ? (
            <CloseFullscreenRoundedIcon sx={{ fontSize: 16 }} />
          ) : (
            <OpenInFullRoundedIcon sx={{ fontSize: 16 }} />
          )}
        </IconButton>
        <IconButton size="small" sx={{ color: '#8b97a4' }}>
          <MoreVertRoundedIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <>
      <Card
        sx={{
          borderRadius: 2.2,
          border: '1px solid #d7dfe8',
          boxShadow: '0 1px 4px rgba(15, 23, 42, 0.08)',
          height: '100%',
        }}
      >
        <CardContent
          sx={{ p: 1.3, '&.MuiCardContent-root:last-child': { pb: 1.3 } }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 1.5,
            }}
          >
            <Typography
              sx={{ fontSize: '1.3rem', fontWeight: 500, color: '#3d516b' }}
            >
              Stress Max Loss
            </Typography>
            {renderActions({ expanded: false })}
          </Box>

          <Box sx={{ width: '100%', height: 300 }}>
            <AgCharts
              options={options}
              style={{ width: '100%', height: 300 }}
            />
          </Box>
        </CardContent>
      </Card>

      <Dialog fullScreen open={isExpanded} onClose={() => setIsExpanded(false)}>
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', p: 3 }}>
          <Card
            sx={{
              borderRadius: 2.2,
              border: '1px solid #d7dfe8',
              boxShadow: '0 1px 4px rgba(15, 23, 42, 0.08)',
            }}
          >
            <CardContent
              sx={{ p: 2.25, '&.MuiCardContent-root:last-child': { pb: 2.25 } }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 1.25,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1.3rem',
                    fontWeight: 500,
                    color: '#3d516b',
                  }}
                >
                  Stress Max Loss
                </Typography>
                {renderActions({ expanded: true })}
              </Box>

              <Box sx={{ width: '100%', height: 'calc(100vh - 180px)' }}>
                <AgCharts
                  options={options}
                  style={{ width: '100%', height: '100%' }}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Dialog>
    </>
  );
}
