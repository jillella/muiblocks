'use client';

import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import type { ContributionVarFactorRow } from '@/lib/mock-data2';
import {
  arrowFor,
  directionColor,
  formatMm,
  formatSignedMm,
  formatSignedPp,
} from '@/components/var-analysis2/varFormat';

export type FactorMovement = {
  row: ContributionVarFactorRow;
  /** Current minus prior contribution VaR, USD MM. */
  deltaMm: number;
  /** Change in share of the total book, in percentage points. */
  shareDeltaPp: number;
};

/** Sorted by the size of the move so the biggest swings read first. */
export function buildFactorMovements(
  rows: ContributionVarFactorRow[],
  currentTotalMm: number,
  priorTotalMm: number,
): FactorMovement[] {
  return rows
    .map((row) => ({
      row,
      deltaMm: row.currentMm - row.priorMm,
      shareDeltaPp: (row.currentMm / currentTotalMm) * 100 - (row.priorMm / priorTotalMm) * 100,
    }))
    .sort((a, b) => Math.abs(b.deltaMm) - Math.abs(a.deltaMm));
}

const cellSx = {
  fontFamily: 'var(--font-roboto), Roboto, Helvetica, Arial, sans-serif',
  fontSize: '12.5px',
  py: 0.85,
  px: 1.25,
  borderBottom: '1px solid #e6eaef',
  borderRight: '1px solid #e6eaef',
  '&:last-of-type': { borderRight: 'none' },
} as const;

const headCellSx = {
  ...cellSx,
  fontWeight: 700,
  color: '#374151',
  backgroundColor: '#f1f4f7',
  whiteSpace: 'nowrap',
} as const;

export default function ContributionVarMovementTable({ movements }: { movements: FactorMovement[] }) {
  return (
    <Box sx={{ border: '1px solid #e6eaef', borderRadius: 1, overflow: 'hidden' }}>
      <Table size="small" aria-label="Contribution VaR movement by risk factor">
        <TableHead>
          <TableRow>
            <TableCell sx={headCellSx}>Risk Factor</TableCell>
            <TableCell align="right" sx={headCellSx}>
              Prior VaR
            </TableCell>
            <TableCell align="right" sx={headCellSx}>
              Current VaR
            </TableCell>
            <TableCell align="right" sx={headCellSx}>
              VaR Δ
            </TableCell>
            <TableCell align="right" sx={headCellSx}>
              Share Δ
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movements.map(({ row, deltaMm, shareDeltaPp }) => (
            <TableRow key={row.factor} hover>
              <TableCell sx={{ ...cellSx, whiteSpace: 'nowrap' }}>{row.factor}</TableCell>
              <TableCell align="right" sx={cellSx}>
                {formatMm(row.priorMm, 1)}
              </TableCell>
              <TableCell align="right" sx={cellSx}>
                {formatMm(row.currentMm, 1)}
              </TableCell>
              <TableCell align="right" sx={{ ...cellSx, color: directionColor(deltaMm), whiteSpace: 'nowrap' }}>
                {`${arrowFor(deltaMm)} ${formatSignedMm(deltaMm, 1)}`}
              </TableCell>
              <TableCell align="right" sx={{ ...cellSx, color: directionColor(shareDeltaPp) }}>
                {formatSignedPp(shareDeltaPp)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
