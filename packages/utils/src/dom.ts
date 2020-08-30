import { Booleanish } from "./types"
import * as React from "react"

let _window: Window | undefined = undefined

/**
 * Note: Accessing "window" in IE11 is somewhat expensive, and calling "typeof window"
 * hits a memory leak, whereas aliasing it and calling "typeof _window" does not.
 * Caching the window value at the file scope lets us minimize the impact.
 *
 * @see IE11 Memory Leak Issue https://github.com/microsoft/fluentui/pull/9010#issuecomment-490768427
 */
try {
  _window = window
} catch (e) {
  /* no-op */
}

/**
 * Helper to get the window object. The helper will make sure to use a cached variable
 * of "window", to avoid overhead and memory leaks in IE11.
 */
export const getWindow = (node?: HTMLElement | null) =>
  node?.ownerDocument?.defaultView ?? _window

/**
 * Check if we can use the DOM. Useful for SSR purposes
 */
function checkIsBrowser() {
  const _window = getWindow()
  return Boolean(
    typeof _window !== "undefined" &&
      _window.document &&
      _window.document.createElement,
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

  return isArrowKey ? `Arrow${key}` : key
}

export const dataAttr = (condition: boolean | undefined) =>
  (condition ? "" : undefined) as Booleanish

export const ariaAttr = (condition: boolean | undefined) =>
  condition ? true : undefined

export const getOwnerDocument = (node?: HTMLElement) =>
  node?.ownerDocument || document

export const cx = (...classNames: any[]) => classNames.filter(Boolean).join(" ")
