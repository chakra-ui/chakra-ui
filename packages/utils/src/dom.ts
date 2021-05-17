import { Booleanish, EventKeys } from "./types"

export function getOwnerWindow(node?: HTMLElement | null): Window {
  return node instanceof Element
    ? getOwnerDocument(node)?.defaultView ?? window
    : window
}

export function getOwnerDocument(node?: HTMLElement | null): Document {
  return node instanceof Element ? node.ownerDocument ?? document : document
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
  const originalTarget = (event as any).nativeEvent.explicitOriginalTarget
  return (event.relatedTarget ?? originalTarget ?? activeElement) as HTMLElement
}

export function isRightClick(event: Pick<MouseEvent, "button">): boolean {
  return event.button !== 0
}
