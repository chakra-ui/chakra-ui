"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Cell, Pie, PieChart } from "recharts"

export const PieChartWithLabelOutside = () => {
  const chart = useChart({
    data: [
      { name: "windows", value: 400, color: "blue.solid" },
      { name: "mac", value: 300, color: "orange.solid" },
      { name: "linux", value: 300, color: "pink.solid" },
      { name: "other", value: 200, color: "green.solid" },
    ],
  })

  return (
    <Chart.Root boxSize="200px" mx="auto" chart={chart}>
      <PieChart>
        <Pie
          isAnimationActive={false}
          data={chart.data}
          dataKey={chart.key("value")}
          outerRadius={100}
          innerRadius={0}
          labelLine={false}
          label={({ name, index }) => {
            const { value } = chart.data[index ?? -1]
            const percent = value / chart.getTotal("value")
            return `${name}: ${(percent * 100).toFixed(1)}%`
          }}
        >
          {chart.data.map((item) => {
            return <Cell key={item.name} fill={chart.color(item.color)} />
          })}
        </Pie>
      </PieChart>
    </Chart.Root>
  )
}
