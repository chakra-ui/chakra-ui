"use client"

import {
  ChartGradient,
  ChartRoot,
  ChartTooltipContent,
} from "compositions/chart/chart"
import { useChartState } from "compositions/chart/use-chart-state"
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Product A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Product B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Product C", uv: -1000, pv: 9800, amt: 2290 },
  { name: "Product D", uv: 500, pv: 3908, amt: 2000 },
  { name: "Product E", uv: -2000, pv: 4800, amt: 2181 },
  { name: "Product F", uv: -250, pv: 3800, amt: 2500 },
  { name: "Product G", uv: 3490, pv: 4300, amt: 2100 },
]

const gradientOffset = () => {
  const max = Math.max(...data.map((i) => i.uv))
  const min = Math.min(...data.map((i) => i.uv))
  if (max <= 0) return 0
  if (min >= 0) return 1
  return max / (max - min)
}

const offset = gradientOffset()

export const AreaChartFillWithValue = () => {
  const chart = useChartState({
    data,
    series: [
      { name: "uv", color: "teal.solid" },
      { name: "pv", color: "purple.solid" },
    ],
  })

  return (
    <ChartRoot maxW="sm">
      <AreaChart data={chart.data}>
        <CartesianGrid strokeDasharray="3 3" stroke={chart.color("border")} />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey={chart.key("name")}
          tickFormatter={(value) => value.replace("Product ", "")}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={chart.formatter({
            style: "currency",
            currency: "USD",
            currencyDisplay: "narrowSymbol",
            notation: "compact",
          })}
        />
        <Tooltip
          cursor={false}
          animationDuration={100}
          content={<ChartTooltipContent chart={chart} />}
        />
        <defs>
          <ChartGradient
            id="uv-gradient"
            stops={[
              { offset, color: "teal.solid", opacity: 1 },
              { offset, color: "red.solid", opacity: 1 },
            ]}
          />
        </defs>
        <Area
          type="monotone"
          isAnimationActive={false}
          dataKey={chart.key("uv")}
          fill="url(#uv-gradient)"
          fillOpacity={0.2}
          stroke={chart.color("gray.solid")}
        />
      </AreaChart>
    </ChartRoot>
  )
}
