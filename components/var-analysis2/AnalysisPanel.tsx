'use client';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { Box, IconButton, Tooltip as MuiTooltip, Typography } from '@mui/material';
import type { ReactNode } from 'react';

export const ANALYSIS_TITLE_COLOR = '#285b6c';

/** Shared type style for every panel/section title on the Analysis 2 page. */
export const analysisTitleSx = {
  fontFamily: 'var(--font-roboto), Roboto, Helvetica, Arial, sans-serif',
  fontSize: '22px',
  fontWeight: 400,
  color: ANALYSIS_TITLE_COLOR,
  textTransform: 'uppercase',
  letterSpacing: '0.01em',
  lineHeight: 1.3,
} as const;

export const panelNoteSx = {
  fontFamily: 'var(--font-roboto), Roboto, Helvetica, Arial, sans-serif',
  fontSize: '12px',
  color: '#8b96a5',
  lineHeight: 1.6,
} as const;

export type AnalysisPanelProps = {
  title: string;
  info?: string;
  /** Small caption under the title explaining the encoding used by the chart. */
  subtitle?: ReactNode;
  /** Rendered on the title row, left of the overflow button (summary chips, legends). */
  headerRight?: ReactNode;
  /** Small print rendered under the chart. */
  footnote?: ReactNode;
  children: ReactNode;
};

export default function AnalysisPanel({
  title,
  info,
  subtitle,
  headerRight,
  footnote,
  children,
}: AnalysisPanelProps) {
  return (
    <Box component="section" aria-label={title} sx={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 2,
          mb: subtitle ? 0.25 : 1,
          flexWrap: { xs: 'wrap', md: 'nowrap' },
        }}
      >
        <Typography component="h2" sx={{ ...analysisTitleSx, flex: 1, minWidth: 0, textWrap: 'balance' }}>
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
                  color: '#486c94',
                }}
              >
                <InfoOutlinedIcon sx={{ fontSize: 16 }} />
              </Box>
            </MuiTooltip>
          ) : null}
        </Typography>

        {headerRight ? <Box sx={{ flexShrink: 0 }}>{headerRight}</Box> : null}

        <IconButton size="small" aria-label={`${title} options`} sx={{ color: '#486c94', mt: -0.25 }}>
          <MoreVertRoundedIcon fontSize="small" />
        </IconButton>
      </Box>

      {subtitle ? <Box sx={{ ...panelNoteSx, mb: 1.5 }}>{subtitle}</Box> : null}

      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>{children}</Box>

      {footnote ? <Box sx={{ ...panelNoteSx, mt: 1.5 }}>{footnote}</Box> : null}
    </Box>
  );
}
