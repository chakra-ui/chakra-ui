import { ColorMode } from "./color-mode-types"

export const STORAGE_KEY = "chakra-ui-color-mode"

type MaybeColorMode = ColorMode | undefined

export interface StorageManager {
  type: "cookie" | "localStorage"
  ssr?: boolean
  get(init?: ColorMode): MaybeColorMode
  set(value: ColorMode | "system"): void
}

export function createLocalStorageManager(key: string): StorageManager {
  return {
    ssr: false,
    type: "localStorage",
    get(init?) {
      if (!globalThis?.document) return init
      let value: any
      try {
        value = localStorage.getItem(key) || init
      } catch (e) {
        // no op
      }

      return value || init
    },
    set(value) {
      try {
        localStorage.setItem(key, value)
      } catch (e) {
        // no op
      }
    },
  }
}

export const localStorageManager = createLocalStorageManager(STORAGE_KEY)

function parseCookie(cookie: string, key: string): MaybeColorMode {
  const match = cookie.match(new RegExp(`(^| )${key}=([^;]+)`))
  return match?.[2] as MaybeColorMode
}

export function createCookieStorageManager(
  key: string,
  cookie?: string,
): StorageManager {
  return {
    ssr: !!cookie,
    type: "cookie",
    get(init?): MaybeColorMode {
      if (cookie) return parseCookie(cookie, key)
      if (!globalThis?.document) return init
      return parseCookie(document.cookie, key) || init
    },
    set(value) {
      document.cookie = `${key}=${value}; max-age=31536000; path=/`
    },
  }
}

export const cookieStorageManager = createCookieStorageManager(STORAGE_KEY)

export const cookieStorageManagerSSR = (cookie: string) =>
  createCookieStorageManager(STORAGE_KEY, cookie)
