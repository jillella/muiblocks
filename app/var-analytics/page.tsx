'use client';

import { Box, Container, FormControl, MenuItem, Stack, Typography } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import FilterSelect from '@/components/common/FilterSelect';
import RiskCalcConfigSelect from '@/components/var-analytics/RiskCalcConfigSelect';
import type { ConfigOption, ConfigSelection } from '@/components/var-analytics/RiskCalcConfigSelect';

const productionNames = [
  'CM Inc VaR',
  'CM DPG VaR',
  'Nikko America VaR',
  'LN Trading 95% 2yr VaR_CV',
  'CM DPG VaR_Bg',
  'Nikko America Corporates VaR_BG',
  'CM Inc VaR',
  'BHC_IR Swaption_SVaR_MK',
  'Nikko America VaR',
  'BHC_IR Swaption_SVaR_MK_BG',
  'CM DPG VaR',
  'Nikko America VaR',
  'CM Inc VaR',
  'LN Trading 95% 2yr VaR_CV',
  'Nikko America VaR',
  'CM Inc VaR',
];

const userNames = [
  'test config',
  'config 1',
  'my saved risk calculation config',
  'config name 2',
  'demo 123',
  'BHC_IR Swaption_SVaR_MK backtest copy 2024',
  'my config',
  'test 2',
  'Nikko America Corporates VaR_BG with CVA overlay',
  'config copy',
  'draft config',
  'LN Trading 95% 2yr VaR_CV recalibrated draft',
  'abc test',
  'config 3',
  'temp config CM DPG VaR',
  'demo run',
  'test config 2',
  'production baseline copy',
  'config final',
  'new config',
  'config old',
];

const toOptions = (prefix: string, labels: string[]): ConfigOption[] =>
  labels.map((label, index) => ({ id: `${prefix}-${index}`, label }));

const productionConfigs = toOptions('prod', productionNames);
const userConfigs = toOptions('user', userNames);

const measures = ['VaR', 'SVaR', 'Expected Shortfall', 'Stress P&L'];
const businesses = ['CM Inc', 'CM DPG', 'Nikko America', 'LN Trading'];

const menuPaperSx = {
  mt: 1,
  minWidth: 240,
  borderRadius: 2,
  border: '1px solid #d9dfe5',
  backgroundColor: '#f7f9fa',
  boxShadow: '0 8px 22px rgba(0,0,0,0.12)',
} as const;

export default function VarAnalyticsDemoPage() {
  const [selection, setSelection] = useState<ConfigSelection | null>(null);
  const [measure, setMeasure] = useState('');
  const [business, setBusiness] = useState('');

  return (
    <Box component="main" sx={{ minHeight: '100vh', backgroundColor: '#f4f5f6', py: 6 }}>
        <Container maxWidth="md">
          <RiskCalcConfigSelect
            productionConfigs={productionConfigs}
            userConfigs={userConfigs}
            value={selection}
            onChange={(next) => setSelection(next)}
            sx={{ width: 460 }}
          />
          <Typography sx={{ mt: 3, fontSize: '0.9rem', color: '#4a5760' }}>
            Selected: {selection ? `${selection.source} / ${selection.id}` : 'none'}
          </Typography>

          <Stack direction="row" spacing={2} useFlexGap sx={{ mt: 5, flexWrap: 'wrap' }}>
            <FormControl sx={{ minWidth: 240 }}>
              <FilterSelect
                id="measure-select"
                value={measure}
                onChange={(event: SelectChangeEvent<unknown>) => setMeasure(event.target.value as string)}
                displayEmpty
                renderValue={(selected) => (selected as string) || 'Measure'}
                MenuProps={{ PaperProps: { sx: menuPaperSx }, MenuListProps: { sx: { py: 0.5 } } }}
              >
                {measures.map((option) => (
                  <MenuItem key={option} value={option} sx={{ minHeight: 46, fontSize: '0.95rem' }}>
                    {option}
                  </MenuItem>
                ))}
              </FilterSelect>
            </FormControl>

            <FormControl sx={{ minWidth: 240 }}>
              <FilterSelect
                id="business-select"
                floatingLabel="Business"
                value={business}
                onChange={(event: SelectChangeEvent<unknown>) => setBusiness(event.target.value as string)}
                MenuProps={{ PaperProps: { sx: menuPaperSx }, MenuListProps: { sx: { py: 0.5 } } }}
              >
                {businesses.map((option) => (
                  <MenuItem key={option} value={option} sx={{ minHeight: 46, fontSize: '0.95rem' }}>
                    {option}
                  </MenuItem>
                ))}
              </FilterSelect>
            </FormControl>
          </Stack>

          <Typography sx={{ mt: 3, fontSize: '0.9rem', color: '#4a5760' }}>
            Filters: {measure || '—'} / {business || '—'}
          </Typography>
        </Container>
      </Box>
  );
}
