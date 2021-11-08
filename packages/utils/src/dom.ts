import { Booleanish, EventKeys } from "./types"

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
  return isElement(node) ? node.ownerDocument ?? document : document
}

export function getEventWindow(event: Event): typeof globalThis {
  return (((event as UIEvent).view ?? window) as unknown) as typeof globalThis
}

export function canUseDOM(): boolean {
  return !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  )
}

export const isBrowser = canUseDOM()

export const dataAttr = (condition: boolean | undefined) =>
  (condition ? "" : undefined) as Booleanish

export const ariaAttr = (condition: boolean | undefined) =>
  condition ? true : undefined

export const cx = (...classNames: any[]) => classNames.filter(Boolean).join(" ")

export function getActiveElement(node?: HTMLElement) {
  const doc = getOwnerDocument(node)
  return doc?.activeElement as HTMLElement
}

export function contains(parent: HTMLElement | null, child: HTMLElement) {
  if (!parent) return false
  return parent === child || parent.contains(child)
}

export function addDomEvent(
  target: EventTarget,
  eventName: string,
  handler: EventListener,
  options?: AddEventListenerOptions,
) {
  target.addEventListener(eventName, handler, options)
  return () => {
    target.removeEventListener(eventName, handler, options)
  }
}

/**
 * Get the normalized event key across all browsers
 * @param event keyboard event
 */
export function normalizeEventKey(
  event: Pick<KeyboardEvent, "key" | "keyCode">,
) {
  const { key, keyCode } = event

  const isArrowKey =
    keyCode >= 37 && keyCode <= 40 && key.indexOf("Arrow") !== 0

  const eventKey = isArrowKey ? `Arrow${key}` : key

  return eventKey as EventKeys
}

export function getRelatedTarget(
  event: Pick<FocusEvent, "relatedTarget" | "target" | "currentTarget">,
) {
  const target = (event.target ?? event.currentTarget) as HTMLElement
  const activeElement = getActiveElement(target)
  return (event.relatedTarget ?? activeElement) as HTMLElement
}

export function isRightClick(event: Pick<MouseEvent, "button">): boolean {
  return event.button !== 0
}
