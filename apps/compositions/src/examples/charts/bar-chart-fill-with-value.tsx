"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Tooltip,
} from "recharts"

export const BarChartFillWithValue = () => {
  const chart = useChart({
    data: [
      { name: "Page A", views: 400 },
      { name: "Page B", views: -300 },
      { name: "Page C", views: -200 },
      { name: "Page D", views: 278 },
      { name: "Page E", views: -189 },
      { name: "Page F", views: 239 },
      { name: "Page G", views: 349 },
    ],
    series: [{ name: "views", color: "teal.solid" }],
  })

  return (
    <Chart.Root maxW="sm" chart={chart}>
      <BarChart data={chart.data} margin={{ top: 30 }}>
        <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
        <Tooltip
          cursor={{ fill: chart.color("bg.muted") }}
          content={<Chart.Tooltip hideLabel />}
        />
        {chart.series.map((item) => (
          <Bar
            isAnimationActive={false}
            key={item.name}
            dataKey={chart.key(item.name)}
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
    </Chart.Root>
  )
}
