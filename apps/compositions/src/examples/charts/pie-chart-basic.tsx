"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Pie, PieChart, Sector } from "recharts"

export const PieChartBasic = () => {
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
      <PieChart responsive>
        <Pie
          isAnimationActive={false}
          data={chart.data}
          dataKey={chart.key("value")}
          shape={(props) => (
            <Sector {...props} fill={chart.color(props.payload!.color)} />
          )}
        />
      </PieChart>
    </Chart.Root>
  )
}
