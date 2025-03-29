"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Cell, Legend, Pie, PieChart } from "recharts"

export const PieChartWithLegend = () => {
  const chart = useChart({
    data: [
      { name: "windows", value: 400, color: "teal.solid" },
      { name: "mac", value: 300, color: "orange.solid" },
      { name: "linux", value: 300, color: "blue.solid" },
    ],
  })

  return (
    <Chart.Root boxSize="200px" mx="auto" chart={chart}>
      <PieChart>
        <Legend content={<Chart.Legend />} />
        <Pie
          isAnimationActive={false}
          data={chart.data}
          dataKey={chart.key("value")}
          nameKey="name"
        >
          {chart.data.map((item) => (
            <Cell key={item.name} fill={chart.color(item.color)} />
          ))}
        </Pie>
      </PieChart>
    </Chart.Root>
  )
}
