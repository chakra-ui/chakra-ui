import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / TreeView",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { TreeViewAsync as Async } from "compositions/examples/tree-view-async"
export { TreeViewBasic as Basic } from "compositions/examples/tree-view-basic"
export { TreeViewControlled as Controlled } from "compositions/examples/tree-view-controlled"
export { TreeViewWithFilter as WithFilter } from "compositions/examples/tree-view-with-filter"
export { TreeViewWithStore as Store } from "compositions/examples/tree-view-with-store"
