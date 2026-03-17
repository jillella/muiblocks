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
              display: 'flex',
              flexWrap: 'wrap',
              gap: 3,
            }}
          >
            <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
              <EntityCard metrics={mockEntityMetrics} />
            </Box>
            <Box sx={{ flex: '1 1 340px', minWidth: 340 }}>
              <ProductsCard products={mockProducts} />
            </Box>
            <Box sx={{ flex: '1 1 380px', minWidth: 380 }}>
              <RiskFactorsCard riskFactors={mockRiskFactors} />
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
