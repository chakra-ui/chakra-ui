"use client"

import {
  Button,
  ButtonGroup,
  HStack,
  TreeView,
  createTreeCollection,
  useTreeViewContext,
} from "@chakra-ui/react"
import { isEqual } from "es-toolkit"
import { useMemo } from "react"
import { LuFile, LuFolder } from "react-icons/lu"

const ExpandCollapseAll = () => {
  const tree = useTreeViewContext()
  const isAllExpanded = useMemo(
    () => isEqual(tree.expandedValue, tree.collection.getBranchValues()),
    [tree.expandedValue, tree.collection],
  )
  return (
    <ButtonGroup size="2xs" variant="outline">
      <Button
        aria-label="Expand all"
        onClick={() => tree.expand()}
        hidden={isAllExpanded}
      >
        Expand all
      </Button>
      <Button
        aria-label="Collapse all"
        onClick={() => tree.collapse()}
        hidden={!isAllExpanded}
      >
        Collapse all
      </Button>
    </ButtonGroup>
  )
}

export const TreeViewExpandCollapseAll = () => {
  return (
    <TreeView.Root collection={collection} maxW="sm">
      <HStack justify="space-between">
        <TreeView.Label>Tree</TreeView.Label>
        <ExpandCollapseAll />
      </HStack>
      <TreeView.Tree>
        <TreeView.Node
          indentGuide={<TreeView.BranchIndentGuide />}
          render={({ node, nodeState }) =>
            nodeState.isBranch ? (
              <TreeView.BranchControl>
                <LuFolder />
                <TreeView.BranchText>{node.name}</TreeView.BranchText>
              </TreeView.BranchControl>
            ) : (
              <TreeView.Item>
                <LuFile />
                <TreeView.ItemText>{node.name}</TreeView.ItemText>
              </TreeView.Item>
            )
          }
        />
      </TreeView.Tree>
    </TreeView.Root>
  )
}

interface Node {
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
    children: [
      {
        id: "node_modules",
        name: "node_modules",
        children: [
          { id: "node_modules/zag-js", name: "zag-js" },
          { id: "node_modules/pandacss", name: "panda" },
          {
            id: "node_modules/@types",
            name: "@types",
            children: [
              { id: "node_modules/@types/react", name: "react" },
              { id: "node_modules/@types/react-dom", name: "react-dom" },
            ],
          },
        ],
      },
      {
        id: "src",
        name: "src",
        children: [
          { id: "src/app.tsx", name: "app.tsx" },
          { id: "src/index.ts", name: "index.ts" },
        ],
      },
      { id: "panda.config", name: "panda.config.ts" },
      { id: "package.json", name: "package.json" },
      { id: "renovate.json", name: "renovate.json" },
      { id: "readme.md", name: "README.md" },
    ],
  },
})
