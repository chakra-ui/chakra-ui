import { isFunction } from "./is"
import type { Dict } from "./types"

type PredicateFn<T> = (key: T) => boolean

export interface SplitPropsFn {
  <T extends Dict, K extends keyof T>(
    props: T,
    keys: K[],
  ): [Pick<T, K>, Omit<T, K>]

  <T extends Dict, K extends PredicateFn<keyof T>>(
    props: T,
    keys: K,
  ): [Dict, Dict]
}

const splitPropFn = (props: Dict, predicate: PredicateFn<keyof Dict>) => {
  const rest: Dict = {}
  const result: Dict = {}
  const allKeys = Object.keys(props)
  for (const key of allKeys) {
    if (predicate(key)) {
      result[key] = props[key]
    } else {
      rest[key] = props[key]
    }
  }
  return [result, rest] as any
}

export const splitProps: SplitPropsFn = (props: any, keys: any[]) => {
  const predicate = isFunction(keys)
    ? keys
    : (key: keyof Dict) => keys.includes(key)
  return splitPropFn(props, predicate)
}

export const createSplitProps = <T>(keys: (keyof T)[]) => {
  return function split<Props extends Partial<T>>(
    props: Props,
  ): [T, Omit<Props, keyof T>] {
    // @ts-expect-error
    return splitProps(props, keys)
  }
}
