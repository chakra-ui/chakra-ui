import { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

export const rehypeMdxCodeMeta: Plugin = () => {
  return (tree) => {
    visit(tree, 'element', (node: any) => {
      if (node.tagName !== 'code' || !node.data) return
      node.properties = node.properties || {}
      node.data.meta.split(' ').forEach((t) => {
        const [key, value] = t.split('=')
        node.properties[key] = value
      })
    })
  }
}
