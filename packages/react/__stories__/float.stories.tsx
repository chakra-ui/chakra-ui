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
export { FloatWithOffsetX as OffsetX } from "compositions/examples/float-with-offset-x"
export { FloatWithOffsetY as OffsetY } from "compositions/examples/float-with-offset-y"
export { FloatWithOffset as Offset } from "compositions/examples/float-with-offset"
export { FloatWithPlacements as Placements } from "compositions/examples/float-with-placements"
export { FloatWithAvatar as Avatar } from "compositions/examples/float-with-avatar"
