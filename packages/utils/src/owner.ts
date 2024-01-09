import { isHTMLElement } from "./is-element"

export function getOwnerWindow(node?: Element | null): typeof globalThis {
  return getOwnerDocument(node)?.defaultView ?? window
}

export function getOwnerDocument(node?: Element | null): Document {
  return isHTMLElement(node) ? node.ownerDocument : document
}

export function getEventWindow(event: Event) {
  return ((event as UIEvent).view ?? window) as typeof window
}

export function getActiveElement(node?: HTMLElement) {
  return getOwnerDocument(node).activeElement as HTMLElement
}
