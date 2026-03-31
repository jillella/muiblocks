'use client';

import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import TableRowsRoundedIcon from '@mui/icons-material/TableRowsRounded';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { useState } from 'react';

export interface EnhancedCardFrameProps {
  title: string;
  children: React.ReactNode;
  withViewToggle?: boolean;
}

export function EnhancedCardFrame({ title, children, withViewToggle = false }: EnhancedCardFrameProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [view, setView] = useState<'chart' | 'table'>('chart');

  return (
    <Card
      sx={{
        borderRadius: 2.5,
        border: '1px solid #d9e1e8',
        boxShadow: '0 2px 6px rgba(15, 23, 42, 0.08)',
        height: '100%',
      }}
    >
      <CardContent sx={{ p: 0, '&.MuiCardContent-root:last-child': { pb: 0 } }}>
        <Box
          sx={{
            px: 2,
            py: 1.3,
            borderBottom: '1px solid #e7edf3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          <Typography sx={{ fontSize: '1.5rem', color: '#5b6a7f', fontWeight: 500 }}>{title}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {withViewToggle ? (
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  borderRadius: 999,
                  border: '1px solid #dce7f2',
                  backgroundColor: '#f1f6fc',
                  p: 0.3,
                  gap: 0.2,
                  mr: 0.5,
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => setView('chart')}
                  sx={{
                    width: 30,
                    height: 24,
                    borderRadius: 999,
                    color: view === 'chart' ? '#2f87d9' : '#7f8a99',
                    backgroundColor: view === 'chart' ? '#ffffff' : 'transparent',
                    '&:hover': {
                      backgroundColor: view === 'chart' ? '#ffffff' : 'rgba(255,255,255,0.65)',
                    },
                  }}
                >
                  <BarChartRoundedIcon sx={{ fontSize: 18 }} />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => setView('table')}
                  sx={{
                    width: 30,
                    height: 24,
                    borderRadius: 999,
                    color: view === 'table' ? '#2f87d9' : '#7f8a99',
                    backgroundColor: view === 'table' ? '#ffffff' : 'transparent',
                    '&:hover': {
                      backgroundColor: view === 'table' ? '#ffffff' : 'rgba(255,255,255,0.65)',
                    },
                  }}
                >
                  <TableRowsRoundedIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
            ) : null}

            <IconButton
              size="small"
              onClick={() => setIsExpanded((current) => !current)}
              sx={{ color: '#7d8998' }}
            >
              {isExpanded ? (
                <CloseFullscreenRoundedIcon sx={{ fontSize: 18 }} />
              ) : (
                <OpenInFullRoundedIcon sx={{ fontSize: 18 }} />
              )}
            </IconButton>
            <IconButton size="small" sx={{ color: '#7d8998' }}>
              <MoreVertRoundedIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ px: 1.5, py: 1.2 }}>{children}</Box>
      </CardContent>
    </Card>
  );
}
