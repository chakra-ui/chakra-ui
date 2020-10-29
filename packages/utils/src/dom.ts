import * as React from "react"
import { Booleanish, EventKeys } from "./types"

let win: Window | undefined

/**
 * Note: Accessing "window" in IE11 is somewhat expensive, and calling "typeof window"
 * hits a memory leak, whereas aliasing it and calling "typeof win" does not.
 * Caching the window value at the file scope lets us minimize the impact.
 *
 * @see IE11 Memory Leak Issue https://github.com/microsoft/fluentui/pull/9010#issuecomment-490768427
 */
try {
  win = window
} catch (e) {
  /* no-op */
}

/**
 * Helper to get the window object. The helper will make sure to use a cached variable
 * of "window", to avoid overhead and memory leaks in IE11.
 */
export const getWindow = (node?: HTMLElement | null) =>
  node?.ownerDocument?.defaultView ?? win

/**
 * Check if we can use the DOM. Useful for SSR purposes
 */
function checkIsBrowser() {
  const win = getWindow()
  return Boolean(
    typeof win !== "undefined" && win.document && win.document.createElement,
  )
}

export const isBrowser = checkIsBrowser()

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

export const getDocument = (node?: HTMLElement | null) =>
  (node?.ownerDocument || isBrowser ? document : null) as Document | null

export const cx = (...classNames: any[]) => classNames.filter(Boolean).join(" ")

export function getActiveElement(node?: HTMLElement) {
  const doc = getDocument(node)
  return doc?.activeElement as HTMLElement
}

export function contains(parent: HTMLElement, child: HTMLElement) {
  return parent === child || parent.contains(child)
}
