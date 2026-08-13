'use client';

import { Box, Container } from '@mui/material';
import EntityCard from '@/components/cards/EntityCard';
import ProductsCard from '@/components/cards/ProductsCard';
import RiskFactorsCard from '@/components/cards/RiskFactorsCard';
import { mockProducts, mockRiskFactors, mockEntityMetrics } from '@/lib/mock-data';

export default function DashboardPage() {
  return (
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
            <Box sx={{ flex: '1 1 480px', minWidth: 480 }}>
              <EntityCard metrics={mockEntityMetrics} />
            </Box>
            <Box sx={{ flex: '1 1 480px', minWidth: 480 }}>
              <ProductsCard products={mockProducts} />
            </Box>
            <Box sx={{ flex: '1 1 480px', minWidth: 480 }}>
              <RiskFactorsCard riskFactors={mockRiskFactors} />
            </Box>
          </Box>
        </Container>
      </Box>
  );
}

