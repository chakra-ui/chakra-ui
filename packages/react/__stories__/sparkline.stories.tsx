import { Box } from "../src"

export default {
  title: "Charts / Sparkline",
  decorators: [
    (Story: any) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
}

export { SparklineBarChart as BarChart } from "compositions/examples/charts/sparkline-bar-chart"
export { SparklineBasic as Basic } from "compositions/examples/charts/sparkline-basic"
export { SparklineCompositionStock as Stock } from "compositions/examples/charts/sparkline-composition-stock"
export { SparklineLineChart as LineChart } from "compositions/examples/charts/sparkline-line-chart"
export { SparklineWithGradient as Gradient } from "compositions/examples/charts/sparkline-with-gradient"
export { SparklineWithInteraction as Interaction } from "compositions/examples/charts/sparkline-with-interaction"
export { SparklineWithReference as Reference } from "compositions/examples/charts/sparkline-with-reference"
export { SparklineCompositionStat as Stat } from "compositions/examples/charts/sparkline-composition-stat"
