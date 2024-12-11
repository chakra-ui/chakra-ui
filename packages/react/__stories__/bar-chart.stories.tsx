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

export { BarChartBasic as Basic } from "compositions/chart/examples/bar-chart-basic"
export { BarChartComposition as Composition } from "compositions/chart/examples/bar-chart-composition"
export { BarChartDivergingStacked as DivergingStacked } from "compositions/chart/examples/bar-chart-diverging-stacked"
export { BarChartFillWithValue as FillWithValue } from "compositions/chart/examples/bar-chart-fill-with-value"
export { BarChartHorizontal as Horizontal } from "compositions/chart/examples/bar-chart-horizontal"
export { BarChartMultiple as Multiple } from "compositions/chart/examples/bar-chart-multiple"
export { BarChartPercent as Percent } from "compositions/chart/examples/bar-chart-percent"
export { BarChartRange as Range } from "compositions/chart/examples/bar-chart-range"
export { BarChartStacked as Stacked } from "compositions/chart/examples/bar-chart-stacked"
export { BarChartWithAvatarTicks as AvatarTicks } from "compositions/chart/examples/bar-chart-with-avatar-ticks"
export { BarChartWithBarLabel as BarLabel } from "compositions/chart/examples/bar-chart-with-bar-label"
export { BarChartWithNoGap as NoGap } from "compositions/chart/examples/bar-chart-with-no-gap"
export { BarChartWithReferenceLines as ReferenceLines } from "compositions/chart/examples/bar-chart-with-reference-lines"
