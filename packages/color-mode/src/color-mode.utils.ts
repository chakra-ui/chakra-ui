import { isBrowser, noop } from "@chakra-ui/utils"

const isStorageSupported = typeof Storage !== "undefined"
const isMediaSupported = isBrowser ? window.hasOwnProperty("matchMedia") : false

export const storageKey = "chakra-ui-color-mode"

export const classNameLight = `chakra-ui-light`
export const classNameDark = `chakra-ui-dark`

export type ColorMode = "light" | "dark"

export const storage = {
  get(init?: ColorMode) {
    const _isStorageSupported =
      isStorageSupported && !!window.localStorage.getItem(storageKey)

    const value = _isStorageSupported
      ? window.localStorage.getItem(storageKey)
      : init

    return value as ColorMode | undefined
  },
  set(value: ColorMode) {
    if (isStorageSupported) {
      window.localStorage.setItem(storageKey, value)
    }
  },
}

const mockBody = {
  classList: { add: noop, remove: noop },
}

export const body = isBrowser ? document.body : mockBody

export function syncBodyClassName(isDark: boolean) {
  body.classList.add(isDark ? classNameDark : classNameLight)
  body.classList.remove(isDark ? classNameLight : classNameDark)
}

function getMediaQuery(query: string) {
  const mediaQueryList = window.matchMedia?.(query)
  const matches = !!mediaQueryList.media === mediaQueryList.matches
  return matches
}

export const lightQuery = "(prefers-color-scheme: light)"
export const darkQuery = "(prefers-color-scheme: dark)"

export function getColorScheme() {
  const isDark = getMediaQuery(darkQuery)
  if (isDark) return "dark"

  const isLight = getMediaQuery(lightQuery)
  if (isLight) return "light"

  return "light"
}

export function addListener(callback: Function) {
  if (!isMediaSupported) {
    return undefined
  }

  const mediaQueryList = window.matchMedia(darkQuery)

  const listener = () => {
    callback(!!mediaQueryList.matches ? "dark" : "light")
  }

  listener()
  mediaQueryList.addListener(listener)

  return () => {
    mediaQueryList.removeListener(listener)
  }
}
