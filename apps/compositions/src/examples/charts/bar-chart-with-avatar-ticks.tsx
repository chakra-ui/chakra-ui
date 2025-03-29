"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

const data = [
  { name: "Alice", value: 400, avatar: "https://i.pravatar.cc/50?img=1" },
  { name: "Bob", value: 300, avatar: "https://i.pravatar.cc/50?img=2" },
  { name: "Charlie", value: 200, avatar: "https://i.pravatar.cc/50?img=5" },
  { name: "David", value: 278, avatar: "https://i.pravatar.cc/50?img=4" },
]

interface AvatarTickProps {
  x: number
  y: number
  index: number
}

const AvatarTicks = (props: Partial<AvatarTickProps>) => {
  const { x, y, index } = props as AvatarTickProps
  const avatarUrl = data[index].avatar
  return (
    <foreignObject x={x - 15} y={y} width={50} height={50}>
      <img
        src={avatarUrl}
        alt="avatar"
        style={{ width: 30, height: 30, borderRadius: "50%" }}
      />
    </foreignObject>
  )
}

export const BarChartWithAvatarTicks = () => {
  const chart = useChart({
    data,
    series: [{ name: "value", color: "teal.solid" }],
  })
  return (
    <Chart.Root maxH="sm" chart={chart}>
      <BarChart data={chart.data} margin={{ bottom: 20 }}>
        <XAxis
          dataKey="name"
          tick={<AvatarTicks />}
          stroke={chart.color("border.emphasized")}
        />
        <YAxis stroke={chart.color("border.emphasized")} />
        {chart.series.map((item) => (
          <Bar
            key={item.name}
            dataKey={chart.key(item.name)}
            fill={chart.color(item.color)}
          />
        ))}
      </BarChart>
    </Chart.Root>
  )
}
