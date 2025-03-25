import { Box } from "../src"

export default {
  title: "Charts / Bar Chart",
  decorators: [
    (Story: any) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
}

export { BarChartBasic as Basic } from "compositions/examples/charts/bar-chart-basic"
export { BarChartComposition as Composition } from "compositions/examples/charts/bar-chart-composition"
export { BarChartFillWithValue as FillWithValue } from "compositions/examples/charts/bar-chart-fill-with-value"
export { BarChartHorizontal as Horizontal } from "compositions/examples/charts/bar-chart-horizontal"
export { BarChartLegendPosition as LegendPosition } from "compositions/examples/charts/bar-chart-legend-position"
export { BarChartMultiple as Multiple } from "compositions/examples/charts/bar-chart-multiple"
export { BarChartPercent as Percent } from "compositions/examples/charts/bar-chart-percent"
export { BarChartRange as Range } from "compositions/examples/charts/bar-chart-range"
export { BarChartStacked as Stacked } from "compositions/examples/charts/bar-chart-stacked"
export { BarChartWithAvatarTicks as AvatarTicks } from "compositions/examples/charts/bar-chart-with-avatar-ticks"
export { BarChartWithBarLabel as BarLabel } from "compositions/examples/charts/bar-chart-with-bar-label"
export { BarChartWithNoGap as NoGap } from "compositions/examples/charts/bar-chart-with-no-gap"
export { BarChartWithReferenceLines as ReferenceLines } from "compositions/examples/charts/bar-chart-with-reference-lines"
