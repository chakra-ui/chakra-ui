"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Cell, Pie, PieChart, Sector, Tooltip } from "recharts"

export const DonutChartWithDetachedSegment = () => {
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
      <PieChart>
        <Tooltip
          cursor={false}
          animationDuration={100}
          content={<Chart.Tooltip hideLabel />}
        />
        <Pie
          innerRadius={60}
          outerRadius={100}
          isAnimationActive={false}
          data={chart.data}
          dataKey={chart.key("value")}
          nameKey={chart.key("name")}
          activeIndex={0}
          activeShape={<Sector outerRadius={120} />}
          strokeWidth={5}
        >
          {chart.data.map((item) => (
            <Cell key={item.name} fill={chart.color(item.color)} />
          ))}
        </Pie>
      </PieChart>
    </Chart.Root>
  )
}
