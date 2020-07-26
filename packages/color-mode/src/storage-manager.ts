import { ColorMode } from "./color-mode.utils"

const isStorageSupported = typeof Storage !== "undefined"
export const storageKey = "chakra-ui-color-mode"

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
