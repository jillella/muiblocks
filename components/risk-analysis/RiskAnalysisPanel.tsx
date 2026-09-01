'use client';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Chip, Paper, Stack, Tooltip, Typography } from '@mui/material';
import AttributePanel from '@/components/risk-analysis/AttributePanel';
import { useDrilldown } from '@/components/risk-analysis/RiskAnalysisContext';
import DrilldownSummaryCards from '@/components/risk-analysis/DrilldownSummaryCards';
import RiskAnalysisGrid from '@/components/risk-analysis/RiskAnalysisGrid';
import { dimensionFieldById } from '@/components/risk-analysis/drilldownFields';
import {
  TEXT_PRIMARY,
  TEXT_SECONDARY,
} from '@/components/risk-analysis/drilldownFormat';

export default function RiskAnalysisPanel() {
  const { hierarchy, drilldownEnabled } = useDrilldown();

  return (
    <Box>
      <Stack
        direction="row"
        spacing={1}
        sx={{ alignItems: 'center', mb: 0.5, flexWrap: 'wrap' }}
      >
        <Typography
          sx={{ fontSize: '1.35rem', fontWeight: 600, color: TEXT_PRIMARY }}
        >
          Risk Analysis
        </Typography>
        <Tooltip title="Drag attributes from the right-hand panel to change how the grid drills down. Every level aggregates the additive measures.">
          <InfoOutlinedIcon sx={{ fontSize: 17, color: '#9aa6b2' }} />
        </Tooltip>
      </Stack>

      <Stack
        direction="row"
        spacing={0.75}
        sx={{ alignItems: 'center', mb: 2, flexWrap: 'wrap', rowGap: 0.75 }}
      >
        <Typography sx={{ fontSize: '0.76rem', color: TEXT_SECONDARY }}>
          Drilldown path:
        </Typography>
        {!drilldownEnabled || hierarchy.length === 0 ? (
          <Typography
            sx={{ fontSize: '0.76rem', fontWeight: 600, color: TEXT_SECONDARY }}
          >
            Flat rows (no grouping)
          </Typography>
        ) : (
          hierarchy.map((fieldId, index) => (
            <Stack
              key={fieldId}
              direction="row"
              spacing={0.75}
              sx={{ alignItems: 'center' }}
            >
              {index > 0 && (
                <Typography sx={{ fontSize: '0.76rem', color: '#b6c0cb' }}>
                  ›
                </Typography>
              )}
              <Chip
                size="small"
                label={dimensionFieldById.get(fieldId)?.label ?? fieldId}
                sx={{
                  height: 22,
                  fontSize: '0.72rem',
                  fontWeight: 500,
                  backgroundColor: '#eef4e6',
                  color: '#28532f',
                  border: '1px solid #d7e6c4',
                }}
              />
            </Stack>
          ))
        )}
      </Stack>

      <DrilldownSummaryCards />

      <Box
        sx={{
          display: 'grid',
          gap: { xs: 1.25, md: 2 },
          // The grid column has a floor so the panel never squeezes it into
          // unusability; the page scrolls horizontally instead of wrapping.
          gridTemplateColumns: {
            xs: 'minmax(300px, 1fr) 232px',
            sm: 'minmax(360px, 1fr) 256px',
            lg: 'minmax(0, 1fr) 280px',
          },
          alignItems: 'stretch',
          // Both columns share one viewport-sized row so the grid grows with
          // the window instead of sitting at a fixed height next to a taller
          // attribute panel. The subtracted chrome is the header band, KPI
          // tiles and page padding above/below this row.
          height: {
            xs: 'auto',
            md: 'calc(100vh - 480px)',
            xl: 'calc(100vh - 405px)',
          },
          minHeight: { xs: 0, md: 520 },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            border: '1px solid #e8ebef',
            borderRadius: 2.5,
            p: { xs: 1.5, md: 2 },
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <RiskAnalysisGrid />
        </Paper>

        <AttributePanel />
      </Box>
    </Box>
  );
}
