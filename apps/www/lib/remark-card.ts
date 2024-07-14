import { h } from "hastscript"
import { Heading } from "mdast"
import { visit } from "unist-util-visit"

export function remarkCard() {
  return (tree: any) => {
    visit(tree, (node) => {
      if (node.type !== "containerDirective") return
      if (node.name !== "card") return

      node.data ||= {}
      const data = node.data
      const tagName = "div"

      const heading = node.children.find(
        (child: any) => child.type === "heading",
      ) as Heading

      const depth = heading?.depth ?? 2
      node.attributes.depth = depth

      if (heading) {
        const [text] = heading.children
        if (text.type === "text") {
          node.attributes.title = text.value
        }
      }

      data.hName = "card"
      data.hProperties = h(tagName, node.attributes || {}).properties

      node.children = node.children.filter(
        (child: any) => child.type !== "heading",
      )
    })

    visit(tree, (node) => {
      if (node.type !== "containerDirective") return
      if (node.name !== "card-group") return

      node.data ||= {}
      const data = node.data
      const tagName = "div"

      data.hName = "card-group"
      data.hProperties = h(tagName, node.attributes || {}).properties
    })
  }
}
