import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Spinner",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { SpinnerBasic as Basic } from "compositions/examples/spinner-basic"
export { SpinnerCustomColor as CustomColor } from "compositions/examples/spinner-custom-color"
export { SpinnerSizeTable as Sizes } from "compositions/examples/spinner-size-table"
export { SpinnerWithCustomSpeed as CustomSpeed } from "compositions/examples/spinner-with-custom-speed"
export { SpinnerWithCustomThickness as CustomThickness } from "compositions/examples/spinner-with-custom-thickness"
export { SpinnerWithTrackColor as TrackColor } from "compositions/examples/spinner-with-track-color"
export { SpinnerWithLabel as Label } from "compositions/examples/spinner-with-label"
export { SpinnerWithOverlay as Overlay } from "compositions/examples/spinner-with-overlay"
