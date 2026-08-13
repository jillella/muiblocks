'use client';

import { Box, Container, Paper } from '@mui/material';
import { UssparcHeader } from '@/components/layout/UssparcHeader';
import AnalysisFilterBar from '@/components/var-analysis/AnalysisFilterBar';
import ProductTypeAttributionChart from '@/components/var-analysis/ProductTypeAttributionChart';
import RiskFactorAttributionChart from '@/components/var-analysis/RiskFactorAttributionChart';
import RiskGradeBubbleChart from '@/components/var-analysis/RiskGradeBubbleChart';
import TopRiskContributorTable from '@/components/var-analysis/TopRiskContributorTable';

export default function VarAnalysisPage() {
  return (
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
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  lg: 'minmax(0, 0.88fr) minmax(0, 1.24fr) minmax(0, 0.88fr)',
                },
                columnGap: { lg: 1 },
                rowGap: 4,
              }}
            >
              <RiskFactorAttributionChart />
              <ProductTypeAttributionChart />
              <RiskGradeBubbleChart />
            </Box>

            <Box sx={{ mt: { xs: 4, md: 5 } }}>
              <TopRiskContributorTable />
            </Box>
          </Paper>
        </Container>
      </Box>
  );
}
