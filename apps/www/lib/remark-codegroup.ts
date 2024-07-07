import { h } from "hastscript"
import type { BlockContent, DefinitionContent } from "mdast"
import { visit } from "unist-util-visit"

export function remarkCodeGroup() {
  return (tree: any) => {
    visit(tree, (node) => {
      if (node.type !== "containerDirective") return
      if (node.name !== "code-group") return

      node.data ||= {}
      const data = node.data
      const tagName = "div"

      data.hName = "code-group"
      data.hProperties = h(tagName, node.attributes || {}).properties

      node.children = node.children
        .map((child: any) => {
          const match = "meta" in child && child?.meta?.match(/\[(.*)\]/)
          return {
            type: "paragraph",
            children: [child],
            data: {
              hName: "div",
              hProperties: match ? { "data-title": match[1] } : undefined,
            },
          }
        })
        .filter(Boolean) as (BlockContent | DefinitionContent)[]
    })
  }
}
