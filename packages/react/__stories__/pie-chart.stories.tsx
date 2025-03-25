import { Box } from "../src"

export default {
  title: "Charts / Pie Chart",
  decorators: [
    (Story: any) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
}

export { PieChartBasic as Basic } from "compositions/examples/charts/pie-chart-basic"
export { PieChartWithLabelList as LabelList } from "compositions/examples/charts/pie-chart-with-label-list"
export { PieChartWithPointLabel as PointLabel } from "compositions/examples/charts/pie-chart-with-point-label"
export { PieChartWithLegend as Legend } from "compositions/examples/charts/pie-chart-with-legend"
export { PieChartWithStartAngle as StartAngle } from "compositions/examples/charts/pie-chart-with-start-angle"
export { PieChartWithLabelListOutside as LabelListOutside } from "compositions/examples/charts/pie-chart-with-label-list-outside"
