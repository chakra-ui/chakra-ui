import { visit } from "unist-util-visit"

export function remarkCodeTitle() {
  return (tree: any) => {
    visit(tree, (node, index, parent) => {
      if (node.type !== "code") return
      if (!node.lang) node.lang = "txt"
      if (parent?.type === "containerDirective" && parent.name !== "steps")
        return

      const [match, title] = node.meta?.match(/\[(.*)\]/) || []
      if (match) node.meta = node.meta?.replace(match, `title=\"${title}\"`)

      parent.children.splice(index, 1, {
        type: "paragraph",
        children: [node],
        data: {
          hName: "div",
          hProperties: title ? { "data-title": title } : undefined,
        },
      })
    })
  }
}
