'use client';

/**
 * AG Grid Enterprise drilldown grid.
 *
 * Grouping is applied imperatively through `setRowGroupColumns` rather than by
 * rebuilding column definitions, so reordering the hierarchy keeps column
 * widths, sorts and filters intact. `onColumnRowGroupChanged` pushes whatever
 * grouping the grid ends up with back into the shared context, which keeps the
 * right-hand panel correct even when the user regroups from the column menu.
 */

import UnfoldLessRoundedIcon from '@mui/icons-material/UnfoldLessRounded';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import {
  Box,
  Button,
  FormControlLabel,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material';
import type {
  ColDef,
  GridApi,
  GridReadyEvent,
  IAggFuncParams,
  ValueFormatterParams,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useDrilldown } from '@/components/risk-analysis/DrilldownContext';
import {
  dimensionFields,
  measureFields,
  type DimensionFieldId,
  type DrilldownRow,
} from '@/components/risk-analysis/drilldownFields';
import {
  amountColor,
  formatAmount,
  PANEL_BORDER,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
} from '@/components/risk-analysis/drilldownFormat';
import { registerAgEnterpriseModules } from '@/lib/ag-enterprise';
import {
  computeTotals,
  mockDrilldownRows,
} from '@/lib/risk-analysis/mockDrilldown';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

registerAgEnterpriseModules();

/** Marks VaR-style measures so group rows render an em dash instead of a sum. */
const nonAdditiveAgg = (_params: IAggFuncParams<DrilldownRow, number>) => null;

const measureValueFormatter = ({
  value,
  node,
}: ValueFormatterParams<DrilldownRow, number>) => {
  if (value === null || value === undefined) {
    return node?.group ? '—' : '';
  }
  return formatAmount(value);
};

const sameOrder = (a: string[], b: string[]) =>
  a.length === b.length && a.every((value, index) => value === b[index]);

export default function RiskAnalysisGrid() {
  const {
    hierarchy,
    drilldownEnabled,
    setDrilldownEnabled,
    replaceHierarchy,
    publishTotals,
  } = useDrilldown();
  const apiRef = useRef<GridApi<DrilldownRow> | null>(null);

  const columnDefs = useMemo<ColDef<DrilldownRow>[]>(() => {
    const dimensionCols: ColDef<DrilldownRow>[] = dimensionFields.map(
      (field) => ({
        colId: field.id,
        field: field.id,
        headerName: field.columnHeader,
        headerTooltip: field.label,
        width: field.width,
        minWidth: 100,
        enableRowGroup: true,
        filter: 'agSetColumnFilter',
        sortable: true,
      })
    );

    const lastMeasureId = measureFields[measureFields.length - 1]?.id;
    const measureCols: ColDef<DrilldownRow>[] = measureFields.map((field) => ({
      colId: field.id,
      field: field.id,
      headerName: field.columnHeader,
      // Absorbs the leftover width so the grid has no dead space on the right.
      flex: field.id === lastMeasureId ? 1 : undefined,
      headerTooltip:
        field.aggregation === 'none'
          ? `${field.label} — not additive, group rows show no total`
          : field.label,
      width: field.width,
      minWidth: 110,
      type: 'rightAligned',
      enableValue: field.aggregation === 'sum',
      aggFunc: field.aggregation === 'sum' ? 'sum' : nonAdditiveAgg,
      filter: 'agNumberColumnFilter',
      sortable: true,
      valueFormatter: measureValueFormatter,
      cellStyle: (params) => ({
        color: amountColor(params.value),
        fontVariantNumeric: 'tabular-nums',
      }),
    }));

    return [...dimensionCols, ...measureCols];
  }, []);

  const autoGroupColumnDef = useMemo<ColDef<DrilldownRow>>(
    () => ({
      width: 215,
      minWidth: 165,
      cellRendererParams: { suppressCount: false },
      cellClass: 'drill-group-cell',
    }),
    []
  );

  const applyGrouping = useCallback(() => {
    const api = apiRef.current;
    if (!api) {
      return;
    }

    const desired = drilldownEnabled ? hierarchy : [];
    const current = api.getRowGroupColumns().map((column) => column.getColId());
    if (!sameOrder(desired, current)) {
      api.setRowGroupColumns(desired);
    }

    // While drilling down, the generated group columns already carry every
    // attribute in the hierarchy, so the raw dimension columns are hidden and
    // the grid stays as narrow as the mock. Ungrouped, they come back as the
    // detail columns of a flat table.
    api.setColumnsVisible(
      dimensionFields.map((field) => field.id),
      desired.length === 0
    );
  }, [drilldownEnabled, hierarchy]);

  useEffect(() => {
    applyGrouping();
  }, [applyGrouping]);

  const republishTotals = useCallback(() => {
    const api = apiRef.current;
    if (!api) {
      return;
    }

    const leaves: DrilldownRow[] = [];
    api.forEachNodeAfterFilter((node) => {
      if (!node.group && node.data) {
        leaves.push(node.data);
      }
    });
    publishTotals(computeTotals(leaves));
  }, [publishTotals]);

  const onGridReady = useCallback(
    (event: GridReadyEvent<DrilldownRow>) => {
      apiRef.current = event.api;
      applyGrouping();
      republishTotals();
    },
    [applyGrouping, republishTotals]
  );

  const onColumnRowGroupChanged = useCallback(() => {
    const api = apiRef.current;
    if (!api || !drilldownEnabled) {
      return;
    }
    replaceHierarchy(
      api
        .getRowGroupColumns()
        .map((column) => column.getColId() as DimensionFieldId)
    );
  }, [drilldownEnabled, replaceHierarchy]);

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        sx={{
          alignItems: { sm: 'center' },
          justifyContent: 'space-between',
          mb: 1.5,
        }}
      >
        <Typography
          sx={{ fontSize: '1.05rem', fontWeight: 600, color: TEXT_PRIMARY }}
        >
          Risk Sensitivity Attribution Drill Down
        </Typography>

        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Button
            size="small"
            startIcon={<UnfoldMoreRoundedIcon fontSize="small" />}
            onClick={() => apiRef.current?.expandAll()}
            disabled={!drilldownEnabled || hierarchy.length === 0}
            sx={{
              textTransform: 'none',
              color: TEXT_SECONDARY,
              fontSize: '0.8rem',
            }}
          >
            Expand all
          </Button>
          <Button
            size="small"
            startIcon={<UnfoldLessRoundedIcon fontSize="small" />}
            onClick={() => apiRef.current?.collapseAll()}
            disabled={!drilldownEnabled || hierarchy.length === 0}
            sx={{
              textTransform: 'none',
              color: TEXT_SECONDARY,
              fontSize: '0.8rem',
            }}
          >
            Collapse all
          </Button>

          <Tooltip title="Turn off to see the ungrouped leaf rows">
            <FormControlLabel
              label="Drilldown"
              labelPlacement="start"
              control={
                <Switch
                  size="small"
                  checked={drilldownEnabled}
                  onChange={(event) =>
                    setDrilldownEnabled(event.target.checked)
                  }
                  slotProps={{
                    input: { 'aria-label': 'Toggle drilldown grouping' },
                  }}
                  sx={{
                    '& .Mui-checked': { color: '#1f7a4d' },
                    '& .Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#1f7a4d',
                    },
                  }}
                />
              }
              sx={{
                ml: 1,
                mr: 0,
                '& .MuiFormControlLabel-label': {
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: TEXT_SECONDARY,
                },
              }}
            />
          </Tooltip>
        </Stack>
      </Stack>

      <Box
        className="ag-theme-quartz"
        sx={{
          '--ag-font-family': 'Roboto, Helvetica, Arial, sans-serif',
          '--ag-borders': 'none',
          '--ag-row-border-style': 'solid',
          '--ag-row-border-color': '#eef2f6',
          '--ag-header-background-color': '#f8fafc',
          '--ag-header-foreground-color': '#5f6f85',
          '--ag-foreground-color': '#334155',
          '--ag-border-color': PANEL_BORDER,
          '--ag-row-hover-color': '#f8fbff',
          '--ag-cell-horizontal-padding': '12px',
          width: '100%',
          height: 620,
          border: `1px solid ${PANEL_BORDER}`,
          borderRadius: 2,
          overflow: 'hidden',
          '& .ag-header-cell-label': { fontWeight: 600, fontSize: '0.74rem' },
          '& .ag-header-cell-text': { letterSpacing: '0.02em' },
          '& .ag-root-wrapper': { border: 'none !important' },
          '& .ag-cell': { fontSize: '0.8rem' },
          '& .drill-group-cell': { fontWeight: 500, color: TEXT_PRIMARY },
          '& .ag-row-group': { backgroundColor: '#fbfcfe' },
        }}
      >
        <AgGridReact<DrilldownRow>
          theme="legacy"
          rowData={mockDrilldownRows}
          columnDefs={columnDefs}
          autoGroupColumnDef={autoGroupColumnDef}
          groupDisplayType="multipleColumns"
          groupDefaultExpanded={0}
          suppressAggFuncInHeader
          // Column visibility is owned by `applyGrouping`.
          suppressGroupChangesColumnVisibility
          // The custom attribute panel is the only drop target; the native row
          // group panel would be a second, competing one.
          rowGroupPanelShow="never"
          sideBar={false}
          rowHeight={38}
          headerHeight={40}
          pagination
          paginationPageSize={100}
          paginationPageSizeSelector={[50, 100, 200]}
          animateRows
          suppressCellFocus
          // Filters stay reachable from the column menu; dropping the separate
          // funnel button buys back header width for the measure names.
          defaultColDef={{ resizable: true, suppressHeaderFilterButton: true }}
          onGridReady={onGridReady}
          onColumnRowGroupChanged={onColumnRowGroupChanged}
          onFilterChanged={republishTotals}
          onModelUpdated={republishTotals}
        />
      </Box>
    </Box>
  );
}
