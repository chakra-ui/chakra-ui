import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Layout / AspectRatio",
  decorators: [
    (Story) => (
      <Box p="4">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { AspectRatioResponsive as WithResponsive } from "compositions/examples/aspect-ratio-responsive"
export { AspectRatioWithImage as WithImage } from "compositions/examples/aspect-ratio-with-image"
export { AspectRatioWithMap as WithMap } from "compositions/examples/aspect-ratio-with-map"
export { AspectRatioWithVideo as WithVideo } from "compositions/examples/aspect-ratio-with-video"
