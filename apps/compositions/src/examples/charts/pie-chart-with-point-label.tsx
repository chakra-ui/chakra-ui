"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Pie, PieChart, Sector, Tooltip } from "recharts"

export const PieChartWithPointLabel = () => {
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
      <PieChart responsive>
        <Tooltip
          cursor={false}
          animationDuration={100}
          content={<Chart.Tooltip hideLabel />}
        />
        <Pie
          isAnimationActive={false}
          data={chart.data}
          dataKey={chart.key("value")}
          labelLine={{ stroke: chart.color("border.emphasized") }}
          label={{
            fill: chart.color("fg.muted"),
            style: { fontWeight: "600" },
          }}
          shape={(props) => (
            <Sector {...props} fill={chart.color(props.payload!.color)} />
          )}
        />
      </PieChart>
    </Chart.Root>
  )
}
