import { themeCache } from "./cache"
import type { Token } from "./css-var"
import type { CachedValue, Transform } from "./types"

interface CreateTransformOptions {
  scale: Token
  compose?: Transform
  transform?: Transform
}

export function createTransform(options: CreateTransformOptions) {
  const { scale, transform, compose } = options

  const fn: Transform = (value, theme) => {
    const cache = themeCache.get(theme) as CachedValue
    cache[scale] ||= new Map()

    const scaleCache = cache[scale]
    const valueStr = String(value)

    if (scaleCache.has(valueStr)) {
      return scaleCache.get(valueStr)
    }

    const key = scale ? `${scale}.${valueStr}` : valueStr

    const _value =
      key in cache.theme.__cssMap ? cache.theme.__cssMap[key].varRef : value

    let result = transform?.(_value, theme) ?? _value

    if (compose) {
      result = compose(result, theme)
    }

    scaleCache.set(valueStr, result)
    return result
  }

  return fn
}
