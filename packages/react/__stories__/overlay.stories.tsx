import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Hooks / createOverlay",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { OverlayBasic as Basic } from "compositions/examples/overlay-basic"
export { OverlayWithAlert as Alert } from "compositions/examples/overlay-with-alert"
export { OverlayWithReturnValue as ReturnValue } from "compositions/examples/overlay-with-return-value"
export { OverlayWithUpdate as Update } from "compositions/examples/overlay-with-update"
export { OverlayWithDrawer as Drawer } from "compositions/examples/overlay-with-drawer"
