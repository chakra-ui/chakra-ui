import { h } from "hastscript"
import type { Heading } from "mdast"
import { visit } from "unist-util-visit"

export function remarkSteps() {
  return (tree: any) => {
    visit(tree, (node) => {
      if (node.type !== "containerDirective") return
      if (node.name !== "steps") return

      const data = node.data || (node.data = {})
      const tagName = "steps"

      data.hName = tagName
      data.hProperties = h(tagName, node.attributes || {}).properties

      const heading = node.children.find(
        (child: any) => child.type === "heading",
      ) as Heading

      const depth = heading?.depth ?? 2

      let currentChild: any
      const children: any[] = []

      node.children.forEach((child: any) => {
        if (child.type === "heading" && child.depth === depth) {
          if (currentChild && currentChild.children.length > 0) {
            children.push(currentChild)
          }

          currentChild = {
            type: "paragraph",
            children: [],
            data: {
              hName: "step",
              hProperties: {
                "data-index": children.length,
                "data-depth": depth,
              },
            },
          } as any
        }

        currentChild!.children.push(child)
      })

      children.push(currentChild)
      node.children = children
    })
  }
}
