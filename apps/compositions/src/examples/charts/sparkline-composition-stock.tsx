"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import {
  Badge,
  Box,
  Card,
  FormatNumber,
  Span,
  Stack,
  Stat,
} from "@chakra-ui/react"
import { Area, AreaChart } from "recharts"

export const SparklineCompositionStock = () => {
  const chart = useChart({
    data: [
      { date: "2023-01", value: 145.43 },
      { date: "2023-02", value: 151.73 },
      { date: "2023-03", value: 157.65 },
      { date: "2023-04", value: 169.68 },
      { date: "2023-05", value: 173.75 },
      { date: "2023-06", value: 186.68 },
      { date: "2023-07", value: 181.99 },
      { date: "2023-08", value: 189.46 },
    ],
    series: [{ name: "value", color: "green.solid" }],
  })

  const closing = chart.data[chart.data.length - 1]
  const opening = chart.data[0]
  const trend = (closing.value - opening.value) / opening.value

  return (
    <Card.Root maxW="sm" size="sm">
      <Card.Body flexDirection="row" alignItems="center">
        <Stack gap="0" flex="1">
          <Box fontWeight="semibold" textStyle="sm">
            AMZN
          </Box>
          <Box textStyle="xs" color="fg.muted">
            Amazon Inc.
          </Box>
        </Stack>

        <Chart.Root width="28" height="12" chart={chart}>
          <AreaChart data={chart.data}>
            <defs>
              <Chart.Gradient
                id="sp-gradient"
                stops={[
                  { offset: 0, color: "green.solid", opacity: 0.8 },
                  { offset: 1, color: "green.solid", opacity: 0.2 },
                ]}
              />
            </defs>
            {chart.series.map((item) => (
              <Area
                key={item.name}
                isAnimationActive={false}
                dataKey={chart.key(item.name)}
                fill={`url(#sp-gradient)`}
                fillOpacity={0.2}
                stroke={chart.color(item.color)}
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        </Chart.Root>

        <Stat.Root size="sm" alignItems="flex-end">
          <Span fontWeight="medium">
            <FormatNumber
              value={closing.value}
              style="currency"
              currency="USD"
            />
          </Span>
          <Badge colorPalette={trend > 0 ? "green" : "red"} gap="0">
            <Stat.UpIndicator />
            <FormatNumber
              value={trend}
              style="percent"
              maximumFractionDigits={2}
            />
          </Badge>
        </Stat.Root>
      </Card.Body>
    </Card.Root>
  )
}
