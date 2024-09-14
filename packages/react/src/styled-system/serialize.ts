import { type Dict, isObject, walkObject } from "../utils"
import type { SystemContext } from "./types"

export function createSerializeFn(
  options: Pick<SystemContext, "conditions" | "isValidProperty">,
) {
  const { conditions, isValidProperty } = options

  return function serialize(styles: Dict) {
    return walkObject(styles, (value) => value, {
      getKey: (prop, value) => {
        if (!isObject(value)) return prop

        if (!conditions.has(prop) && !isValidProperty(prop)) {
          return parseSelectors(prop)
            .map((s) => "&" + s)
            .join(", ")
        }

        return prop
      },
    })
  }
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
