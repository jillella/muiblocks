'use client';

import PerformanceComboChartCard, { type PerformancePoint } from './PerformanceComboChartCard';

interface VarBacktestingCardProps {
  data: PerformancePoint[];
}

export default function VarBacktestingCard({ data }: VarBacktestingCardProps) {
  return <PerformanceComboChartCard title="VaR Backtesting - CM Inc" yAxisLabel="VaR / PnL" data={data} />;
}
