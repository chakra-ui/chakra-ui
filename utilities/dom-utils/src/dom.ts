type Booleanish = boolean | "true" | "false"

export function isElement(el: any): el is Element {
  return (
    el != null &&
    typeof el == "object" &&
    "nodeType" in el &&
    el.nodeType === Node.ELEMENT_NODE
  )
}

export function isHTMLElement(el: any): el is HTMLElement {
  if (!isElement(el)) {
    return false
  }

  const win = el.ownerDocument.defaultView ?? window
  return el instanceof win.HTMLElement
}

export function getOwnerWindow(node?: Element | null): typeof globalThis {
  return isElement(node)
    ? getOwnerDocument(node)?.defaultView ?? window
    : window
}

export function getOwnerDocument(node?: Element | null): Document {
  if (isElement(node)) return node.ownerDocument
  return document
}

export function getEventWindow(event: Event): typeof globalThis {
  return ((event as UIEvent).view ?? window) as unknown as typeof globalThis
}

export function isBrowser() {
  return Boolean(globalThis?.document)
}

export function getActiveElement(node?: HTMLElement) {
  const doc = getOwnerDocument(node)
  return doc?.activeElement as HTMLElement
}

export function contains(parent: HTMLElement | null, child: HTMLElement) {
  if (!parent) return false
  return parent === child || parent.contains(child)
}
