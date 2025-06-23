"use client"

import {
  TreeView as ArkTreeView,
  type Assign,
  type TreeNode,
  useTreeViewContext,
} from "@ark-ui/react"
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

export type TreeViewRootProviderBaseProps = Assign<
  ArkTreeView.RootProviderBaseProps<TreeNode>,
  SlotRecipeProps<"treeView">
> &
  UnstyledProp

export type TreeViewRootProviderProps = HTMLChakraProps<
  "div",
  TreeViewRootProviderBaseProps
>

export const TreeViewRootProvider = withProvider<
  HTMLDivElement,
  TreeViewRootProviderProps
>(ArkTreeView.RootProvider, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export type TreeViewRootBaseProps = Assign<
  ArkTreeView.RootBaseProps<TreeNode>,
  SlotRecipeProps<"treeView">
> &
  UnstyledProp

export type TreeViewRootProps = HTMLChakraProps<"div", TreeViewRootBaseProps>

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

export type TreeViewBranchProps = HTMLChakraProps<
  "div",
  ArkTreeView.BranchBaseProps
>

export const TreeViewBranch = withContext<HTMLDivElement, TreeViewBranchProps>(
  ArkTreeView.Branch,
  "branch",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export type TreeViewBranchContentProps = HTMLChakraProps<
  "div",
  ArkTreeView.BranchContentBaseProps
>

export const TreeViewBranchContent = withContext<
  HTMLDivElement,
  TreeViewBranchContentProps
>(ArkTreeView.BranchContent, "branchContent", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export type TreeViewBranchControlProps = HTMLChakraProps<
  "div",
  ArkTreeView.BranchControlBaseProps
>

export const TreeViewBranchControl = withContext<
  HTMLDivElement,
  TreeViewBranchControlProps
>(ArkTreeView.BranchControl, "branchControl", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export type TreeViewBranchIndicatorProps = HTMLChakraProps<
  "div",
  ArkTreeView.BranchIndicatorBaseProps
>

export const TreeViewBranchIndicator = withContext<
  HTMLDivElement,
  TreeViewBranchIndicatorProps
>(ArkTreeView.BranchIndicator, "branchIndicator", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export type TreeViewBranchTextProps = HTMLChakraProps<
  "span",
  ArkTreeView.BranchTextBaseProps
>

export const TreeViewBranchText = withContext<
  HTMLSpanElement,
  TreeViewBranchTextProps
>(ArkTreeView.BranchText, "branchText", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export type TreeViewBranchIndentGuideProps = HTMLChakraProps<
  "div",
  ArkTreeView.BranchIndentGuideBaseProps
>

export const TreeViewBranchIndentGuide = withContext<
  HTMLDivElement,
  TreeViewBranchIndentGuideProps
>(ArkTreeView.BranchIndentGuide, "branchIndentGuide", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export type TreeViewItemProps = HTMLChakraProps<
  "div",
  ArkTreeView.ItemBaseProps
>

export const TreeViewItem = withContext<HTMLDivElement, TreeViewItemProps>(
  ArkTreeView.Item,
  "item",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export type TreeViewItemIndicatorProps = HTMLChakraProps<
  "div",
  ArkTreeView.ItemIndicatorBaseProps
>

export const TreeViewItemIndicator = withContext<
  HTMLDivElement,
  TreeViewItemIndicatorProps
>(ArkTreeView.ItemIndicator, "itemIndicator", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export type TreeViewItemTextProps = HTMLChakraProps<
  "span",
  ArkTreeView.ItemTextBaseProps
>

export const TreeViewItemText = withContext<
  HTMLSpanElement,
  TreeViewItemTextProps
>(ArkTreeView.ItemText, "itemText", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export type TreeViewLabelProps = HTMLChakraProps<
  "label",
  ArkTreeView.LabelBaseProps
>

export const TreeViewLabel = withContext<HTMLLabelElement, TreeViewLabelProps>(
  ArkTreeView.Label,
  "label",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export type TreeViewTreeProps = HTMLChakraProps<
  "div",
  ArkTreeView.TreeBaseProps
>

export const TreeViewTree = withContext<HTMLDivElement, TreeViewTreeProps>(
  ArkTreeView.Tree,
  "tree",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface TreeViewNodeState {
  value: string
  indexPath: number[]
  valuePath: string[]
  disabled: boolean
  selected: boolean
  focused: boolean
  depth: number
  expanded: boolean
  isBranch: boolean
  loading: boolean
}

export interface TreeViewNodeRenderProps<T = TreeNode> {
  node: T
  indexPath: number[]
  nodeState: TreeViewNodeState
}

export interface TreeViewNodeProps<T = TreeNode> {
  showIndentGuide?: boolean
  render: (props: TreeViewNodeRenderProps<T>) => React.ReactNode
}

export function TreeViewNode<T extends TreeNode = TreeNode>(
  props: TreeViewNodeProps<T>,
): React.ReactNode {
  const { render, showIndentGuide } = props
  const { collection } = useTreeViewContext()

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
              <TreeViewBranch>
                {render({ node, indexPath, nodeState })}
                <TreeViewBranchContent>
                  {showIndentGuide && <TreeViewBranchIndentGuide />}
                  {collection
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
      {collection
        .getNodeChildren(collection.rootNode)
        .map((node, index) => renderNode(node as T, [index]))}
    </>
  )
}
