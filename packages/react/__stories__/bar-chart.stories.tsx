import { Box } from "../src"

export default {
  title: "WIP / Bar Chart",
  decorators: [
    (Story: any) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
}

export { BarChartBasic as Basic } from "compositions/chart/bar-chart-basic"
export { BarChartComposition as Composition } from "compositions/chart/bar-chart-composition"
export { BarChartFillWithValue as FillWithValue } from "compositions/chart/bar-chart-fill-with-value"
export { BarChartHorizontal as Horizontal } from "compositions/chart/bar-chart-horizontal"
export { BarChartMultiple as Multiple } from "compositions/chart/bar-chart-multiple"
export { BarChartPercent as Percent } from "compositions/chart/bar-chart-percent"
export { BarChartStacked as Stacked } from "compositions/chart/bar-chart-stacked"
export { BarChartWithBarLabel as BarLabel } from "compositions/chart/bar-chart-with-bar-label"
export { BarChartWithNoGap as NoGap } from "compositions/chart/bar-chart-with-no-gap"
export { BarChartWithReferenceLines as ReferenceLines } from "compositions/chart/bar-chart-with-reference-lines"
