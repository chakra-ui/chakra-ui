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
export { BarSegmentWithReference as Reference } from "compositions/chart/examples/bar-segment-with-reference"
export { BarSegmentWithLegend as Legend } from "compositions/chart/examples/bar-segment-with-legend"
export { BarSegmentWithBarSize as BarSize } from "compositions/chart/examples/bar-segment-with-bar-size"
export { BarSegmentWithTooltip as Tooltip } from "compositions/chart/examples/bar-segment-with-tooltip"
