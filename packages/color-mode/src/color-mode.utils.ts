import { isBrowser, noop } from "@chakra-ui/utils"

const isStorageSupported = typeof Storage !== "undefined"
export const storageKey = "chakra-ui-color-mode"

const classNames = {
  light: "chakra-ui-light",
  dark: "chakra-ui-dark",
}

export type ColorMode = "light" | "dark"

export interface StorageManager {
  get(init?: ColorMode): ColorMode | undefined
  set(value: ColorMode): void
}

/**
 * Simple object to handle read-write to localStorage
 */
export const localStorageManager: StorageManager = {
  get(init?) {
    const exist =
      isStorageSupported && !!window.localStorage.getItem(storageKey)

    const value = exist ? window.localStorage.getItem(storageKey) : init

    return value as ColorMode | undefined
  },
  set(value) {
    if (isStorageSupported) {
      window.localStorage.setItem(storageKey, value)
    }
  },
}

/**
 * Simple object to handle read-write to cookies
 */
export const cookieStorageManager: StorageManager = {
  get(init?) {
    const match = document.cookie.match(
      new RegExp(`(^| )${storageKey}=([^;]+)`),
    )

    const value = match ? match[2] : init

    return value as ColorMode | undefined
  },
  set(value) {
    document.cookie = `${storageKey}=${value}; max-age=31536000;`
  },
}

/**
 * SSR: Graceful fallback for the `body` element
 */
const mockBody = {
  classList: { add: noop, remove: noop },
}

export const body = isBrowser ? document.body : mockBody

/**
 * Function to add/remove class from `body` based on color mode
 */
export function syncBodyClassName(isDark: boolean) {
  body.classList.add(isDark ? classNames.dark : classNames.light)
  body.classList.remove(isDark ? classNames.light : classNames.dark)
}

/**
 * Check if JS media query matches the query string passed
 */
function getMediaQuery(query: string) {
  const mediaQueryList = window.matchMedia?.(query)
  const matches = !!mediaQueryList.media === mediaQueryList.matches
  return matches
}

export const queries = {
  light: "(prefers-color-scheme: light)",
  dark: "(prefers-color-scheme: dark)",
}
export const lightQuery = "(prefers-color-scheme: light)"
export const darkQuery = "(prefers-color-scheme: dark)"

export function getColorScheme() {
  const isDark = getMediaQuery(queries.dark)
  return isDark ? "dark" : "light"
}

/**
 * Adds system os color mode listener, and run the callback
 * once preference changes
 */
export function addListener(fn: Function) {
  if (!window.hasOwnProperty("matchMedia")) {
    return undefined
  }

  const mediaQueryList = window.matchMedia(queries.dark)

  const listener = () => {
    fn(!!mediaQueryList.matches ? "dark" : "light")
  }

  listener()
  mediaQueryList.addListener(listener)

  return () => {
    mediaQueryList.removeListener(listener)
  }
}
