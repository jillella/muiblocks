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

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 2,
            mt: 2,
          }}
        >
          {products.map((product, index) => (
            <Box
              key={product.name}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRight: index % 2 === 0 ? '1px solid #e5e7eb' : 'none',
                pr: index % 2 === 0 ? 2 : 0,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#6b7280',
                  fontSize: '0.875rem',
                }}
              >
                {product.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: '#1f2937',
                  fontSize: '0.875rem',
                }}
              >
                {product.varValue}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
