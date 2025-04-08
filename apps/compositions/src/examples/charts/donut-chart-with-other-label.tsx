"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Cell, Pie, PieChart, Tooltip } from "recharts"

interface DataItem {
  name: string
  value: number
  color: string
}

const rawData: DataItem[] = [
  { name: "windows", value: 400, color: "blue.solid" },
  { name: "mac", value: 300, color: "orange.solid" },
  { name: "linux", value: 150, color: "pink.solid" },
  { name: "chrome", value: 80, color: "purple.solid" },
  { name: "firefox", value: 60, color: "red.solid" },
  { name: "safari", value: 40, color: "yellow.solid" },
  { name: "edge", value: 30, color: "cyan.solid" },
  { name: "opera", value: 20, color: "teal.solid" },
]

const threshold = 100

// Group items with value < 100 into "Other"
const data = rawData.reduce<DataItem[]>((acc, item) => {
  if (item.value >= threshold) {
    acc.push(item)
  } else {
    const otherIndex = acc.findIndex((i) => i.name === "Other")
    if (otherIndex === -1) {
      acc.push({ name: "Other", value: item.value, color: "gray.emphasized" })
    } else {
      acc[otherIndex].value += item.value
    }
  }
  return acc
}, [])

export const DonutChartWithOtherLabel = () => {
  const chart = useChart({ data: data })

  const label = (entry: DataItem) => {
    const percent = chart.getValuePercent("value", entry.value)
    return `${entry.name} (${percent.toFixed(1)}%)`
  }

  return (
    <Chart.Root aspectRatio="square" maxW="sm" chart={chart} mx="auto">
      <PieChart>
        <Tooltip
          cursor={false}
          animationDuration={100}
          content={<Chart.Tooltip hideLabel />}
        />
        <Pie
          innerRadius={60}
          outerRadius={100}
          isAnimationActive={false}
          data={chart.data}
          dataKey={chart.key("value")}
          nameKey={chart.key("name")}
          label={label}
          labelLine={{ strokeWidth: 1 }}
        >
          {chart.data.map((item) => (
            <Cell key={item.name} fill={chart.color(item.color)} />
          ))}
        </Pie>
      </PieChart>
    </Chart.Root>
  )
}
