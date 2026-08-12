'use client';

import { useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import { filterSelectSx } from '@/components/common/FilterSelect';
import GradientDivider from '@/components/common/GradientDivider';

export type ConfigOption = {
  id: string;
  label: string;
};

export type ConfigSource = 'production' | 'user';

export type ConfigSelection = {
  source: ConfigSource;
  id: string;
};

type RiskCalcConfigSelectProps = {
  label?: string;
  productionConfigs: ConfigOption[];
  userConfigs: ConfigOption[];
  productionLabel?: string;
  userLabel?: string;
  searchPlaceholder?: string;
  value?: ConfigSelection | null;
  defaultValue?: ConfigSelection | null;
  onChange?: (selection: ConfigSelection, option: ConfigOption) => void;
  panelWidth?: number | string;
  sx?: SxProps<Theme>;
};

const columnListSx: SxProps<Theme> = {
  maxHeight: 440,
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  '&::-webkit-scrollbar': { width: 5 },
  '&::-webkit-scrollbar-thumb': { backgroundColor: '#dcdfe3', borderRadius: 3 },
};

// Select clones its direct children with an onClick that closes the menu and a role of "option".
// Rendering the panel through a component that never forwards those props keeps clicks inside
// the panel (the search field especially) from dismissing it.
function ConfigPanel({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{ px: 4, pt: 3, pb: 3, cursor: 'default' }}
      onKeyDown={(event) => {
        // MenuList typeahead would otherwise swallow keystrokes meant for the search field.
        if (event.key !== 'Escape' && event.key !== 'Tab') event.stopPropagation();
      }}
    >
      {children}
    </Box>
  );
}

const filterConfigs = (options: ConfigOption[], term: string) =>
  term ? options.filter((option) => option.label.toLowerCase().includes(term)) : options;

function ConfigItem({
  option,
  selected,
  onSelect,
}: {
  option: ConfigOption;
  selected: boolean;
  onSelect: (option: ConfigOption) => void;
}) {
  const labelRef = useRef<HTMLSpanElement>(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <Tooltip
      title={option.label}
      placement="right"
      enterDelay={400}
      open={tooltipOpen}
      // The panel sizes itself after mount, so overflow is only reliable at hover time.
      onOpen={() => {
        const element = labelRef.current;
        if (element && element.scrollWidth > element.clientWidth) setTooltipOpen(true);
      }}
      onClose={() => setTooltipOpen(false)}
      slotProps={{
        popper: { modifiers: [{ name: 'offset', options: { offset: [0, 8] } }] },
        tooltip: {
          sx: { fontSize: '0.8rem', fontWeight: 400, backgroundColor: '#2b3641', px: 1.25, py: 0.75 },
        },
      }}
    >
      <MenuItem
        selected={selected}
        onClick={() => onSelect(option)}
        sx={{
          borderRadius: 0.5,
          minHeight: 32,
          py: 0.4,
          pl: 1.5,
          pr: 1,
          fontSize: '0.875rem',
          color: '#212529',
          '&.Mui-selected': { backgroundColor: '#ececec' },
          '&.Mui-selected:hover': { backgroundColor: '#e4e4e4' },
        }}
      >
        <Box
          component="span"
          ref={labelRef}
          sx={{ minWidth: 0, width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {option.label}
        </Box>
      </MenuItem>
    </Tooltip>
  );
}

function ConfigColumn({
  heading,
  options,
  selectedId,
  onSelect,
}: {
  heading: string;
  options: ConfigOption[];
  selectedId: string | null;
  onSelect: (option: ConfigOption) => void;
}) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography
        component="div"
        sx={{
          pb: 1.5,
          fontSize: '0.82rem',
          fontWeight: 700,
          letterSpacing: 0.5,
          color: '#101418',
          textTransform: 'uppercase',
        }}
      >
        {heading}
      </Typography>

      <Box sx={columnListSx}>
        {options.length === 0 ? (
          <Typography sx={{ pl: 1.5, py: 1, fontSize: '0.875rem', color: '#7b8794' }}>No matches</Typography>
        ) : (
          options.map((option) => (
            <ConfigItem
              key={option.id}
              option={option}
              selected={option.id === selectedId}
              onSelect={onSelect}
            />
          ))
        )}
      </Box>
    </Box>
  );
}

export default function RiskCalcConfigSelect({
  label = 'Risk Calculation Config',
  productionConfigs,
  userConfigs,
  productionLabel = 'Production Config',
  userLabel = 'User Config',
  searchPlaceholder = 'Search config...',
  value,
  defaultValue = null,
  onChange,
  panelWidth = 620,
  sx,
}: RiskCalcConfigSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [internalValue, setInternalValue] = useState<ConfigSelection | null>(defaultValue);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const isControlled = value !== undefined;
  const selection = isControlled ? value : internalValue;

  const selectedOption = useMemo(() => {
    if (!selection) return null;
    const list = selection.source === 'production' ? productionConfigs : userConfigs;
    return list.find((option) => option.id === selection.id) ?? null;
  }, [selection, productionConfigs, userConfigs]);

  const isFloating = open || Boolean(selectedOption);

  const term = query.trim().toLowerCase();
  const filteredProduction = useMemo(() => filterConfigs(productionConfigs, term), [productionConfigs, term]);
  const filteredUser = useMemo(() => filterConfigs(userConfigs, term), [userConfigs, term]);

  const handleSelect = (source: ConfigSource) => (option: ConfigOption) => {
    const next: ConfigSelection = { source, id: option.id };
    if (!isControlled) setInternalValue(next);
    onChange?.(next, option);
    setOpen(false);
  };

  const mergedSx = Array.isArray(sx) ? [filterSelectSx, ...sx] : [filterSelectSx, sx];

  return (
    <Select
      value=""
      displayEmpty
      IconComponent={open ? KeyboardArrowUpRoundedIcon : KeyboardArrowDownRoundedIcon}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => {
        setOpen(false);
        setQuery('');
      }}
      renderValue={() => (
        <Box sx={{ position: 'relative', width: '100%', minWidth: 0, height: 30, lineHeight: 1.2 }}>
          <Box
            component="span"
            sx={{
              position: 'absolute',
              left: 0,
              fontWeight: 500,
              letterSpacing: 0.1,
              transition: (theme) =>
                theme.transitions.create(['top', 'font-size', 'color', 'transform'], {
                  duration: theme.transitions.duration.shorter,
                }),
              ...(isFloating
                ? { top: 0, transform: 'none', fontSize: '0.648rem', color: '#86aaa5' }
                : { top: '50%', transform: 'translateY(-50%)', fontSize: '0.9rem', color: '#acb6ca' }),
            }}
          >
            {label}
          </Box>
          {selectedOption ? (
            <Box
              component="span"
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                fontSize: '0.9rem',
                fontWeight: 500,
                color: '#acb6ca',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {selectedOption.label}
            </Box>
          ) : null}
        </Box>
      )}
      sx={[
        ...mergedSx,
        {
          '& .MuiSelect-select': { pl: 2.75, pr: '3.6rem !important' },
          // The icon swaps between up/down glyphs, so drop the shared 180deg flip.
          '&& .MuiSelect-iconOpen': { transform: 'translateY(-50%)' },
          '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid',
            // Focus moves into the panel's search field on open, so Mui-focused can't drive this.
            borderColor: open ? '#acb6ca80' : 'transparent',
            transition: (theme) =>
              theme.transitions.create('border-color', { duration: theme.transitions.duration.shorter }),
          },
          '&:hover .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#acb6ca80',
          },
        },
      ]}
      MenuProps={{
        autoFocus: false,
        anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
        transformOrigin: { vertical: 'top', horizontal: 'left' },
        MenuListProps: { autoFocusItem: false, disableListWrap: true, sx: { py: 0 } },
        TransitionProps: { onEntered: () => searchRef.current?.focus() },
        slotProps: {
          paper: {
            sx: {
              mt: 0.5,
              width: panelWidth,
              maxWidth: '92vw',
              borderRadius: 2.5,
              border: '1px solid #dbe1e9',
              boxShadow: '0 2px 10px rgba(16, 24, 40, 0.06)',
              overflow: 'hidden',
            },
          },
        },
      }}
    >
      <ConfigPanel>
        <TextField
          inputRef={searchRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={searchPlaceholder}
          size="small"
          sx={{ width: '70%', minWidth: 220 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon sx={{ fontSize: 20, color: '#3f4a54' }} />
                </InputAdornment>
              ),
              sx: {
                height: 42,
                borderRadius: '999px',
                fontSize: '0.95rem',
                color: '#212529',
                // Doubled selectors outrank MUI's own focus/hover outline rules.
                '&& .MuiOutlinedInput-notchedOutline': { borderColor: '#8e9eb8', borderWidth: 1 },
                '&&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#8e9eb8', borderWidth: 1 },
                '&&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#8e9eb8',
                  borderWidth: 1,
                },
              },
            },
          }}
        />

        <Box
          sx={{
            mt: 3.5,
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            columnGap: 1.5,
          }}
        >
          <ConfigColumn
            heading={productionLabel}
            options={filteredProduction}
            selectedId={selection?.source === 'production' ? selection.id : null}
            onSelect={handleSelect('production')}
          />
          <GradientDivider orientation="vertical" />
          <ConfigColumn
            heading={userLabel}
            options={filteredUser}
            selectedId={selection?.source === 'user' ? selection.id : null}
            onSelect={handleSelect('user')}
          />
        </Box>
      </ConfigPanel>
    </Select>
  );
}
