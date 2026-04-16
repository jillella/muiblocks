'use client';

import { Box } from '@mui/material';
import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useMemo } from 'react';
import {
  mockSvarWindowCalibrationTableRows,
  type SvarWindowCalibrationTableRow,
} from '@/lib/mock-data';
import { registerAgModules } from '@/lib/ag-modules';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

registerAgModules();

export type { SvarWindowCalibrationTableRow };

export type SvarWindowCalibrationTableProps = {
  height: number | string;
  rows?: SvarWindowCalibrationTableRow[];
};

export default function SvarWindowCalibrationTable({ height, rows }: SvarWindowCalibrationTableProps) {
  const tableRows = useMemo<SvarWindowCalibrationTableRow[]>(
    () => rows ?? mockSvarWindowCalibrationTableRows(),
    [rows],
  );

  const tableColumns = useMemo<ColDef<SvarWindowCalibrationTableRow>[]>(
    () => [
      { field: 'cobDate', headerName: 'COB Date', minWidth: 145, flex: 1.1, filter: true },
      { field: 'varScenarioDate', headerName: 'Var Scenario Date', minWidth: 155, flex: 1.2, filter: true },
      { field: 'windowStart', headerName: 'Window Start', minWidth: 145, flex: 1.1, filter: true },
      { field: 'windowEnd', headerName: 'Window End', minWidth: 145, flex: 1.1, filter: true },
      {
        field: 'var',
        headerName: 'VaR',
        minWidth: 170,
        flex: 1.2,
        filter: true,
        valueFormatter: ({ value }) =>
          typeof value === 'number'
            ? value.toLocaleString('en-US', {
                minimumFractionDigits: 3,
                maximumFractionDigits: 3,
              })
            : '',
      },
    ],
    [],
  );

  return (
    <Box
      className="ag-theme-quartz"
      sx={{
        '--ag-font-family': '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        '--ag-borders': 'none',
        '--ag-row-border-style': 'solid',
        '--ag-row-border-color': '#ebedf0',
        '--ag-header-background-color': '#f5f6f8',
        '--ag-header-foreground-color': '#374151',
        '--ag-foreground-color': '#334155',
        '--ag-border-color': '#e5e7eb',
        '--ag-row-hover-color': '#f9fafb',
        '--ag-cell-horizontal-padding': '10px',
        '--ag-header-column-resize-handle-display': 'none',
        width: '100%',
        height,
        border: '1px solid #e5e7eb',
        borderRadius: 2,
        overflow: 'hidden',
        '& .ag-header-cell-label': { fontWeight: 500, fontSize: '0.81rem' },
        '& .ag-cell': { fontSize: '0.8rem', color: '#4b5563' },
      }}
    >
      <AgGridReact<SvarWindowCalibrationTableRow>
        theme="legacy"
        rowData={tableRows}
        columnDefs={tableColumns}
        defaultColDef={{
          sortable: true,
          filter: true,
          floatingFilter: false,
          resizable: false,
          suppressHeaderMenuButton: false,
        }}
        rowHeight={36}
        headerHeight={36}
        suppressCellFocus
        suppressMovableColumns
        animateRows
        pagination
        paginationPageSize={50}
        paginationPageSizeSelector={[25, 50, 100]}
      />
    </Box>
  );
}
