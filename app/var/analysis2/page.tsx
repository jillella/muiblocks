'use client';

import { Box, Container, Divider, Paper, ThemeProvider, createTheme } from '@mui/material';
import { UssparcHeader } from '@/components/layout/UssparcHeader';
import AnalysisFilterBar from '@/components/var-analysis2/AnalysisFilterBar';
import ContributionVarByProductTypeChart from '@/components/var-analysis2/ContributionVarByProductTypeChart';
import ContributionVarMovementPanel from '@/components/var-analysis2/ContributionVarMovementPanel';
import ContributionVarProductFactorBubbleChart from '@/components/var-analysis2/ContributionVarProductFactorBubbleChart';

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default function VarAnalysis2Page() {
  return (
    <ThemeProvider theme={theme}>
      <Box component="main" sx={{ minHeight: '100vh', backgroundColor: '#f4f5f6' }}>
        <Box sx={{ backgroundColor: '#004d2c', pb: { xs: 6, md: 8 } }}>
          <UssparcHeader activeNav="VaR" />
          <Container maxWidth={false} sx={{ maxWidth: 1920, px: { xs: 2, sm: 3, md: 4 }, pt: { xs: 2, md: 2.5 } }}>
            <AnalysisFilterBar />
          </Container>
        </Box>

        <Container
          maxWidth={false}
          sx={{
            maxWidth: 1920,
            px: { xs: 2, sm: 3, md: 4 },
            pb: { xs: 4, md: 6 },
            mt: { xs: -4, md: -6 },
            position: 'relative',
          }}
        >
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              border: '1px solid #e8ebef',
              boxShadow: '0 4px 18px rgba(15, 42, 30, 0.10)',
              p: { xs: 2, sm: 2.5, md: 3.5 },
            }}
          >
            <ContributionVarMovementPanel />

            <Divider sx={{ my: { xs: 3.5, md: 4.5 }, borderColor: '#eef1f5' }} />

            <ContributionVarByProductTypeChart />

            <Divider sx={{ my: { xs: 3.5, md: 4.5 }, borderColor: '#eef1f5' }} />

            <ContributionVarProductFactorBubbleChart />
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
