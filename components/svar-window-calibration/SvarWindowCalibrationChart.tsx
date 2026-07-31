'use client';

import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  IconButton,
  Tooltip as MuiTooltip,
  Typography,
} from '@mui/material';
import { AgCharts } from 'ag-charts-react';
import { useMemo, useState } from 'react';
import {
  mockSvarWindowCalibrationPoints,
  type SvarWindowCalibrationPoint,
} from '@/lib/mock-data';
import { registerAgModules } from '@/lib/ag-modules';
import SvarWindowCalibrationTable from '@/components/svar-window-calibration/SvarWindowCalibrationTable';

registerAgModules();

export type { SvarWindowCalibrationPoint };

type SvarChartDatum = SvarWindowCalibrationPoint & { thresholdBillions: number };
type ViewMode = 'chart' | 'table';

const THRESHOLD_BILLIONS = 30;
const BADGE_LABEL = '72.74';

function ChartListToggle({
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
          '&:hover': {
            backgroundColor: viewMode === 'chart' ? '#ffffff' : 'rgba(255,255,255,0.5)',
          },
        }}
      >
        <EqualizerRoundedIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        aria-label="List view"
        onClick={() => onModeChange('table')}
        sx={{
          width: 52,
          height: 32,
          borderRadius: 999,
          backgroundColor: viewMode === 'table' ? '#ffffff' : 'transparent',
          color: viewMode === 'table' ? '#2f8fe8' : '#6d6d6d',
          boxShadow: viewMode === 'table' ? '0 1px 3px rgba(35,94,165,0.18)' : 'none',
          '&:hover': {
            backgroundColor: viewMode === 'table' ? '#ffffff' : 'rgba(255,255,255,0.5)',
          },
        }}
      >
        <FormatListBulletedRoundedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

export type SvarWindowCalibrationChartProps = {
  data?: SvarWindowCalibrationPoint[];
};

export default function SvarWindowCalibrationChart({
  data = mockSvarWindowCalibrationPoints,
}: SvarWindowCalibrationChartProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('chart');

  const chartData: SvarChartDatum[] = useMemo(
    () => data.map((d) => ({ ...d, thresholdBillions: THRESHOLD_BILLIONS })),
    [data],
  );

  const options: any = useMemo(
    () => ({
      data: chartData,
      background: { fill: 'transparent' },
      padding: { top: 12, right: 12, bottom: 8, left: 8 },
      series: [
        {
          type: 'area',
          xKey: 'label',
          yKey: 'svarBillions',
          yName: 'SVaR',
          stroke: '#8b6914',
          strokeWidth: 2,
          fill: {
            type: 'gradient',
            colorStops: [
              { color: 'rgba(248, 244, 236, 0.18)', stop: 0 },
              { color: 'rgba(230, 215, 188, 0.26)', stop: 0.36 },
              { color: 'rgba(195, 168, 129, 0.36)', stop: 0.7 },
              { color: 'rgba(155, 131, 98, 0.44)', stop: 1 },
            ],
          },
          marker: { enabled: false },
        },
        {
          type: 'line',
          xKey: 'label',
          yKey: 'thresholdBillions',
          yName: 'Threshold',
          showInLegend: false,
          stroke: '#0f172a',
          strokeWidth: 1,
          lineDash: [4, 4],
          marker: { enabled: false },
          tooltip: { enabled: false },
        },
      ],
      axes: [
        {
          type: 'category',
          position: 'bottom',
          line: { stroke: '#e5e7eb', strokeWidth: 1 },
          tick: { enabled: false },
          label: { color: '#6b7280', fontSize: 11, rotation: -40 },
          gridLine: { enabled: false },
        },
        {
          type: 'number',
          position: 'left',
          min: 0,
          max: 40,
          nice: false,
          line: { enabled: false },
          tick: { enabled: false },
          label: {
            color: '#6b7280',
            fontSize: 11,
            formatter: ({ value }: { value: number }) => (value === 0 ? '0' : `${value}B`),
          },
          title: {
            enabled: true,
            text: 'SVaR in Billions',
            color: '#6b7280',
            fontSize: 11,
          },
          gridLine: {
            enabled: true,
            style: [{ stroke: '#e6ecf2', lineDash: [4, 4] }],
          },
        },
      ],
      legend: { enabled: false },
    }),
    [chartData],
  );

  const chartBlock = (h: number | string) => (
    <Box sx={{ position: 'relative', width: '100%', height: h }}>
      <AgCharts options={options} style={{ width: '100%', height: '100%' }} />
      <Box
        sx={{
          position: 'absolute',
          left: 8,
          top: { xs: '24%', md: '23%' },
          zIndex: 1,
          px: 1.1,
          py: 0.35,
          borderRadius: 999,
          bgcolor: '#0f2847',
          color: '#fff',
          fontSize: 11,
          fontWeight: 600,
          lineHeight: 1,
          pointerEvents: 'none',
          boxShadow: '0 1px 4px rgba(15,40,71,0.35)',
        }}
      >
        {BADGE_LABEL}
      </Box>
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          left: 48,
          bottom: 2,
          color: '#94a3b8',
          fontSize: 11,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        Every Friday
      </Typography>
    </Box>
  );

  const tableBlock = (height: number | string) => <SvarWindowCalibrationTable height={height} />;

  const renderActions = (expanded: boolean) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <ChartListToggle viewMode={viewMode} onModeChange={setViewMode} />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
        <IconButton size="small" sx={{ color: '#8b97a4' }} onClick={() => setIsExpanded((v) => !v)}>
          {expanded ? <CloseFullscreenRoundedIcon fontSize="small" /> : <OpenInFullRoundedIcon fontSize="small" />}
        </IconButton>
        <IconButton size="small" sx={{ color: '#8b97a4' }} aria-label="More options">
          <MoreVertRoundedIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );

  const headerRow = (expanded: boolean) => (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr auto 1fr' },
        alignItems: 'center',
        gap: { xs: 1, md: 2 },
        mb: 1.25,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, minWidth: 0 }}>
        <Typography sx={{ fontSize: '1.3rem', fontWeight: 500, color: '#3d516b' }} noWrap>
          SVaR Window Calibration
        </Typography>
        <MuiTooltip title="Stress VaR window calibration details">
          <IconButton size="small" sx={{ color: '#8b97a4', p: 0.25 }} aria-label="Info">
            <InfoOutlinedIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </MuiTooltip>
      </Box>
      <Typography
        sx={{
          fontSize: '0.95rem',
          fontWeight: 500,
          color: '#64748b',
          justifySelf: 'center',
          textAlign: 'center',
          display: { xs: 'none', md: 'block' },
        }}
      >
        SVaR Window Selection - 14-Apr-2026
      </Typography>
      <Box sx={{ justifySelf: { xs: 'start', md: 'end' } }}>{renderActions(expanded)}</Box>
    </Box>
  );

  const windowButton = (
    <Button
      variant="outlined"
      size="small"
      endIcon={<KeyboardArrowDownIcon />}
      sx={{
        textTransform: 'none',
        fontWeight: 600,
        color: '#334155',
        borderColor: '#cbd5e1',
        bgcolor: '#fafafa',
        px: 2,
        minWidth: 120,
      }}
    >
      Window
    </Button>
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
          <CardContent sx={{ p: 2.25, '&.MuiCardContent-root:last-child': { pb: 2 } }}>
            {headerRow(false)}
            {viewMode === 'chart' ? (
              <Box sx={{ width: '100%', height: 300 }}>{chartBlock(300)}</Box>
            ) : (
              <Box sx={{ width: '100%', height: 340 }}>{tableBlock(340)}</Box>
            )}
            {viewMode === 'chart' ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1.5 }}>{windowButton}</Box>
            ) : null}
          </CardContent>
        </Card>
      ) : null}

      <Dialog fullScreen open={isExpanded} onClose={() => setIsExpanded(false)}>
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa', p: 3 }}>
          <Card sx={{ borderRadius: 3, border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: 2.25, '&.MuiCardContent-root:last-child': { pb: 2 } }}>
              {headerRow(true)}
              {viewMode === 'chart' ? (
                <Box sx={{ width: '100%', height: 'calc(100vh - 220px)', minHeight: 400 }}>
                  {chartBlock('calc(100vh - 220px)')}
                </Box>
              ) : (
                <Box sx={{ width: '100%', height: 'calc(100vh - 200px)', minHeight: 500 }}>
                  {tableBlock('calc(100vh - 200px)')}
                </Box>
              )}
              {viewMode === 'chart' ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1.5 }}>{windowButton}</Box>
              ) : null}
            </CardContent>
          </Card>
        </Box>
      </Dialog>
    </>
  );
}
