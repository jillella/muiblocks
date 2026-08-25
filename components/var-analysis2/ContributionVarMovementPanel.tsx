'use client';

import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import { mockRiskFactorDumbbell } from '@/lib/mock-data2';
import AnalysisPanel, { ANALYSIS_TITLE_COLOR } from '@/components/var-analysis2/AnalysisPanel';
import ContributionVarRiskFactorDumbbell, {
  summarizeRiskFactorDumbbell,
} from '@/components/var-analysis2/ContributionVarRiskFactorDumbbell';
import { directionColor, formatSigned, INCREASE_COLOR } from '@/components/var-analysis2/varFormat';

export default function ContributionVarMovementPanel() {
  const totals = useMemo(() => summarizeRiskFactorDumbbell(mockRiskFactorDumbbell), []);

  return (
    <AnalysisPanel
      title="Risk Attribution by Risk Factor"
      info={<TotalVarTooltip totals={totals} />}
    >
      <ContributionVarRiskFactorDumbbell />
    </AnalysisPanel>
  );
}

function TotalVarTooltip({
  totals,
}: {
  totals: ReturnType<typeof summarizeRiskFactorDumbbell>;
}) {
  const formatMm = (value: number) => `${value.toFixed(1)} mm`;

  return (
    <Box sx={{ minWidth: 168 }}>
      <Typography
        sx={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.04em',
          color: ANALYSIS_TITLE_COLOR,
          mb: 0.75,
        }}
      >
        TOTAL VaR
      </Typography>
      <TooltipRow label="Prior Total" value={formatMm(totals.priorTotalMm)} />
      <TooltipRow label="Current Total" value={formatMm(totals.currentTotalMm)} valueColor={INCREASE_COLOR} />
      <TooltipRow
        label="Change"
        value={`${formatSigned(totals.deltaMm, 1)} mm (${formatSigned(totals.deltaPct, 1)}%)`}
        valueColor={directionColor(totals.deltaMm)}
      />
    </Box>
  );
}

function TooltipRow({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, lineHeight: 1.55 }}>
      <Typography sx={{ fontSize: '11.5px', color: '#6b7280' }}>{label}</Typography>
      <Typography sx={{ fontSize: '11.5px', fontWeight: 700, color: valueColor ?? '#374151', whiteSpace: 'nowrap' }}>
        {value}
      </Typography>
    </Box>
  );
}
