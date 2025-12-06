"use client"

import {
  Checkmark,
  TreeView,
  createTreeCollection,
  useTreeViewNodeContext,
} from "@chakra-ui/react"
import { LuFile, LuFolder, LuSquareMinus, LuSquarePlus } from "react-icons/lu"

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

const NodeCheckbox = (props: TreeView.NodeCheckboxProps) => {
  const nodeState = useTreeViewNodeContext()
  return (
    <TreeView.NodeCheckbox aria-label="check node" {...props}>
      <Checkmark
        size="sm"
        bg={{
          base: "bg",
          _checked: "colorPalette.solid",
          _indeterminate: "colorPalette.solid",
        }}
        checked={nodeState.checked === true}
        indeterminate={nodeState.checked === "indeterminate"}
      />
    </TreeView.NodeCheckbox>
  )
}

export const TreeViewExplorerDemo = () => {
  return (
    <TreeView.Root
      collection={collection}
      maxW="sm"
      defaultExpandedValue={["node_modules", "node_modules/@types", "src"]}
      defaultCheckedValue={[]}
    >
      <TreeView.Label mb="2" fontWeight="medium">
        Project Explorer
      </TreeView.Label>

      <TreeView.Tree>
        <TreeView.Node
          indentGuide={<TreeView.BranchIndentGuide />}
          render={({ node, nodeState }) =>
            nodeState.isBranch ? (
              <TreeView.BranchContent>
                <TreeView.BranchControl>
                  <TreeView.BranchTrigger>
                    {nodeState.expanded ? <LuSquareMinus /> : <LuSquarePlus />}
                  </TreeView.BranchTrigger>
                  <NodeCheckbox />
                  <LuFolder />
                  <TreeView.BranchText>{node.name}</TreeView.BranchText>
                  <TreeView.BranchIndicator />
                </TreeView.BranchControl>
              </TreeView.BranchContent>
            ) : (
              <TreeView.Item>
                <NodeCheckbox />
                <LuFile />
                <TreeView.ItemText>{node.name}</TreeView.ItemText>
                <TreeView.ItemIndicator />
              </TreeView.Item>
            )
          }
        />
      </TreeView.Tree>
    </TreeView.Root>
  )
}
