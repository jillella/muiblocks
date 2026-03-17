'use client';

import { Box, Container, ThemeProvider, createTheme } from '@mui/material';
import EntityCard from '@/components/cards/EntityCard';
import ProductsCard from '@/components/cards/ProductsCard';
import RiskFactorsCard from '@/components/cards/RiskFactorsCard';
import { mockProducts, mockRiskFactors, mockEntityMetrics } from '@/lib/mock-data';

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default function DashboardPage() {
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
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(3, 1fr)',
              },
              gap: 3,
            }}
          >
            <EntityCard metrics={mockEntityMetrics} />
            <ProductsCard products={mockProducts} />
            <RiskFactorsCard riskFactors={mockRiskFactors} />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
