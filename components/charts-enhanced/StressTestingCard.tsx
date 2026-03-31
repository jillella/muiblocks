'use client';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { EnhancedCardFrame } from './shared';

export interface StressTestingRow {
  product: string;
  mtm: number;
  adScenario: number;
  ccarDate: number;
}

interface StressTestingCardProps {
  rows: StressTestingRow[];
}

const numberFormat = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 1,
});

export default function StressTestingCard({ rows }: StressTestingCardProps) {
  return (
    <EnhancedCardFrame title="Stress Testing - CM Inc">
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f7fa' }}>
              <TableCell sx={{ color: '#4f5f74', fontSize: '0.86rem', fontWeight: 600 }}>
                Products / Risk Sensitivity
              </TableCell>
              <TableCell align="right" sx={{ color: '#4f5f74', fontSize: '0.86rem', fontWeight: 600 }}>
                MTM
              </TableCell>
              <TableCell align="right" sx={{ color: '#4f5f74', fontSize: '0.86rem', fontWeight: 600 }}>
                Ad Scenario
              </TableCell>
              <TableCell align="right" sx={{ color: '#4f5f74', fontSize: '0.86rem', fontWeight: 600 }}>
                CCAR 07-Mar-26
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.product} hover>
                <TableCell sx={{ color: '#55657a', fontSize: '0.84rem' }}>{row.product}</TableCell>
                <TableCell align="right" sx={{ color: '#455669', fontSize: '0.84rem' }}>
                  {numberFormat.format(row.mtm)}
                </TableCell>
                <TableCell align="right" sx={{ color: '#455669', fontSize: '0.84rem' }}>
                  {numberFormat.format(row.adScenario)}
                </TableCell>
                <TableCell align="right" sx={{ color: '#455669', fontSize: '0.84rem' }}>
                  {numberFormat.format(row.ccarDate)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </EnhancedCardFrame>
  );
}
