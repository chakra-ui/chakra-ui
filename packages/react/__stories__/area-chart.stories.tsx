import { Box } from "../src"

export default {
  title: "WIP / Area Chart",
  decorators: [
    (Story: any) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
}

export { AreaChartBasic as Basic } from "compositions/chart/examples/area-chart-basic"
export { AreaChartPercent as Percent } from "compositions/chart/examples/area-chart-percent"
export { AreaChartFillWithValue as FillWithValue } from "compositions/chart/examples/area-chart-fill-with-value"
export { AreaChartWithAxes as Axes } from "compositions/chart/examples/area-chart-with-axes"
export { AreaChartWithAxisLabel as AxisLabel } from "compositions/chart/examples/area-chart-with-axis-label"
export { AreaChartWithDashedArea as DashedArea } from "compositions/chart/examples/area-chart-with-dashed-area"
export { AreaChartWithDots as Dots } from "compositions/chart/examples/area-chart-with-dots"
export { AreaChartWithGradient as Gradient } from "compositions/chart/examples/area-chart-with-gradient"
export { AreaChartWithConnectNulls as ConnectNulls } from "compositions/chart/examples/area-chart-with-nulls"
export { AreaChartWithPointLabel as PointLabel } from "compositions/chart/examples/area-chart-with-point-label"
export { AreaChartWithReferenceArea as ReferenceArea } from "compositions/chart/examples/area-chart-with-reference-area"
export { AreaChartWithReferenceLines as ReferenceLines } from "compositions/chart/examples/area-chart-with-reference-lines"
export { AreaChartWithTypes as Types } from "compositions/chart/examples/area-chart-with-types"
