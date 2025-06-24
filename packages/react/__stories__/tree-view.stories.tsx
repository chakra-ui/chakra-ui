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
export { TreeViewCheckbox as CheckboxTree } from "compositions/examples/tree-view-checkbox"
export { TreeViewControlledExpansion as ControlledExpansion } from "compositions/examples/tree-view-controlled-expansion"
export { TreeViewDisabledNode as DisabledNode } from "compositions/examples/tree-view-disabled-node"
export { TreeViewExpandCollapseAll as ExpandCollapseAll } from "compositions/examples/tree-view-expand-collapse-all"
export { TreeViewExplicitExpand as ExplicitExpand } from "compositions/examples/tree-view-explicit-expand"
export { TreeViewWithFilter as Filter } from "compositions/examples/tree-view-with-filter"
export { TreeViewWithSizes as Sizes } from "compositions/examples/tree-view-with-sizes"
export { TreeViewWithStore as Store } from "compositions/examples/tree-view-with-store"
