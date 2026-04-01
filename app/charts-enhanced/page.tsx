'use client';

import { Box, Container, ThemeProvider, createTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import type { AttributionRow, StressTestingRow } from '@/components/charts-enhanced';
import { mockStressMaxLossChartSeries, mockVarBacktestingChartSeries } from '@/lib/mock-data';

const VarAttributionTable = dynamic(() => import('@/components/charts-enhanced/VarAttributionTable'), {
  ssr: false,
});
const StressTestingTable = dynamic(() => import('@/components/charts-enhanced/StressTestingTable'), {
  ssr: false,
});
const VarBacktestingChart = dynamic(() => import('@/components/charts-enhanced/VarBacktestingChart'), {
  ssr: false,
});
const StressMaxLossChart = dynamic(() => import('@/components/charts-enhanced/StressMaxLossChart'), {
  ssr: false,
});

const varAttributionRows: AttributionRow[] = [
  { product: 'Interest Rate Swap', mtm: 18, ir01: 4, irVega: 7, fxDelta: 2, fxVega: 4 },
  { product: 'Interest Rate Swaption', mtm: 14, ir01: 4, irVega: 2, fxDelta: 2, fxVega: 4 },
  { product: 'Interest Rate Futures', mtm: 22, ir01: 2, irVega: 7, fxDelta: 2, fxVega: 4 },
  { product: 'Cap Floor', mtm: 7, ir01: 4, irVega: 7, fxDelta: 2, fxVega: 4 },
  { product: 'Other', mtm: 7.2, ir01: 4, irVega: 7, fxDelta: 9, fxVega: 8 },
];

const stressTestingRows: StressTestingRow[] = [
  { product: 'Interest Rate Swap', mtm: 18, adScenario: 4, ccarDate: 7 },
  { product: 'Interest Rate Swaption', mtm: 14, adScenario: 2.2, ccarDate: 14.4 },
  { product: 'Interest Rate Futures', mtm: 22, adScenario: 3, ccarDate: 1 },
  { product: 'Cap Floor', mtm: 7, adScenario: 1, ccarDate: 7 },
  { product: 'Other', mtm: 7.2, adScenario: 1, ccarDate: 8 },
];

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default function ChartsEnhancedPage() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#f3f6fb',
          py: 4,
        }}
      >
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 3 } }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', xl: '1fr 1fr' },
              gap: 2,
            }}
          >
            <VarAttributionTable rows={varAttributionRows} />
            <StressTestingTable rows={stressTestingRows} />
            <VarBacktestingChart data={mockVarBacktestingChartSeries} />
            <StressMaxLossChart data={mockStressMaxLossChartSeries} />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
