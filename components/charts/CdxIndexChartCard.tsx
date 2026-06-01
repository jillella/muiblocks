'use client';

import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import { Box, Card, CardContent, Dialog, IconButton, Typography } from '@mui/material';
import { AgCharts } from 'ag-charts-react';
import { format, parseISO } from 'date-fns';
import { useMemo, useState } from 'react';
import { registerAgModules } from '@/lib/ag-modules';
import type { CdxIndexRow } from '@/lib/mock-data';

type CdxIndexChartDatum = CdxIndexRow & { monthLabel: string };

function toCdxIndexChartData(rows: CdxIndexRow[]): CdxIndexChartDatum[] {
  return [...rows]
    .sort((a, b) => a.asOfDate.localeCompare(b.asOfDate))
    .map((row) => ({
      ...row,
      monthLabel: format(parseISO(row.asOfDate), 'MMM yyyy'),
    }));
}

interface CdxIndexChartCardProps {
  data: CdxIndexRow[];
}

registerAgModules();

const CDX_SERIES = [
  { key: 'legendOne' as const, name: 'Legend One', color: '#a68b6b' },
  { key: 'legendTwo' as const, name: 'Legend Two', color: '#d4c48a' },
  { key: 'legendThree' as const, name: 'Legend Three', color: '#8fa88f' },
  { key: 'legendFour' as const, name: 'Legend Four', color: '#3d6b7a' },
  { key: 'legendFive' as const, name: 'Legend Five', color: '#c5c9d1' },
];

function peakSeriesValue(rows: CdxIndexChartDatum[]): number {
  let peak = 0;
  for (const row of rows) {
    for (const { key } of CDX_SERIES) {
      const value = row[key];
      if (typeof value === 'number' && Number.isFinite(value)) {
        peak = Math.max(peak, value);
      }
    }
  }
  return peak;
}

function yAxisMaxFromData(rows: CdxIndexChartDatum[]): number {
  const peak = peakSeriesValue(rows);
  if (peak <= 0) return 1;
  return Math.ceil(peak * 1.15);
}

function yAxisTickStep(yMax: number): number {
  if (yMax <= 15) return 1;
  if (yMax <= 30) return 2;
  return 5;
}

function buildCdxIndexChartOptions(rows: CdxIndexChartDatum[]) {
  const yMax = yAxisMaxFromData(rows);
  const tickStep = yAxisTickStep(yMax);

  return {
    data: rows,
    background: { fill: 'transparent' },
    padding: { top: 8, right: 8, bottom: 8, left: 8 },
    series: CDX_SERIES.map(({ key, name, color }) => ({
      type: 'bar',
      xKey: 'monthLabel',
      yKey: key,
      yName: name,
      fill: color,
      stroke: color,
      cornerRadius: 4,
    })),
    axes: [
      {
        type: 'category',
        position: 'bottom',
        paddingInner: 0.12,
        paddingOuter: 0.04,
        line: { enabled: true, stroke: '#c5ccd3' },
        tick: { enabled: false },
        label: { color: '#6b7280', fontSize: 11 },
        gridLine: { enabled: false },
      },
      {
        type: 'number',
        position: 'left',
        min: 0,
        max: yMax,
        nice: false,
        line: { enabled: false },
        tick: { enabled: true, interval: { step: tickStep } },
        label: { color: '#6b7280', fontSize: 11, minSpacing: 12 },
        gridLine: { enabled: false },
      },
    ],
    legend: {
      enabled: true,
      position: 'bottom',
      spacing: 20,
      item: {
        marker: { shape: 'square', size: 10 },
        label: { color: '#64748b', fontSize: 12 },
      },
    },
  };
}

export default function CdxIndexChartCard({ data }: CdxIndexChartCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const chartData = useMemo(() => toCdxIndexChartData(data), [data]);
  const chartOptions: any = useMemo(() => buildCdxIndexChartOptions(chartData), [chartData]);

  const renderHeader = (expanded: boolean) => (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.25 }}>
      <Typography sx={{ fontSize: '1.3rem', fontWeight: 500, color: '#3d516b' }}>CDX Index</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
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

  const renderChart = (height: number | string) => (
    <Box sx={{ width: '100%', height }}>
      <AgCharts options={chartOptions} style={{ width: '100%', height: '100%' }} />
    </Box>
  );

  return (
    <>
      <Card
        sx={{
          borderRadius: 3,
          border: '1px solid #e0e0e0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        <CardContent sx={{ p: 2.25, '&.MuiCardContent-root:last-child': { pb: 2.25 } }}>
          {renderHeader(false)}
          <Box sx={{ width: '100%', height: 220 }}>{renderChart(220)}</Box>
        </CardContent>
      </Card>

      <Dialog fullScreen open={isExpanded} onClose={() => setIsExpanded(false)}>
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', p: 3 }}>
          <Card sx={{ borderRadius: 3, border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: 2.25, '&.MuiCardContent-root:last-child': { pb: 2.25 } }}>
              {renderHeader(true)}
              {renderChart('calc(100vh - 180px)')}
            </CardContent>
          </Card>
        </Box>
      </Dialog>
    </>
  );
}
