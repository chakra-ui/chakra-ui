import { Box } from "../src"

export default {
  title: "Layout / AbsoluteCenter",
  decorators: [
    (Story: any) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
}

export { AbsoluteCenterBasic as Basic } from "compositions/examples/absolute-center-basic"
export { AbsoluteCenterWithAxis as WithAxis } from "compositions/examples/absolute-center-with-axis"
export { AbsoluteCenterWithContent as WithContent } from "compositions/examples/absolute-center-with-content"
export { AbsoluteCenterWithOverlay as WithOverlay } from "compositions/examples/absolute-center-with-overlay"
export { AbsoluteCenterWithRtl as WithRtl } from "compositions/examples/absolute-center-with-rtl"
