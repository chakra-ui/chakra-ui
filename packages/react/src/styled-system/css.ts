import {
  type Dict,
  compact,
  isObject,
  isString,
  memo,
  mergeWith,
  walkObject,
} from "../utils"
import type { SystemStyleObject } from "./css.types"
import { EMPTY_OBJECT, createEmptyObject } from "./singleton"
import { sortAtRules } from "./sort-at-rules"
import type { SystemContext } from "./types"

const importantRegex = /\s*!(important)?/i

const isImportant = memo((v: unknown) =>
  isString(v) ? importantRegex.test(v) : false,
)

const withoutImportant = memo((v: unknown) =>
  isString(v) ? v.replace(importantRegex, "").trim() : v,
)

type CssFnOptions = Pick<SystemContext, "conditions"> & {
  normalize: (styles: Dict) => Dict
  transform: (prop: string, value: any) => Dict | undefined
}

export function createCssFn(context: CssFnOptions) {
  const { transform, conditions, normalize } = context
  const mergeFn = mergeCss(context)

  return memo(function cssFn(...styleArgs: SystemStyleObject[]) {
    const styles = mergeFn(...styleArgs)

    const normalized = normalize(styles)
    const result: Dict = createEmptyObject()

    walkObject(normalized, (value, paths) => {
      if (value == null) return

      const [prop, ...selectors] = conditions
        .sort(paths)
        .map(conditions.resolve)

      const important = isImportant(value)
      if (important) {
        value = withoutImportant(value)
      }

      let transformed = transform(prop, value) ?? EMPTY_OBJECT

      transformed = walkObject(
        transformed,
        (v) => (isString(v) && important ? `${v} !important` : v),
        { getKey: (prop) => conditions.expandAtRule(prop) },
      )

      mergeByPath(result, selectors.flat(), transformed)
    })

    return sortAtRules(result)
  })
}

function mergeByPath(target: Dict, paths: string[], value: Dict) {
  let acc = target
  for (const path of paths) {
    if (!path) continue
    if (!acc[path]) acc[path] = createEmptyObject()
    acc = acc[path]
  }
  mergeWith(acc, value)
}

function compactFn(...styles: Dict[]) {
  return styles.filter((style) => {
    if (!isObject(style)) return false
    const compacted = compact(style)
    const keys = Object.keys(compacted)
    return keys.length > 0
  })
}

function mergeCss(ctx: CssFnOptions) {
  function resolve(styles: Dict[]) {
    const comp = compactFn(...styles)
    if (comp.length === 1) return comp
    return comp.map((style) => ctx.normalize(style))
  }
  return memo(function mergeFn(...styles: Dict[]) {
    return mergeWith({}, ...resolve(styles))
  })
}
