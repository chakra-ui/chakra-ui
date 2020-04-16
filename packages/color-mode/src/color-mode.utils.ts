const isStorageSupported = typeof Storage !== "undefined"
const isMediaSupported = window.hasOwnProperty("matchMedia")

export const storageKey = "chakra-ui-color-mode"

export const classNameLight = `chakra-ui-light`
export const classNameDark = `chakra-ui-dark`

export type ColorMode = "light" | "dark"

export const storage = {
  get(fallbackValue?: ColorMode) {
    const _isStorageSupported =
      isStorageSupported && !!window.localStorage.getItem(storageKey)

    const value = _isStorageSupported
      ? window.localStorage.getItem(storageKey)
      : fallbackValue

    return value as ColorMode | undefined
  },
  set(value: ColorMode) {
    if (isStorageSupported) {
      window.localStorage.setItem(storageKey, value)
    }
  },
}

export const getBodyElement = () => {
  const mockBody = {
    classList: {
      add: () => {},
      remove: () => {},
    },
  }

  return window.document?.body ?? mockBody
}

export function syncBodyClassName(isDark: boolean) {
  const body = getBodyElement()
  body.classList.add(isDark ? classNameDark : classNameLight)
  body.classList.remove(isDark ? classNameLight : classNameDark)
}

function getMediaQuery(query: string) {
  const mql = window.matchMedia?.(query)
  const matches = !!mql.media === mql.matches
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

export function addListener(fn: Function) {
  if (!isMediaSupported) return undefined
  const mql = window.matchMedia(darkQuery)
  const listener = () => fn(!!mql.matches ? "dark" : "light")
  mql.addListener(listener)
  listener()
  return () => {
    mql.removeListener(listener)
  }
}
