"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

export const BarChartRange = () => {
  const chart = useChart({
    data: [
      { name: "UK", value: [10, 20] },
      { name: "US", value: [15, 25] },
      { name: "EU", value: [5, 18] },
      { name: "JP", value: [12, 30] },
    ],
  })

  return (
    <Chart.Root maxH="sm" chart={chart}>
      <BarChart
        barSize={100}
        data={chart.data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey={chart.key("name")} axisLine={false} tickLine={false} />
        <YAxis domain={[0, "dataMax + 5"]} axisLine={false} tickLine={false} />
        <Bar
          tooltipType="none"
          dataKey={chart.key("value")}
          fill={chart.color("teal.solid")}
        />
      </BarChart>
    </Chart.Root>
  )
}
