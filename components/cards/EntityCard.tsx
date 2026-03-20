'use client';

import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import GradientDivider from '@/components/common/GradientDivider';
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
        minWidth: 480,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
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
                ENTITY
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.2 }}>
                <IconButton size="small" sx={{ color: '#a7afb8', p: 0.4 }}>
                  <AutorenewRoundedIcon sx={{ fontSize: 16 }} />
                </IconButton>
                <IconButton size="small" sx={{ color: '#9ca3af', p: 0.4 }}>
                  <InfoOutlinedIcon sx={{ fontSize: 15 }} />
                </IconButton>
              </Box>
            </Box>
            <GradientDivider sx={{ mt: 0.45 }} />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 1.8,
            position: 'relative',
          }}
        >
          {metrics.map((metric) => (
            <Box
              key={metric.label}
              sx={{
                position: 'relative',
                flex: 1,
                px: 1.7,
                py: 1.15,
                backgroundColor: '#ffffff',
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: '1px solid #d8e2eb',
                borderBottom: '1px solid #d8e2eb',
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 8,
                boxShadow: '2px 3px 5px -2px rgba(30, 56, 88, 0.28)',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: 0,
                  height: 0,
                  borderTop: '22px solid #2b9a93',
                  borderLeft: '22px solid transparent',
                  opacity: 0.9,
                },
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
