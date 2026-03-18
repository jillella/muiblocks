'use client';

import { Card, CardContent, Typography, Box, IconButton, Divider } from '@mui/material';
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
        minWidth: 375,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header with Icon and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                backgroundColor: '#d4a574',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <BusinessIcon sx={{ color: 'white', fontSize: 24 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#1a365d',
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                fontSize: '1.1rem',
              }}
            >
              ENTITY
            </Typography>
          </Box>
          <IconButton size="small" sx={{ color: '#9ca3af' }}>
            <InfoOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Divider starting below title */}
        <Divider sx={{ ml: 8, mb: 2 }} />

        {/* Content - Full Width */}
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
                  color: '#6b7280',
                  fontSize: '0.875rem',
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
                    fontWeight: 600,
                    color: '#1f2937',
                    fontSize: '1.75rem',
                  }}
                >
                  {metric.value}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#10b981',
                    fontSize: '0.875rem',
                    fontWeight: '600'
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
