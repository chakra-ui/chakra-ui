"use client"

import { TreeView, createTreeCollection } from "@chakra-ui/react"
import { LuChevronRight, LuExternalLink, LuFile } from "react-icons/lu"

export const TreeViewWithLinks = () => {
  return (
    <TreeView.Root collection={collection} maxW="2xs">
      <TreeView.Tree>
        <TreeView.Node
          render={({ node, nodeState }) =>
            nodeState.isBranch ? (
              <TreeView.BranchControl>
                <TreeView.BranchText>{node.name}</TreeView.BranchText>
                <TreeView.BranchIndicator>
                  <LuChevronRight />
                </TreeView.BranchIndicator>
              </TreeView.BranchControl>
            ) : (
              <TreeView.Item asChild>
                <a href={node.href}>
                  <LuFile />
                  <TreeView.ItemText>{node.name}</TreeView.ItemText>
                  {node.href?.startsWith("http") && (
                    <LuExternalLink size={12} />
                  )}
                </a>
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
  href?: string
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
        id: "docs",
        name: "Documentation",
        children: [
          {
            id: "docs/getting-started",
            name: "Getting Started",
            href: "/docs/getting-started",
          },
          {
            id: "docs/installation",
            name: "Installation",
            href: "/docs/installation",
          },
          {
            id: "docs/components",
            name: "Components",
            children: [
              {
                id: "docs/components/accordion",
                name: "Accordion",
                href: "/docs/components/accordion",
              },
              {
                id: "docs/components/dialog",
                name: "Dialog",
                href: "/docs/components/dialog",
              },
              {
                id: "docs/components/menu",
                name: "Menu",
                href: "/docs/components/menu",
              },
            ],
          },
        ],
      },
      {
        id: "examples",
        name: "Examples",
        children: [
          {
            id: "examples/react",
            name: "React Examples",
            href: "/examples/react",
          },
          { id: "examples/vue", name: "Vue Examples", href: "/examples/vue" },
          {
            id: "examples/solid",
            name: "Solid Examples",
            href: "/examples/solid",
          },
        ],
      },
      {
        id: "external",
        name: "External Links",
        children: [
          {
            id: "external/github",
            name: "GitHub Repository",
            href: "https://github.com/chakra-ui/zag",
          },
          {
            id: "external/npm",
            name: "NPM Package",
            href: "https://www.npmjs.com/package/@zag-js/core",
          },
          {
            id: "external/docs",
            name: "Official Docs",
            href: "https://zagjs.com",
          },
        ],
      },
      { id: "readme.md", name: "README.md", href: "/readme" },
      { id: "license", name: "LICENSE", href: "/license" },
    ],
  },
})
