import {
  Dict,
  compact,
  isObject,
  isString,
  memo,
  mergeWith,
  walkObject,
} from "@chakra-ui/utils"
import { SystemStyleObject } from "./css.types"
import { normalize } from "./normalize"
import { SystemContext } from "./types"

const importantRegex = /\s*!(important)?/i

const isImportant = (v: unknown) =>
  isString(v) ? importantRegex.test(v) : false

const withoutImportant = (v: unknown) =>
  isString(v) ? v.replace(importantRegex, "").trim() : v

export function createCssFn(
  context: Pick<SystemContext, "utility" | "conditions">,
) {
  const { utility, conditions } = context
  const mergeFn = mergeCss(context)

  return memo((...styleArgs: SystemStyleObject[]) => {
    const styles = mergeFn(...styleArgs)

    const normalized = normalize(styles, context)
    const result: Dict = Object.create(null)

    walkObject(normalized, (value, paths) => {
      const important = isImportant(value)
      if (value == null) return

      const [prop, ...selectors] = conditions
        .sort(paths)
        .map(conditions.resolve)

      if (important) {
        value = withoutImportant(value)
      }

      let transformed = utility.transform(prop, value) ?? Object.create(null)

      if (important) {
        transformed = imp(transformed)
      }

      mergeByPath(result, selectors, transformed)
    })

    return result
  })
}

function mergeByPath(target: Dict, paths: string[], value: Dict) {
  let acc = target
  for (const path of paths) {
    if (!path) continue
    if (!acc[path]) acc[path] = Object.create(null)
    acc = acc[path]
  }
  mergeWith(acc, value)
}

function imp(value: Dict) {
  return walkObject(value, (v) => (isString(v) ? `${v} !important` : v))
}

function compactFn(...styles: Dict[]) {
  return styles.filter(
    (style) => isObject(style) && Object.keys(compact(style)).length > 0,
  )
}

function mergeCss(context: Pick<SystemContext, "utility" | "conditions">) {
  function resolve(styles: Dict[]) {
    const comp = compactFn(...styles)
    if (comp.length === 1) return comp
    return comp.map((style) => {
      if (isProcessed(style)) return style
      return normalize(style, context)
    })
  }
  return memo((...styles) => {
    return mergeWith({}, ...resolve(styles))
  })
}

export const markAsProcessed = (styles: SystemStyleObject) => {
  Object.defineProperty(styles, "$$processed", {
    enumerable: false,
    value: true,
  })
  return styles
}

export const isProcessed = (styles: SystemStyleObject) => {
  return Reflect.has(styles, "$$processed")
}
