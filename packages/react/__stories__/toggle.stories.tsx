import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Toggle",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { ToggleBasic as Basic } from "compositions/examples/toggle-basic"
export { ToggleControlled as Controlled } from "compositions/examples/toggle-controlled"
export { ToggleWithIndicator as WithIndicator } from "compositions/examples/toggle-with-indicator"
