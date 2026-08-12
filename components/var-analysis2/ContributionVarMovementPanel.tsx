'use client';

import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import { mockContributionVarFactors, type ContributionVarFactorRow } from '@/lib/mock-data2';
import AnalysisPanel from '@/components/var-analysis2/AnalysisPanel';
import ContributionVarDonut from '@/components/var-analysis2/ContributionVarDonut';
import ContributionVarMovementTable, {
  buildFactorMovements,
} from '@/components/var-analysis2/ContributionVarMovementTable';
import { NEGATIVE_COLOR, NEUTRAL_COLOR, POSITIVE_COLOR } from '@/components/var-analysis2/varFormat';

function SummaryChip({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: 0.75,
        fontFamily: 'var(--font-roboto), Roboto, Helvetica, Arial, sans-serif',
        fontSize: '13px',
        fontWeight: 700,
        color,
      }}
    >
      <Box component="span">{label}:</Box>
      <Box component="span">{count}</Box>
    </Box>
  );
}

export type ContributionVarMovementPanelProps = {
  rows?: ContributionVarFactorRow[];
};

export default function ContributionVarMovementPanel({ rows: rowsProp }: ContributionVarMovementPanelProps) {
  const rows = useMemo(() => rowsProp ?? mockContributionVarFactors, [rowsProp]);

  const { currentTotalMm, priorTotalMm, movements, upCount, downCount, flatCount } = useMemo(() => {
    const currentTotal = rows.reduce((total, row) => total + row.currentMm, 0);
    const priorTotal = rows.reduce((total, row) => total + row.priorMm, 0);
    const factorMovements = buildFactorMovements(rows, currentTotal, priorTotal);

    return {
      currentTotalMm: currentTotal,
      priorTotalMm: priorTotal,
      movements: factorMovements,
      upCount: factorMovements.filter((movement) => movement.deltaMm > 0).length,
      downCount: factorMovements.filter((movement) => movement.deltaMm < 0).length,
      flatCount: factorMovements.filter((movement) => movement.deltaMm === 0).length,
    };
  }, [rows]);

  return (
    <AnalysisPanel
      title="Contribution VaR by Risk Factor: Week-over-Week"
      info="Ring size shows each risk factor's share of total contribution VaR; labels show the absolute amount"
      headerRight={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, flexWrap: 'wrap' }}>
          <SummaryChip label="VaR Up" count={upCount} color={POSITIVE_COLOR} />
          <SummaryChip label="VaR Down" count={downCount} color={NEGATIVE_COLOR} />
          <SummaryChip label="Flat" count={flatCount} color={NEUTRAL_COLOR} />
        </Box>
      }
      footnote="Illustrative values only. Donut segment size is based on each risk factor contribution VaR share; labels and table show absolute Contribution VaR in USD MM."
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.05fr) minmax(0, 1fr)' },
          columnGap: 4,
          rowGap: 3,
          alignItems: 'center',
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Box sx={{ pl: { lg: 2 } }}>
            <Typography sx={{ fontSize: '12px', color: '#8b96a5' }}>
              Inner ring = Prior week Contribution VaR
            </Typography>
            <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#5b6672' }}>
              Outer ring = Current week Contribution VaR
            </Typography>
          </Box>
          <Box sx={{ px: { xs: 1, sm: 3, lg: 2 }, mt: 1 }}>
            <ContributionVarDonut rows={rows} currentTotalMm={currentTotalMm} priorTotalMm={priorTotalMm} />
          </Box>
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <ContributionVarMovementTable movements={movements} />

          <Box
            component="ul"
            aria-label="Risk factor legend"
            sx={{
              m: 0,
              mt: 2.5,
              p: 0,
              listStyle: 'none',
              display: 'grid',
              gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(auto-fit, minmax(150px, max-content))' },
              gap: 1,
            }}
          >
            {rows.map((row) => (
              <Box component="li" key={row.factor} sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                <Box
                  aria-hidden
                  sx={{ width: 16, height: 12, borderRadius: 0.25, backgroundColor: row.color, flexShrink: 0 }}
                />
                <Typography
                  sx={{
                    fontFamily: 'var(--font-roboto), Roboto, Helvetica, Arial, sans-serif',
                    fontSize: '13px',
                    color: '#181d1f',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {row.factor}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </AnalysisPanel>
  );
}
