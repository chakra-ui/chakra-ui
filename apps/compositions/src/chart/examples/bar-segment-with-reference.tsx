import {
  BarSegment,
  BarSegmentContent,
  BarSegmentLabel,
  BarSegmentReference,
  BarSegmentRoot,
  BarSegmentValue,
} from "compositions/chart/bar-segment"
import { useChartConfig } from "compositions/chart/chart"

export const BarSegmentWithReference = () => {
  const chart = useChartConfig({
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
