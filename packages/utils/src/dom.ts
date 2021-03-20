import * as React from "react"
import { Booleanish, EventKeys } from "./types"

export function getOwnerWindow(node?: HTMLElement | null) {
  return getOwnerDocument(node).defaultView ?? window
}

export function getOwnerDocument(node?: HTMLElement | null) {
  return node?.ownerDocument ?? document
}

export function getRelatedTarget<E extends FocusEvent | React.FocusEvent>(
  event: E,
) {
  return (event.relatedTarget ||
    (event as any).nativeEvent.explicitOriginalTarget ||
    document.activeElement) as HTMLElement
}

export function canUseDOM() {
  return !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  )
}

export const isBrowser = canUseDOM()

/**
 * Get the normalized event key across all browsers
 * @param event keyboard event
 */
export function normalizeEventKey(event: React.KeyboardEvent) {
  const { key, keyCode } = event

  const isArrowKey =
    keyCode >= 37 && keyCode <= 40 && key.indexOf("Arrow") !== 0

  const eventKey = isArrowKey ? `Arrow${key}` : key

  return eventKey as EventKeys
}

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
