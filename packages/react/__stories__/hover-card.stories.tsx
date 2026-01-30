import type { Meta } from "@storybook/react-vite"
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
export { HoverCardOpenFromDialog as OpenFromDialog } from "compositions/examples/hover-card-open-from-dialog"
export { HoverCardWithDelay as Delay } from "compositions/examples/hover-card-with-delay"
export { HoverCardWithPlacement as Placement } from "compositions/examples/hover-card-with-placement"
export { HoverCardRTL as RTL } from "compositions/examples/hover-card-rtl"
