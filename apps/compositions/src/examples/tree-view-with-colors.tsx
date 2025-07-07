"use client"

import { For, TreeView, Wrap, createTreeCollection } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import { LuFile, LuFolder } from "react-icons/lu"

export const TreeViewWithColors = () => {
  return (
    <Wrap gap="8">
      <For each={colorPalettes}>
        {(colorPalette) => (
          <TreeView.Root
            key={colorPalette}
            collection={collection}
            maxW="xs"
            size="sm"
            colorPalette={colorPalette}
            defaultSelectedValue={["node_modules"]}
          >
            <TreeView.Label>Tree (colorPalette={colorPalette})</TreeView.Label>
            <TreeView.Tree>
              <TreeView.Node
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
        )}
      </For>
    </Wrap>
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
