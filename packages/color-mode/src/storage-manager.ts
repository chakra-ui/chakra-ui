import { Color } from "sharp"
import { ColorMode } from "./color-mode.utils"

const hasLocalStorage = typeof Storage !== "undefined"
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
    if (!hasLocalStorage) {
      return init
    }

    const maybeValue = window.localStorage.getItem(storageKey) as ColorMode

    return maybeValue ?? init
  },
  set(value) {
    if (hasLocalStorage) {
      window.localStorage.setItem(storageKey, value)
    }
  },
}

/**
 * Simple object to handle read-write to cookies
 */
export const cookieStorageManager = (cookies = ""): StorageManager => ({
  get(init?) {
    const match = cookies.match(new RegExp(`(^| )${storageKey}=([^;]+)`))

    if (match) {
      return match[2] as ColorMode
    }

    return init
  },
  set(value) {
    document.cookie = `${storageKey}=${value}; max-age=31536000; path=/`
  },
})
