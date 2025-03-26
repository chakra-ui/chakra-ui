"use client"

import { Chart, useChartState } from "@chakra-ui/charts"
import { Card, Stat } from "@chakra-ui/react"
import { LuGlobe } from "react-icons/lu"
import { Area, AreaChart, Tooltip } from "recharts"

export const SparklineWithStat = () => {
  return (
    <Card.Root>
      <Card.Body>
        <Stat.Root>
          <Stat.Label>
            <LuGlobe /> Unique visitors
          </Stat.Label>
          <Stat.ValueText>192.1k</Stat.ValueText>
        </Stat.Root>
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
    <Chart.Root height="10" chart={chart}>
      <AreaChart data={chart.data}>
        <Tooltip
          position={{ y: -24 }}
          animationDuration={0}
          cursor={{ stroke: chart.color("teal.solid"), strokeWidth: 2 }}
          content={
            <Chart.Tooltip hideIndicator hideLabel hideSeriesLabel fitContent />
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
    </Chart.Root>
  )
}
