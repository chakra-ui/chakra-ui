import { h } from "hastscript"
import { visit } from "unist-util-visit"

export function remarkCallout() {
  return (tree: any) => {
    visit(tree, (node) => {
      if (node.type !== "containerDirective") return
      if (
        node.name !== "callout" &&
        node.name !== "info" &&
        node.name !== "warning" &&
        node.name !== "danger" &&
        node.name !== "tip" &&
        node.name !== "success" &&
        node.name !== "note"
      )
        return

      // @ts-expect-error
      const label = node.children.find((child) => child.data?.directiveLabel)
        ?.children[0].value

      const data = node.data || (node.data = {})
      const tagName = "callout"

      if (label) {
        node.children = node.children.filter(
          (child: any) => !child.data?.directiveLabel,
        )
        node.children.unshift({
          type: "paragraph",
          data: { hProperties: { "data-callout-title": true } },
          children: [
            {
              type: "strong",
              children: [{ type: "text", value: label }],
            },
          ],
        })
      }

      data.hName = tagName
      data.hProperties = {
        ...h(tagName, node.attributes || {}).properties,
        "data-type": node.name !== "callout" ? node.name : true,
      }
    })
  }
}
