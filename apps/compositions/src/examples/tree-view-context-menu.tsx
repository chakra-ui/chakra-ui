"use client"

import { Menu, Portal, TreeView, createTreeCollection } from "@chakra-ui/react"
import { useId } from "react"
import { LuFile, LuFolder } from "react-icons/lu"

interface NodeContextMenuProps extends Menu.RootProps {
  triggerId: string
  children: React.ReactNode
}

const NodeContextMenu = (props: NodeContextMenuProps) => {
  const { children, triggerId, ...rest } = props
  return (
    <Menu.Root {...rest} ids={{ contextTrigger: triggerId }}>
      <Menu.ContextTrigger asChild>
        <span style={{ display: "contents" }}>{children}</span>
      </Menu.ContextTrigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="rename">Rename</Menu.Item>
            <Menu.Item value="delete">Delete</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

const getNodeId = (uid: string, node: string) => `${uid}/${node}`

export const TreeViewContextMenu = () => {
  const uid = useId()
  return (
    <TreeView.Root
      collection={collection}
      maxW="sm"
      ids={{ node: (value) => getNodeId(uid, value) }}
    >
      <TreeView.Label>Tree</TreeView.Label>
      <TreeView.Tree>
        <TreeView.Node
          showIndentGuide
          render={({ node, nodeState }) =>
            nodeState.isBranch ? (
              <TreeView.BranchControl>
                <NodeContextMenu triggerId={getNodeId(uid, node)}>
                  <LuFolder />
                  <TreeView.BranchText>{node.name}</TreeView.BranchText>
                </NodeContextMenu>
              </TreeView.BranchControl>
            ) : (
              <TreeView.Item>
                <NodeContextMenu triggerId={getNodeId(uid, node)}>
                  <LuFile />
                  <TreeView.ItemText>{node.name}</TreeView.ItemText>
                </NodeContextMenu>
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
