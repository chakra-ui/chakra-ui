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

export { AreaChartBasic as Basic } from "compositions/chart/area-chart-basic"
export { AreaChartPercent as Percent } from "compositions/chart/area-chart-percent"
export { AreaChartFillWithValue as FillWithValue } from "compositions/chart/area-chart-fill-with-value"
export { AreaChartWithAxes as Axes } from "compositions/chart/area-chart-with-axes"
export { AreaChartWithAxisLabel as AxisLabel } from "compositions/chart/area-chart-with-axis-label"
export { AreaChartWithDashedArea as DashedArea } from "compositions/chart/area-chart-with-dashed-area"
export { AreaChartWithDots as Dots } from "compositions/chart/area-chart-with-dots"
export { AreaChartWithGradient as Gradient } from "compositions/chart/area-chart-with-gradient"
export { AreaChartWithConnectNulls as ConnectNulls } from "compositions/chart/area-chart-with-nulls"
export { AreaChartWithPointLabel as PointLabel } from "compositions/chart/area-chart-with-point-label"
export { AreaChartWithReferenceArea as ReferenceArea } from "compositions/chart/area-chart-with-reference-area"
export { AreaChartWithReferenceLines as ReferenceLines } from "compositions/chart/area-chart-with-reference-lines"
export { AreaChartWithTypes as Types } from "compositions/chart/area-chart-with-types"
