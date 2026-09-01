'use client';

import { Box, Container, Paper } from '@mui/material';
import { UssparcHeader } from '@/components/layout/UssparcHeader';
import AnalysisFilterBar from '@/components/var-analysis/AnalysisFilterBar';
import { DrilldownProvider } from '@/components/risk-analysis/RiskAnalysisContext';
import RiskAnalysisPanel from '@/components/risk-analysis/RiskAnalysisPanel';

export default function RiskAnalysisPage() {
  return (
    <Box
      component="main"
      sx={{ minHeight: '100vh', backgroundColor: '#f4f5f6' }}
    >
      <Box sx={{ backgroundColor: '#004d2c', pb: { xs: 6, md: 8 } }}>
        <UssparcHeader activeNav="VaR" />
        <Container
          maxWidth={false}
          sx={{
            maxWidth: 1920,
            px: { xs: 2, sm: 3, md: 4 },
            pt: { xs: 2, md: 2.5 },
          }}
        >
          <AnalysisFilterBar showComparisonPeriod={false} />
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
            p: { xs: 2, sm: 2.5, md: 3 },
          }}
        >
          <DrilldownProvider>
            <RiskAnalysisPanel />
          </DrilldownProvider>
        </Paper>
      </Container>
    </Box>
  );
}
