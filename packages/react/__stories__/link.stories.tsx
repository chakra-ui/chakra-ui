import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Typography / Link",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { LinkBasic as Basic } from "compositions/examples/link-basic"
export { LinkVariantTable as Variants } from "compositions/examples/link-variant-table"
export { LinkWithinText as WithinText } from "compositions/examples/link-within-text"
