'use client';

import { Card, CardContent, Typography, Box, IconButton, Divider } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Product } from '@/lib/mock-data';

interface ProductsCardProps {
  products: Product[];
}

export default function ProductsCard({ products }: ProductsCardProps) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #e0e0e0',
        height: '100%',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                backgroundColor: '#e8f4f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1,
              }}
            >
              <DescriptionOutlinedIcon sx={{ color: '#0d9488', fontSize: 24 }} />
            </Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: '#1a365d',
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              PRODUCTS
            </Typography>
          </Box>
          <IconButton size="small" sx={{ color: '#9ca3af' }}>
            <InfoOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Row 1 */}
        <Box sx={{ display: 'flex', py: 1.5 }}>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRight: '1px solid #e5e7eb',
              pr: 2,
            }}
          >
            <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
              {products[0]?.name}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1f2937', fontSize: '0.875rem' }}>
              {products[0]?.varValue}
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pl: 2,
            }}
          >
            <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
              {products[1]?.name}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1f2937', fontSize: '0.875rem' }}>
              {products[1]?.varValue}
            </Typography>
          </Box>
        </Box>

        <Divider />

        {/* Row 2 */}
        <Box sx={{ display: 'flex', py: 1.5 }}>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRight: '1px solid #e5e7eb',
              pr: 2,
            }}
          >
            <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
              {products[2]?.name}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1f2937', fontSize: '0.875rem' }}>
              {products[2]?.varValue}
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pl: 2,
            }}
          >
            <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
              {products[3]?.name}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1f2937', fontSize: '0.875rem' }}>
              {products[3]?.varValue}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
