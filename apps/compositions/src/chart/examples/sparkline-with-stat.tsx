"use client"

import { Card } from "@chakra-ui/react"
import { ChartRoot, ChartTooltipContent } from "compositions/chart/chart"
import { useChartState } from "compositions/chart/use-chart-state"
import { StatLabel, StatRoot, StatValueText } from "compositions/ui/stat"
import { LuGlobe } from "react-icons/lu"
import { Area, AreaChart, Tooltip } from "recharts"

export const SparklineWithStat = () => {
  return (
    <Card.Root>
      <Card.Body>
        <StatRoot>
          <StatLabel>
            <LuGlobe /> Unique visitors
          </StatLabel>
          <StatValueText>192.1k</StatValueText>
        </StatRoot>
      </Card.Body>
      <SparkLine data={[10, 16, 19, 15, 12, 15, 10, 18]} />
    </Card.Root>
  )
}

const SparkLine = (props: { data: number[] }) => {
  const chart = useChartState({
    data: props.data.map((value) => ({ value })),
    series: [{ name: "value", color: "teal.solid" }],
  })

  return (
    <ChartRoot height="10">
      <AreaChart data={chart.data}>
        <Tooltip
          position={{ y: -24 }}
          animationDuration={0}
          cursor={{ stroke: chart.color("teal.solid"), strokeWidth: 2 }}
          content={
            <ChartTooltipContent
              hideIndicator
              hideLabel
              hideSeriesLabel
              fitContent
              chart={chart}
            />
          }
        />
        {chart.series.map((item) => (
          <Area
            key={item.name}
            isAnimationActive={false}
            dataKey={chart.key(item.name)}
            fill={chart.color(item.color)}
            fillOpacity={0.2}
            stroke={chart.color(item.color)}
            strokeWidth={2}
          />
        ))}
      </AreaChart>
    </ChartRoot>
  )
}
