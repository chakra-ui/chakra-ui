"use client"

import { Card } from "@chakra-ui/react"
import { ChartRoot, ChartTooltipContent } from "compositions/chart/chart"
import { useChartState } from "compositions/chart/use-chart-state"
import { SegmentedControl } from "compositions/ui/segmented-control"
import * as React from "react"
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis } from "recharts"

type CurrentKey = "windows" | "mac" | "linux"

export const BarChartComposition = () => {
  const [currentKey, setCurrentKey] = React.useState<CurrentKey>("windows")

  const chart = useChartState({
    data: [
      { windows: 186, mac: 80, linux: 120, month: "January" },
      { windows: 165, mac: 95, linux: 110, month: "February" },
      { windows: 190, mac: 87, linux: 125, month: "March" },
      { windows: 195, mac: 88, linux: 130, month: "May" },
      { windows: 182, mac: 98, linux: 122, month: "June" },
      { windows: 175, mac: 90, linux: 115, month: "August" },
      { windows: 180, mac: 86, linux: 124, month: "October" },
      { windows: 185, mac: 91, linux: 126, month: "November" },
    ],
    series: [
      { name: "windows", color: "teal.solid" },
      { name: "mac", color: "purple.solid" },
      { name: "linux", color: "blue.solid" },
    ],
  })

  const totals = chart.data.reduce(
    (acc, item) => {
      return {
        windows: acc.windows + item.windows,
        mac: acc.mac + item.mac,
        linux: acc.linux + item.linux,
      }
    },
    { windows: 0, mac: 0, linux: 0 },
  )

  const series = chart.getSeries(currentKey)

  const formatNumber = chart.formatter({
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })

  return (
    <Card.Root>
      <Card.Header alignItems="flex-start">
        <Card.Title>OS Downloads</Card.Title>
        <SegmentedControl
          size="sm"
          items={[
            {
              value: "windows",
              label: `Windows (${formatNumber(totals.windows)})`,
            },
            { value: "mac", label: `Mac (${formatNumber(totals.mac)})` },
            { value: "linux", label: `Linux (${formatNumber(totals.linux)})` },
          ]}
          value={currentKey}
          onValueChange={(e) => setCurrentKey(e.value as CurrentKey)}
        />
      </Card.Header>
      <Card.Body>
        <ChartRoot height="20rem">
          <BarChart data={chart.data}>
            <CartesianGrid
              stroke={chart.color("border.muted")}
              vertical={false}
            />
            <XAxis
              axisLine={false}
              tickLine={false}
              dataKey={chart.key("month")}
              tickFormatter={(value) => value.slice(0, 3)}
              padding={{ left: 0, right: 0 }}
            />
            <Tooltip
              cursor={false}
              animationDuration={100}
              content={<ChartTooltipContent chart={chart} />}
            />
            <Bar
              dataKey={chart.key(currentKey)}
              fill={chart.color(series?.color)}
            />
          </BarChart>
        </ChartRoot>
      </Card.Body>
    </Card.Root>
  )
}
