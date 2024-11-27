"use client"

import {
  ChartLegendContent,
  ChartRoot,
  ChartTooltipContent,
  useChartConfig,
} from "compositions/ui/chart"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export const AreaChartWithDots = () => {
  const chart = useChartConfig({
    data: [
      { windows: 186, mac: 80, linux: 120, month: "January" },
      { windows: 165, mac: 95, linux: 110, month: "February" },
      { windows: 190, mac: 87, linux: 125, month: "March" },
      { windows: 195, mac: 88, linux: 130, month: "May" },
      { windows: 182, mac: 98, linux: 122, month: "June" },
      { windows: 175, mac: 90, linux: 349, month: "August" },
      { windows: 180, mac: 86, linux: 400, month: "October" },
      { windows: 185, mac: 91, linux: 126, month: "November" },
    ],
    series: [
      { dataKey: "windows", color: "teal.solid" },
      { dataKey: "mac", color: "purple.solid" },
      { dataKey: "linux", color: "blue.solid" },
    ],
  })

  return (
    <ChartRoot maxW="sm">
      <AreaChart data={chart.data} margin={{ right: 20 }}>
        <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
        <YAxis stroke={chart.color("border")} axisLine={false} />
        <XAxis
          axisLine={false}
          tick={false}
          dataKey={chart.key("month")}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Tooltip
          cursor={false}
          animationDuration={100}
          content={<ChartTooltipContent chart={chart} />}
        />
        <Legend content={<ChartLegendContent chart={chart} />} />

        {chart.series.map((item) => (
          <Area
            key={item.dataKey}
            isAnimationActive={false}
            dataKey={chart.key(item.dataKey)}
            fill={chart.color(item.color)}
            fillOpacity={0.2}
            stroke={chart.color(item.color)}
            stackId="a"
          />
        ))}

        {chart.series.map((item) => (
          <Area
            isAnimationActive={false}
            stackId="b"
            legendType="none"
            tooltipType="none"
            key={item.dataKey}
            dataKey={chart.key(item.dataKey)}
            dot={{ fill: chart.color(item.color), fillOpacity: 1 }}
            activeDot={false}
            fill="none"
            stroke="none"
          />
        ))}
      </AreaChart>
    </ChartRoot>
  )
}
