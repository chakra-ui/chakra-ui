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

export { AspectRatioResponsive as Responsive } from "compositions/examples/aspect-ratio-responsive"
export { AspectRatioWithImage as Image } from "compositions/examples/aspect-ratio-with-image"
export { AspectRatioWithMap as Map } from "compositions/examples/aspect-ratio-with-map"
export { AspectRatioWithVideo as Video } from "compositions/examples/aspect-ratio-with-video"
