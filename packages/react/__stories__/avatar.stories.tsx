import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Avatar",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { AvatarBasic as Basic } from "compositions/examples/avatar-basic"
export { AvatarGroupWithStacking as GroupStacking } from "compositions/examples/avatar-group-with-stacking"
export { AvatarSizeTable as Sizes } from "compositions/examples/avatar-size-table"
export { AvatarVariantTable as Variants } from "compositions/examples/avatar-variant-table"
export { AvatarWithBadge as Badge } from "compositions/examples/avatar-with-badge"
export { AvatarWithFallback as Fallback } from "compositions/examples/avatar-with-fallback"
export { AvatarWithGroup as Group } from "compositions/examples/avatar-with-group"
export { AvatarWithPopover as Popover } from "compositions/examples/avatar-with-popover"
