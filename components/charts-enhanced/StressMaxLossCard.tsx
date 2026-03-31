'use client';

import PerformanceComboChartCard, { type PerformancePoint } from './PerformanceComboChartCard';

interface StressMaxLossCardProps {
  data: PerformancePoint[];
}

export default function StressMaxLossCard({ data }: StressMaxLossCardProps) {
  return <PerformanceComboChartCard title="Stress Max Loss - CM Inc" yAxisLabel="Wst Cntr Prft" data={data} />;
}
