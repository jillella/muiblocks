'use client';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Chip, Paper, Stack, Tooltip, Typography } from '@mui/material';
import AttributePanel from '@/components/var-drilldown/AttributePanel';
import { useDrilldown } from '@/components/var-drilldown/DrilldownContext';
import DrilldownSummaryCards from '@/components/var-drilldown/DrilldownSummaryCards';
import RiskAttributionGrid from '@/components/var-drilldown/RiskAttributionGrid';
import { dimensionFieldById } from '@/components/var-drilldown/drilldownFields';
import {
  TEXT_PRIMARY,
  TEXT_SECONDARY,
} from '@/components/var-drilldown/drilldownFormat';

export default function RiskAttributionDrilldownPanel() {
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
          Risk Sensitivity Attribution
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
          gap: 2,
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1fr) 280px' },
          alignItems: 'start',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            border: '1px solid #e8ebef',
            borderRadius: 2.5,
            p: { xs: 1.5, md: 2 },
            minWidth: 0,
          }}
        >
          <RiskAttributionGrid />
        </Paper>

        <AttributePanel />
      </Box>
    </Box>
  );
}
