'use client';

import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import HexagonOutlinedIcon from '@mui/icons-material/HexagonOutlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import { Box, Stack, Typography } from '@mui/material';
import type { SvgIconComponent } from '@mui/icons-material';
import type { DragEvent } from 'react';
import type {
  AttributeIconKey,
  DimensionField,
} from '@/components/risk-analysis/drilldownFields';
import {
  PANEL_BORDER,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
} from '@/components/risk-analysis/drilldownFormat';

const iconByKey: Record<AttributeIconKey, SvgIconComponent> = {
  folder: FolderOutlinedIcon,
  entity: AccountBalanceOutlinedIcon,
  businessUnit: BusinessOutlinedIcon,
  desk: DashboardOutlinedIcon,
  strategy: HubOutlinedIcon,
  book: MenuBookOutlinedIcon,
  diamond: HexagonOutlinedIcon,
  currency: PaidOutlinedIcon,
  tenor: TimelineOutlinedIcon,
  curve: ShowChartOutlinedIcon,
};

interface AttributeItemProps {
  field: DimensionField;
  /** Already part of the drilldown hierarchy. */
  inUse: boolean;
  onDragStart: (event: DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
  onActivate: () => void;
}

export default function AttributeItem({
  field,
  inUse,
  onDragStart,
  onDragEnd,
  onActivate,
}: AttributeItemProps) {
  const Icon = iconByKey[field.icon];

  return (
    <Stack
      direction="row"
      spacing={1}
      draggable={!inUse}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDoubleClick={inUse ? undefined : onActivate}
      role="button"
      tabIndex={inUse ? -1 : 0}
      aria-disabled={inUse}
      onKeyDown={(event) => {
        if (!inUse && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          onActivate();
        }
      }}
      sx={{
        alignItems: 'center',
        px: 1,
        py: 0.75,
        borderRadius: 1.5,
        border: `1px solid ${PANEL_BORDER}`,
        backgroundColor: inUse ? '#f1f4f7' : '#fff',
        cursor: inUse ? 'default' : 'grab',
        opacity: inUse ? 0.55 : 1,
        transition: 'border-color 120ms, box-shadow 120ms',
        '&:hover': inUse
          ? undefined
          : {
              borderColor: '#8dc63f',
              boxShadow: '0 1px 4px rgba(0, 77, 44, 0.12)',
            },
        '&:focus-visible': { outline: '2px solid #8dc63f', outlineOffset: 1 },
      }}
    >
      <DragIndicatorRoundedIcon sx={{ fontSize: 16, color: '#b6c0cb' }} />
      <Icon sx={{ fontSize: 16, color: TEXT_SECONDARY }} />
      <Typography
        sx={{
          fontSize: '0.8rem',
          color: TEXT_PRIMARY,
          flex: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {field.label}
      </Typography>
      {inUse && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CheckRoundedIcon sx={{ fontSize: 15, color: '#1f7a4d' }} />
        </Box>
      )}
    </Stack>
  );
}
