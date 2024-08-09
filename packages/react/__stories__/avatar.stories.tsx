import { Box } from "../src"

export default {
  title: "Components / Avatar",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export { AvatarBasic as Basic } from "compositions/examples/avatar-basic"
export { AvatarWithFallback as Fallback } from "compositions/examples/avatar-with-fallback"
export { AvatarWithBadge as WithBadge } from "compositions/examples/avatar-with-badge"
export { AvatarVariantTable as Variants } from "compositions/examples/avatar-variant-table"
export { AvatarSizeTable as Sizes } from "compositions/examples/avatar-size-table"
export { AvatarWithGroup as Grouped } from "compositions/examples/avatar-with-group"
