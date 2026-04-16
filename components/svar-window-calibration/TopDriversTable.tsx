'use client';

import { Box } from '@mui/material';
import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useMemo } from 'react';
import { mockTopDriverRows, type TopDriverRow } from '@/lib/mock-data';
import { registerAgModules } from '@/lib/ag-modules';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

registerAgModules();

export type { TopDriverRow };
export { buildMockTopDriverRows, mockTopDriverRows } from '@/lib/mock-data';

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

export type TopDriversTableProps = {
  height: number | string;
  rows?: TopDriverRow[];
};

export default function TopDriversTable({ height, rows: rowsProp }: TopDriversTableProps) {
  const rows = useMemo(() => rowsProp ?? mockTopDriverRows, [rowsProp]);

  const columnDefs = useMemo<ColDef<TopDriverRow>[]>(
    () => [
      { field: 'calibrationDate', headerName: 'Calibration Date', flex: 1.1, minWidth: 130 },
      { field: 'oneYearVarWorst', headerName: '1 Yr. VaR (Worst)', flex: 1.1, minWidth: 130 },
      { field: 'candidateWindow', headerName: 'Candidate Window', flex: 1, minWidth: 120 },
      { field: 'svarProd', headerName: 'SVaR (Prod)', flex: 0.9, minWidth: 100 },
      { field: 'svarWindowProd', headerName: 'SVaR Window (Prod)', flex: 1.1, minWidth: 140 },
      { field: 'oneYrVarWorst', headerName: '1yr VaR (Worst)', flex: 1, minWidth: 120 },
    ],
    [],
  );

  return (
    <Box className="ag-theme-quartz" sx={{ ...gridShellSx, height }}>
      <AgGridReact<TopDriverRow>
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
