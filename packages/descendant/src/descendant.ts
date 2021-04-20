import sortNodes from "./sort-nodes"

const isElement = (el: any): el is HTMLElement =>
  typeof el == "object" && "nodeType" in el && el.nodeType === Node.ELEMENT_NODE

export interface DescendantOptions {
  disabled?: boolean
  id?: string
}

export interface Descendant<T> extends DescendantOptions {
  node: T
  index: number
}

function nextIndex(current: number, max: number, loop: boolean) {
  let next = current + 1
  if (loop && next >= max) next = 0
  return next
}

function prevIndex(current: number, max: number, loop: boolean) {
  let next = current - 1
  if (loop && next < 0) next = max
  return next
}

export class DescendantsManager<T extends HTMLElement, K = {}> {
  private descendants = new Map<T, Descendant<T>>()

  register = (nodeOrOptions: T | null | (DescendantOptions & K)) => {
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
      descendant.index = descendants.indexOf(descendant.node)
      descendant.node.dataset.index = descendant.index.toString()
    })
  }

  count = () => this.descendants.size

  enabledCount = () => this.enabledValues().length

  values = () => {
    const values = Array.from(this.descendants.values())
    return values.sort((a, b) => a.index - b.index)
  }

  enabledValues = () =>
    this.values()
      .filter((descendant) => !descendant.disabled)
      .map((descendant, index) => ({ ...descendant, index }))

  item = (index: number) => this.values()[index]

  enabledItem = (index: number) => this.enabledValues()[index]

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
    if (!node) return -1
    return this.enabledValues().findIndex((i) => i.node.isSameNode(node))
  }

  next = (index: number, loop = true) => {
    const next = nextIndex(index, this.count(), loop)
    return this.item(next)
  }

  nextEnabled = (index: number, loop = true) => {
    const next = nextIndex(index, this.enabledCount(), loop)
    return this.enabledItem(next)
  }

  prev = (index: number, loop = true) => {
    const prev = prevIndex(index, this.count() - 1, loop)
    return this.item(prev)
  }

  prevEnabled = (index: number, loop = true) => {
    const prev = prevIndex(index, this.enabledCount() - 1, loop)
    return this.enabledItem(prev)
  }

  private registerNode = (node: T | null, options: DescendantOptions = {}) => {
    if (!node || this.descendants.has(node)) return

    const keys = Array.from(this.descendants.keys()).concat(node)
    const sorted = sortNodes(keys)

    this.descendants.set(node, {
      node,
      index: -1,
      disabled: !!options.disabled,
    })

    this.assignIndex(sorted)
  }
}
