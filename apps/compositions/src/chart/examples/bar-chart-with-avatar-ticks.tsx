import { ChartRoot } from "compositions/chart/chart"
import { useChartState } from "compositions/chart/use-chart-state"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

const data = [
  { name: "Alice", value: 400, avatar: "https://i.pravatar.cc/50?img=1" },
  { name: "Bob", value: 300, avatar: "https://i.pravatar.cc/50?img=2" },
  { name: "Charlie", value: 200, avatar: "https://i.pravatar.cc/50?img=3" },
  { name: "David", value: 278, avatar: "https://i.pravatar.cc/50?img=4" },
]

interface CartesianTickProps {
  x: number
  y: number
  index: number
}

// Custom X-axis tick component
const CustomTick = (props: Partial<CartesianTickProps>) => {
  const { x, y, index } = props as CartesianTickProps
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
  const chart = useChartState({
    data,
    series: [{ name: "value", color: "teal.solid" }],
  })
  return (
    <ChartRoot maxW="sm">
      <BarChart data={chart.data} margin={{ bottom: 20 }} barSize={20}>
        <XAxis
          dataKey="name"
          tick={<CustomTick />}
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
    </ChartRoot>
  )
}
