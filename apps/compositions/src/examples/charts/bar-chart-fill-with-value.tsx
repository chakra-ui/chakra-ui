"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Bar, BarChart, CartesianGrid, Cell, LabelList } from "recharts"

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
    <Chart.Root maxH="sm" chart={chart}>
      <BarChart data={chart.data} margin={{ top: 30 }}>
        <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
        {chart.series.map((item) => (
          <Bar
            isAnimationActive={false}
            key={item.name}
            radius={4}
            dataKey={chart.key(item.name)}
            fill={chart.color(item.color)}
          >
            <LabelList
              position="top"
              dataKey={chart.key("views")}
              offset={10}
              style={{ fontWeight: "500" }}
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
