'use client';

import { Box, Container, ThemeProvider, createTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import {
  mockCdxIndexData,
  mockCleanPnlVarData,
  mockFxSpotTopPerforming,
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
const FxSpotTopPerformingChartCard = dynamic(
  () => import('@/components/charts/FxSpotTopPerformingChartCard'),
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
const CdxIndexChartCard = dynamic(() => import('@/components/charts/CdxIndexChartCard'), {
  ssr: false,
});

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
            <FxSpotTopPerformingChartCard items={mockFxSpotTopPerforming} />
            <VarSVarTrendLineChartCard data={mockVarSVarTrendData} />
            <CleanPnlVarAreaChartCard data={mockCleanPnlVarData} />
            <CdxIndexChartCard data={mockCdxIndexData} />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
