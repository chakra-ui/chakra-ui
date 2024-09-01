import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Typography / Code",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { CodeBasic as Basic } from "compositions/examples/code-basic"
export { CodeWithColors as Colors } from "compositions/examples/code-with-colors"
export { CodeSizeTable as Sizes } from "compositions/examples/code-size-table"
export { CodeVariantTable as Variants } from "compositions/examples/code-variant-table"
