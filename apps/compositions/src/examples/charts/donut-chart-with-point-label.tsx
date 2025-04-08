"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Cell, Pie, PieChart, Tooltip } from "recharts"

export const DonutChartWithPointLabel = () => {
  const chart = useChart({
    data: [
      { name: "windows", value: 400, color: "blue.solid" },
      { name: "mac", value: 300, color: "orange.solid" },
      { name: "linux", value: 300, color: "pink.solid" },
      { name: "other", value: 200, color: "green.solid" },
    ],
  })

  return (
    <Chart.Root boxSize="200px" chart={chart} mx="auto">
      <PieChart margin={{ left: 40 }}>
        <Tooltip
          cursor={false}
          animationDuration={100}
          content={<Chart.Tooltip hideLabel />}
        />
        <Pie
          innerRadius={80}
          outerRadius={100}
          isAnimationActive={false}
          data={chart.data}
          dataKey={chart.key("value")}
          nameKey="name"
          labelLine={{ strokeWidth: 1 }}
          label={{
            fill: chart.color("fg.muted"),
          }}
        >
          {chart.data.map((item) => (
            <Cell
              key={item.name}
              strokeWidth={2}
              fill={chart.color(item.color)}
            />
          ))}
        </Pie>
      </PieChart>
    </Chart.Root>
  )
}
