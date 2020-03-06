const isSupported = typeof Storage !== "undefined"

export const storageKey = "chakra-ui-color-mode"

export const classNameLight = `chakra-ui-light`
export const classNameDark = `chakra-ui-dark`

export type ColorMode = "light" | "dark"

export const darkModeQuery = "(prefers-color-scheme: dark)"

export const storage = {
  get(fallbackValue?: ColorMode) {
    const canGetValue = isSupported && !!window.localStorage.getItem(storageKey)
    const value = canGetValue
      ? window.localStorage.getItem(storageKey)
      : fallbackValue
    return value as ColorMode | undefined
  },
  set(value: ColorMode) {
    return isSupported && window.localStorage.setItem(storageKey, value)
  },
}

export const getBodyElement = () => {
  const mockBody = {
    classList: {
      add: (token: string) => {},
      remove: (token: string) => {},
    },
  }

  return window.document?.body ?? mockBody
}

export function syncBodyClassName(isDark: boolean) {
  const body = getBodyElement()
  body.classList.add(isDark ? classNameDark : classNameLight)
  body.classList.remove(isDark ? classNameLight : classNameDark)
}
