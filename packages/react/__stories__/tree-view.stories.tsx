import type { Meta } from "@storybook/react-vite"
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

export { TreeViewBasic as Basic } from "compositions/examples/tree-view-basic"
export { TreeViewAsync as LazyLoad } from "compositions/examples/tree-view-async"
export { TreeViewCheckbox as CheckboxTree } from "compositions/examples/tree-view-checkbox"
export { TreeViewCollapseAnimation as CollapseAnimation } from "compositions/examples/tree-view-collapse-animation"
export { TreeViewContextMenu as ContextMenu } from "compositions/examples/tree-view-context-menu"
export { TreeViewControlledExpansion as ControlledExpansion } from "compositions/examples/tree-view-controlled-expansion"
export { TreeViewCustomIcon as CustomIcon } from "compositions/examples/tree-view-custom-icon"
export { TreeViewDefaultExpanded as DefaultExpanded } from "compositions/examples/tree-view-default-expanded"
export { TreeViewDisabledNode as DisabledNode } from "compositions/examples/tree-view-disabled-node"
export { TreeViewExpandCollapseAll as ExpandCollapseAll } from "compositions/examples/tree-view-expand-collapse-all"
export { TreeViewExpandIcon as ExpandIcon } from "compositions/examples/tree-view-expand-icon"
export { TreeViewExpandedStyling as ExpandedStyling } from "compositions/examples/tree-view-expanded-styling"
export { TreeViewExplicitExpand as ExplicitExpand } from "compositions/examples/tree-view-explicit-expand"
export { TreeViewMultiSelect as MultiSelect } from "compositions/examples/tree-view-multi-select"
export { TreeViewMutation as Mutation } from "compositions/examples/tree-view-mutation"
export { TreeViewRemoveIndentation as RemoveIndentation } from "compositions/examples/tree-view-remove-indentation"
export { TreeViewWithColors as Colors } from "compositions/examples/tree-view-with-colors"
export { TreeViewWithFilter as Filter } from "compositions/examples/tree-view-with-filter"
export { TreeViewWithSizes as Sizes } from "compositions/examples/tree-view-with-sizes"
export { TreeViewWithStore as Store } from "compositions/examples/tree-view-with-store"
export { TreeViewWithVariants as Variants } from "compositions/examples/tree-view-with-variants"
export { TreeViewWithLinks as Links } from "compositions/examples/tree-view-with-links"
