'use client';

import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { Box } from '@mui/material';

export const COMPARISON_PERIODS = [
  { id: 'dod', label: 'Day over Day' },
  { id: 'wow', label: 'Week-over-Week' },
  { id: 'mom', label: 'Month-over-Month' },
  { id: 'yoy', label: 'Year-over-Year' },
] as const;

export type ComparisonPeriod = (typeof COMPARISON_PERIODS)[number]['id'];

export type ComparisonPeriodToggleProps = {
  value: ComparisonPeriod;
  onChange: (period: ComparisonPeriod) => void;
};

export default function ComparisonPeriodToggle({ value, onChange }: ComparisonPeriodToggleProps) {
  return (
    <Box
      role="radiogroup"
      aria-label="Comparison period"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        height: 44,
        borderRadius: '999px',
        backgroundColor: '#033928',
        px: 0.75,
        gap: 0.25,
        flex: { xs: '1 1 100%', lg: '0 1 auto' },
        minWidth: 0,
        overflowX: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {COMPARISON_PERIODS.map((period) => {
        const selected = period.id === value;

        return (
          <Box
            key={period.id}
            component="button"
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(period.id)}
            sx={{
              appearance: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              height: 32,
              px: 1.5,
              borderRadius: '999px',
              backgroundColor: selected ? '#d4e6c8' : 'transparent',
              color: selected ? '#033928' : '#e6ebf2',
              fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
              fontSize: '0.82rem',
              fontWeight: selected ? 600 : 500,
              letterSpacing: 0.1,
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'background-color 140ms ease, color 140ms ease',
              '&:hover': {
                backgroundColor: selected ? '#d4e6c8' : 'rgba(255,255,255,0.06)',
              },
              '&:focus-visible': { outline: '2px solid #8dc63f', outlineOffset: 2 },
            }}
          >
            <Box
              aria-hidden
              sx={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                backgroundColor: '#c4b08a',
                display: 'grid',
                placeItems: 'center',
                flexShrink: 0,
              }}
            >
              <CalendarTodayOutlinedIcon sx={{ fontSize: 11, color: '#fff' }} />
            </Box>
            {period.label}
          </Box>
        );
      })}
    </Box>
  );
}
