import { Box } from "../src"

export default {
  title: "WIP / Radar Chart",
  decorators: [
    (Story: any) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
}

export { RadarChartBasic as Basic } from "compositions/chart/examples/radar-chart-basic"
export { RadarChartLinesOnly as LinesOnly } from "compositions/chart/examples/radar-chart-lines-only"
export { RadarChartMultiple as Multiple } from "compositions/chart/examples/radar-chart-multiple"
export { RadarChartWithCircleGrid as CircleGrid } from "compositions/chart/examples/radar-chart-with-circle-grid"
export { RadarChartWithDots as Dots } from "compositions/chart/examples/radar-chart-with-dots"
export { RadarChartWithFilledGrid as FilledGrid } from "compositions/chart/examples/radar-chart-with-filled-grid"
export { RadarChartWithPointLabel as PointLabel } from "compositions/chart/examples/radar-chart-with-point-label"
export { RadarChartWithTooltip as Tooltip } from "compositions/chart/examples/radar-chart-with-tooltip"
