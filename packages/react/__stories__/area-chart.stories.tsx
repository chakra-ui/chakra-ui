import { Box } from "../src"

export default {
  title: "Charts / Area Chart",
  decorators: [
    (Story: any) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
}

export { AreaChartBasic as Basic } from "compositions/examples/charts/area-chart-basic"
export { AreaChartFillWithValue as FillWithValue } from "compositions/examples/charts/area-chart-fill-with-value"
export { AreaChartPercent as Percent } from "compositions/examples/charts/area-chart-percent"
export { AreaChartWithAxes as Axes } from "compositions/examples/charts/area-chart-with-axes"
export { AreaChartWithAxisLabel as AxisLabel } from "compositions/examples/charts/area-chart-with-axis-label"
export { AreaChartWithDashedArea as DashedArea } from "compositions/examples/charts/area-chart-with-dashed-area"
export { AreaChartWithDots as Dots } from "compositions/examples/charts/area-chart-with-dots"
export { AreaChartWithGradient as Gradient } from "compositions/examples/charts/area-chart-with-gradient"
export { AreaChartWithConnectNulls as ConnectNulls } from "compositions/examples/charts/area-chart-with-nulls"
export { AreaChartWithPointLabel as PointLabel } from "compositions/examples/charts/area-chart-with-point-label"
export { AreaChartWithReferenceArea as ReferenceArea } from "compositions/examples/charts/area-chart-with-reference-area"
export { AreaChartWithReferenceLines as ReferenceLines } from "compositions/examples/charts/area-chart-with-reference-lines"
export { AreaChartWithTypes as Types } from "compositions/examples/charts/area-chart-with-types"
