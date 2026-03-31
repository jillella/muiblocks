'use client';

import PerformanceComboChartCard, { type PerformancePoint } from './PerformanceComboChartCard';

interface VarBacktestingChartProps {
  data: PerformancePoint[];
}

export default function VarBacktestingChart({ data }: VarBacktestingChartProps) {
  return <PerformanceComboChartCard title="VaR Backtesting - CM Inc" yAxisLabel="VaR / PnL" data={data} />;
}
