'use client';

import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { Box, FormControl, MenuItem, Popover, Stack } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';
import { useState } from 'react';
import FilterSelect from '@/components/common/FilterSelect';

const scenarioTypes = ['Historical', 'Hypothetical', 'Regulatory', 'Ad Hoc'];
const scenarioNames = ['2008 Credit Crisis', '2011 Sovereign Stress', '2020 Covid Shock', 'Rates Up 200bps'];

const menuPaperSx = {
  mt: 1,
  minWidth: 240,
  borderRadius: 2,
  border: '1px solid #d9dfe5',
  backgroundColor: '#f7f9fa',
  boxShadow: '0 8px 22px rgba(0,0,0,0.12)',
} as const;

function CobPicker() {
  const [cob, setCob] = useState<Date | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  return (
    <Box sx={{ flex: '1 1 0', minWidth: 240 }}>
      <Box
        role="button"
        tabIndex={0}
        aria-label="Select close of business date"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setAnchorEl(event.currentTarget);
          }
        }}
        sx={{
          height: 44,
          borderRadius: '999px',
          backgroundColor: '#033928',
          color: '#acb6ca',
          display: 'flex',
          alignItems: 'center',
          gap: 1.25,
          px: 2.5,
          cursor: 'pointer',
          fontSize: '0.9rem',
          fontWeight: 500,
          userSelect: 'none',
          '&:focus-visible': { outline: '2px solid #8dc63f', outlineOffset: 2 },
        }}
      >
        <CalendarTodayOutlinedIcon sx={{ fontSize: 18, color: '#acb6ca' }} />
        <Box component="span" sx={{ color: cob ? '#e6ebf2' : '#acb6ca' }}>
          {cob ? format(cob, 'dd MMM yyyy') : 'COB'}
        </Box>
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { sx: { mt: 1, borderRadius: 2, boxShadow: '0 8px 22px rgba(0,0,0,0.16)' } } }}
      >
        <DateCalendar
          value={cob}
          onChange={(date) => {
            setCob(date);
            setAnchorEl(null);
          }}
        />
      </Popover>
    </Box>
  );
}

export default function AnalysisFilterBar() {
  const [scenarioType, setScenarioType] = useState('');
  const [scenarioName, setScenarioName] = useState('');

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          flexWrap: 'nowrap',
          overflowX: 'auto',
          pb: 0.5,
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
        }}
      >
        <CobPicker />

        <FormControl sx={{ flex: '1 1 0', minWidth: 240 }}>
          <FilterSelect
            id="scenario-type-select"
            value={scenarioType}
            onChange={(event: SelectChangeEvent<unknown>) => setScenarioType(event.target.value as string)}
            displayEmpty
            renderValue={(selected) => (selected as string) || 'Scenario Type'}
            MenuProps={{ PaperProps: { sx: menuPaperSx }, MenuListProps: { sx: { py: 0.5 } } }}
          >
            {scenarioTypes.map((option) => (
              <MenuItem key={option} value={option} sx={{ minHeight: 46, fontSize: '0.95rem' }}>
                {option}
              </MenuItem>
            ))}
          </FilterSelect>
        </FormControl>

        <FormControl sx={{ flex: '1 1 0', minWidth: 240 }}>
          <FilterSelect
            id="scenario-name-select"
            value={scenarioName}
            onChange={(event: SelectChangeEvent<unknown>) => setScenarioName(event.target.value as string)}
            displayEmpty
            renderValue={(selected) => (selected as string) || 'Scenario Name'}
            MenuProps={{ PaperProps: { sx: menuPaperSx }, MenuListProps: { sx: { py: 0.5 } } }}
          >
            {scenarioNames.map((option) => (
              <MenuItem key={option} value={option} sx={{ minHeight: 46, fontSize: '0.95rem' }}>
                {option}
              </MenuItem>
            ))}
          </FilterSelect>
        </FormControl>

        <Box sx={{ flex: '1 1 0', minWidth: 0, display: { xs: 'none', lg: 'block' } }} aria-hidden />
        <Box sx={{ flex: '1 1 0', minWidth: 0, display: { xs: 'none', lg: 'block' } }} aria-hidden />
      </Stack>
    </LocalizationProvider>
  );
}
