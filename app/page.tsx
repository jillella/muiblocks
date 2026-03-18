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
            <Box sx={{ flex: '1 1 445px', minWidth: 445 }}>
              <EntityCard metrics={mockEntityMetrics} />
            </Box>
            <Box sx={{ flex: '1 1 460px', minWidth: 460 }}>
              <ProductsCard products={mockProducts} />
            </Box>
            <Box sx={{ flex: '1 1 460px', minWidth: 460 }}>
              <RiskFactorsCard riskFactors={mockRiskFactors} />
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
