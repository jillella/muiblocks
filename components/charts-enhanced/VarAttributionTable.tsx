'use client';

import { Box } from '@mui/material';
import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useMemo } from 'react';
import { registerAgModules } from '@/lib/ag-modules';
import { EnhancedCardFrame } from './shared';
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
  const columnDefs = useMemo<ColDef<AttributionRow>[]>(
    () => [
      { field: 'product', headerName: 'Products / Risk Sensitivity', flex: 2.1, minWidth: 210 },
      {
        field: 'mtm',
        headerName: 'MTM',
        flex: 0.8,
        minWidth: 82,
        cellStyle: { textAlign: 'right' },
        valueFormatter: ({ value }) => numberFormat.format(value),
      },
      {
        field: 'ir01',
        headerName: 'IR01',
        flex: 0.8,
        minWidth: 82,
        cellStyle: { textAlign: 'right' },
        valueFormatter: ({ value }) => numberFormat.format(value),
      },
      {
        field: 'irVega',
        headerName: 'IRVega',
        flex: 0.85,
        minWidth: 86,
        cellStyle: { textAlign: 'right' },
        valueFormatter: ({ value }) => numberFormat.format(value),
      },
      {
        field: 'fxDelta',
        headerName: 'FX Delta',
        flex: 0.9,
        minWidth: 92,
        cellStyle: { textAlign: 'right' },
        valueFormatter: ({ value }) => numberFormat.format(value),
      },
      {
        field: 'fxVega',
        headerName: 'FX Vega',
        flex: 0.9,
        minWidth: 90,
        cellStyle: { textAlign: 'right' },
        valueFormatter: ({ value }) => numberFormat.format(value),
      },
    ],
    [],
  );

  return (
    <EnhancedCardFrame title="VaR Attribution">
      <Box
        className="ag-theme-quartz"
        sx={{
          '--ag-font-family': '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          '--ag-borders': 'none',
          '--ag-row-border-style': 'solid',
          '--ag-row-border-color': '#e9edf2',
          '--ag-header-background-color': '#f5f7fa',
          '--ag-header-foreground-color': '#4f5f74',
          '--ag-foreground-color': '#455669',
          '--ag-border-color': '#e9edf2',
          '--ag-row-hover-color': '#f8fbff',
          '--ag-cell-horizontal-padding': '12px',
          '--ag-header-column-resize-handle-display': 'none',
          width: '100%',
          borderRadius: 1.5,
          border: '1px solid #e9edf2',
          overflow: 'hidden',
          '& .ag-header-cell-label': {
            fontWeight: 600,
            fontSize: '0.86rem',
          },
          '& .ag-cell': {
            fontSize: '0.84rem',
            color: '#455669',
          },
        }}
      >
        <AgGridReact<AttributionRow>
          theme="legacy"
          rowData={rows}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          defaultColDef={{ sortable: false, filter: false, resizable: false }}
          rowHeight={40}
          headerHeight={40}
          suppressCellFocus
          suppressMovableColumns
        />
      </Box>
    </EnhancedCardFrame>
  );
}
