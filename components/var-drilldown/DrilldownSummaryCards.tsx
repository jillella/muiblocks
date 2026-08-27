'use client';

/**
 * Summary tiles fed by the totals the grid publishes after every filter change,
 * demonstrating that a drag in the attribute panel updates the whole dashboard
 * context and not just the grid.
 */

import { Box, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { useDrilldown } from '@/components/var-drilldown/DrilldownContext';
import {
  amountColor,
  formatCompact,
  formatCount,
  PANEL_BORDER,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
} from '@/components/var-drilldown/drilldownFormat';

interface SummaryTile {
  label: string;
  value: string;
  color: string;
  hint?: string;
}

export default function DrilldownSummaryCards() {
  const { totals, hierarchy } = useDrilldown();

  const tiles: SummaryTile[] = [
    {
      label: 'Market Value (USD)',
      value: formatCompact(totals.marketValue),
      color: amountColor(totals.marketValue),
    },
    {
      label: 'Total Delta (USD)',
      value: formatCompact(totals.delta),
      color: amountColor(totals.delta),
    },
    {
      label: 'Total Gamma (USD)',
      value: formatCompact(totals.gamma),
      color: amountColor(totals.gamma),
    },
    {
      label: 'VaR (99%, 1D) (USD)',
      value: formatCompact(totals.varUsd),
      color: TEXT_PRIMARY,
      hint: 'Diversified portfolio VaR from the risk engine, not a sum of the grid rows',
    },
    {
      label: 'SVaR (99%, 1D) (USD)',
      value: formatCompact(totals.svarUsd),
      color: TEXT_PRIMARY,
      hint: 'Diversified portfolio SVaR from the risk engine, not a sum of the grid rows',
    },
    {
      label: '# Risk Factors',
      value: formatCount(totals.riskFactorCount),
      color: TEXT_PRIMARY,
    },
    {
      label: '# Rows',
      value: formatCount(totals.rowCount),
      color: TEXT_PRIMARY,
    },
    {
      label: 'Drilldown Levels',
      value: formatCount(hierarchy.length),
      color: TEXT_PRIMARY,
      hint: 'Number of attributes currently in the drilldown hierarchy',
    },
  ];

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 1.25,
        gridTemplateColumns: {
          xs: 'repeat(2, minmax(0, 1fr))',
          sm: 'repeat(3, minmax(0, 1fr))',
          md: 'repeat(4, minmax(0, 1fr))',
          xl: 'repeat(8, minmax(0, 1fr))',
        },
        mb: 2.5,
      }}
    >
      {tiles.map((tile) => (
        <Tooltip
          key={tile.label}
          title={tile.hint ?? ''}
          placement="top"
          disableHoverListener={!tile.hint}
        >
          <Paper
            elevation={0}
            sx={{
              border: `1px solid ${PANEL_BORDER}`,
              borderRadius: 2,
              px: 1.5,
              py: 1.25,
              minWidth: 0,
            }}
          >
            <Stack spacing={0.5} sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: '0.7rem',
                  color: TEXT_SECONDARY,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {tile.label}
              </Typography>
              <Typography
                sx={{
                  fontSize: '1.08rem',
                  fontWeight: 600,
                  color: tile.color,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {tile.value}
              </Typography>
            </Stack>
          </Paper>
        </Tooltip>
      ))}
    </Box>
  );
}
