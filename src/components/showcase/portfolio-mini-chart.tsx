"use client";

import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";

type Props = {
  data: { m: string; v: number }[];
};

export default function PortfolioMiniChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 4, right: 8, bottom: 4, left: 8 }}>
        <defs>
          <linearGradient id="mizan-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4A574" stopOpacity={0.22} />
            <stop offset="100%" stopColor="#D4A574" stopOpacity={0} />
          </linearGradient>
        </defs>
        <YAxis hide domain={["dataMin - 80000", "dataMax + 80000"]} />
        <Area
          type="monotone"
          dataKey="v"
          stroke="#D4A574"
          strokeWidth={1.75}
          fill="url(#mizan-area)"
          isAnimationActive
          animationDuration={1400}
          animationEasing="ease-out"
          activeDot={false}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
