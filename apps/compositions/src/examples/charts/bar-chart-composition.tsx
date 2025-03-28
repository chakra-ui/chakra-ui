"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Card, SegmentGroup } from "@chakra-ui/react"
import * as React from "react"
import { Bar, BarChart, XAxis } from "recharts"

type CurrentKey = "windows" | "mac" | "linux"

export const BarChartComposition = () => {
  const [currentKey, setCurrentKey] = React.useState<CurrentKey>("windows")

  const chart = useChart({
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

  const series = chart.getSeries({ name: currentKey })

  const formatNumber = chart.formatNumber({
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })

  return (
    <Card.Root maxW="md">
      <Card.Header alignItems="flex-start">
        <Card.Title>OS Downloads</Card.Title>
        <SegmentGroup.Root
          size="xs"
          value={currentKey}
          onValueChange={(e) => setCurrentKey(e.value as CurrentKey)}
        >
          <SegmentGroup.Indicator />
          <SegmentGroup.Items
            items={[
              {
                value: "windows",
                label: `Windows (${formatNumber(totals.windows)})`,
              },
              { value: "mac", label: `Mac (${formatNumber(totals.mac)})` },
              {
                value: "linux",
                label: `Linux (${formatNumber(totals.linux)})`,
              },
            ]}
          />
        </SegmentGroup.Root>
      </Card.Header>
      <Card.Body>
        <Chart.Root height="10rem" chart={chart}>
          <BarChart data={chart.data}>
            <XAxis
              axisLine={false}
              tickLine={false}
              dataKey={chart.key("month")}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Bar
              dataKey={chart.key(currentKey)}
              fill={chart.color(series?.color)}
            />
          </BarChart>
        </Chart.Root>
      </Card.Body>
    </Card.Root>
  )
}
