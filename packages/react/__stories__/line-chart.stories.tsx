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

export { LineChartBasic as Basic } from "compositions/examples/charts/line-chart-basic"
export { LineChartBiaxial as Biaxial } from "compositions/examples/charts/line-chart-biaxial"
export { LineChartNoDots as NoDots } from "compositions/examples/charts/line-chart-no-dots"
export { LineChartWithGradient as Gradient } from "compositions/examples/charts/line-chart-with-gradient"
export { LineChartWithPointLabel as PointLabel } from "compositions/examples/charts/line-chart-with-point-label"
export { LineChartWithDashed as Dashed } from "compositions/examples/charts/line-chart-with-dashed"
