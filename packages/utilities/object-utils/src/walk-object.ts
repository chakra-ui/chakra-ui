function isObject(value: any): value is Record<string, any> {
  return typeof value === "object" && value != null && !Array.isArray(value)
}

type Predicate<R = any> = (value: any, path: string[]) => R

export type MappedObject<T, K> = {
  [Prop in keyof T]: T[Prop] extends Array<any>
    ? MappedObject<T[Prop][number], K>[]
    : T[Prop] extends Record<string, unknown>
    ? MappedObject<T[Prop], K>
    : K
}

export type WalkObjectStopFn = (value: any, path: string[]) => boolean

export type WalkObjectOptions = {
  stop?: WalkObjectStopFn
  getKey?(prop: string): string
}

export function walkObject<T, K>(
  target: T,
  predicate: Predicate<K>,
  options: WalkObjectOptions = {},
): MappedObject<T, ReturnType<Predicate<K>>> {
  const { stop, getKey } = options

  function inner(value: any, path: string[] = []): any {
    if (isObject(value) || Array.isArray(value)) {
      const result: Record<string, string> = {}
      for (const [prop, child] of Object.entries(value)) {
        const key = getKey?.(prop) ?? prop
        const childPath = [...path, key]
        if (stop?.(value, childPath)) {
          return predicate(value, path)
        }
        result[key] = inner(child, childPath)
      }
      return result
    }

    return predicate(value, path)
  }

  return inner(target)
}

export function mapObject(obj: any, fn: (value: any) => any) {
  if (!isObject(obj)) return fn(obj)
  return walkObject(obj, (value) => fn(value))
}
