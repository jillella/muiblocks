'use client';

import { Box, Container, ThemeProvider, createTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import {
  mockCleanPnlVarData,
  mockRiskDriverSeries,
  mockVarSVarTableRows,
  mockVarSVarTrendData,
} from '@/lib/mock-data';

const CmIncVarSVarTableCard = dynamic(() => import('@/components/charts/CmIncVarSVarTableCard'), {
  ssr: false,
});
const TopRiskDataDriversChartCard = dynamic(
  () => import('@/components/charts/TopRiskDataDriversChartCard'),
  { ssr: false },
);
const VarSVarTrendLineChartCard = dynamic(
  () => import('@/components/charts/VarSVarTrendLineChartCard'),
  { ssr: false },
);
const CleanPnlVarAreaChartCard = dynamic(
  () => import('@/components/charts/CleanPnlVarAreaChartCard'),
  { ssr: false },
);

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default function ChartsPage() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#f8fafc',
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', xl: '1fr 1fr' },
              gap: 3,
            }}
          >
            <CmIncVarSVarTableCard rows={mockVarSVarTableRows} />
            <TopRiskDataDriversChartCard series={mockRiskDriverSeries} />
            <VarSVarTrendLineChartCard data={mockVarSVarTrendData} />
            <CleanPnlVarAreaChartCard data={mockCleanPnlVarData} />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
