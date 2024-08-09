import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Float",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { FloatBasic as Basic } from "compositions/examples/float-basic"
export { FloatWithOffsetX as WithOffsetX } from "compositions/examples/float-with-offset-x"
export { FloatWithOffsetY as WithOffsetY } from "compositions/examples/float-with-offset-y"
export { FloatWithOffset as WithOffset } from "compositions/examples/float-with-offset"
export { FloatWithPlacements as WithPlacements } from "compositions/examples/float-with-placements"
export { FloatWithAvatar as WithAvatar } from "compositions/examples/float-with-avatar"
