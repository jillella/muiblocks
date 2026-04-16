'use client';

import { Box } from '@mui/material';
import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useMemo } from 'react';
import { buildMockTopContributorRows, type TopContributorRow } from '@/lib/mock-data';
import { registerAgModules } from '@/lib/ag-modules';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

registerAgModules();

export type { TopContributorRow };
export { buildMockTopContributorRows } from '@/lib/mock-data';

const gridShellSx = {
  '--ag-font-family': '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  '--ag-borders': 'none',
  '--ag-row-border-style': 'solid',
  '--ag-row-border-color': '#eef2f6',
  '--ag-header-background-color': '#f8fafc',
  '--ag-header-foreground-color': '#334155',
  '--ag-foreground-color': '#334155',
  '--ag-border-color': '#e5e7eb',
  '--ag-row-hover-color': '#f8fbff',
  '--ag-cell-horizontal-padding': '12px',
  '--ag-header-column-resize-handle-display': 'none',
  width: '100%',
  border: '1px solid #e9edf2',
  borderRadius: 2,
  overflow: 'hidden',
  '& .ag-header-cell-label': { fontWeight: 600, fontSize: '0.82rem' },
  '& .ag-cell': { fontSize: '0.86rem' },
} as const;

export type TopContributorsTableProps = {
  height: number | string;
  rows?: TopContributorRow[];
};

export default function TopContributorsTable({ height, rows: rowsProp }: TopContributorsTableProps) {
  const rows = useMemo(() => rowsProp ?? buildMockTopContributorRows(), [rowsProp]);

  const columnDefs = useMemo<ColDef<TopContributorRow>[]>(
    () => [
      { field: 'month', headerName: 'Month', flex: 1, minWidth: 100 },
      {
        field: 'ir',
        headerName: 'IR',
        flex: 0.85,
        minWidth: 72,
        valueFormatter: ({ value }) => (typeof value === 'number' ? `${value.toFixed(1)}M` : ''),
      },
      {
        field: 'fx',
        headerName: 'FX',
        flex: 0.85,
        minWidth: 72,
        valueFormatter: ({ value }) => (typeof value === 'number' ? `${value.toFixed(1)}M` : ''),
      },
      {
        field: 'fxVol',
        headerName: 'FX Vol',
        flex: 0.85,
        minWidth: 80,
        valueFormatter: ({ value }) => (typeof value === 'number' ? `${value.toFixed(1)}M` : ''),
      },
      {
        field: 'irVol',
        headerName: 'IR Vol',
        flex: 0.85,
        minWidth: 80,
        valueFormatter: ({ value }) => (typeof value === 'number' ? `${value.toFixed(1)}M` : ''),
      },
    ],
    [],
  );

  return (
    <Box className="ag-theme-quartz" sx={{ ...gridShellSx, height }}>
      <AgGridReact<TopContributorRow>
        theme="legacy"
        rowData={rows}
        columnDefs={columnDefs}
        defaultColDef={{ sortable: true, filter: false, resizable: false }}
        rowHeight={40}
        headerHeight={40}
        suppressCellFocus
        suppressMovableColumns
        domLayout="normal"
        animateRows
      />
    </Box>
  );
}
