'use client';

import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import { Box, Card, CardContent, Dialog, IconButton, Typography } from '@mui/material';
import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useMemo, useState } from 'react';
import { registerAgModules } from '@/lib/ag-modules';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

export interface AttributionRow {
  product: string;
  mtm: number;
  ir01: number;
  irVega: number;
  fxDelta: number;
  fxVega: number;
}

interface VarAttributionTableProps {
  rows: AttributionRow[];
}

registerAgModules();

const numberFormat = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 1,
});

export default function VarAttributionTable({ rows }: VarAttributionTableProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const columnDefs = useMemo<ColDef<AttributionRow>[]>(
    () => [
      { field: 'product', headerName: 'Products / Risk Sensitivity', flex: 2.1, minWidth: 210 },
      {
        field: 'mtm',
        headerName: 'MTM',
        flex: 0.8,
        minWidth: 82,
        headerClass: 'col-center',
        cellClass: 'col-center',
        valueFormatter: ({ value }) => numberFormat.format(value),
      },
      {
        field: 'ir01',
        headerName: 'IR01',
        flex: 0.8,
        minWidth: 82,
        headerClass: 'col-center',
        cellClass: 'col-center',
        valueFormatter: ({ value }) => numberFormat.format(value),
      },
      {
        field: 'irVega',
        headerName: 'IRVega',
        flex: 0.85,
        minWidth: 86,
        headerClass: 'col-center',
        cellClass: 'col-center',
        valueFormatter: ({ value }) => numberFormat.format(value),
      },
      {
        field: 'fxDelta',
        headerName: 'FX Delta',
        flex: 0.9,
        minWidth: 92,
        headerClass: 'col-center',
        cellClass: 'col-center',
        valueFormatter: ({ value }) => numberFormat.format(value),
      },
      {
        field: 'fxVega',
        headerName: 'FX Vega',
        flex: 0.9,
        minWidth: 90,
        headerClass: 'col-center',
        cellClass: 'col-center',
        valueFormatter: ({ value }) => numberFormat.format(value),
      },
    ],
    [],
  );

  const renderTable = ({ height, autoHeight = false }: { height?: number; autoHeight?: boolean }) => (
    <Box
      className="ag-theme-quartz"
      sx={{
        '--ag-font-family': '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        '--ag-borders': 'none',
        '--ag-row-border-style': 'solid',
        '--ag-row-border-color': '#eef2f6',
        '--ag-header-background-color': '#f8fafc',
        '--ag-header-foreground-color': '#5f6f85',
        '--ag-foreground-color': '#334155',
        '--ag-border-color': '#e5e7eb',
        '--ag-row-hover-color': '#f8fbff',
        '--ag-cell-horizontal-padding': '12px',
        '--ag-header-column-resize-handle-display': 'none',
        width: '100%',
        height: autoHeight ? 'auto' : height,
        borderRadius: 2,
        overflow: 'hidden',
        '& .ag-header-cell-label': {
          fontWeight: 600,
          fontSize: '0.86rem',
        },
        '& .ag-root-wrapper': {
          border: 'none !important',
        },
        '& .ag-cell': {
          fontSize: '0.84rem',
          color: '#455669',
        },
        '& .ag-cell.col-center': {
          textAlign: 'center',
        },
        '& .ag-header-cell.col-center .ag-header-cell-label': {
          justifyContent: 'center',
        },
      }}
    >
      <AgGridReact<AttributionRow>
        theme="legacy"
        rowData={rows}
        columnDefs={columnDefs}
        domLayout={autoHeight ? 'autoHeight' : 'normal'}
        defaultColDef={{ sortable: false, filter: false, resizable: false }}
        rowHeight={42}
        headerHeight={42}
        suppressCellFocus
        suppressMovableColumns
        animateRows
      />
    </Box>
  );

  return (
    <>
      <Card
        sx={{
          borderRadius: 3,
          border: '1px solid #e0e0e0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          height: '100%',
        }}
      >
        <CardContent sx={{ p: 2.25, '&.MuiCardContent-root:last-child': { pb: 2.25 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
            <Typography sx={{ fontSize: '1.3rem', fontWeight: 500, color: '#3d516b' }}>
              VaR Attribution
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <IconButton size="small" sx={{ color: '#8b97a4' }} onClick={() => setIsExpanded(true)}>
                <OpenInFullRoundedIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: '#8b97a4' }}>
                <MoreVertRoundedIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          {renderTable({ height: 260 })}
        </CardContent>
      </Card>

      <Dialog fullScreen open={isExpanded} onClose={() => setIsExpanded(false)}>
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', p: 3 }}>
          <Card sx={{ borderRadius: 3, border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: 2.25, '&.MuiCardContent-root:last-child': { pb: 2.25 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography sx={{ fontSize: '1.3rem', fontWeight: 500, color: '#3d516b' }}>
                  VaR Attribution
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <IconButton size="small" sx={{ color: '#8b97a4' }} onClick={() => setIsExpanded(false)}>
                    <CloseFullscreenRoundedIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" sx={{ color: '#8b97a4' }}>
                    <MoreVertRoundedIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              {renderTable({ autoHeight: true })}
            </CardContent>
          </Card>
        </Box>
      </Dialog>
    </>
  );
}
