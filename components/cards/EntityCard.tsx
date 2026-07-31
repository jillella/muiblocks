'use client';

import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import GradientDivider from '@/components/common/GradientDivider';
import { EntityMetric } from '@/lib/mock-data';
import { dashboardCard } from '@/components/cards/cardStyles';

interface EntityCardProps {
  metrics: EntityMetric[];
}

export default function EntityCard({ metrics }: EntityCardProps) {
  return (
    <Card sx={dashboardCard.root}>
      <CardContent sx={dashboardCard.content}>
        <Box sx={dashboardCard.headerRow}>
          <Box sx={dashboardCard.avatarEntity}>
            <BusinessIcon sx={dashboardCard.iconInAvatar} />
          </Box>
          <Box sx={dashboardCard.headerTextColumn}>
            <Box sx={dashboardCard.titleBar}>
              <Typography variant="h6" sx={dashboardCard.cardTitle}>
                ENTITY
              </Typography>
              <Box sx={dashboardCard.titleToolbarActions}>
                <IconButton size="small" sx={dashboardCard.toolbarIcon}>
                  <AutorenewRoundedIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={dashboardCard.toolbarIcon}>
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            <GradientDivider sx={dashboardCard.gradientDividerUnderTitle} />
          </Box>
        </Box>
        <Box sx={dashboardCard.metricGrid}>
          {metrics.map((metric) => (
            <Box key={metric.label} sx={dashboardCard.metricCell}>
              <Typography variant="caption" sx={dashboardCard.metricLabel}>
                {metric.label}
              </Typography>
              <Box sx={dashboardCard.metricValueRow}>
                <Typography variant="h4" sx={dashboardCard.metricValue}>
                  {metric.value}
                </Typography>
                <Typography variant="body2" sx={dashboardCard.metricChange}>
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
