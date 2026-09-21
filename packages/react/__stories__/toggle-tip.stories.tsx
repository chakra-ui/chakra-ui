import type { Meta } from "@storybook/react-vite"
import { Box } from "../src"

export default {
  title: "Components / Toggle Tip",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { ToggleTipBasic as Basic } from "compositions/examples/toggle-tip-basic"
export { ToggleTipInfoTip as InfoTip } from "compositions/examples/toggle-tip-info-tip"
export { ToggleTipSizes as Sizes } from "compositions/examples/toggle-tip-sizes"
export { ToggleTipArrow as Arrow } from "compositions/examples/toggle-tip-arrow"
export { ToggleTipCloseOnEscape as CloseOnEscape } from "compositions/examples/toggle-tip-close-on-escape"
export { ToggleTipCloseOnInteractOutside as CloseOnInteractOutside } from "compositions/examples/toggle-tip-close-on-interact-outside"
