import { Box } from "../src"

export default {
  title: "WIP / Sparkline",
  decorators: [
    (Story: any) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
}

export { SparklineBasic as Basic } from "compositions/chart/examples/sparkline-basic"
export { SparklineWithGradient as Gradient } from "compositions/chart/examples/sparkline-with-gradient"
export { SparklineWithStat as Stat } from "compositions/chart/examples/sparkline-with-stat"
export { SparklineWithLatestValue as LatestValue } from "compositions/chart/examples/sparkline-with-latest-value"
