import { type Dict, isObject, memo, walkObject } from "../utils"
import type { SystemContext } from "./types"

export function createSerializeFn(
  options: Pick<SystemContext, "conditions" | "isValidProperty">,
) {
  const { conditions, isValidProperty } = options

  const isSelectorLike = memo((prop: string, valueKeys: string): boolean => {
    if (!isValidProperty(prop)) return true
    return !valueKeys
      .split(",")
      .every((key) => key === "base" || conditions.has(key))
  })

  return function serialize(styles: Dict) {
    return walkObject(styles, (value) => value, {
      getKey: (prop, value) => {
        if (!isObject(value)) return prop

        if (conditions.has(prop)) return prop

        if (isSelectorLike(prop, Object.keys(value).join(","))) {
          return parseSelectors(prop)
            .map((s) => {
              const selector = s.startsWith("&") ? s.slice(1) : s
              return isTopLevelSelector(selector)
                ? `${selector} &`
                : `&${selector}`
            })
            .join(", ")
        }

        return prop
      },
    })
  }
}

function isTopLevelSelector(s: string): boolean {
  const lower = s.toLowerCase()
  return (
    lower.startsWith(":host-context") ||
    lower.startsWith(":host") ||
    lower.startsWith("::slotted")
  )
}

function parseSelectors(selector: string): string[] {
  const result = [] as string[]
  let parenCount = 0
  let currentSelector = ""
  let inEscape = false

  for (let i = 0; i < selector.length; i++) {
    const char = selector[i]

    if (char === "\\" && !inEscape) {
      inEscape = true
      currentSelector += char
      continue
    }

    if (inEscape) {
      inEscape = false
      currentSelector += char
      continue
    }

    if (char === "(") {
      parenCount++
    } else if (char === ")") {
      parenCount--
    }

    if (char === "," && parenCount === 0) {
      result.push(currentSelector.trim())
      currentSelector = ""
    } else {
      currentSelector += char
    }
  }

  if (currentSelector) {
    result.push(currentSelector.trim())
  }

  return result
}
