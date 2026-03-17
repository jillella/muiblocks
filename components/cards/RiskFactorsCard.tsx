'use client';

import { Card, CardContent, Typography, Box, IconButton, Divider } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PolicyOutlinedIcon from '@mui/icons-material/PolicyOutlined';
import { RiskFactor } from '@/lib/mock-data';

interface RiskFactorsCardProps {
  riskFactors: RiskFactor[];
}

export default function RiskFactorsCard({ riskFactors }: RiskFactorsCardProps) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #e0e0e0',
        height: '100%',
        minWidth: 460,
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
                backgroundColor: '#f3e8ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1,
              }}
            >
              <PolicyOutlinedIcon sx={{ color: '#7c3aed', fontSize: 24 }} />
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
              RISK FACTORS
            </Typography>
          </Box>
          <IconButton size="small" sx={{ color: '#9ca3af' }}>
            <InfoOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex' }}>
          {/* Left Column */}
          <Box sx={{ flex: 1, pr: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1.5, gap: 2 }}>
              <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                {riskFactors[0]?.name}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#1f2937', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                {riskFactors[0]?.varValue}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1.5, gap: 2 }}>
              <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                {riskFactors[2]?.name}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#1f2937', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                {riskFactors[2]?.varValue}
              </Typography>
            </Box>
          </Box>

          <Divider orientation="vertical" flexItem />

          {/* Right Column */}
          <Box sx={{ flex: 1, pl: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1.5, gap: 2 }}>
              <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                {riskFactors[1]?.name}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#1f2937', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                {riskFactors[1]?.varValue}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1.5, gap: 2 }}>
              <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                {riskFactors[3]?.name}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#1f2937', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                {riskFactors[3]?.varValue}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
