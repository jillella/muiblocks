'use client';

import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import { Box, Card, CardContent, Dialog, IconButton, Tooltip as MuiTooltip, Typography } from '@mui/material';
import { AgCharts } from 'ag-charts-react';
import { useMemo, useState } from 'react';
import { buildMockTopContributorRows, type TopContributorRow } from '@/lib/mock-data';
import { registerAgModules } from '@/lib/ag-modules';
import TopContributorsTable from '@/components/svar-window-calibration/TopContributorsTable';

registerAgModules();

type ViewMode = 'chart' | 'table';

function ChartTableToggle({
  viewMode,
  onModeChange,
}: {
  viewMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}) {
  return (
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
        aria-label="Chart view"
        onClick={() => onModeChange('chart')}
        sx={{
          width: 52,
          height: 32,
          borderRadius: 999,
          backgroundColor: viewMode === 'chart' ? '#ffffff' : 'transparent',
          color: viewMode === 'chart' ? '#2f8fe8' : '#6d6d6d',
          boxShadow: viewMode === 'chart' ? '0 1px 3px rgba(35,94,165,0.18)' : 'none',
          '&:hover': { backgroundColor: viewMode === 'chart' ? '#ffffff' : 'rgba(255,255,255,0.5)' },
        }}
      >
        <BarChartRoundedIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        aria-label="Table view"
        onClick={() => onModeChange('table')}
        sx={{
          width: 52,
          height: 32,
          borderRadius: 999,
          backgroundColor: viewMode === 'table' ? '#ffffff' : 'transparent',
          color: viewMode === 'table' ? '#2f8fe8' : '#6d6d6d',
          boxShadow: viewMode === 'table' ? '0 1px 3px rgba(35,94,165,0.18)' : 'none',
          '&:hover': { backgroundColor: viewMode === 'table' ? '#ffffff' : 'rgba(255,255,255,0.5)' },
        }}
      >
        <FormatListBulletedRoundedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

const SERIES_COLORS = {
  ir: '#8b6f47',
  fx: '#c9a96a',
  fxVol: '#3d8b8b',
  irVol: '#c5c9d1',
} as const;

export type TopContributorsChartProps = {
  rows?: TopContributorRow[];
};

export default function TopContributorsChart({ rows: rowsProp }: TopContributorsChartProps) {
  const rows = useMemo(() => rowsProp ?? buildMockTopContributorRows(), [rowsProp]);
  const [viewMode, setViewMode] = useState<ViewMode>('chart');
  const [isExpanded, setIsExpanded] = useState(false);

  const chartOptions: any = useMemo(
    () => ({
      data: rows,
      background: { fill: 'transparent' },
      padding: { top: 8, right: 8, bottom: 8, left: 8 },
      series: [
        {
          type: 'bar',
          xKey: 'month',
          yKey: 'ir',
          yName: 'IR',
          fill: SERIES_COLORS.ir,
          stroke: SERIES_COLORS.ir,
          cornerRadius: 2,
        },
        {
          type: 'bar',
          xKey: 'month',
          yKey: 'fx',
          yName: 'FX',
          fill: SERIES_COLORS.fx,
          stroke: SERIES_COLORS.fx,
          cornerRadius: 2,
        },
        {
          type: 'bar',
          xKey: 'month',
          yKey: 'fxVol',
          yName: 'FX Vol',
          fill: SERIES_COLORS.fxVol,
          stroke: SERIES_COLORS.fxVol,
          cornerRadius: 2,
        },
        {
          type: 'bar',
          xKey: 'month',
          yKey: 'irVol',
          yName: 'IR Vol',
          fill: SERIES_COLORS.irVol,
          stroke: SERIES_COLORS.irVol,
          cornerRadius: 2,
        },
      ],
      axes: [
        {
          type: 'category',
          position: 'bottom',
          line: { enabled: false },
          tick: { enabled: false },
          label: { color: '#6b7280', fontSize: 11 },
          title: {
            enabled: true,
            text: 'Horiz Axis',
            color: '#6b7280',
            fontSize: 11,
          },
          gridLine: { enabled: false },
        },
        {
          type: 'number',
          position: 'left',
          min: 0,
          max: 17,
          nice: false,
          line: { enabled: false },
          tick: { enabled: false },
          label: {
            color: '#6b7280',
            fontSize: 11,
            formatter: ({ value }: { value: number }) => (value === 0 ? '0.0' : `${value}M`),
          },
          title: {
            enabled: true,
            text: 'PnL in Millions',
            color: '#6b7280',
            fontSize: 11,
          },
          gridLine: { enabled: true, style: [{ stroke: '#e6ecf2', lineDash: [4, 4] }] },
        },
      ],
      legend: {
        enabled: true,
        position: 'bottom',
        spacing: 20,
        item: { label: { color: '#64748b', fontSize: 12 } },
      },
    }),
    [rows],
  );

  const renderToolbar = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.25 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, minWidth: 0 }}>
        <Typography sx={{ fontSize: '1.05rem', fontWeight: 600, color: '#3d516b' }} noWrap>
          Top Contributors
        </Typography>
        <MuiTooltip title="PnL contribution by risk factor">
          <IconButton size="small" sx={{ color: '#8b97a4', p: 0.25 }} aria-label="Info">
            <InfoOutlinedIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </MuiTooltip>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ChartTableToggle viewMode={viewMode} onModeChange={setViewMode} />
        <IconButton size="small" sx={{ color: '#8b97a4' }} onClick={() => setIsExpanded((v) => !v)}>
          {isExpanded ? <CloseFullscreenRoundedIcon fontSize="small" /> : <OpenInFullRoundedIcon fontSize="small" />}
        </IconButton>
        <IconButton size="small" sx={{ color: '#8b97a4' }} aria-label="More options">
          <MoreVertRoundedIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );

  const renderBody = (height: number | string) =>
    viewMode === 'chart' ? (
      <Box sx={{ width: '100%', height }}>
        <AgCharts options={chartOptions} style={{ width: '100%', height: '100%' }} />
      </Box>
    ) : (
      <TopContributorsTable height={height} rows={rows} />
    );

  return (
    <>
      {!isExpanded ? (
        <Card
          sx={{
            borderRadius: 3,
            border: '1px solid #e0e0e0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            height: '100%',
          }}
        >
          <CardContent sx={{ p: 2.25, '&.MuiCardContent-root:last-child': { pb: 2.25 } }}>
            {renderToolbar()}
            <Box sx={{ width: '100%', height: 300 }}>{renderBody(300)}</Box>
          </CardContent>
        </Card>
      ) : null}

      <Dialog fullScreen open={isExpanded} onClose={() => setIsExpanded(false)}>
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa', p: 3 }}>
          <Card sx={{ borderRadius: 3, border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: 2.25, '&.MuiCardContent-root:last-child': { pb: 2.25 } }}>
              {renderToolbar()}
              <Box sx={{ width: '100%', height: 'calc(100vh - 160px)', minHeight: 400 }}>{renderBody('calc(100vh - 160px)')}</Box>
            </CardContent>
          </Card>
        </Box>
      </Dialog>
    </>
  );
}
