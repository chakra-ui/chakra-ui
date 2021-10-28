import { noop } from "@chakra-ui/utils"

const classNames = {
  light: "chakra-ui-light",
  dark: "chakra-ui-dark",
}

export type ColorMode = "light" | "dark"

/**
 * SSR: Graceful fallback for the `body` element
 */
const mockBody = {
  classList: { add: noop, remove: noop },
}

/**
 * Function to add/remove class from `body` based on color mode
 */
export function syncBodyClassName(doc: Document, isDark: boolean) {
  const body = doc.body ?? globalThis?.document.body ?? mockBody
  body.classList.add(isDark ? classNames.dark : classNames.light)
  body.classList.remove(isDark ? classNames.light : classNames.dark)
}

/**
 * Check if JS media query matches the query string passed
 */
function getMediaQuery(query: string) {
  const mediaQueryList = window.matchMedia?.(query)
  if (!mediaQueryList) {
    return undefined
  }
  return !!mediaQueryList.media === mediaQueryList.matches
}

export const queries = {
  light: "(prefers-color-scheme: light)",
  dark: "(prefers-color-scheme: dark)",
}

export const lightQuery = queries.light
export const darkQuery = queries.dark

export function getColorScheme(fallback?: ColorMode) {
  const isDark = getMediaQuery(queries.dark) ?? fallback === "dark"
  return isDark ? "dark" : "light"
}

/**
 * Adds system os color mode listener, and run the callback
 * once preference changes
 */
export function addListener(_win: Window, fn: Function) {
  const win = _win ?? globalThis.window
  if (!("matchMedia" in win)) return noop

  const mediaQueryList = win.matchMedia(queries.dark)

  const listener = () => {
    fn(mediaQueryList.matches ? "dark" : "light")
  }

  listener()
  mediaQueryList.addListener(listener)

  return () => {
    mediaQueryList.removeListener(listener)
  }
}

const COLOR_MODE_VAR = "--chakra-ui-color-mode"

export function getColorModeVar(_doc: Document) {
  const doc = _doc ?? globalThis?.document
  return doc.documentElement.style.getPropertyValue(COLOR_MODE_VAR) as ColorMode
}

export function setColorModeVar(_doc: Document, colorMode: ColorMode) {
  const doc = _doc ?? globalThis?.document
  doc.documentElement.style.setProperty(COLOR_MODE_VAR, colorMode)
}
