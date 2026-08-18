'use client';

import { Box, Typography } from '@mui/material';
import { AgCharts } from 'ag-charts-react';
import { useMemo } from 'react';
import { registerAgModules } from '@/lib/ag-modules';
import { mockRiskFactorAttribution, type RiskFactorAttributionSlice } from '@/lib/mock-data';
import AnalysisPanel from '@/components/var-analysis/AnalysisPanel';
import { useChartFontFamily } from '@/components/var-analysis/useChartFontFamily';
import { formatSigned, mixHex } from '@/components/var-analysis2/varFormat';

registerAgModules();

/** Thick inner (prior) ring, thin outer (current) ring, white gap between them. */
const CURRENT_RING = { outerRadiusRatio: 1, innerRadiusRatio: 0.88 };
const PRIOR_RING = { outerRadiusRatio: 0.82, innerRadiusRatio: 0.42 };

export type RiskFactorAttributionChartProps = {
  slices?: RiskFactorAttributionSlice[];
  height?: number;
};

export default function RiskFactorAttributionChart({
  slices: slicesProp,
  height = 300,
}: RiskFactorAttributionChartProps) {
  const slices = useMemo(() => slicesProp ?? mockRiskFactorAttribution, [slicesProp]);
  const fontFamily = useChartFontFamily();

  const { currentTotalMm, priorTotalMm } = useMemo(
    () => ({
      currentTotalMm: slices.reduce((total, slice) => total + slice.currentMm, 0),
      priorTotalMm: slices.reduce((total, slice) => total + slice.priorMm, 0),
    }),
    [slices],
  );

  const chartOptions = useMemo<any>(() => {
    const fills = slices.map((slice) => slice.color);
    const priorFills = slices.map((slice) => mixHex(slice.color, '#ffffff', 0.55));

    return {
      background: { fill: 'transparent' },
      padding: { top: 4, right: 4, bottom: 4, left: 4 },
      series: [
        {
          type: 'donut',
          data: slices,
          angleKey: 'priorMm',
          angleName: 'Prior week',
          ...PRIOR_RING,
          fills: priorFills,
          strokes: priorFills,
          strokeWidth: 0,
          sectorSpacing: 0,
          calloutLabel: { enabled: false },
          sectorLabel: { enabled: false },
          tooltip: {
            renderer: ({ datum }: { datum: RiskFactorAttributionSlice }) => ({
              title: `${datum.factor} — prior week`,
              content: `$${datum.priorMm.toFixed(1)}MM`,
            }),
          },
        },
        {
          type: 'donut',
          data: slices,
          angleKey: 'currentMm',
          angleName: 'Current week',
          ...CURRENT_RING,
          fills,
          strokes: fills,
          strokeWidth: 0,
          sectorSpacing: 0,
          calloutLabel: { enabled: false },
          sectorLabel: { enabled: false },
          innerLabels: [
            { text: 'Contribution VaR', fontFamily, fontSize: 11, fontWeight: 'bold', color: '#1f2937', spacing: 3 },
            { text: 'Current Total', fontFamily, fontSize: 10, color: '#6b7280', spacing: 2 },
            {
              text: `$${currentTotalMm.toFixed(1)}MM`,
              fontFamily,
              fontSize: 13,
              fontWeight: 'bold',
              color: '#1f2937',
              spacing: 2,
            },
            { text: `Prior: $${priorTotalMm.toFixed(1)}MM`, fontFamily, fontSize: 10, color: '#9aa3ad' },
          ],
          tooltip: {
            renderer: ({ datum }: { datum: RiskFactorAttributionSlice }) => {
              const delta = datum.currentMm - datum.priorMm;
              return {
                title: datum.factor,
                content: `Current $${datum.currentMm.toFixed(1)}MM · Prior $${datum.priorMm.toFixed(1)}MM · WoW ${formatSigned(delta, 1)}MM`,
              };
            },
          },
        },
      ],
      legend: { enabled: false },
    };
  }, [slices, currentTotalMm, priorTotalMm, fontFamily]);

  return (
    <AnalysisPanel
      title="Risk Attribution - By Risk Factor"
      info="Inner ring is prior week contribution VaR; outer ring is current week"
      showDivider
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          gap: { xs: 2, sm: 5 },
          minHeight: height,
        }}
      >
        <Box sx={{ width: { xs: '100%', sm: '46%' }, minWidth: 0 }}>
          <Typography sx={{ fontSize: '11px', color: '#8b96a5', lineHeight: 1.4 }}>
            Inner ring = Prior week Contribution VaR
          </Typography>
          <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#5b6672', lineHeight: 1.4, mb: 0.5 }}>
            Outer ring = Current week Contribution VaR
          </Typography>
          <Box sx={{ height, minWidth: 0 }}>
            <AgCharts options={chartOptions} style={{ width: '100%', height: '100%' }} />
          </Box>
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
