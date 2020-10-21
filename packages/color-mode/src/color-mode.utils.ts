import { isBrowser, noop } from "@chakra-ui/utils"

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

const getBody = () => {
  return isBrowser ? document.body : mockBody
}

/**
 * Function to add/remove class from `body` based on color mode
 */
export function syncBodyClassName(isDark: boolean) {
  const body = getBody()
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
export function addListener(fn: Function) {
  if (!("matchMedia" in window)) {
    return noop
  }

  const mediaQueryList = window.matchMedia(queries.dark)

  const listener = () => {
    fn(mediaQueryList.matches ? "dark" : "light")
  }

  listener()
  mediaQueryList.addListener(listener)

  return () => {
    mediaQueryList.removeListener(listener)
  }
}

export const root = {
  get: () =>
    document.documentElement.style.getPropertyValue(
      "--chakra-ui-color-mode",
    ) as ColorMode,
  set: (mode: ColorMode) => {
    if (isBrowser) {
      document.documentElement.style.setProperty("--chakra-ui-color-mode", mode)
    }
  },
}
