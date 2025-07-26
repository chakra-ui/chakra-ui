"use client"

import {
  TreeView as ArkTreeView,
  type Assign,
  type TreeNode,
  useTreeViewContext,
} from "@ark-ui/react"
import type React from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useTreeViewStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "treeView" })

export { useTreeViewStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface TreeViewRootProviderBaseProps
  extends Assign<
      ArkTreeView.RootProviderBaseProps<TreeNode>,
      SlotRecipeProps<"treeView">
    >,
    UnstyledProp {}

export interface TreeViewRootProviderProps
  extends HTMLChakraProps<"div", TreeViewRootProviderBaseProps> {}

export const TreeViewRootProvider = withProvider<
  HTMLDivElement,
  TreeViewRootProviderProps
>(ArkTreeView.RootProvider, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface TreeViewRootBaseProps
  extends Assign<
      ArkTreeView.RootBaseProps<TreeNode>,
      SlotRecipeProps<"treeView">
    >,
    UnstyledProp {}

export interface TreeViewRootProps
  extends HTMLChakraProps<"div", TreeViewRootBaseProps> {}

export const TreeViewRoot = withProvider<HTMLDivElement, TreeViewRootProps>(
  ArkTreeView.Root,
  "root",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export const TreeViewPropsProvider = PropsProvider as React.Provider<
  ArkTreeView.RootBaseProps<TreeNode>
>

////////////////////////////////////////////////////////////////////////////////////

export interface TreeViewBranchProps
  extends HTMLChakraProps<"div", ArkTreeView.BranchBaseProps>,
    UnstyledProp {}

export const TreeViewBranch = withContext<HTMLDivElement, TreeViewBranchProps>(
  ArkTreeView.Branch,
  "branch",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface TreeViewBranchContentProps
  extends HTMLChakraProps<"div", ArkTreeView.BranchContentBaseProps>,
    UnstyledProp {}

export const TreeViewBranchContent = withContext<
  HTMLDivElement,
  TreeViewBranchContentProps
>(ArkTreeView.BranchContent, "branchContent", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface TreeViewBranchControlProps
  extends HTMLChakraProps<"div", ArkTreeView.BranchControlBaseProps>,
    UnstyledProp {}

export const TreeViewBranchControl = withContext<
  HTMLDivElement,
  TreeViewBranchControlProps
>(ArkTreeView.BranchControl, "branchControl", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface TreeViewBranchTriggerProps
  extends HTMLChakraProps<"button", ArkTreeView.BranchTriggerBaseProps>,
    UnstyledProp {}

export const TreeViewBranchTrigger = withContext<
  HTMLDivElement,
  TreeViewBranchTriggerProps
>(ArkTreeView.BranchTrigger, "branchTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface TreeViewBranchIndicatorProps
  extends HTMLChakraProps<"div", ArkTreeView.BranchIndicatorBaseProps>,
    UnstyledProp {}

export const TreeViewBranchIndicator = withContext<
  HTMLDivElement,
  TreeViewBranchIndicatorProps
>(ArkTreeView.BranchIndicator, "branchIndicator", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface TreeViewBranchTextProps
  extends HTMLChakraProps<"span", ArkTreeView.BranchTextBaseProps>,
    UnstyledProp {}

export const TreeViewBranchText = withContext<
  HTMLSpanElement,
  TreeViewBranchTextProps
>(ArkTreeView.BranchText, "branchText", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface TreeViewBranchIndentGuideProps
  extends HTMLChakraProps<"div", ArkTreeView.BranchIndentGuideBaseProps>,
    UnstyledProp {}

export const TreeViewBranchIndentGuide = withContext<
  HTMLDivElement,
  TreeViewBranchIndentGuideProps
>(ArkTreeView.BranchIndentGuide, "branchIndentGuide", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface TreeViewItemProps
  extends HTMLChakraProps<"div", ArkTreeView.ItemBaseProps>,
    UnstyledProp {}

export const TreeViewItem = withContext<HTMLDivElement, TreeViewItemProps>(
  ArkTreeView.Item,
  "item",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface TreeViewItemIndicatorProps
  extends HTMLChakraProps<"div", ArkTreeView.ItemIndicatorBaseProps>,
    UnstyledProp {}

export const TreeViewItemIndicator = withContext<
  HTMLDivElement,
  TreeViewItemIndicatorProps
>(ArkTreeView.ItemIndicator, "itemIndicator", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface TreeViewItemTextProps
  extends HTMLChakraProps<"span", ArkTreeView.ItemTextBaseProps>,
    UnstyledProp {}

export const TreeViewItemText = withContext<
  HTMLSpanElement,
  TreeViewItemTextProps
>(ArkTreeView.ItemText, "itemText", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface TreeViewLabelProps
  extends HTMLChakraProps<"label", ArkTreeView.LabelBaseProps>,
    UnstyledProp {}

export const TreeViewLabel = withContext<HTMLLabelElement, TreeViewLabelProps>(
  ArkTreeView.Label,
  "label",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface TreeViewTreeProps
  extends HTMLChakraProps<"div", ArkTreeView.TreeBaseProps>,
    UnstyledProp {}

export const TreeViewTree = withContext<HTMLDivElement, TreeViewTreeProps>(
  ArkTreeView.Tree,
  "tree",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface TreeViewNodeCheckboxProps
  extends HTMLChakraProps<"div", ArkTreeView.NodeCheckboxBaseProps>,
    UnstyledProp {}

export const TreeViewNodeCheckbox = withContext<
  HTMLDivElement,
  TreeViewNodeCheckboxProps
>(ArkTreeView.NodeCheckbox, "nodeCheckbox", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface TreeViewNodeRenderProps<T = TreeNode> {
  node: T
  indexPath: number[]
  nodeState: ArkTreeView.NodeState
}

export interface TreeViewNodeProps<T = TreeNode> {
  indentGuide?: React.ReactElement
  render: (props: TreeViewNodeRenderProps<T>) => React.ReactNode
  renderBranch?: (props: TreeViewNodeRenderProps<T>) => React.ReactNode
  branchProps?: TreeViewBranchProps
  branchContentProps?: TreeViewBranchContentProps
}

export function TreeViewNode<T extends TreeNode = TreeNode>(
  props: TreeViewNodeProps<T>,
): React.ReactNode {
  const { render, indentGuide, branchProps, branchContentProps } = props
  const tree = useTreeViewContext()

  const renderNode = (node: T, indexPath: number[]) => (
    <ArkTreeView.NodeProvider
      key={indexPath.join(".")}
      node={node}
      indexPath={indexPath}
    >
      <ArkTreeView.NodeContext>
        {(nodeState) => {
          if (nodeState.isBranch) {
            return (
              <TreeViewBranch {...branchProps}>
                {render({ node, indexPath, nodeState })}
                <TreeViewBranchContent {...branchContentProps}>
                  {indentGuide}
                  {tree.collection
                    .getNodeChildren(node)
                    .map((child, index) =>
                      renderNode(child as T, [...indexPath, index]),
                    )}
                </TreeViewBranchContent>
              </TreeViewBranch>
            )
          } else {
            return render({ node, indexPath, nodeState })
          }
        }}
      </ArkTreeView.NodeContext>
    </ArkTreeView.NodeProvider>
  )

  return (
    <>
      {tree.collection
        .getNodeChildren(tree.collection.rootNode)
        .map((node, index) => renderNode(node as T, [index]))}
    </>
  )
}
