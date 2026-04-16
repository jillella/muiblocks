'use client';

import { Box } from '@mui/material';
import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { addDays, format } from 'date-fns';
import { useMemo } from 'react';
import { registerAgModules } from '@/lib/ag-modules';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

registerAgModules();

const TABLE_COB_DATE = new Date(2026, 3, 7);
const WINDOW_START_BASE = new Date(2007, 0, 3);
const VAR_SCENARIO_BASE = new Date(2007, 10, 26);

export type SvarWindowCalibrationTableRow = {
  cobDate: string;
  varScenarioDate: string;
  windowStart: string;
  windowEnd: string;
  var: number;
};

function formatDateIso(date: Date) {
  return format(date, 'yyyy-MM-dd');
}

export type SvarWindowCalibrationTableProps = {
  height: number | string;
  rows?: SvarWindowCalibrationTableRow[];
};

function buildMockRows(): SvarWindowCalibrationTableRow[] {
  return Array.from({ length: 4588 }, (_, idx) => {
    const windowStart = addDays(WINDOW_START_BASE, idx);
    const windowEnd = addDays(windowStart, 364);
    const varScenarioDate = addDays(VAR_SCENARIO_BASE, -Math.floor(idx / 220));
    return {
      cobDate: formatDateIso(TABLE_COB_DATE),
      varScenarioDate: formatDateIso(varScenarioDate),
      windowStart: formatDateIso(windowStart),
      windowEnd: formatDateIso(windowEnd),
      var: idx === 0 ? 2_120_614_041.141 : 871_172_710.885 + ((idx % 17) - 8) * 125_000,
    };
  });
}

export default function SvarWindowCalibrationTable({ height, rows }: SvarWindowCalibrationTableProps) {
  const tableRows = useMemo<SvarWindowCalibrationTableRow[]>(
    () => rows ?? buildMockRows(),
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
