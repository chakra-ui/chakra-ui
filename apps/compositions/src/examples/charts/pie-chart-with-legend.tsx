"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Legend, Pie, PieChart, Sector } from "recharts"

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
      <PieChart responsive>
        <Legend content={<Chart.Legend />} />
        <Pie
          isAnimationActive={false}
          data={chart.data}
          dataKey={chart.key("value")}
          nameKey="name"
          shape={(props) => (
            <Sector {...props} fill={chart.color(props.payload!.color)} />
          )}
        />
      </PieChart>
    </Chart.Root>
  )
}
