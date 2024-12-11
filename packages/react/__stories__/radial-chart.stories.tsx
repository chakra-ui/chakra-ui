import { Box } from "../src"

export default {
  title: "WIP / Radial Chart",
  decorators: [
    (Story: any) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
}

export { RadialChartBasic as Basic } from "compositions/chart/examples/radial-chart-basic"
export { RadialChartWithLegend as Legend } from "compositions/chart/examples/radial-chart-with-legend"
export { RadialChartWithLabel as Label } from "compositions/chart/examples/radial-chart-with-label"
