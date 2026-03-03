"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Bar, BarChart, Rectangle } from "recharts"

export const SparklineBarChart = () => {
  const chart = useChart({
    data: [
      { value: 10, fill: "teal.solid" },
      { value: 16, fill: "green.solid" },
      { value: 19, fill: "teal.solid" },
      { value: 15, fill: "green.solid" },
      { value: 12, fill: "teal.solid" },
      { value: 15, fill: "teal.solid" },
      { value: 10, fill: "teal.solid" },
      { value: 18, fill: "teal.solid" },
    ],
  })

  return (
    <Chart.Root width="28" height="12" chart={chart}>
      <BarChart data={chart.data} barSize={8} responsive>
        <Bar
          isAnimationActive={false}
          dataKey={chart.key("value")}
          fill={chart.color("teal.solid")}
          stroke=""
          shape={(props) => (
            <Rectangle {...props} fill={chart.color(props.payload!.fill)} />
          )}
        />
      </BarChart>
    </Chart.Root>
  )
}
