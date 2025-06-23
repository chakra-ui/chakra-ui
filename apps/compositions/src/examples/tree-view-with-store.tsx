"use client"

import { TreeView, createTreeCollection, useTreeView } from "@chakra-ui/react"
import { LuFile, LuFolder, LuSquareCheck } from "react-icons/lu"

export const TreeViewWithStore = () => {
  const store = useTreeView({
    collection,
    defaultExpandedValue: [],
  })

  return (
    <TreeView.RootProvider value={store}>
      <TreeView.Label>Tree</TreeView.Label>
      <pre>{JSON.stringify(store.expandedValue)}</pre>
      <TreeView.Tree>
        <TreeView.Node<Node>
          showIndentGuide
          render={({ node }) =>
            node.children ? (
              <TreeView.BranchControl>
                <TreeView.BranchText>
                  <LuFolder /> {node.name}
                </TreeView.BranchText>
              </TreeView.BranchControl>
            ) : (
              <TreeView.Item>
                <TreeView.ItemIndicator>
                  <LuSquareCheck />
                </TreeView.ItemIndicator>
                <TreeView.ItemText>
                  <LuFile /> {node.name}
                </TreeView.ItemText>
              </TreeView.Item>
            )
          }
        />
      </TreeView.Tree>
    </TreeView.RootProvider>
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
