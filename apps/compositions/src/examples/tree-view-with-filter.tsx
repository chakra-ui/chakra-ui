"use client"

import {
  Input,
  Stack,
  TreeView,
  createTreeCollection,
  useFilter,
} from "@chakra-ui/react"
import { useState } from "react"
import { LuFile, LuFolder, LuSquareCheck } from "react-icons/lu"

export const TreeViewWithFilter = () => {
  const [collection, setCollection] = useState(initialCollection)

  const { contains } = useFilter({ sensitivity: "base" })

  const search = (search: string) => {
    setCollection(
      initialCollection.filter((node) => contains(node.name, search)),
    )
  }

  return (
    <Stack gap="3">
      <Input
        size="sm"
        placeholder="Filter tree..."
        onChange={(e) => search(e.target.value)}
      />

      <TreeView.Root collection={collection}>
        <TreeView.Label srOnly>Tree</TreeView.Label>
        <TreeView.Tree>
          <TreeView.Node
            showIndentGuide
            render={({ node, nodeState }) =>
              nodeState.isBranch ? (
                <TreeView.BranchControl>
                  <LuFolder />
                  <TreeView.BranchText>{node.name}</TreeView.BranchText>
                </TreeView.BranchControl>
              ) : (
                <TreeView.Item>
                  <TreeView.ItemIndicator>
                    <LuSquareCheck />
                  </TreeView.ItemIndicator>
                  <LuFile />
                  <TreeView.ItemText>{node.name}</TreeView.ItemText>
                </TreeView.Item>
              )
            }
          />
        </TreeView.Tree>
      </TreeView.Root>
    </Stack>
  )
}

interface Node {
  id: string
  name: string
  children?: Node[]
}

const initialCollection = createTreeCollection<Node>({
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
