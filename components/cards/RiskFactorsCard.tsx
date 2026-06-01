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
import PolicyOutlinedIcon from '@mui/icons-material/PolicyOutlined';
import GradientDivider from '@/components/common/GradientDivider';
import { RiskFactor } from '@/lib/mock-data';
import { dashboardCard } from '@/components/cards/cardStyles';

interface RiskFactorsCardProps {
  riskFactors: RiskFactor[];
}

export default function RiskFactorsCard({ riskFactors }: RiskFactorsCardProps) {
  return (
    <Card sx={dashboardCard.root}>
      <CardContent sx={dashboardCard.content}>
        <Box sx={dashboardCard.headerRow}>
          <Box sx={dashboardCard.avatarRisk}>
            <PolicyOutlinedIcon sx={dashboardCard.iconInAvatar} />
          </Box>
          <Box sx={dashboardCard.headerTextColumn}>
            <Box sx={dashboardCard.titleBar}>
              <Typography variant="h6" sx={dashboardCard.cardTitle}>
                RISK FACTORS
              </Typography>
              <IconButton size="small" sx={dashboardCard.toolbarIcon}>
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>
            <GradientDivider sx={dashboardCard.gradientDividerUnderTitle} />
          </Box>
        </Box>

        <Box sx={dashboardCard.twoColumnRow}>
          <Box sx={dashboardCard.columnLeft}>
            <Box sx={dashboardCard.dataRowTop}>
              <Typography variant="body2" sx={dashboardCard.dataLabel}>
                {riskFactors[0]?.name}
              </Typography>
              <Typography variant="body2" sx={dashboardCard.dataValue}>
                {riskFactors[0]?.varValue}
              </Typography>
            </Box>
            <Divider />
            <Box sx={dashboardCard.dataRowBottom}>
              <Typography variant="body2" sx={dashboardCard.dataLabel}>
                {riskFactors[2]?.name}
              </Typography>
              <Typography variant="body2" sx={dashboardCard.dataValue}>
                {riskFactors[2]?.varValue}
              </Typography>
            </Box>
          </Box>

          <GradientDivider
            orientation="vertical"
            flexItem
            sx={dashboardCard.verticalDividerGutter}
          />

          <Box sx={dashboardCard.columnRight}>
            <Box sx={dashboardCard.dataRowTop}>
              <Typography variant="body2" sx={dashboardCard.dataLabel}>
                {riskFactors[1]?.name}
              </Typography>
              <Typography variant="body2" sx={dashboardCard.dataValue}>
                {riskFactors[1]?.varValue}
              </Typography>
            </Box>
            <Divider />
            <Box sx={dashboardCard.dataRowBottom}>
              <Typography variant="body2" sx={dashboardCard.dataLabel}>
                {riskFactors[3]?.name}
              </Typography>
              <Typography variant="body2" sx={dashboardCard.dataValue}>
                {riskFactors[3]?.varValue}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
