import { Box } from "../src"

export default {
  title: "WIP / Line Chart",
  decorators: [
    (Story: any) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
}

export { LineChartBasic as Basic } from "compositions/chart/line-chart-basic"
export { LineChartBiaxial as Biaxial } from "compositions/chart/line-chart-biaxial"
export { LineChartNoDots as NoDots } from "compositions/chart/line-chart-no-dots"
export { LineChartWithGradient as Gradient } from "compositions/chart/line-chart-with-gradient"
export { LineChartWithPointLabel as PointLabel } from "compositions/chart/line-chart-with-point-label"
