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
import BusinessIcon from '@mui/icons-material/Business';
import { EntityMetric } from '@/lib/mock-data';

interface EntityCardProps {
  metrics: EntityMetric[];
}

export default function EntityCard({ metrics }: EntityCardProps) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #e0e0e0',
        height: '100%',
        minWidth: 445,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              backgroundColor: '#AA936C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              border: '5px solid #E2DCD1',
            }}
          >
            <BusinessIcon sx={{ color: '#fff', fontSize: 24 }} />
          </Box>
          <Box sx={{ flex: 1, pt: 0.5 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
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
                ENTITY
              </Typography>
              <IconButton size="small" sx={{ color: '#9ca3af' }}>
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>
            <Divider sx={{ mt: 0.45 }} />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {metrics.map((metric, index) => (
            <Box
              key={metric.label}
              sx={{
                flex: 1,
                borderRight: index === 0 ? '1px solid #e5e7eb' : 'none',
                pr: index === 0 ? 2 : 0,
                pl: index === 1 ? 2 : 0,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: '#486c94',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  display: 'block',
                  mb: 0.5,
                }}
              >
                {metric.label}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 500,
                    color: '#121b2c',
                    fontSize: '2.375rem',
                  }}
                >
                  {metric.value}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#1c8783',
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                  }}
                >
                  {metric.change}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
