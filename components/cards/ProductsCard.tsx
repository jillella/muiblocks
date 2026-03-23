'use client';

import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Divider,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import GradientDivider from '@/components/common/GradientDivider';
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
        minWidth: 480,
      }}
    >
      <CardContent
        sx={{
          p: 2,
          '&.MuiCardContent-root:last-child': {
            pb: 2,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              backgroundColor: '#387f97',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              border: '5px solid #c5d8dc',
            }}
          >
            <DescriptionOutlinedIcon sx={{ color: '#fff', fontSize: 24 }} />
          </Box>
          <Box sx={{ flex: 1, pt: 0.5 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: '#486c94',
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  fontSize: '1.5rem',
                  lineHeight: 1.15,
                  mb: 0.2,
                }}
              >
                PRODUCTS
              </Typography>
              <IconButton size="small" sx={{ color: '#9ca3af' }}>
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>
            <GradientDivider sx={{ mt: 0.45 }} />
          </Box>
        </Box>

        <Box sx={{ display: 'flex' }}>
          <Box sx={{ flex: 1, pr: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pb: 1.5,
                gap: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#486c94',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                }}
              >
                {products[0]?.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color: '#121b2c',
                  fontSize: '0.9375rem',
                  whiteSpace: 'nowrap',
                }}
              >
                {products[0]?.varValue}
              </Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pt: 1.5,
                gap: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#486c94',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                }}
              >
                {products[2]?.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color: '#121b2c',
                  fontSize: '0.9375rem',
                  whiteSpace: 'nowrap',
                }}
              >
                {products[2]?.varValue}
              </Typography>
            </Box>
          </Box>

          <GradientDivider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          <Box sx={{ flex: 1, pl: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pb: 1.5,
                gap: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#486c94',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                }}
              >
                {products[1]?.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color: '#121b2c',
                  fontSize: '0.9375rem',
                  whiteSpace: 'nowrap',
                }}
              >
                {products[1]?.varValue}
              </Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pt: 1.5,
                gap: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#486c94',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                }}
              >
                {products[3]?.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color: '#121b2c',
                  fontSize: '0.9375rem',
                  whiteSpace: 'nowrap',
                }}
              >
                {products[3]?.varValue}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
