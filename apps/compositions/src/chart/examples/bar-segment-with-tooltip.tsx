import { useChartState } from "compositions/chart/use-chart-state"
import {
  BarSegment,
  BarSegmentContent,
  BarSegmentLegend,
  BarSegmentRoot,
} from "../bar-segment"

export const BarSegmentWithTooltip = () => {
  const chart = useChartState({
    sort: { by: "value", direction: "desc" },
    data: [
      { name: "Google", value: 500000, color: "teal.solid" },
      { name: "Direct", value: 100000, color: "blue.solid" },
      { name: "Bing", value: 200000, color: "orange.solid" },
      { name: "Yandex", value: 100000, color: "purple.solid" },
    ],
  })

  return (
    <BarSegmentRoot chart={chart}>
      <BarSegmentContent>
        <BarSegment showTooltip />
      </BarSegmentContent>
      <BarSegmentLegend showPercent />
    </BarSegmentRoot>
  )
}
