import { Box } from "../src"

export default {
  title: "Charts / Radar Chart",
  decorators: [
    (Story: any) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
}

export { RadarChartBasic as Basic } from "compositions/examples/charts/radar-chart-basic"
export { RadarChartLinesOnly as LinesOnly } from "compositions/examples/charts/radar-chart-lines-only"
export { RadarChartMultiple as Multiple } from "compositions/examples/charts/radar-chart-multiple"
export { RadarChartWithCircleGrid as CircleGrid } from "compositions/examples/charts/radar-chart-with-circle-grid"
export { RadarChartWithDots as Dots } from "compositions/examples/charts/radar-chart-with-dots"
export { RadarChartWithFilledGrid as FilledGrid } from "compositions/examples/charts/radar-chart-with-filled-grid"
export { RadarChartWithPointLabel as PointLabel } from "compositions/examples/charts/radar-chart-with-point-label"
export { RadarChartWithTooltip as Tooltip } from "compositions/examples/charts/radar-chart-with-tooltip"
