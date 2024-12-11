import { Box } from "../src"

export default {
  title: "WIP / Pie Chart",
  decorators: [
    (Story: any) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
}

export { PieChartBasic as Basic } from "compositions/chart/examples/pie-chart-basic"
export { PieChartWithLabelList as LabelList } from "compositions/chart/examples/pie-chart-with-label-list"
export { PieChartWithPointLabel as PointLabel } from "compositions/chart/examples/pie-chart-with-point-label"
export { PieChartWithLegend as Legend } from "compositions/chart/examples/pie-chart-with-legend"
export { PieChartWithStartAngle as StartAngle } from "compositions/chart/examples/pie-chart-with-start-angle"
export { PieChartWithLabelListOutside as LabelListOutside } from "compositions/chart/examples/pie-chart-with-label-list-outside"
