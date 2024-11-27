"use client"

import {
  ChartLegendContent,
  ChartRoot,
  ChartTooltipContent,
  useChartConfig,
} from "compositions/ui/chart"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  Tooltip,
} from "recharts"

export const BarChartFillWithValue = () => {
  const chart = useChartConfig({
    data: [
      { name: "Page A", views: 400 },
      { name: "Page B", views: -300 },
      { name: "Page C", views: -200 },
      { name: "Page D", views: 278 },
      { name: "Page E", views: -189 },
      { name: "Page F", views: 239 },
      { name: "Page G", views: 349 },
    ],
    series: [{ dataKey: "views", color: "teal.solid" }],
  })

  return (
    <ChartRoot maxW="sm">
      <BarChart data={chart.data} margin={{ top: 30 }}>
        <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
        <Tooltip
          cursor={{ fill: chart.color("bg.muted") }}
          content={<ChartTooltipContent hideLabel chart={chart} />}
        />
        <Legend content={<ChartLegendContent chart={chart} />} />
        {chart.series.map((item) => (
          <Bar
            isAnimationActive={false}
            key={item.dataKey}
            dataKey={chart.key(item.dataKey)}
            fill={chart.color(item.color)}
          >
            <LabelList
              position="top"
              dataKey={chart.key("name")}
              formatter={(value: string) => value.replace("Page ", "")}
              fillOpacity={1}
            />
            {chart.data.map((item) => (
              <Cell
                key={item.name}
                fill={chart.color(item.views > 0 ? "green.solid" : "red.solid")}
              />
            ))}
          </Bar>
        ))}
      </BarChart>
    </ChartRoot>
  )
}
