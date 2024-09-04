import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Typography / Prose",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { ProseBasic as Basic } from "compositions/examples/prose-basic"
export { ProseSink as Sink } from "compositions/examples/prose-sink"
export { ProseWithBlockquote as Blockquote } from "compositions/examples/prose-with-blockquote"
export { ProseWithList as List } from "compositions/examples/prose-with-list"
export { ProseWithReactMarkdown as ReactMarkdown } from "compositions/examples/prose-with-react-markdown"
export { ProseWithTable as Table } from "compositions/examples/prose-with-table"
