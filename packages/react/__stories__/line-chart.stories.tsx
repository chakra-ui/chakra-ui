import { Box } from "../src"

export default {
  title: "Charts / Line Chart",
  decorators: [
    (Story: any) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
}

export { LineChartAxesLabel as AxesLabel } from "compositions/examples/charts/line-chart-axes-label"
export { LineChartBasic as Basic } from "compositions/examples/charts/line-chart-basic"
export { LineChartBiaxial as Biaxial } from "compositions/examples/charts/line-chart-biaxial"
export { LineChartComposition as Composition } from "compositions/examples/charts/line-chart-composition"
export { LineChartCustomTooltip as CustomTooltip } from "compositions/examples/charts/line-chart-custom-tooltip"
export { LineChartLegendInteraction as LegendInteraction } from "compositions/examples/charts/line-chart-legend-interaction"
export { LineChartMultiple as Multiple } from "compositions/examples/charts/line-chart-multiple"
export { LineChartNoDots as NoDots } from "compositions/examples/charts/line-chart-no-dots"
export { LineChartStartEndTick as StartEndTick } from "compositions/examples/charts/line-chart-start-end-tick"
export { LineChartValueFormatter as ValueFormatter } from "compositions/examples/charts/line-chart-value-formatter"
export { LineChartWithCustomDot as CustomDot } from "compositions/examples/charts/line-chart-with-custom-dot"
export { LineChartWithDashed as Dashed } from "compositions/examples/charts/line-chart-with-dashed"
export { LineChartWithGradient as Gradient } from "compositions/examples/charts/line-chart-with-gradient"
export { LineChartWithNulls as Nulls } from "compositions/examples/charts/line-chart-with-nulls"
export { LineChartWithPointLabel as PointLabel } from "compositions/examples/charts/line-chart-with-point-label"
export { LineChartWithReferencePoint as ReferencePoint } from "compositions/examples/charts/line-chart-with-reference-point"
export { LineChartWithSeriesLabel as SeriesLabel } from "compositions/examples/charts/line-chart-with-series-label"
export { LineChartWithStrokeWidth as StrokeWidth } from "compositions/examples/charts/line-chart-with-stroke-width"
export { LineChartWithTypes as Types } from "compositions/examples/charts/line-chart-with-types"
export { LineChartWithValueDomain as ValueDomain } from "compositions/examples/charts/line-chart-with-value-domain"
