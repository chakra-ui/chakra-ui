"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Cell, LabelList, Pie, PieChart, Tooltip } from "recharts"

export const PieChartWithLabelInside = () => {
  const chart = useChart({
    data: [
      { name: "windows", value: 400, color: "blue.solid" },
      { name: "mac", value: 300, color: "orange.solid" },
      { name: "linux", value: 300, color: "pink.solid" },
      { name: "other", value: 200, color: "green.solid" },
    ],
  })

  return (
    <Chart.Root boxSize="320px" mx="auto" chart={chart}>
      <PieChart>
        <Tooltip
          cursor={false}
          animationDuration={100}
          content={<Chart.Tooltip hideLabel />}
        />
        <Pie
          isAnimationActive={false}
          data={chart.data}
          dataKey={chart.key("value")}
        >
          <LabelList position="inside" fill="white" stroke="none" />
          {chart.data.map((item) => (
            <Cell key={item.name} fill={chart.color(item.color)} />
          ))}
        </Pie>
      </PieChart>
    </Chart.Root>
  )
}
