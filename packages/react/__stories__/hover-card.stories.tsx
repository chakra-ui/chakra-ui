import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / HoverCard",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { HoverCardBasic as Basic } from "compositions/examples/hover-card-basic"
export { HoverCardControlled as Controlled } from "compositions/examples/hover-card-controlled"
export { HoverCardInDialog as WithinDialog } from "compositions/examples/hover-card-in-dialog"
export { HoverCardWithDelay as Delay } from "compositions/examples/hover-card-with-delay"
export { HoverCardWithPlacement as Placement } from "compositions/examples/hover-card-with-placement"
