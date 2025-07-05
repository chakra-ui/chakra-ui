"use client"

import { TreeView, createTreeCollection } from "@chakra-ui/react"
import { RxFrame, RxImage, RxSquare, RxText } from "react-icons/rx"

export const TreeViewCustomIcon = () => {
  return (
    <TreeView.Root
      collection={collection}
      maxW="sm"
      size="sm"
      defaultExpandedValue={["ROOT"]}
    >
      <TreeView.Label srOnly>Tree</TreeView.Label>
      <TreeView.Tree>
        <TreeView.Node
          render={({ node, nodeState }) =>
            nodeState.isBranch ? (
              <TreeView.BranchControl>
                <TreeViewNodeIcon type={node.type} />
                <TreeView.BranchText fontWeight="medium">
                  {node.name}
                </TreeView.BranchText>
              </TreeView.BranchControl>
            ) : (
              <TreeView.Item>
                <TreeViewNodeIcon type={node.type} />
                <TreeView.ItemText>{node.name}</TreeView.ItemText>
              </TreeView.Item>
            )
          }
        />
      </TreeView.Tree>
    </TreeView.Root>
  )
}

const TreeViewNodeIcon = (props: { type: Node["type"] }) => {
  switch (props.type) {
    case "text":
      return <RxText />
    case "image":
      return <RxImage />
    case "frame":
      return <RxFrame />
    case "rectangle":
      return <RxSquare />
    default:
      return null
  }
}

interface Node {
  type: "text" | "image" | "frame" | "rectangle"
  id: string
  name: string
  children?: Node[]
}

const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    type: "frame",
    children: [
      {
        id: "page",
        name: "Page",
        type: "frame",
        children: [
          {
            id: "header",
            name: "Header",
            type: "frame",
            children: [
              { id: "logo", name: "Logo", type: "image" },
              { id: "nav", name: "Navigation", type: "text" },
            ],
          },
        ],
      },
      { id: "footer", name: "Footer", type: "text" },
      {
        id: "main",
        name: "Main",
        type: "frame",
        children: [
          { id: "hero", name: "Hero Section", type: "text" },
          { id: "features", name: "Features", type: "text" },
        ],
      },
    ],
  },
})
