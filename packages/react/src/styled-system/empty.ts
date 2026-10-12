import type { SystemStyleObject } from "./css.types.ts"

export const EMPTY_STYLES = Object.freeze({} as SystemStyleObject)

export const EMPTY_SLOT_STYLES = Object.freeze(
  {} as Record<string, SystemStyleObject>,
)
