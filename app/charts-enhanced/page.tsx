'use client';

import { Box, Container, ThemeProvider, createTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import type {
  AttributionRow,
  PerformancePoint,
  StressTestingRow,
} from '@/components/charts-enhanced';

const VarAttributionCard = dynamic(() => import('@/components/charts-enhanced/VarAttributionCard'), {
  ssr: false,
});
const StressTestingCard = dynamic(() => import('@/components/charts-enhanced/StressTestingCard'), {
  ssr: false,
});
const VarBacktestingCard = dynamic(() => import('@/components/charts-enhanced/VarBacktestingCard'), {
  ssr: false,
});
const StressMaxLossCard = dynamic(() => import('@/components/charts-enhanced/StressMaxLossCard'), {
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

const monthlySeries: PerformancePoint[] = [
  { month: 'Jan-25', var: 120, cleanPnl: 245, threshold: 250 },
  { month: 'Feb-25', var: 230, cleanPnl: 250, threshold: 250 },
  { month: 'Mar-25', var: 210, cleanPnl: 260, threshold: 250 },
  { month: 'Apr-25', var: 80, cleanPnl: 145, threshold: 250 },
  { month: 'May-25', var: 95, cleanPnl: 170, threshold: 250 },
  { month: 'Jun-25', var: 205, cleanPnl: 185, threshold: 250 },
  { month: 'Jul-25', var: 75, cleanPnl: 220, threshold: 250 },
  { month: 'Aug-25', var: 190, cleanPnl: 155, threshold: 250 },
  { month: 'Sep-25', var: 65, cleanPnl: 175, threshold: 250 },
  { month: 'Oct-25', var: 125, cleanPnl: 215, threshold: 250 },
  { month: 'Nov-25', var: 70, cleanPnl: 155, threshold: 250 },
  { month: 'Dec-25', var: 55, cleanPnl: 175, threshold: 250 },
  { month: 'Jan-26', var: 160, cleanPnl: 210, threshold: 250 },
  { month: 'Feb-26', var: 35, cleanPnl: 160, threshold: 250 },
  { month: 'Mar-26', var: 100, cleanPnl: 210, threshold: 250 },
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
            <VarAttributionCard rows={varAttributionRows} />
            <StressTestingCard rows={stressTestingRows} />
            <VarBacktestingCard data={monthlySeries} />
            <StressMaxLossCard data={monthlySeries} />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
