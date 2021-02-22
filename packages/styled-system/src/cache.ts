import type { Theme, CachedValue } from "./types"

export const themeCache = new WeakMap<Theme, CachedValue>()
export type ThemeCache = typeof themeCache
