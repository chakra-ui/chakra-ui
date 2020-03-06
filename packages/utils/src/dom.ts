import * as React from "react"

let _window: Window | undefined = undefined

// Note: Accessing "window" in IE11 is somewhat expensive, and calling "typeof window"
// hits a memory leak, whereas aliasing it and calling "typeof _window" does not.
// Caching the window value at the file scope lets us minimize the impact.
try {
  _window = window
} catch (e) {
  /* no-op */
}

/**
 * Helper to get the window object. The helper will make sure to use a cached variable
 * of "window", to avoid overhead and memory leaks in IE11.
 */
export function getWindow(rootElement?: Element | null): Window | undefined {
  if (typeof _window === "undefined") {
    return undefined
  } else {
    const el = rootElement as Element

    return el && el.ownerDocument && el.ownerDocument.defaultView
      ? el.ownerDocument.defaultView
      : _window
  }
}

/**
 * Check if we can use the DOM. Useful for SSR purposes
 */
function getIsBrowser() {
  const win = getWindow()
  return !!(
    typeof win !== "undefined" &&
    win.document &&
    win.document.createElement
  )
}

export const isBrowser = getIsBrowser()

export function normalizeEventKey(event: React.KeyboardEvent) {
  const { key, keyCode } = event
  if (keyCode >= 37 && keyCode <= 40 && key.indexOf("Arrow") !== 0) {
    return `Arrow${key}`
  }
  return key
}

export const makeDataAttr = (condition: boolean | undefined) =>
  condition ? "" : undefined
