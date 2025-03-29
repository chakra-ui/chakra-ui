"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Card, ColorSwatch, HStack, Stat } from "@chakra-ui/react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

export const LineChartComposition = () => {
  const chart = useChart({
    data: [
      { facebookAds: 20, organic: 20, googleAds: 45, month: "January" },
      { facebookAds: 35, organic: 92, googleAds: 52, month: "February" },
      { facebookAds: 48, organic: 78, googleAds: 20, month: "March" },
      { facebookAds: 65, organic: 82, googleAds: 75, month: "May" },
      { facebookAds: 72, organic: 95, googleAds: 40, month: "June" },
      { facebookAds: 85, organic: 20, googleAds: 95, month: "August" },
    ],
    series: [
      { name: "facebookAds", color: "blue.solid", label: "Facebook Ads" },
      { name: "organic", color: "green.solid", label: "Organic" },
      { name: "googleAds", color: "pink.solid", label: "Google Ads" },
    ],
  })

  return (
    <Card.Root maxW="lg">
      <Card.Header>
        <Card.Title>Customers by channel</Card.Title>
      </Card.Header>
      <Card.Body>
        <Chart.Root maxH="8rem" chart={chart}>
          <LineChart data={chart.data}>
            <CartesianGrid stroke={chart.color("border")} vertical={false} />
            <XAxis
              axisLine={false}
              dataKey={chart.key("month")}
              tickFormatter={(value) => value.slice(0, 3)}
              ticks={[
                chart.data[0].month,
                chart.data[chart.data.length - 1].month,
              ]}
              stroke={chart.color("border")}
            />
            {chart.series.map((item) => (
              <Line
                key={item.name}
                isAnimationActive={false}
                dataKey={chart.key(item.name)}
                stroke={chart.color(item.color)}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </Chart.Root>

        <HStack wrap="wrap" gap="2">
          {chart.series.map((item) => (
            <Stat.Root key={item.name} size="sm">
              <Stat.Label textStyle="xs">
                <ColorSwatch boxSize="2" value={chart.color(item.color)} />
                {item.label}
              </Stat.Label>
              <Stat.ValueText fontWeight="medium">
                {item.name ? chart.getTotal(item.name) : "-"}
              </Stat.ValueText>
            </Stat.Root>
          ))}
        </HStack>
      </Card.Body>
    </Card.Root>
  )
}
