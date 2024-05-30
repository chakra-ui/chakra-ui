const hasOwn = (obj: any, key: string) =>
  Object.prototype.hasOwnProperty.call(obj, key)

function isObject(item: unknown): item is Record<string, any> {
  return item != null && typeof item === "object" && !Array.isArray(item)
}

export function mergeWith<T>(target: T, ...sources: T[]): any {
  if (!target) {
    return {}
  }

  for (const source of sources) {
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach((key) => {
        if (isObject(source[key])) {
          if (!hasOwn(target, key)) {
            Object.assign(target, { [key]: source[key] })
          } else {
            // @ts-ignore
            target[key] = mergeWith(source[key], target[key] || {})
          }
        } else if (Array.isArray(source[key])) {
          // @ts-ignore
          target[key] = (target[key] || []).concat(source[key])
        } else {
          Object.assign(target, { [key]: source[key] })
        }
      })
    }
  }

  return target
}
