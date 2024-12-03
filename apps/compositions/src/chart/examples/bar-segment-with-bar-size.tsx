import { useChartState } from "compositions/chart/use-chart-state"
import {
  BarSegment,
  BarSegmentContent,
  BarSegmentLegend,
  BarSegmentRoot,
} from "../bar-segment"

export const BarSegmentWithBarSize = () => {
  const chart = useChartState({
    sort: { by: "value", direction: "desc" },
    data: [
      { name: "Ruby", value: 450000, color: "green.solid" },
      { name: "CSS", value: 150000, color: "yellow.solid" },
      { name: "JavaScript", value: 300000, color: "orange.solid" },
      { name: "HTML", value: 175000, color: "purple.solid" },
      { name: "React", value: 225000, color: "blue.solid" },
    ],
  })

  return (
    <BarSegmentRoot maxW="sm" chart={chart} barSize="3">
      <BarSegmentContent>
        <BarSegment gap="0.5" />
      </BarSegmentContent>
      <BarSegmentLegend gap="2" textStyle="xs" showPercent />
    </BarSegmentRoot>
  )
}
