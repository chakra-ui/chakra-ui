const supportsLocalStorage = typeof Storage !== "undefined"

export const storageKey = "chakra-ui-color-mode"

const cx = (mode: ColorModeType) => `chakra-ui-${mode}`

export const classNameLight = cx("light")
export const classNameDark = cx("dark")

export type ColorModeType = "light" | "dark"

export const storage = {
  get: (init?: ColorModeType) =>
    ((supportsLocalStorage && window.localStorage.getItem(storageKey)) ||
      init) as ColorModeType | undefined,
  set: (value: ColorModeType) =>
    supportsLocalStorage && window.localStorage.setItem(storageKey, value),
}
