export function isElement(el: any): el is Element {
  return (
    el != null &&
    typeof el == "object" &&
    "nodeType" in el &&
    el.nodeType === Node.ELEMENT_NODE
  )
}

export function isHTMLElement(el: any): el is HTMLElement {
  if (!isElement(el)) return false
  const win = el.ownerDocument.defaultView ?? window
  return el instanceof win.HTMLElement
}

export function getOwnerWindow(node?: Element | null): typeof globalThis {
  return getOwnerDocument(node)?.defaultView ?? window
}

export function getOwnerDocument(node?: Element | null): Document {
  return isElement(node) ? node.ownerDocument : document
}

export function getEventWindow(event: Event) {
  return ((event as UIEvent).view ?? window) as typeof window
}

export function isBrowser() {
  return Boolean(globalThis?.document)
}

export function getActiveElement(node?: HTMLElement) {
  return getOwnerDocument(node).activeElement as HTMLElement
}

export function contains(parent: HTMLElement | null, child: HTMLElement) {
  if (!parent) return false
  return parent === child || parent.contains(child)
}
