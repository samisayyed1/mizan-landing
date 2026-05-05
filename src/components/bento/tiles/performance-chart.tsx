"use client";

import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";

type Props = {
  data: { x: number; mizan: number; bench: number }[];
};

export default function PerformanceChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 4, right: 8, bottom: 4, left: 8 }}>
        <defs>
          <linearGradient id="perf-mizan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4A574" stopOpacity={0.28} />
            <stop offset="100%" stopColor="#D4A574" stopOpacity={0} />
          </linearGradient>
        </defs>
        <YAxis hide domain={["dataMin - 4", "dataMax + 4"]} />
        <Area
          type="monotone"
          dataKey="bench"
          stroke="rgba(139,111,71,0.45)"
          strokeDasharray="3 4"
          strokeWidth={1.25}
          fill="transparent"
          isAnimationActive
          animationDuration={1200}
          dot={false}
          activeDot={false}
        />
        <Area
          type="monotone"
          dataKey="mizan"
          stroke="#D4A574"
          strokeWidth={1.75}
          fill="url(#perf-mizan)"
          isAnimationActive
          animationDuration={1400}
          dot={false}
          activeDot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
