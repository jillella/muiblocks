'use client';

import type { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { AgCharts } from 'ag-charts-react';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { registerAgModules } from '@/lib/ag-modules';
import { mockRiskFactorDumbbell, type RiskFactorDumbbellRow } from '@/lib/mock-data2';
import { ANALYSIS_TITLE_COLOR } from '@/components/var-analysis2/AnalysisPanel';
import { useChartFontFamily } from '@/components/var-analysis2/useChartFontFamily';
import {
  AXIS_COLOR,
  formatSigned,
  GRID_COLOR,
  INCREASE_COLOR,
  NEGATIVE_COLOR,
  POSITIVE_COLOR,
} from '@/components/var-analysis2/varFormat';

registerAgModules();

/** AG Charts Community has no dumbbell series. Range Bar is Enterprise-only. */
const CURRENT_MARKER = INCREASE_COLOR;
const PRIOR_STROKE = '#8b96a5';
const Y_MAX = 35;
const Y_STEP = 5;

const MARKER_SIZE = 13;
const MARKER_STROKE = 2;
const PRIOR_LABEL_COLOR = '#6b7280';
/** Prior and current read as one pair: colour is the only difference between them. */
const VALUE_LABEL_FONT_SIZE = 11;
const VALUE_LABEL_FONT_WEIGHT = 700;
const AXIS_LABEL_FONT_WEIGHT = 700;
/**
 * Scatter labels ignore `padding`, so the value/change labels are anchored to offset
 * y-values instead. Offsets are declared in px and converted to mm against the y scale.
 */
const CURRENT_LABEL_OFFSET_PX = 12;
const CHANGE_LABEL_OFFSET_PX = 26;
const PLOT_INSET_TOP = 14;
const PLOT_INSET_BOTTOM = 32;
const STEM_WIDTH_PX = 2;
const PADDING_OUTER = 0.5;
/** Chart padding + left axis title/labels, so the footer grid tracks the plot area. */
const PLOT_INSET_LEFT = 59;
const PLOT_INSET_RIGHT = 12;

const invisibleShape = () => {};

/**
 * Band scale: bandWidth = plotWidth * (1 - paddingInner) / (n - paddingInner + 2 * paddingOuter).
 * Solved for paddingInner so bandWidth stays STEM_WIDTH_PX at any container width.
 */
function stemPaddingInner(plotWidth: number, count: number) {
  if (plotWidth <= STEM_WIDTH_PX * (count + 2 * PADDING_OUTER)) return 0.98;
  const padding =
    (plotWidth - STEM_WIDTH_PX * (count + 2 * PADDING_OUTER)) / (plotWidth - STEM_WIDTH_PX);
  return Math.min(Math.max(padding, 0), 0.995);
}

type DumbbellDatum = RiskFactorDumbbellRow & {
  x: number;
  lowMm: number;
  highMm: number;
  rangeMm: number;
  deltaMm: number;
  changeLabel: string;
  priorLabel: string;
  currentLabel: string;
  currentLabelMm: number;
  changeLabelMm: number;
};

function formatMmLabel(value: number) {
  return `${value.toFixed(1)} mm`;
}

export function summarizeRiskFactorDumbbell(rows: RiskFactorDumbbellRow[]) {
  const priorTotalMm = rows.reduce((total, row) => total + row.priorMm, 0);
  const currentTotalMm = rows.reduce((total, row) => total + row.currentMm, 0);
  const deltaMm = currentTotalMm - priorTotalMm;
  const deltaPct = priorTotalMm === 0 ? 0 : (deltaMm / priorTotalMm) * 100;
  return { priorTotalMm, currentTotalMm, deltaMm, deltaPct };
}

export type ContributionVarRiskFactorDumbbellProps = {
  rows?: RiskFactorDumbbellRow[];
  height?: number;
};

export default function ContributionVarRiskFactorDumbbell({
  rows: rowsProp,
  height = 300,
}: ContributionVarRiskFactorDumbbellProps) {
  const fontFamily = useChartFontFamily();
  const rows = useMemo(() => rowsProp ?? mockRiskFactorDumbbell, [rowsProp]);
  const chartBoxRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useLayoutEffect(() => {
    const node = chartBoxRef.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const { chartOptions, categories } = useMemo<any>(() => {
    const sorted = [...rows].sort((a, b) => b.currentMm - a.currentMm);
    const mmPerPx = Y_MAX / Math.max(1, height - PLOT_INSET_TOP - PLOT_INSET_BOTTOM);
    const data: DumbbellDatum[] = sorted.map((row, x) => {
      const deltaMm = row.currentMm - row.priorMm;
      const highMm = Math.max(row.priorMm, row.currentMm);
      return {
        ...row,
        x,
        lowMm: Math.min(row.priorMm, row.currentMm),
        highMm,
        rangeMm: Math.abs(row.currentMm - row.priorMm),
        deltaMm,
        changeLabel: formatSigned(deltaMm, 1),
        priorLabel: row.priorMm.toFixed(1),
        currentLabel: row.currentMm.toFixed(1),
        currentLabelMm:
          row.currentMm + Math.sign(deltaMm) * CURRENT_LABEL_OFFSET_PX * mmPerPx,
        changeLabelMm: highMm + CHANGE_LABEL_OFFSET_PX * mmPerPx,
      };
    });

    const tooltipRenderer = ({ datum }: { datum: DumbbellDatum }) => ({
      title: datum.factor,
      data: [
        { label: 'Prior', value: formatMmLabel(datum.priorMm) },
        { label: 'Current', value: formatMmLabel(datum.currentMm) },
        { label: 'Change', value: `${formatSigned(datum.deltaMm, 1)} mm` },
      ],
    });

    const labelSeries = (config: {
      data: DumbbellDatum[];
      yKey: 'changeLabelMm' | 'currentLabelMm';
      labelKey: 'changeLabel' | 'currentLabel';
      placement: 'top' | 'bottom';
      color: string;
      fontSize: number;
      fontWeight?: number;
    }) => ({
      type: 'scatter' as const,
      data: config.data,
      xKey: 'factor',
      yKey: config.yKey,
      labelKey: config.labelKey,
      shape: invisibleShape,
      size: 1,
      fillOpacity: 0,
      strokeWidth: 0,
      tooltip: { enabled: false },
      label: {
        enabled: true,
        placement: config.placement,
        fontFamily,
        fontSize: config.fontSize,
        fontWeight: config.fontWeight ?? 700,
        color: config.color,
      },
    });

    const increases = data.filter((row) => row.deltaMm > 0);
    const decreases = data.filter((row) => row.deltaMm < 0);

    return {
      categories: data,
      chartOptions: {
        data,
        background: { fill: '#ffffff' },
        padding: { top: PLOT_INSET_TOP, right: PLOT_INSET_RIGHT, bottom: 4, left: 18 },
        series: [
          {
            type: 'bar',
            xKey: 'factor',
            yKey: 'lowMm',
            stacked: true,
            fill: 'transparent',
            strokeWidth: 0,
            tooltip: { enabled: false },
            highlight: { enabled: false },
          },
          {
            type: 'bar',
            xKey: 'factor',
            yKey: 'rangeMm',
            stacked: true,
            strokeWidth: 0,
            itemStyler: ({ datum }: { datum: DumbbellDatum }) => ({
              fill: datum.deltaMm >= 0 ? POSITIVE_COLOR : NEGATIVE_COLOR,
            }),
            tooltip: { enabled: false },
            highlight: { enabled: false },
          },
          {
            type: 'scatter',
            xKey: 'factor',
            yKey: 'priorMm',
            yName: 'Prior (mm)',
            shape: 'circle',
            size: MARKER_SIZE,
            fill: '#ffffff',
            fillOpacity: 1,
            stroke: PRIOR_STROKE,
            strokeWidth: MARKER_STROKE,
            labelKey: 'priorLabel',
            label: {
              enabled: true,
              placement: 'left',
              padding: 4,
              fontFamily,
              fontSize: VALUE_LABEL_FONT_SIZE,
              fontWeight: VALUE_LABEL_FONT_WEIGHT,
              color: PRIOR_LABEL_COLOR,
            },
            tooltip: { renderer: tooltipRenderer },
          },
          {
            type: 'scatter',
            xKey: 'factor',
            yKey: 'currentMm',
            yName: 'Current (mm)',
            shape: 'circle',
            /** Stroke is centred on the path, so size + strokeWidth must match the prior ring. */
            size: MARKER_SIZE,
            fill: CURRENT_MARKER,
            fillOpacity: 1,
            stroke: CURRENT_MARKER,
            strokeWidth: MARKER_STROKE,
            tooltip: { renderer: tooltipRenderer },
          },
          labelSeries({
            data: increases,
            yKey: 'currentLabelMm',
            labelKey: 'currentLabel',
            placement: 'top',
            color: CURRENT_MARKER,
            fontSize: VALUE_LABEL_FONT_SIZE,
            fontWeight: VALUE_LABEL_FONT_WEIGHT,
          }),
          labelSeries({
            data: decreases,
            yKey: 'currentLabelMm',
            labelKey: 'currentLabel',
            placement: 'bottom',
            color: CURRENT_MARKER,
            fontSize: VALUE_LABEL_FONT_SIZE,
            fontWeight: VALUE_LABEL_FONT_WEIGHT,
          }),
          labelSeries({
            data: increases,
            yKey: 'changeLabelMm',
            labelKey: 'changeLabel',
            placement: 'top',
            color: POSITIVE_COLOR,
            fontSize: 11.5,
          }),
          labelSeries({
            data: decreases,
            yKey: 'changeLabelMm',
            labelKey: 'changeLabel',
            placement: 'top',
            color: NEGATIVE_COLOR,
            fontSize: 11.5,
          }),
        ],
        axes: [
          {
            type: 'number',
            position: 'left',
            min: 0,
            max: Y_MAX,
            nice: false,
            interval: { step: Y_STEP },
            line: { enabled: true, stroke: AXIS_COLOR },
            tick: { enabled: false },
            crosshair: { enabled: false },
            gridLine: { enabled: true, style: [{ stroke: GRID_COLOR }] },
            label: {
              color: ANALYSIS_TITLE_COLOR,
              fontFamily,
              fontSize: 11,
              fontWeight: AXIS_LABEL_FONT_WEIGHT,
              formatter: ({ value }: { value: number }) => String(value),
            },
            title: {
              enabled: true,
              text: 'Contribution VaR (mm)',
              color: ANALYSIS_TITLE_COLOR,
              fontFamily,
              fontSize: 11.5,
              spacing: 2,
            },
          },
          {
            type: 'category',
            position: 'bottom',
            paddingInner: stemPaddingInner(
              containerWidth - PLOT_INSET_LEFT - PLOT_INSET_RIGHT,
              data.length,
            ),
            paddingOuter: PADDING_OUTER,
            line: { enabled: true, stroke: AXIS_COLOR },
            tick: { enabled: false },
            crosshair: { enabled: false },
            gridLine: { enabled: false },
            label: {
              color: ANALYSIS_TITLE_COLOR,
              fontFamily,
              fontSize: 11,
              fontWeight: AXIS_LABEL_FONT_WEIGHT,
              spacing: 4,
              autoRotate: false,
            },
          },
        ],
        legend: { enabled: false },
      },
    };
  }, [rows, fontFamily, containerWidth, height]);

  return (
    <Box sx={{ position: 'relative', width: '100%', minWidth: 0 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs: 1.25, sm: 2 },
          flexWrap: 'wrap',
          mb: 0.25,
        }}
      >
        <LegendItem
          swatch={
            <Box
              sx={{
                width: 11,
                height: 11,
                borderRadius: '50%',
                border: `2px solid ${PRIOR_STROKE}`,
                backgroundColor: '#fff',
              }}
            />
          }
          label="Prior (mm)"
        />
        <LegendItem
          swatch={
            <Box
              sx={{
                width: 11,
                height: 11,
                borderRadius: '50%',
                backgroundColor: CURRENT_MARKER,
              }}
            />
          }
          label="Current (mm)"
        />
        <LegendItem swatch={<Box sx={{ width: 16, height: 3, borderRadius: 1, backgroundColor: POSITIVE_COLOR }} />} label="Increase" />
        <LegendItem swatch={<Box sx={{ width: 16, height: 3, borderRadius: 1, backgroundColor: NEGATIVE_COLOR }} />} label="Decrease" />
      </Box>

      <Box ref={chartBoxRef} sx={{ width: '100%', height, minWidth: 0 }}>
        <AgCharts options={chartOptions} style={{ width: '100%', height: '100%' }} />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `${PLOT_INSET_LEFT}px repeat(${categories.length}, minmax(0, 1fr)) ${PLOT_INSET_RIGHT}px`,
          mt: 0.25,
          px: 0,
        }}
      >
        <Box />
        {categories.map((row: DumbbellDatum) => (
          <Box key={row.factor} sx={{ textAlign: 'center', px: 0.25 }}>
            <Typography sx={{ fontSize: '10px', color: PRIOR_LABEL_COLOR, lineHeight: 1.3 }}>
              Prior {row.priorMm.toFixed(1)}
            </Typography>
            <Typography sx={{ fontSize: '10px', color: CURRENT_MARKER, lineHeight: 1.3 }}>
              Current {row.currentMm.toFixed(1)}
            </Typography>
          </Box>
        ))}
        <Box />
      </Box>
    </Box>
  );
}

function LegendItem({ swatch, label }: { swatch: ReactNode; label: string }) {
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
      {swatch}
      <Typography sx={{ fontFamily: 'Roboto, Helvetica, Arial, sans-serif', fontSize: '11px', color: '#4b5563' }}>
        {label}
      </Typography>
    </Box>
  );
}
