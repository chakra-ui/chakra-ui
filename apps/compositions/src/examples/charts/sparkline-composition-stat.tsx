"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Card, Stat } from "@chakra-ui/react"
import { LuGlobe } from "react-icons/lu"
import { Area, AreaChart } from "recharts"

export const SparklineCompositionStat = () => {
  return (
    <Card.Root maxW="sm" size="sm" overflow="hidden">
      <Card.Body>
        <Stat.Root>
          <Stat.Label>
            <LuGlobe /> Unique visitors
          </Stat.Label>
          <Stat.ValueText>192.1k</Stat.ValueText>
        </Stat.Root>
      </Card.Body>
      <SparkLine />
    </Card.Root>
  )
}

const SparkLine = () => {
  const chart = useChart({
    data: [
      { value: 10 },
      { value: 16 },
      { value: 19 },
      { value: 15 },
      { value: 12 },
      { value: 15 },
    ],
    series: [{ color: "teal.solid" }],
  })

  return (
    <Chart.Root height="10" chart={chart}>
      <AreaChart
        data={chart.data}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
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
