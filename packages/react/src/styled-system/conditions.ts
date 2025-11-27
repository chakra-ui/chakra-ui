import { mapEntries, memo } from "../utils"
import type { Condition, ConditionConfig } from "./types"

const SPECIAL_KEY_REGEX = /^@|&|&$/

export const createConditions = (options: ConditionConfig): Condition => {
  const { breakpoints, conditions: conds = {} } = options

  const conditions = mapEntries(conds, (key, value) => [`_${key}`, value])
  const values = Object.assign({}, conditions, breakpoints.conditions)

  function keys() {
    return Object.keys(values)
  }

  function has(key: string) {
    return (
      keys().includes(key) || SPECIAL_KEY_REGEX.test(key) || key.startsWith("_")
    )
  }

  const sort = memo((paths: string[]) => {
    return paths
      .filter((v) => v !== "base")
      .sort((a, b) => {
        const aa = has(a)
        const bb = has(b)
        if (aa && !bb) return 1
        if (!aa && bb) return -1
        return 0
      })
  })

  function expandAtRule(key: string) {
    if (!key.startsWith("@breakpoint")) return key
    return breakpoints.getCondition(key.replace("@breakpoint ", ""))
  }

  function resolve(key: string) {
    return Reflect.get(values, key) || key
  }

  return {
    keys,
    sort,
    has,
    resolve,
    breakpoints: breakpoints.keys(),
    expandAtRule,
  }
}
