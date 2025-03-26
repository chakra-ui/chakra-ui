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

export { SparklineBasic as Basic } from "compositions/examples/charts/sparkline-basic"
export { SparklineWithGradient as Gradient } from "compositions/examples/charts/sparkline-with-gradient"
export { SparklineWithLatestValue as LatestValue } from "compositions/examples/charts/sparkline-with-latest-value"
export { SparklineWithReference as Reference } from "compositions/examples/charts/sparkline-with-reference"
export { SparklineWithStat as Stat } from "compositions/examples/charts/sparkline-with-stat"
