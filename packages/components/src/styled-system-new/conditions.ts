import { Dict } from "@chakra-ui/utils"
import { Condition, ConditionConfig } from "./types"

const mapEntries = <T extends Dict, R extends Dict>(
  obj: T,
  fn: (key: string, value: T[keyof T]) => [string, R[keyof R]],
): R => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => fn(key, value)),
  ) as R
}

export const createConditions = (options: ConditionConfig): Condition => {
  const conditions = mapEntries(options.conditions ?? {}, (key, value) => [
    `_${key}`,
    value,
  ])

  const breakpoints = options.breakpoints ?? {}

  const values = Object.assign({}, conditions, breakpoints)

  const keys = () => {
    return Object.keys(values)
  }

  const has = (key: string) => {
    return keys().includes(key) || /^@|&|&$/.test(key) || key.startsWith("_")
  }

  const sort = (paths: string[]) => {
    return paths
      .filter((v) => v !== "base")
      .sort((a, b) => {
        const aa = has(a)
        const bb = has(b)
        if (aa && !bb) return 1
        if (!aa && bb) return -1
        return 0
      })
  }

  const resolve = (key: string) => {
    return Reflect.get(values, key) || key
  }

  const breakpointsKeys = ["base", ...Object.keys(breakpoints)]

  return {
    keys,
    sort,
    has,
    resolve,
    breakpoints: breakpointsKeys,
  }
}
