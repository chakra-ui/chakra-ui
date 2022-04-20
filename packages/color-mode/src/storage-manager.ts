import { isBrowser, __DEV__ } from "@chakra-ui/utils"
import { ColorMode } from "./color-mode.utils"

export const STORAGE_KEY = "chakra-ui-color-mode"

type MaybeColorMode = ColorMode | undefined

export interface StorageManager {
  type: "cookie" | "localStorage"
  get(init?: ColorMode): MaybeColorMode
  set(value: ColorMode | ""): void
}

export function createLocalStorageManager(key: string): StorageManager {
  return {
    get(init?) {
      if (!isBrowser) return init
      try {
        const value = localStorage.getItem(key) as MaybeColorMode
        return value ?? init
      } catch (error) {
        if (__DEV__) console.log(error)
        return init
      }
    },
    set(value) {
      if (!isBrowser) return
      try {
        localStorage.setItem(key, value)
      } catch (error) {
        if (__DEV__) {
          console.log(error)
        }
      }
    },
    type: "localStorage",
  }
}

export const localStorageManager = createLocalStorageManager(STORAGE_KEY)

export function createCookieStorageManager(key: string): StorageManager {
  return {
    type: "cookie",
    get(init?) {
      if (!isBrowser) return init
      const match = document.cookie.match(new RegExp(`(^| )${key}=([^;]+)`))
      const value = match?.[2] ?? init
      return value as MaybeColorMode
    },
    set(value) {
      if (!isBrowser) return
      document.cookie = `${key}=${value}; max-age=31536000; path=/`
    },
  }
}

export const cookieStorageManager = createCookieStorageManager(STORAGE_KEY)
