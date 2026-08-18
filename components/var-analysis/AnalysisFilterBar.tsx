'use client';

import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { Box, Divider, FormControl, ListSubheader, MenuItem, Popover, Stack } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';
import { useState } from 'react';
import FilterSelect from '@/components/common/FilterSelect';

const entityScopeGroups = [
  {
    parent: 'CM-DPG',
    children: [
      'NON-CUSO ENTITY',
      'Non BHC',
      'SMBC NIKKO SECURITIES AMERICA INC',
      'SMBC DERIVATIVES PRODUCTS LTD',
      'SMBC NIKKO CAPITAL MARKETS LTD',
      'CUSO ENTITY',
      'BHC',
      'SMBC CAPITAL MARKETS INC',
    ],
  },
  {
    parent: 'Non-DPG',
    children: [
      'CUSO ENTITY',
      'BHC',
      'SMBC NIKKO SECURITIES AMERICA, INC.',
      'SMBC NIKKO SECURITIES AMERICA INC',
      'Non BHC',
      'SMBC NY BRANCH',
    ],
  },
] as const;

const entityValue = (group: string, child: string) => `${group}::${child}`;
const entityLabel = (value: string) => value.split('::').slice(1).join('::');
const DEFAULT_ENTITY = entityValue('CM-DPG', 'SMBC CAPITAL MARKETS INC');

const entityMenuPaperSx = {
  mt: 1,
  minWidth: 360,
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
    <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 0' }, minWidth: { md: 220 } }}>
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
  const [entity, setEntity] = useState(DEFAULT_ENTITY);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack
        direction="row"
        spacing={2}
        useFlexGap
        sx={{ flexWrap: { xs: 'wrap', md: 'nowrap' }, pb: 0.5 }}
      >
        <CobPicker />

        <FormControl sx={{ flex: { xs: '1 1 100%', md: '1 1 0' }, minWidth: { md: 260 } }}>
          <FilterSelect
            id="entity-scope-select"
            floatingLabel="Entity Scope"
            value={entity}
            onChange={(event: SelectChangeEvent<unknown>) => setEntity(event.target.value as string)}
            displayEmpty
            renderValue={(selected) => entityLabel(selected as string)}
            MenuProps={{ PaperProps: { sx: entityMenuPaperSx }, MenuListProps: { sx: { py: 0.5 } } }}
          >
            {entityScopeGroups.flatMap((group, groupIndex) => {
              const items = [
                <ListSubheader
                  key={`${group.parent}-header`}
                  disableSticky
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    color: '#1d2329',
                    lineHeight: '36px',
                    backgroundColor: '#f7f9fa',
                  }}
                >
                  {group.parent}
                </ListSubheader>,
                ...group.children.map((child) => (
                  <MenuItem
                    key={entityValue(group.parent, child)}
                    value={entityValue(group.parent, child)}
                    sx={{ minHeight: 42, fontSize: '0.9rem', pl: 2.5 }}
                  >
                    {child}
                  </MenuItem>
                )),
              ];

              if (groupIndex < entityScopeGroups.length - 1) {
                items.push(
                  <Divider key={`${group.parent}-divider`} sx={{ my: 0.5, borderColor: '#d4d9de' }} />,
                );
              }

              return items;
            })}
          </FilterSelect>
        </FormControl>

        <Box sx={{ flex: '1 1 0', minWidth: 0, display: { xs: 'none', lg: 'block' } }} aria-hidden />
        <Box sx={{ flex: '1 1 0', minWidth: 0, display: { xs: 'none', lg: 'block' } }} aria-hidden />
        <Box sx={{ flex: '1 1 0', minWidth: 0, display: { xs: 'none', lg: 'block' } }} aria-hidden />
      </Stack>
    </LocalizationProvider>
  );
}
