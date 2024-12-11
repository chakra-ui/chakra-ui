import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

// Sample data
const data = [
  { name: "Jan", gains: 30, losses: -10 },
  { name: "Feb", gains: 20, losses: -15 },
  { name: "Mar", gains: 40, losses: -5 },
  { name: "Apr", gains: 10, losses: -20 },
  { name: "May", gains: 50, losses: -25 },
]

// Custom tooltip for better readability
const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean
  payload?: any
}) => {
  if (active && payload && payload.length) {
    const { name, gains, losses } = payload[0].payload
    return (
      <div
        style={{
          background: "#fff",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        <p>{name}</p>
        <p style={{ color: "green" }}>Gains: {gains}</p>
        <p style={{ color: "red" }}>Losses: {Math.abs(losses)}</p>
      </div>
    )
  }
  return null
}

export const BarChartDivergingStacked = () => (
  <ResponsiveContainer width="100%" height={400}>
    <BarChart data={data} layout="horizontal">
      <CartesianGrid strokeDasharray="3 3" />
      {/* X-Axis for gains and losses */}
      <XAxis hide />

      {/* Y-Axis for the categories (e.g., months) */}
      <YAxis hide />

      <Tooltip content={<CustomTooltip />} />

      {/* Losses in red */}
      <Bar dataKey="losses" isAnimationActive={false} fill="red">
        <LabelList
          dataKey="losses"
          fill="#fff"
          formatter={(value: number) => Math.abs(value)}
        />
      </Bar>

      <ReferenceLine y={0} stroke="red" />

      <Bar dataKey="gains" fill="green" isAnimationActive={false}>
        <LabelList dataKey="gains" fill="#fff" />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
)
