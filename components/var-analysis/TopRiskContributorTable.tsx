'use client';

import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { Box, IconButton, Typography } from '@mui/material';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useMemo } from 'react';
import { registerAgModules } from '@/lib/ag-modules';
import { mockTopRiskContributorRows, type TopRiskContributorRow } from '@/lib/mock-data';
import { analysisTitleSx } from '@/components/var-analysis/AnalysisPanel';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

registerAgModules();

const gridShellSx = {
  '--ag-font-family': '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  '--ag-borders': 'none',
  '--ag-row-border-style': 'solid',
  '--ag-row-border-color': '#eef2f6',
  '--ag-header-background-color': '#fbfcfd',
  '--ag-header-foreground-color': '#374151',
  '--ag-foreground-color': '#374151',
  '--ag-border-color': '#e5e7eb',
  '--ag-row-hover-color': '#f8fbff',
  '--ag-cell-horizontal-padding': '16px',
  '--ag-header-column-resize-handle-display': 'none',
  '--ag-wrapper-border-radius': '0px',
  width: '100%',
  border: 'none',
  overflow: 'hidden',
  '& .ag-root-wrapper': { border: 'none' },
  '& .ag-header': { borderTop: '1px solid #e5eaf0', borderBottom: '1px solid #e5eaf0' },
  '& .ag-header-cell-label': { fontWeight: 500, fontSize: '0.88rem' },
  '& .ag-cell': { fontSize: '0.88rem', display: 'flex', alignItems: 'center' },
} as const;

function SubClassCellRenderer({ data, value }: ICellRendererParams<TopRiskContributorRow, string>) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
      <Box
        aria-hidden
        sx={{
          width: 9,
          height: 9,
          borderRadius: '50%',
          backgroundColor: data?.subClassColor ?? '#94a3b8',
          flexShrink: 0,
        }}
      />
      <span>{value}</span>
    </Box>
  );
}

export type TopRiskContributorTableProps = {
  rows?: TopRiskContributorRow[];
};

export default function TopRiskContributorTable({ rows: rowsProp }: TopRiskContributorTableProps) {
  const rows = useMemo(() => rowsProp ?? mockTopRiskContributorRows, [rowsProp]);

  const columnDefs = useMemo<ColDef<TopRiskContributorRow>[]>(
    () => [
      { field: 'riskClass', headerName: 'Risk Class', flex: 1, minWidth: 120 },
      {
        field: 'riskSubClass',
        headerName: 'Risk Sub-class',
        flex: 1.1,
        minWidth: 150,
        cellRenderer: SubClassCellRenderer,
      },
      { field: 'riskType', headerName: 'Risk Type', flex: 1, minWidth: 120 },
      {
        field: 'product',
        headerName: 'Product',
        flex: 1.2,
        minWidth: 150,
        cellStyle: { fontWeight: 600, color: '#1f2937' },
      },
      { field: 'productTwo', headerName: 'Product Two', flex: 1.2, minWidth: 150 },
      { field: 'ticker', headerName: 'Ticker US SPARC', flex: 1.5, minWidth: 190 },
      {
        field: 'tickerValue',
        headerName: 'Ticker US SPARC',
        flex: 1.1,
        minWidth: 150,
        valueFormatter: ({ value }) => (typeof value === 'number' ? value.toLocaleString('en-US') : ''),
      },
    ],
    [],
  );

  return (
    <Box component="section" aria-label="Top risk contributor">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography
          component="h2"
          sx={analysisTitleSx}
        >
          Top Risk Contributor
        </Typography>
        <IconButton size="small" aria-label="Top risk contributor options" sx={{ color: '#486c94' }}>
          <MoreVertRoundedIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box className="ag-theme-quartz" sx={{ ...gridShellSx, height: 56 + rows.length * 56 }}>
        <AgGridReact<TopRiskContributorRow>
          theme="legacy"
          rowData={rows}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true, filter: false, resizable: false }}
          rowHeight={56}
          headerHeight={56}
          suppressCellFocus
          suppressMovableColumns
          domLayout="normal"
          animateRows
        />
      </Box>
    </Box>
  );
}
