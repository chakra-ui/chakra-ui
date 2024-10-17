import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Typography / Highlight",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { HighlightBasic as Basic } from "compositions/examples/highlight-basic"
export { HighlightMultiple as Multiple } from "compositions/examples/highlight-multiple"
export { HighlightSearchQuery as SearchQuery } from "compositions/examples/highlight-search-query"
export { HighlightWithCustomStyle as CustomStyle } from "compositions/examples/highlight-with-custom-style"
export { HighlightWithSquiggle as Squiggle } from "compositions/examples/highlight-with-squiggle"
