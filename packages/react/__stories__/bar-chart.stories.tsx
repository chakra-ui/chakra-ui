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

export { BarChartBarColor as BarColor } from "compositions/examples/charts/bar-chart-bar-color"
export { BarChartBasic as Basic } from "compositions/examples/charts/bar-chart-basic"
export { BarChartCandlestick as Candlestick } from "compositions/examples/charts/bar-chart-candlestick"
export { BarChartComposition as Composition } from "compositions/examples/charts/bar-chart-composition"
export { BarChartFillWithValue as FillWithValue } from "compositions/examples/charts/bar-chart-fill-with-value"
export { BarChartHistogram as Histogram } from "compositions/examples/charts/bar-chart-histogram"
export { BarChartHorizontal as Horizontal } from "compositions/examples/charts/bar-chart-horizontal"
export { BarChartLegendPosition as LegendPosition } from "compositions/examples/charts/bar-chart-legend-position"
export { BarChartMultiple as Multiple } from "compositions/examples/charts/bar-chart-multiple"
export { BarChartPercent as Percent } from "compositions/examples/charts/bar-chart-percent"
export { BarChartRange as Range } from "compositions/examples/charts/bar-chart-range"
export { BarChartRounded as Rounded } from "compositions/examples/charts/bar-chart-rounded"
export { BarChartStacked as Stacked } from "compositions/examples/charts/bar-chart-stacked"
export { BarChartStackedMix as StackedMix } from "compositions/examples/charts/bar-chart-stacked-mix"
export { BarChartWithAvatarTicks as AvatarTicks } from "compositions/examples/charts/bar-chart-with-avatar-ticks"
export { BarChartWithBarLabel as BarLabel } from "compositions/examples/charts/bar-chart-with-bar-label"
export { BarChartWithFormatter as Formatter } from "compositions/examples/charts/bar-chart-with-formatter"
export { BarChartWithNoGap as NoGap } from "compositions/examples/charts/bar-chart-with-no-gap"
export { BarChartWithReferenceLines as ReferenceLines } from "compositions/examples/charts/bar-chart-with-reference-lines"
