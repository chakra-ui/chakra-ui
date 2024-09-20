import type { Meta } from "@storybook/react"
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
