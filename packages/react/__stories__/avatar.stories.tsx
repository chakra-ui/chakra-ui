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
export { AvatarPersona as Persona } from "compositions/examples/avatar-persona"
export { AvatarSizeTable as Sizes } from "compositions/examples/avatar-size-table"
export { AvatarVariantTable as Variants } from "compositions/examples/avatar-variant-table"
export { AvatarWithBadge as Badge } from "compositions/examples/avatar-with-badge"
export { AvatarWithColors as Colors } from "compositions/examples/avatar-with-colors"
export { AvatarWithFallback as Fallback } from "compositions/examples/avatar-with-fallback"
export { AvatarWithGroup as Group } from "compositions/examples/avatar-with-group"
export { AvatarWithOverflow as Overflow } from "compositions/examples/avatar-with-overflow"
export { AvatarWithRandomColor as RandomColor } from "compositions/examples/avatar-with-random-color"
export { AvatarWithShape as Shape } from "compositions/examples/avatar-with-shape"
export { AvatarWithStore as Store } from "compositions/examples/avatar-with-store"
export { AvatarWithoutSnippet as WithoutSnippet } from "compositions/examples/avatar-without-snippet"
