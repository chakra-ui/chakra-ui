"use client"

import {
  ChartLegendContent,
  ChartRoot,
  ChartTooltipContent,
  useChartState,
} from "@chakra-ui/charts"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export const BarChartLegendPosition = () => {
  const chart = useChartState({
    data: [
      { category: "Web Server", value: 200, maxValue: 450 },
      { category: "Credit Card", value: 700, maxValue: 900 },
      { category: "Payment", value: 439, maxValue: 500 },
      { category: "API", value: 147, maxValue: 200 },
      { category: "AddToCart", value: 84, maxValue: 100 },
    ],
    series: [
      { name: "value", color: "blue.solid" },
      { name: "maxValue", color: "green.solid" },
    ],
  })

  return (
    <ChartRoot>
      <BarChart data={chart.data}>
        <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
        <XAxis
          tickLine={false}
          dataKey={chart.key("category")}
          stroke={chart.color("border")}
        />
        <YAxis tickLine={false} stroke={chart.color("border")} />
        <Tooltip
          cursor={{ fill: chart.color("bg.muted") }}
          animationDuration={100}
          content={<ChartTooltipContent chart={chart} />}
        />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="top"
          wrapperStyle={{ paddingLeft: 30 }}
          content={<ChartLegendContent orientation="vertical" chart={chart} />}
        />
        {chart.series.map((item) => (
          <Bar
            isAnimationActive={false}
            key={item.name}
            dataKey={chart.key(item.name)}
            fill={chart.color(item.color)}
          />
        ))}
      </BarChart>
    </ChartRoot>
  )
}
