import { Booleanish } from "./types"

export function getOwnerWindow(node?: HTMLElement | null) {
  return node instanceof Element
    ? getOwnerDocument(node)?.defaultView ?? window
    : window
}

export function getOwnerDocument(node?: HTMLElement | null) {
  return node instanceof Element ? node.ownerDocument ?? document : document
}

export function canUseDOM() {
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
