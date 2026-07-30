'use client';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { Box, IconButton, Tooltip as MuiTooltip, Typography } from '@mui/material';
import type { ReactNode } from 'react';

export const ANALYSIS_TITLE_COLOR = '#285b6c';

/** Shared type style for every panel/section title on the Analysis page. */
export const analysisTitleSx = {
  fontFamily: 'var(--font-roboto), Roboto, Helvetica, Arial, sans-serif',
  fontSize: '22px',
  fontWeight: 400,
  color: ANALYSIS_TITLE_COLOR,
  textTransform: 'uppercase',
  letterSpacing: '0.01em',
  lineHeight: 1.3,
} as const;

export type AnalysisPanelProps = {
  title: string;
  info?: string;
  children: ReactNode;
  /** Renders the divider on the right edge of the panel (used between the 3 chart columns). */
  showDivider?: boolean;
};

export default function AnalysisPanel({ title, info, children, showDivider }: AnalysisPanelProps) {
  return (
    <Box
      component="section"
      aria-label={title}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        px: { xs: 0, lg: 2 },
        '&:first-of-type': { pl: 0 },
        borderRight: showDivider ? { xs: 'none', lg: '1px solid #eef1f5' } : 'none',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 0.5,
          mb: 1,
          minHeight: { lg: 62 },
        }}
      >
        <Typography
          component="h2"
          sx={{
            ...analysisTitleSx,
            flex: 1,
            minWidth: 0,
            textWrap: 'balance',
          }}
        >
          {title}
          {info ? (
            <MuiTooltip title={info} arrow>
              <Box
                component="span"
                tabIndex={0}
                aria-label={`About ${title}`}
                sx={{
                  ml: 0.75,
                  verticalAlign: 'super',
                  display: 'inline-flex',
                  cursor: 'help',
                  color: '#7fa0c6',
                }}
              >
                <InfoOutlinedIcon sx={{ fontSize: 16 }} />
              </Box>
            </MuiTooltip>
          ) : null}
        </Typography>
        <IconButton size="small" aria-label={`${title} options`} sx={{ color: '#5b7ea8', mt: -0.25 }}>
          <MoreVertRoundedIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>{children}</Box>
    </Box>
  );
}
