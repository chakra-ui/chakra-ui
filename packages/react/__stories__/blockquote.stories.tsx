import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Blockquote",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { BlockquoteBasic as Basic } from "compositions/examples/blockquote-basic"
export { BlockquoteVariantTable as Variants } from "compositions/examples/blockquote-variant-table"
export { BlockquoteWithCite as WithCite } from "compositions/examples/blockquote-with-cite"
export { BlockquoteWithCustomIcon as WithCustomIcon } from "compositions/examples/blockquote-with-custom-icon"
export { BlockquoteWithIcon as WithIcon } from "compositions/examples/blockquote-with-icon"
