import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Badge",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { BadgeBasic as Basic } from "compositions/examples/badge-basic"
export { BadgeSizeTable as Sizes } from "compositions/examples/badge-size-table"
export { BadgeVariantTable as Variants } from "compositions/examples/badge-variant-table"
export { BadgeWithContext as Context } from "compositions/examples/badge-with-context"
export { BadgeWithGroup as Group } from "compositions/examples/badge-with-group"
export { BadgeWithIcon as Icon } from "compositions/examples/badge-with-icon"
