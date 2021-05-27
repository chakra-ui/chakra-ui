import { sortNodes, isElement, getNextIndex, getPrevIndex } from "./utils"

export type DescendantOptions<T = {}> = T & {
  /**
   * If `true`, the item will be registered in all nodes map
   * but omitted from enabled nodes map
   */
  disabled?: boolean
  /**
   * The id of the item
   */
  id?: string
}

export type Descendant<T, K> = DescendantOptions<K> & {
  /**
   * DOM element of the item
   */
  node: T
  /**
   * index of item in all nodes map and enabled nodes map
   */
  index: number
}

/**
 * @internal
 *
 * Class to manage descendants and their relative indices in the DOM.
 * It uses `node.compareDocumentPosition(...)` under the hood
 */
export class DescendantsManager<
  T extends HTMLElement,
  K extends Record<string, any> = {}
> {
  private descendants = new Map<T, Descendant<T, K>>()

  register = (nodeOrOptions: T | null | DescendantOptions<K>) => {
    if (nodeOrOptions == null) return

    if (isElement(nodeOrOptions)) {
      return this.registerNode(nodeOrOptions)
    }

    return (node: T | null) => {
      this.registerNode(node, nodeOrOptions)
    }
  }

  unregister = (node: T) => {
    this.descendants.delete(node)
    const sorted = sortNodes(Array.from(this.descendants.keys()))
    this.assignIndex(sorted)
  }

  destroy = () => {
    this.descendants.clear()
  }

  private assignIndex = (descendants: Node[]) => {
    this.descendants.forEach((descendant) => {
      const index = descendants.indexOf(descendant.node)
      descendant.index = index
      descendant.node.dataset.index = descendant.index.toString()
    })
  }

  count = () => this.descendants.size

  enabledCount = () => this.enabledValues().length

  values = () => {
    const values = Array.from(this.descendants.values())
    return values.sort((a, b) => a.index - b.index)
  }

  enabledValues = () => {
    return this.values().filter((descendant) => !descendant.disabled)
  }

  item = (index: number) => {
    if (this.count() === 0) return undefined
    return this.values()[index]
  }

  enabledItem = (index: number) => {
    if (this.enabledCount() === 0) return undefined
    return this.enabledValues()[index]
  }

  first = () => this.item(0)

  firstEnabled = () => this.enabledItem(0)

  last = () => this.item(this.descendants.size - 1)

  lastEnabled = () => {
    const lastIndex = this.enabledValues().length - 1
    return this.enabledItem(lastIndex)
  }

  indexOf = (node: T | null) => {
    if (!node) return -1
    return this.descendants.get(node)?.index ?? -1
  }

  enabledIndexOf = (node: T | null) => {
    if (node == null) return -1
    return this.enabledValues().findIndex((i) => i.node.isSameNode(node))
  }

  next = (index: number, loop = true) => {
    const next = getNextIndex(index, this.count(), loop)
    return this.item(next)
  }

  nextEnabled = (index: number, loop = true) => {
    const item = this.item(index)
    if (!item) return
    const enabledIndex = this.enabledIndexOf(item.node)
    const nextEnabledIndex = getNextIndex(
      enabledIndex,
      this.enabledCount(),
      loop,
    )
    return this.enabledItem(nextEnabledIndex)
  }

  prev = (index: number, loop = true) => {
    const prev = getPrevIndex(index, this.count() - 1, loop)
    return this.item(prev)
  }

  prevEnabled = (index: number, loop = true) => {
    const item = this.item(index)
    if (!item) return
    const enabledIndex = this.enabledIndexOf(item.node)
    const prevEnabledIndex = getPrevIndex(
      enabledIndex,
      this.enabledCount() - 1,
      loop,
    )
    return this.enabledItem(prevEnabledIndex)
  }

  private registerNode = (node: T | null, options?: DescendantOptions<K>) => {
    if (!node || this.descendants.has(node)) return

    const keys = Array.from(this.descendants.keys()).concat(node)
    const sorted = sortNodes(keys)

    if (options?.disabled) {
      options.disabled = !!options.disabled
    }

    const descendant = { node, index: -1, ...options }

    this.descendants.set(node, descendant as Descendant<T, K>)

    this.assignIndex(sorted)
  }
}
