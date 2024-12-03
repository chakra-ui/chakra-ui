import { Box } from "../src"

export default {
  title: "WIP / Bar Segment",
  decorators: [
    (Story: any) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
}

export { BarSegmentBasic as Basic } from "compositions/chart/examples/bar-segment-basic"
export { BarSegmentWithReference as WithReference } from "compositions/chart/examples/bar-segment-with-reference"
