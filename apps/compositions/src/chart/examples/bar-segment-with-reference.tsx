import {
  BarSegment,
  BarSegmentContent,
  BarSegmentLabel,
  BarSegmentReference,
  BarSegmentRoot,
  BarSegmentValue,
} from "compositions/chart/bar-segment"
import { useChartState } from "compositions/chart/use-chart-state"

export const BarSegmentWithReference = () => {
  const chart = useChartState({
    sort: { by: "value", direction: "desc" },
    data: [
      { name: "Google", value: 500000, color: "teal.solid" },
      { name: "Direct", value: 100000, color: "blue.solid" },
      { name: "Bing", value: 200000, color: "orange.solid" },
      { name: "Yandex", value: 80000, color: "purple.solid" },
    ],
  })

  return (
    <BarSegmentRoot chart={chart}>
      <BarSegmentContent>
        <BarSegmentValue />
        <BarSegment>
          <BarSegmentReference label="Target" value={200000} />
        </BarSegment>
        <BarSegmentLabel />
      </BarSegmentContent>
    </BarSegmentRoot>
  )
}
