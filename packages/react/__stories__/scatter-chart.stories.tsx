import { Box } from "../src"

export default {
  title: "Charts / Scatter Chart",
  decorators: [
    (Story: any) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
}

export { ScatterChartBasic as Basic } from "compositions/examples/charts/scatter-chart-basic"
export { ScatterChartLegend as Legend } from "compositions/examples/charts/scatter-chart-legend"
export { ScatterChartWithLine as WithLine } from "compositions/examples/charts/scatter-chart-with-line"
export { ScatterChartMultiple as Multiple } from "compositions/examples/charts/scatter-chart-multiple"
