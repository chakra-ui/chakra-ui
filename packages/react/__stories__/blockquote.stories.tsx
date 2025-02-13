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
export { BlockquoteWithAvatar as Avatar } from "compositions/examples/blockquote-with-avatar"
export { BlockquoteWithCite as Cite } from "compositions/examples/blockquote-with-cite"
export { BlockquoteWithCustomIcon as CustomIcon } from "compositions/examples/blockquote-with-custom-icon"
export { BlockquoteWithIcon as Icon } from "compositions/examples/blockquote-with-icon"
export { BlockquoteWithJustify as Justify } from "compositions/examples/blockquote-with-justify"
