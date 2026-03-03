"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { RadialBar, RadialBarChart, Sector, Tooltip } from "recharts"

export const RadialChartBasic = () => {
  const chart = useChart({
    data: [
      { value: 165, month: "January", color: "teal.solid" },
      { value: 190, month: "February", color: "purple.solid" },
      { value: 195, month: "March", color: "blue.solid" },
      { value: 182, month: "May", color: "teal.solid" },
    ],
  })

  return (
    <Chart.Root maxW="sm" chart={chart} mx="auto">
      <RadialBarChart
        data={chart.data}
        barSize={20}
        startAngle={90}
        endAngle={-270}
        responsive
      >
        <Tooltip cursor={false} content={<Chart.Tooltip nameKey="month" />} />
        <RadialBar
          isAnimationActive={false}
          dataKey={chart.key("value")}
          background
          shape={(props: any) => (
            <Sector
              {...props}
              fill={chart.color(props.payload!.color)}
              stroke="none"
            />
          )}
        />
      </RadialBarChart>
    </Chart.Root>
  )
}
