import { visit } from "unist-util-visit"

export function remarkCodeTitle() {
  return (tree: any, file: any) => {
    visit(tree, "code", (node, index, parent) => {
      const metaString = `${node.lang ?? ""} ${node.meta ?? ""}`.trim()

      if (!metaString) return
      const [title] = metaString.match(/(?<=title=("|'))(.*?)(?=("|'))/) ?? [""]

      if (!title && metaString.includes("title=")) {
        file.message("Invalid title", node, "remark-code-title")
        return
      }

      if (!title) return

      parent.children.splice(index, 1, {
        type: "paragraph",
        children: [node],
        data: {
          hName: "code-block",
          hProperties: {
            title,
            lang: node.lang,
          },
        },
      })
    })
  }
}
