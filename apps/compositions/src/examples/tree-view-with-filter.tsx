"use client"

import {
  Highlight,
  Input,
  Stack,
  TreeView,
  createTreeCollection,
  useFilter,
} from "@chakra-ui/react"
import { useState } from "react"
import { LuFile, LuFolder } from "react-icons/lu"

export const TreeViewWithFilter = () => {
  const [collection, setCollection] = useState(initialCollection)
  const [expanded, setExpanded] = useState<string[]>([])
  const [query, setQuery] = useState("")

  const { contains } = useFilter({ sensitivity: "base" })

  const search = (search: string) => {
    setQuery(search)
    const nextCollection = initialCollection.filter((node) =>
      contains(node.name, search),
    )

    // update collection
    setCollection(nextCollection)

    // expand all branches
    setExpanded(nextCollection.getBranchValues())
  }

  return (
    <Stack gap="3">
      <Input
        size="sm"
        placeholder="Search for files: 'react'"
        onChange={(e) => search(e.target.value)}
      />

      <TreeView.Root
        collection={collection}
        expandedValue={expanded}
        onExpandedChange={(details) => setExpanded(details.expandedValue)}
      >
        <TreeView.Label srOnly>Tree</TreeView.Label>
        <TreeView.Tree>
          <TreeView.Node
            indentGuide={<TreeView.BranchIndentGuide />}
            render={({ node, nodeState }) =>
              nodeState.isBranch ? (
                <TreeView.BranchControl>
                  <LuFolder />
                  <TreeView.BranchText>
                    <Highlight
                      query={[query]}
                      styles={{ bg: "gray.emphasized" }}
                    >
                      {node.name}
                    </Highlight>
                  </TreeView.BranchText>
                </TreeView.BranchControl>
              ) : (
                <TreeView.Item>
                  <LuFile />
                  <TreeView.ItemText>
                    <Highlight
                      query={[query]}
                      styles={{ bg: "gray.emphasized" }}
                    >
                      {node.name}
                    </Highlight>
                  </TreeView.ItemText>
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
