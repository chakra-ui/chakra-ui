import { isObject } from "./is"

type Predicate<R = any> = (value: any, path: string[]) => R

export type MappedObject<T, K> = {
  [Prop in keyof T]: T[Prop] extends Array<any>
    ? MappedObject<T[Prop][number], K>[]
    : T[Prop] extends Record<string, unknown>
      ? MappedObject<T[Prop], K>
      : K
}

export type WalkObjectStopFn = (value: any, path: string[]) => boolean

export interface WalkObjectOptions {
  stop?: WalkObjectStopFn
  getKey?(prop: string, value: any): string
}

type Nullable<T> = T | null | undefined
const isNotNullish = <T>(element: Nullable<T>): element is T => element != null

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
        const key = getKey?.(prop, child) ?? prop
        const childPath = [...path, key]
        if (stop?.(value, childPath)) {
          return predicate(value, path)
        }

        const next = inner(child, childPath)
        if (isNotNullish(next)) {
          result[key] = next
        }
      }
      return result
    }

    return predicate(value, path)
  }

  return inner(target)
}

export function mapObject(obj: any, fn: (value: any) => any) {
  if (Array.isArray(obj)) return obj.map((value) => fn(value))
  if (!isObject(obj)) {
    if (obj !== null && obj !== undefined) return fn(obj)
    else return obj
  }
  return walkObject(obj, (value) => fn(value))
}
