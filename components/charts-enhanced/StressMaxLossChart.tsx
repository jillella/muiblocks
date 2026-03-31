'use client';

import PerformanceComboChartCard, { type PerformancePoint } from './PerformanceComboChartCard';

interface StressMaxLossChartProps {
  data: PerformancePoint[];
}

export default function StressMaxLossChart({ data }: StressMaxLossChartProps) {
  return <PerformanceComboChartCard title="Stress Max Loss - CM Inc" yAxisLabel="Wst Cntr Prft" data={data} />;
}
